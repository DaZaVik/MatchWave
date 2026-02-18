from fastapi import FastAPI
from app.api.auth import router as auth_router

app = FastAPI(title="MatchWave API")

@app.get("/health")
def health():
    return {"status": "ok"}

app.include_router(auth_router)