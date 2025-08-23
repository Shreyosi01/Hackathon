
from fastapi import APIRouter, Depends, HTTPException, status
from sqlmodel import select
from sqlalchemy.exc import SQLAlchemyError
from app.db import get_session
from app.models import User, ChatMessage
from app.schemas import ChatMessageRead, ChatMessageCreate
from app.safety import detect_crisis, CRISIS_RESPONSE
from app.nlp import get_emotion_label, choose_strategy, generate_response
from typing import Optional
from sqlmodel.ext.asyncio.session import AsyncSession
from pydantic import BaseModel

router = APIRouter()

class ChatIn(BaseModel):
    user_id: Optional[int] = None
    message: str

class ChatOut(BaseModel):
    reply: str
    emotion: str
    crisis: bool

@router.post("/chat", response_model=ChatOut)
async def chat(
    chat_in: ChatIn,
    session: AsyncSession = Depends(get_session)
):
    # Extra Safety Net: handle empty or None message
    if not chat_in.message or not chat_in.message.strip():
        return ChatOut(
            reply="I'm here to listen. Could you share a little more about what you're feeling?",
            emotion="neutral",
            crisis=False
        )

    # Ensure user exists or create
    user = None
    if chat_in.user_id is not None:
        user = await session.get(User, chat_in.user_id)
    if not user:
        user = User(name=f"User-{chat_in.user_id or 'anon'}")
        session.add(user)
        await session.commit()
        await session.refresh(user)

    # Safety check
    crisis = detect_crisis(chat_in.message)
    if crisis:
        reply = CRISIS_RESPONSE
        emotion = "crisis"
        # Log user message and bot reply
        user_msg = ChatMessage(user_id=user.id, role="user", text=chat_in.message, emotion=None)
        bot_msg = ChatMessage(user_id=user.id, role="bot", text=reply, emotion=emotion)
        session.add_all([user_msg, bot_msg])
        await session.commit()
        return ChatOut(reply=reply, emotion=emotion, crisis=True)

    # Emotion, strategy, response
    emotion = get_emotion_label(chat_in.message)
    strategy = choose_strategy(emotion)
    reply = generate_response(chat_in.message, emotion, strategy)

    # Log user message and bot reply
    user_msg = ChatMessage(user_id=user.id, role="user", text=chat_in.message, emotion=emotion)
    bot_msg = ChatMessage(user_id=user.id, role="bot", text=reply, emotion=emotion)
    session.add_all([user_msg, bot_msg])
    await session.commit()

    return ChatOut(reply=reply, emotion=emotion, crisis=False)
