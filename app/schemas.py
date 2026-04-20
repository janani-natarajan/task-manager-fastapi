from pydantic import BaseModel

class UserCreate(BaseModel):
    username: str
    password: str


class Token(BaseModel):
    access_token: str
    token_type: str


class TaskCreate(BaseModel):
    title: str


class TaskUpdate(BaseModel):
    completed: bool


class TaskOut(BaseModel):
    id: int
    title: str
    completed: bool

    class Config:
        from_attributes = True
