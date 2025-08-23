from sqlmodel import SQLModel
from sqlalchemy.ext.asyncio import AsyncSession, async_sessionmaker, create_async_engine
from app.settings import get_settings
from typing import AsyncGenerator

settings = get_settings()
engine = create_async_engine(settings.DB_URL, echo=True)
async_session = async_sessionmaker(engine, expire_on_commit=False, class_=AsyncSession)

async def get_session() -> AsyncGenerator[AsyncSession, None]:
	async with async_session() as session:
		yield session
