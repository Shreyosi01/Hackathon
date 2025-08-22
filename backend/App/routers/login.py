from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from passlib.context import CryptContext
from .. import models, schemas
from ..database import get_db
from ..core.auth import generate_token
from ..utils.security import hash_deterministic, decrypt_data  # ✅ updated

router = APIRouter()
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

@router.post("/login")
def login(request: schemas.UserLogin, db: Session = Depends(get_db)):
    # 🔒 use deterministic hash for search (not encryption)
    identifier_hash = hash_deterministic(request.identifier)

    # search by hashed email/phone
    user = db.query(models.User).filter(
        (models.User.email_hash == identifier_hash) |
        (models.User.phone_hash == identifier_hash)
    ).first()

    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email/phone"
        )

    # ✅ verify password
    if not pwd_context.verify(request.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid password"
        )

    # ✅ generate JWT token
    access_token = generate_token(
        data={"sub": str(user.id), "role": user.role}
    )

    return {
        "access_token": access_token,
        "token_type": "bearer",
        "user": {
            "id": user.id,
            "full_name": decrypt_data(user.full_name),  # decrypt for API response
            "email": decrypt_data(user.email_encrypted),
            "phone": decrypt_data(user.phone_encrypted),
            "role": user.role
        }
    }