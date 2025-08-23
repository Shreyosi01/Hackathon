from sqlmodel import SQLModel
from sqlalchemy import create_engine
import os

# Read DB URL from environment or fallback
db_url = os.getenv("DB_URL", "sqlite+aiosqlite:///./care_sync.db")
# Use sync driver for table creation
sync_db_url = db_url.replace("+aiosqlite", "")
engine = create_engine(sync_db_url, echo=True)

from app.models import *

def create_tables():
    SQLModel.metadata.create_all(engine)

if __name__ == "__main__":
    create_tables()