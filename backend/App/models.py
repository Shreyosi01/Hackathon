from sqlalchemy import Column, Integer, String, ForeignKey, Boolean, Float, DateTime, Text
from sqlalchemy.orm import relationship
from datetime import datetime
from .database import Base
import enum

class RoleEnum(str, enum.Enum):
    student = "Student"
    # community_health_worker = "Community Health Worker"
    doctor = "Doctor"
    admin = "Admin"

class User(Base):
    __tablename__ = 'users'
    id = Column(Integer, primary_key=True, index=True)
    full_name = Column(String, nullable=False)
    email = Column(String, unique=True, nullable=False, index=True)
    phone = Column(String, unique=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    role = Column(String, nullable=False)
    health_reports = relationship("HealthReports", back_populates="reporter")
    appointments_booked = relationship("Appointments", foreign_keys="Appointments.student_id", back_populates="student")
    appointments_received = relationship("Appointments", foreign_keys="Appointments.doctor_id", back_populates="doctor")

class HealthReports(Base):
    __tablename__ = 'reports'
    id = Column(Integer, primary_key=True, index=True)
    is_emergency = Column(Boolean, nullable=False)
    description = Column(String, nullable=False)
    mental_health_related = Column(Boolean, nullable=False)
    latitude = Column(Float, nullable=True)
    longitude = Column(Float, nullable=True)
    photo_url = Column(String, nullable=True)  # store uploaded photo path or URL
    reported_at = Column(DateTime, default=datetime.utcnow)
    reported_by = Column(Integer, ForeignKey("users.id"))
    reporter = relationship("User", back_populates="health_reports")

class Appointments(Base):
    __tablename__ = 'appointment'
    id = Column(Integer, primary_key=True, index=True)
    student_id = Column(Integer, ForeignKey("users.id"))
    doctor_id = Column(Integer, ForeignKey("users.id")) 
    date_time = Column(DateTime, nullable=False) 
    description = Column(String, nullable=True)
    status = Column(String, default="pending") 
    student = relationship("User", foreign_keys=[student_id], back_populates="appointments_booked")
    doctor = relationship("User", foreign_keys=[doctor_id], back_populates="appointments_received")

class PartnerClinic(Base):
    __tablename__ = 'clinics'
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    address = Column(String, nullable=False)
    contact_info = Column(String, nullable=True)
    specialty = Column(String, nullable=True)

class Campaign(Base):
    __tablename__ = "campaigns"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    description = Column(Text, nullable=True)
    start_date = Column(DateTime, nullable=False, default=datetime.utcnow)
    end_date = Column(DateTime, nullable=False)
    created_by = Column(Integer, ForeignKey("users.id"))  # admin

    creator = relationship("User")

    participants = relationship("CampaignParticipation", back_populates="campaign")


# Track participation
class CampaignParticipation(Base):
    __tablename__ = "campaign_participation"

    id = Column(Integer, primary_key=True, index=True)
    campaign_id = Column(Integer, ForeignKey("campaigns.id"))
    student_id = Column(Integer, ForeignKey("users.id"))
    joined_at = Column(DateTime, default=datetime.utcnow)

    campaign = relationship("Campaign", back_populates="participants")
    student = relationship("User")

class Alert(Base):
    __tablename__ = "alerts"
    id = Column(Integer, primary_key=True, index=True)
    message = Column(String, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    target_role = Column(String, nullable=False)