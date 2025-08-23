from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import chat, reports

app = FastAPI()

# Allow all origins for demo/dev
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/health")
def health_check():
    return {"status": "ok"}

app.include_router(chat.router)
app.include_router(reports.router)
