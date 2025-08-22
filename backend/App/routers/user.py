from fastapi import APIRouter, Depends, HTTPException,status
from sqlalchemy.orm import Session
from .. import models, schemas
from ..database import get_db
from ..core.auth import get_current_user

router = APIRouter()

@router.get("/my_profile", response_model=schemas.UserResponse)
def get_my_profile(current_user: models.User = Depends(get_current_user)):
    return current_user

@router.get("/users/{user_id}", response_model=schemas.UserResponse)
def get_user_by_id(
    user_id: int,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):
    if current_user.role.lower() != "admin":
        raise HTTPException(status_code=403, detail="Only admins can access this")

    user = db.query(models.User).filter(models.User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    return user

from typing import List

@router.get("/users", response_model=List[schemas.UserResponse])
def get_users_by_role(
    role: str,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):
    role = role.lower() 
    if current_user.role.lower() == "student" and role != "doctor":
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Students can only view doctors")

    users = db.query(models.User).filter(models.User.role.ilike(role)).all()
    if not users:
        raise HTTPException(status_code=404, detail=f"No users found with role {role}")
    return users
