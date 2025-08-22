from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from .. import models, schemas
from ..database import get_db
from ..core.auth import get_current_user

router = APIRouter()

# Admin posts an alert
@router.post("/alerts", response_model=schemas.AlertResponse)
def create_alert(alert: schemas.AlertCreate, db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):
    if current_user.role != "Admin":
        raise HTTPException(status_code=403, detail="Only admins can send alerts")

    new_alert = models.Alert(
        message=alert.message,
        target_role=alert.target_role
    )
    db.add(new_alert)
    db.commit()
    db.refresh(new_alert)
    return new_alert

# Each user fetches alerts meant for them
@router.get("/alerts/my", response_model=list[schemas.AlertResponse])
def get_my_alerts(db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):
    alerts = db.query(models.Alert).filter(
        (models.Alert.target_role == current_user.role) | 
        (models.Alert.target_role == "All")
    ).all()
    return alerts