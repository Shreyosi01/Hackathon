from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from .. import models, schemas
from ..database import get_db
from ..core.auth import get_current_user
from sqlalchemy import func

router = APIRouter()

# ✅ Leaderboard by metric
@router.get("/leaderboard", response_model=list[schemas.LeaderboardEntry])
def leaderboard(metric: str = "reports", db: Session = Depends(get_db)):
    students = db.query(models.User).filter(models.User.role == "Student").all()
    leaderboard = []

    for s in students:
        reports = db.query(models.HealthReports).filter(models.HealthReports.reported_by == s.id).count()
        appointments = db.query(models.Appointments).filter(models.Appointments.student_id == s.id).count()
        campaigns = db.query(models.CampaignParticipation).filter(models.CampaignParticipation.student_id == s.id).count()

        total = reports + appointments + campaigns

        leaderboard.append({
            "student_id": s.id,
            "full_name": s.full_name,
            "reports": reports,
            "appointments": appointments,
            "campaigns": campaigns,
            "total": total
        })

    # sort based on chosen metric
    if metric == "reports":
        leaderboard.sort(key=lambda x: x["reports"], reverse=True)
    elif metric == "appointments":
        leaderboard.sort(key=lambda x: x["appointments"], reverse=True)
    elif metric == "campaigns":
        leaderboard.sort(key=lambda x: x["campaigns"], reverse=True)
    else:  # total
        leaderboard.sort(key=lambda x: x["total"], reverse=True)

    return leaderboard


# ✅ See my rank
@router.get("/leaderboard/me")
def my_rank(db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):
    if current_user.role.lower() != "student":
        raise HTTPException(status_code=403, detail="Only students can view their rank")

    all_students = db.query(models.User).filter(models.User.role == "Student").all()

    leaderboard = []
    for s in all_students:
        reports = db.query(models.HealthReports).filter(models.HealthReports.reported_by == s.id).count()
        appointments = db.query(models.Appointments).filter(models.Appointments.student_id == s.id).count()
        campaigns = db.query(models.CampaignParticipation).filter(models.CampaignParticipation.student_id == s.id).count()
        total = reports + appointments + campaigns
        leaderboard.append((s.id, total))

    leaderboard.sort(key=lambda x: x[1], reverse=True)

    # find my rank
    my_rank = [i for i, (sid, _) in enumerate(leaderboard, 1) if sid == current_user.id]
    return {"rank": my_rank[0] if my_rank else None}