from sqlalchemy import engine, create_engine
# from sqlalchemy.ext.declarative_base import declarative_base
from sqlalchemy.orm import sessionmaker,declarative_base
import os

SQLALCHEMY_DATABASE_URL = r"sqlite:///C:/Users/srijani/projects/Hackathon/backend/product.db"
engine = create_engine(SQLALCHEMY_DATABASE_URL,connect_args={
    "check_same_thread": False
})
import os
print("Using DB file at:", os.path.abspath("product.db"))
SessionLocal = sessionmaker(bind = engine , autocommit = False, autoflush = False)
Base = declarative_base()
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()