from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.openapi.utils import get_openapi
from passlib.context import CryptContext
from dotenv import load_dotenv

from . import models, database
from .routers import (
    login, register, healthreport, appointment,
    user, clinics, leaderboard, campaigns, alerts
)

# ✅ load environment variables early
load_dotenv()

app = FastAPI()

# CORS settings
origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "https://your-frontend-domain.com",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,     # can set ["*"] for testing
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Password hashing context
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# Custom OpenAPI docs with Bearer auth
def custom_openapi():
    if app.openapi_schema:
        return app.openapi_schema
    openapi_schema = get_openapi(
        title="My API",
        version="1.0.0",
        description="Custom Auth with email/phone + password + role",
        routes=app.routes,
    )
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

# Root endpoint
@app.get("/")
def read_root():
    return {"message": "Welcome to backend!"}

# Register routers
app.include_router(register.router)
app.include_router(login.router)
app.include_router(user.router)
app.include_router(healthreport.router)
app.include_router(appointment.router)
app.include_router(clinics.router)
app.include_router(campaigns.router)
app.include_router(leaderboard.router)
app.include_router(alerts.router)

# ✅ Create DB tables if not exist
models.Base.metadata.create_all(bind=database.engine)