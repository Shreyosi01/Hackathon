from fastapi import APIRouter, HTTPException, Depends, status, Response
from sqlalchemy.orm import Session
from .. import models, schemas
from ..database import get_db, SessionLocal
from sqlalchemy.exc import IntegrityError
from ..models import Appointments
from typing import List
from ..core.auth import get_current_user

router = APIRouter()

@router.post("/appointments/book", response_model=schemas.AppointmentResponse)
def book_appointment(appointment: schemas.AppointmentCreate,db: Session = Depends(get_db),current_user: models.User = Depends(get_current_user)):
    db = SessionLocal()
    new_appointment = models.Appointments(
        student_id = current_user.id,
        doctor_id = appointment.doctor_id,
        date_time=appointment.date_time,
        description=appointment.description,
        status="pending"
    )
    db.add(new_appointment)
    db.commit()
    db.refresh(new_appointment)
    return new_appointment

@router.get("/appointments/my", response_model=List[schemas.AppointmentResponse])
def my_appointments(db: Session = Depends(get_db),current_user: models.User = Depends(get_current_user)):
    appointments = db.query(models.Appointments).filter(models.Appointments.student_id == current_user.id).all()
    if not appointments:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="No rappointments found for this user"
        )
    return appointments
@router.get("/appointments/doctor", response_model=List[schemas.AppointmentResponse])
def doctor_appointments(db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):
    if current_user.role.lower() != "doctor":   # only doctors/clinicians allowed
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Only clinicians can access this"
        )

    appointments = db.query(models.Appointments).filter(
        models.Appointments.doctor_id == current_user.id
    ).all()
    return appointments

@router.get("/appointments/all",response_model=List[schemas.AppointmentResponse])
def get_all_appointments(db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):
    if current_user.role.lower()!="admin":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Only admin can view all the appointments"
        )
    appointments=db.query(models.Appointments).all()
    return appointments

@router.patch("/{appointment_id}/status", response_model=schemas.AppointmentResponse)
def update_status(
    appointment_id: int,
    update: schemas.AppointmentUpdateStatus,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):
    if current_user.role.lower() != "doctor":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Only doctors can update status"
        )

    appointment = db.query(models.Appointments).filter(
        models.Appointments.id == appointment_id,
        models.Appointments.doctor_id == current_user.id
    ).first()

    if not appointment:
        raise HTTPException(status_code=404, detail="Appointment not found")

    appointment.status = update.status
    db.commit()
    db.refresh(appointment)
    return appointment

