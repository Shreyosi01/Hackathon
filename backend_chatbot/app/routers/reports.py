
from fastapi import APIRouter, Depends, HTTPException, status
from sqlmodel import select, func
from app.db import get_session
from app.models import HealthReport
from app.schemas import HealthReportCreate
from typing import List, Dict
from sqlmodel.ext.asyncio.session import AsyncSession
from datetime import datetime, timedelta, timezone

router = APIRouter()

@router.post("/reports", status_code=201)
async def create_report(
    report: HealthReportCreate,
    session: AsyncSession = Depends(get_session)
):
    db_report = HealthReport(**report.dict())
    session.add(db_report)
    await session.commit()
    await session.refresh(db_report)
    return db_report

@router.get("/reports/summary")
async def reports_summary(
    session: AsyncSession = Depends(get_session)
):
    now = datetime.now(timezone.utc)
    since = now - timedelta(days=30)
    stmt = select(
        HealthReport.category,
        func.count(HealthReport.id)
    ).where(
        HealthReport.created_at >= since
    ).group_by(HealthReport.category)
    result = await session.execute(stmt)
    summary = {row[0]: row[1] for row in result.all()}
    return summary
