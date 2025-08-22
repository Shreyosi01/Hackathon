from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from .. import models, schemas
from ..database import get_db
from ..core.auth import get_current_user

router = APIRouter()

@router.post("/clinics", response_model=schemas.ClinicResponse)
def create_clinic(
    clinic: schemas.ClinicCreate,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):
    if current_user.role.lower() != "admin":
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Only admins can add clinics")

    new_clinic = models.PartnerClinic(
        name=clinic.name,
        address=clinic.address,
        contact_info=clinic.contact_info,
        specialty=clinic.specialty
    )
    db.add(new_clinic)
    db.commit()
    db.refresh(new_clinic)
    return new_clinic

@router.get("/clinics", response_model=list[schemas.ClinicResponse])
def get_all_clinics(db: Session = Depends(get_db)):
    clinics = db.query(models.PartnerClinic).all()
    return clinics

@router.get("/clinics/{clinic_id}", response_model=schemas.ClinicResponse)
def get_clinic(clinic_id: int, db: Session = Depends(get_db)):
    clinic = db.query(models.PartnerClinic).filter(models.PartnerClinic.id == clinic_id).first()
    if not clinic:
        raise HTTPException(status_code=404, detail="Clinic not found")
    return clinic