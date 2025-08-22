from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from sqlalchemy import func
from passlib.context import CryptContext
from .. import models, schemas
from ..database import get_db
from ..core.auth import generate_token
from ..utils.security import encrypt_data

router = APIRouter()

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

@router.post("/login")
def login_user(request: schemas.UserLogin, db: Session = Depends(get_db)):
    user = db.query(models.User).filter(
        (models.User.email == encrypted_identifier) | 
        (models.User.phone == encrypted_identifier)
    ).first()
    if not user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid user detail or role")
    if not pwd_context.verify(request.password, user.hashed_password):
        raise HTTPException(status_code = status.HTTP_404_NOT_FOUND, detail="Invalid Password")
    access_token = generate_token(
        data = {'sub':str(user.id), 'role':user.role}
    )
    return {"access_token":access_token, "token_type":"bearer"}

 