from typing import Optional
from datetime import datetime
from pydantic import BaseModel

class UserRead(BaseModel):
	id: int
	name: str
	created_at: datetime

class UserCreate(BaseModel):
	name: str

class ChatMessageRead(BaseModel):
	id: int
	user_id: int
	role: str
	text: str
	emotion: Optional[str]
	created_at: datetime

class ChatMessageCreate(BaseModel):
	user_id: int
	role: str
	text: str
	emotion: Optional[str] = None

class HealthReportRead(BaseModel):
	id: int
	user_id: int
	category: str
	description: str
	lat: Optional[float]
	lon: Optional[float]
	created_at: datetime

class HealthReportCreate(BaseModel):
	user_id: int
	category: str
	description: str
	lat: Optional[float] = None
	lon: Optional[float] = None
