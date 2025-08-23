from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from .. import models, schemas
from ..database import get_db
from ..core.auth import get_current_user
from datetime import datetime

router = APIRouter()

@router.get("/campaigns")
def get_campaigns(db: Session = Depends(get_db)):
    # Assuming you have a Campaign model in DB
    campaigns = db.query(models.Campaign).all()
    return [
        {
            "id": c.id,
            "title": c.title,
            "description": c.description,
            "date": c.date,
            "status": c.status  # "ongoing" or "upcoming"
        }
        for c in campaigns
    ]

# ✅ Create campaign (admin only)
@router.post("/campaigns", response_model=schemas.CampaignResponse)
def create_campaign(campaign: schemas.CampaignCreate,
                    db: Session = Depends(get_db),
                    current_user: models.User = Depends(get_current_user)):
    if current_user.role.lower() != "admin":
        raise HTTPException(status_code=403, detail="Only admins can create campaigns")

    new_campaign = models.Campaign(
        title=campaign.title,
        description=campaign.description,
        start_date=campaign.start_date,
        end_date=campaign.end_date,
        created_by=current_user.id
    )
    db.add(new_campaign)
    db.commit()
    db.refresh(new_campaign)
    return new_campaign


# ✅ List active campaigns
@router.get("/campaigns", response_model=list[schemas.CampaignResponse])
def list_campaigns(db: Session = Depends(get_db)):
    now = datetime.utcnow()
    campaigns = db.query(models.Campaign).filter(models.Campaign.end_date >= now).all()
    return campaigns


# ✅ Join campaign
@router.post("/campaigns/{campaign_id}/join")
def join_campaign(campaign_id: int,
                  db: Session = Depends(get_db),
                  current_user: models.User = Depends(get_current_user)):

    if current_user.role.lower() != "student":
        raise HTTPException(status_code=403, detail="Only students can join campaigns")

    existing = db.query(models.CampaignParticipation).filter(
        models.CampaignParticipation.campaign_id == campaign_id,
        models.CampaignParticipation.student_id == current_user.id
    ).first()
    if existing:
        raise HTTPException(status_code=400, detail="Already joined")

    join = models.CampaignParticipation(campaign_id=campaign_id, student_id=current_user.id)
    db.add(join)
    db.commit()
    return {"message": "Joined campaign successfully"}


# ✅ Campaign stats
@router.get("/campaigns/{id}/stats")
def campaign_stats(id: int, db: Session = Depends(get_db)):
    campaign = db.query(models.Campaign).filter(models.Campaign.id == id).first()
    if not campaign:
        raise HTTPException(status_code=404, detail="Campaign not found")

    participants = db.query(models.CampaignParticipation).filter(
        models.CampaignParticipation.campaign_id == id).count()

    return {
        "id": campaign.id,
        "title": campaign.title,
        "participants": participants
    }