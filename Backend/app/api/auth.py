from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, Field

router = APIRouter(prefix="/auth", tags=["auth"])

# временное хранилище (заглушка вместо базы)
_fake_users: dict[str, str] = {}  # email -> password

class RegisterRequest(BaseModel):
    email: str
    password: str = Field(min_length=6, max_length=72)
class LoginRequest(BaseModel):
    email: str
    password: str

class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    
@router.post("/register", status_code=201)
def register(data: RegisterRequest):
    if data.email in _fake_users:
        raise HTTPException(status_code=409, detail="User already exists")
    _fake_users[data.email] = data.password
    return {"message": "User created successfully"}

@router.post("/login", response_model=TokenResponse)
def login(data: LoginRequest):
    saved_password = _fake_users.get(data.email)

    if not saved_password or saved_password != data.password:
        raise HTTPException(status_code=401, detail="Invalid credentials")

    fake_token = f"fake-token-for-{data.email}"
    return TokenResponse(access_token=fake_token)