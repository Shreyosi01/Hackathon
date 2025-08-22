from fastapi import FastAPI, HTTPException, Depends
from sqlalchemy.orm import Session
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional
from sqlalchemy.exc import IntegrityError
from passlib.context import CryptContext
from .database import SessionLocal
from . import models, schemas, database
from .routers import  login, register, healthreport, appointment, user, clinics, leaderboard, campaigns, alerts
from fastapi.openapi.utils import get_openapi

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # or ["*"] for testing
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def custom_openapi():
    if app.openapi_schema:
        return app.openapi_schema
    openapi_schema = get_openapi(
        title="My API",
        version="1.0.0",
        description="Custom Auth with email/phone + password + role",
        routes=app.routes,
    )
    # Replace default security scheme with Bearer token
    openapi_schema["components"]["securitySchemes"] = {
        "BearerAuth": {
            "type": "http",
            "scheme": "bearer",
            "bearerFormat": "JWT"
        }
    }
    for path in openapi_schema["paths"].values():
        for method in path.values():
            method["security"] = [{"BearerAuth": []}]
    app.openapi_schema = openapi_schema
    return app.openapi_schema

app.openapi = custom_openapi

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def get_db():
    db = database.SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get("/")
def read_root():
    return {"message": "Welcome to backend!"}

app.include_router(register.router)
app.include_router(login.router)
app.include_router(user.router)
app.include_router(healthreport.router)
app.include_router(appointment.router)
app.include_router(clinics.router)
app.include_router(campaigns.router)
app.include_router(leaderboard.router)
app.include_router(alerts.router)

models.Base.metadata.create_all(bind=database.engine)