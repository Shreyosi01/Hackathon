from fastapi import APIRouter, HTTPException, Depends, status, Response
from sqlalchemy.orm import Session
from .. import models, schemas
from ..database import get_db, SessionLocal
from sqlalchemy.exc import IntegrityError
from ..models import HealthReports
from typing import List
from ..core.auth import get_current_user

router = APIRouter()

@router.post("/reports/create")
def create_health_report(report: schemas.HealthReportCreate,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user),):
    db = SessionLocal()
    new_health_report = models.HealthReports(
        is_emergency=report.is_emergency,
        description=report.description,
        mental_health_related=report.mental_health_related,
        latitude=report.latitude,
        longitude=report.longitude,
        photo_url = report.photo_url,
        reported_by=current_user.id
    )
    db.add(new_health_report)
    db.commit()
    db.refresh(new_health_report)
    return new_health_report

@router.get("/reports/my", response_model=List[schemas.HealthReportResponse])
def my_reports(db: Session = Depends(get_db),current_user: models.User = Depends(get_current_user)):
    reports = db.query(models.HealthReports).filter(models.HealthReports.reported_by == current_user.id).all()
    if not reports:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="No reports found for this user"
        )
    return reports

@router.get("/reports/all", response_model=List[schemas.HealthReportResponse])
def get_all_reports(db: Session = Depends(get_db),current_user: models.User = Depends(get_current_user)):
    if current_user.role.lower()!="admin":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Only admin can view all the reports"
        )
    reports=db.query(models.HealthReports).all()
    return reports

@router.get("/reports/trends")
def report_trends(filter: str = "last30days", db: Session = Depends(get_db)):
    query = db.query(models.HealthReports)

    if filter == "last30days":
        from datetime import datetime, timedelta
        start = datetime.utcnow() - timedelta(days=30)
        query = query.filter(models.HealthReports.reported_at >= start)

    total = query.count()
    by_emergency = query.filter(models.HealthReports.is_emergency == True).count()
    by_mental = query.filter(models.HealthReports.mental_health_related == True).count()

    return {
        "total": total,
        "emergency_cases": by_emergency,
        "mental_health_cases": by_mental
    }

@router.get("/reports/{id}", response_model=schemas.HealthReportResponse)
def get_report(id:int, db: Session = Depends(get_db),current_user: models.User = Depends(get_current_user)):
    report = db.query(models.HealthReports).filter(models.HealthReports.id==id).first()
    if not report:
        raise HTTPException(
            status_code = status.HTTP_404_NOT_FOUND,
            detail = "Report not found"
        )
    if current_user.role.lower() not in ["admin","doctor"] and report.reported_by!=current_user.id:
        raise HTTPException(
            status_code = status.HTTP_403_FORBIDDEN,
            detail="Not authorized to view this report"
        )
    return report