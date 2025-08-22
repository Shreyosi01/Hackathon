from fastapi import APIRouter, HTTPException
from ..database import SessionLocal
from passlib.context import CryptContext
from sqlalchemy.exc import IntegrityError
from ..models import User
from .. import schemas
from ..utils.security import encrypt_data, hash_deterministic

router = APIRouter()
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

@router.post("/register")
def register_user(user: schemas.UserCreate):
    db = SessionLocal()

    encrypted_email = encrypt_data(user.email)
    email_hash = hash_deterministic(user.email)

    encrypted_phone = encrypt_data(user.phone)
    phone_hash = hash_deterministic(user.phone)

    existing_email = db.query(User).filter(User.email_hash == email_hash).first()
    if existing_email:
        raise HTTPException(status_code=400, detail="Email already registered")

    existing_phone = db.query(User).filter(User.phone_hash == phone_hash).first()
    if existing_phone:
        raise HTTPException(status_code=400, detail="Phone number already registered")

    new_user = User(
        full_name=encrypt_data(user.full_name),
        email_encrypted=encrypt_data(user.email),   # ✅ new name
        email_hash=hash_deterministic(user.email),  # ✅ lookup hash
        phone_encrypted=encrypt_data(user.phone),   # ✅ new name
        phone_hash=hash_deterministic(user.phone),
        hashed_password=pwd_context.hash(user.password),
        role=user.role
    )

    try:
        db.add(new_user)
        db.commit()
        db.refresh(new_user)
    except IntegrityError:
        db.rollback()
        raise HTTPException(status_code=400, detail="Email or phone already exists")
    finally:
        db.close()

    return {"message": "User registered successfully"}