from pydantic import BaseModel
from typing import Optional
from enum import Enum
from datetime import datetime
from pydantic import ConfigDict

class RoleEnum(str, Enum):
    student = "Student"
    # community_health_worker = "Community Health Worker"
    doctor = "Doctor"
    admin = "Admin"

class UserBase(BaseModel):
    full_name : str
    email : str
    phone : str
    role : RoleEnum

class UserCreate(UserBase):
    password : str

def decrypt(value: str) -> str:
    # your decryption logic here
    return value  

class UserResponse(BaseModel):
    id: int
    full_name: str
    email: str
    phone: str
    role: RoleEnum

    model_config = ConfigDict(from_attributes=True)


class UserLogin(BaseModel):
    identifier : str
    password : str

class Token(BaseModel):
    access_token : str
    token_type : str

class TokenData(BaseModel):
    identifier : Optional[str] = None
    role: Optional[RoleEnum] = None

class HealthReportBase(BaseModel):
    is_emergency: bool
    description: str
    mental_health_related: bool
    latitude: Optional[float] = None
    longitude: Optional[float] = None
    photo_url: Optional[str] = None

class HealthReportCreate(HealthReportBase):
    pass

class HealthReportResponse(HealthReportBase):
    id: int
    reported_at: datetime
    reported_by: int  # User ID

    class Config:
        from_attributes = True

class AppointmentBase(BaseModel):
    date_time: datetime
    description: Optional[str] = None

class AppointmentCreate(AppointmentBase):
    doctor_id: int


class AppointmentResponse(AppointmentBase):
    id: int
    student_id: int
    doctor_id: int
    status: str

    class Config:
        from_attributes = True

class AppointmentUpdateStatus(BaseModel):
    status: str

class ClinicBase(BaseModel):
    name: str
    address: str
    contact_info: str | None = None
    specialty: str | None = None

class ClinicCreate(ClinicBase):
    pass

class ClinicResponse(ClinicBase):
    id: int

    class Config:
        from_attributes = True

class CampaignBase(BaseModel):
    title: str
    description: Optional[str] = None
    start_date: datetime
    end_date: datetime

class CampaignCreate(CampaignBase):
    pass

class CampaignResponse(CampaignBase):
    id: int
    created_by: int

    class Config:
        from_attributes = True


# Participation
class CampaignParticipationResponse(BaseModel):
    id: int
    student_id: int
    campaign_id: int
    joined_at: datetime

    class Config:
        from_attributes = True


# Leaderboard Entry
class LeaderboardEntry(BaseModel):
    student_id: int
    full_name: str
    reports: int
    appointments: int
    campaigns: int
    total: int

class AlertCreate(BaseModel):
    message: str
    target_role: str

class AlertResponse(BaseModel):
    id: int
    message: str
    created_at: datetime
    target_role: str

    class Config:
        from_attributes = True