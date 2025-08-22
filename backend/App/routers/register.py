from fastapi import APIRouter, HTTPException
from sqlalchemy.orm import Session
from .. import models, schemas
from ..database import get_db, SessionLocal
from passlib.context import CryptContext
from sqlalchemy.exc import IntegrityError
from ..models import User
import os
from ..utils.security import encrypt_data


router = APIRouter()
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

@router.post("/register")
def register_user(user: schemas.UserCreate):
    db = SessionLocal()
    existing_email = db.query(User).filter(User.email == user.email).first()
    if existing_email:
        raise HTTPException(status_code=400, detail="Email already registered")

    existing_phone = db.query(User).filter(User.phone == user.phone).first()
    if existing_phone:
        raise HTTPException(status_code=400, detail="Phone number already registered")

    encrypted_name = encrypt_data(user.full_name)
    encrypted_email = encrypt_data(user.email)
    encrypted_phone = encrypt_data(user.phone)


    hashed_pw = pwd_context.hash(user.password)
    new_user = User(
        full_name=encrypted_name,
        email=encrypted_email,
        phone=encrypted_phone,
        hashed_password=hashed_pw,
        role=user.role
    )

    try:
        db.add(new_user)
        db.commit()
        db.refresh(new_user)
    except IntegrityError as e:
        db.rollback()
        raise HTTPException(status_code=400, detail="Email or phone already exists")
    finally:
        db.close()

    return {"message": "User registered successfully"}