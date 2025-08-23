from sqlmodel import SQLModel, Field
from typing import Optional
from datetime import datetime, timezone

def utcnow():
	return datetime.now(timezone.utc)

class User(SQLModel, table=True):
	id: Optional[int] = Field(default=None, primary_key=True)
	name: str
	created_at: datetime = Field(default_factory=utcnow, nullable=False, index=True)

class ChatMessage(SQLModel, table=True):
	id: Optional[int] = Field(default=None, primary_key=True)
	user_id: int = Field(foreign_key="user.id")
	role: str
	text: str
	emotion: Optional[str] = None
	created_at: datetime = Field(default_factory=utcnow, nullable=False, index=True)

class HealthReport(SQLModel, table=True):
	id: Optional[int] = Field(default=None, primary_key=True)
	user_id: int = Field(foreign_key="user.id")
	category: str
	description: str
	lat: Optional[float] = None
	lon: Optional[float] = None
	created_at: datetime = Field(default_factory=utcnow, nullable=False, index=True)
