from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, Field

router = APIRouter(prefix="/auth", tags=["auth"])

# временное хранилище (заглушка вместо базы)
_fake_users: dict[str, str] = {}  # email -> password

class RegisterRequest(BaseModel):
    email: str
    password: str = Field(min_length=6, max_length=72)

@router.post("/register", status_code=201)
def register(data: RegisterRequest):
    if data.email in _fake_users:
        raise HTTPException(status_code=409, detail="User already exists")
    _fake_users[data.email] = data.password
    return {"message": "User created successfully"}