from datetime import timedelta, datetime, timezone
from typing import Annotated
from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel,Field
from sqlalchemy.orm import session
from starlette import status
from database import SessionLocal
from models import User
from passlib.context import CryptContext
from fastapi.security import OAuth2PasswordRequestForm, OAuth2PasswordBearer
from jose import jwt, JWTError
import random
import string

router = APIRouter(
    prefix='/auth',
    tags=[]
)

SECRET_KEY = '2002'
ALGORITHM = 'HS256'

bcrypt_context = CryptContext(schemes=['bcrypt'], deprecated='auto')
oauth2_bearer=OAuth2PasswordBearer(tokenUrl='auth/token')


def generate_id():
    characters = string.ascii_letters + string.digits
    return ''.join(random.choice(characters) for _ in range(6))


class CreateUserRequest(BaseModel):
    user_id: str= Field(default_factory=generate_id)
    fname: str
    lname: str
    number: str
    DOB: str
    email: str
    gender: str
    username: str
    password: str
    status: str
    address: str


class UserOut(BaseModel):
    user_id: str 
    username: str
    fname: str
    lname: str
    number: str
    DOB: str
    email: str
    gender: str
    status: str
    address: str

class Token(BaseModel):
    access_token: str
    token_type: str



def get_db():
    db=SessionLocal()
    try:
        yield db
    finally:
        db.close()

db_dependancy = Annotated[session, Depends(get_db)]

@router.post("/",status_code=status.HTTP_201_CREATED)
async def create_user(db: db_dependancy, 
                      create_user_request: CreateUserRequest):
    create_user_model=User(
        UserID=create_user_request.user_id,
        FirstName=create_user_request.fname,
        LastName=create_user_request.lname,
        PhoneNumber=create_user_request.number,
        DateOfBirth=create_user_request.DOB,
        Email=create_user_request.email,
        Gender=create_user_request.gender,
        Username=create_user_request.username,
        hashed_password=bcrypt_context.hash(create_user_request.password),
        Status=create_user_request.status,
        Address=create_user_request.address,
    )

    db.add(create_user_model)
    db.commit()
@router.post("/token",response_model=Token)
async def login_for_access_token(form_data: Annotated[OAuth2PasswordRequestForm, Depends()],
                                 db: db_dependancy):
    user= authenticate_user(form_data.username, form_data.password,db)
    if not user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                            detail='Could not validate user.')
    token=create_access_token(user.Username,user.UserID,user.FirstName,user.LastName,
                              user.PhoneNumber,user.DateOfBirth,user.Email,user.Gender,
                              user.Status,user.Address,timedelta(minutes=30))

    return {'access_token': token, 'token_type': 'bearer'}

def authenticate_user(username: str, password: str, db):
    user= db.query(User).filter(User.Username==username).first()
    if not user:
        return False
    if not bcrypt_context.verify(password, user.hashed_password):
        return False
    return user

def create_access_token(username: str, user_id: str, fname: str, lname: str,
                        number: str, DOB: str, email: str, gender: str, status: str,
                        address: str, expires_delta: timedelta):
    encode={'sub': username, 'id': user_id, 'fname1': fname,
            'lname1': lname, 'number1': number, 'DOB1': DOB,
            'email1': email, 'gender1': gender, 'status1': status, 'address1': address}
    expires=datetime.now(timezone.utc) + expires_delta
    encode.update({'exp': expires})
    return jwt.encode(encode, SECRET_KEY, algorithm=ALGORITHM)




async def get_current_user(token: Annotated[str, Depends(oauth2_bearer)]):
    try:
        payload= jwt.decode(token,SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get('sub')
        user_id: str = payload.get('id')
        fname: str = payload.get('fname1')
        lname: str = payload.get('lname1')
        number: str = payload.get('number1')
        DOB: str = payload.get('DOB1')
        email: str = payload.get('email1')
        gender: str = payload.get('gender1')
        status: str = payload.get('status1')
        address: str = payload.get('address1')

        if username is None or user_id is None:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                                detail='Could not validate user.')
        return {'username': username, 'user_id':user_id, 'fname': fname,
                'lname': lname, 'number': number, 'DOB': DOB, 'email': email,
                'gender': gender, 'status': status, 'address': address}
    except JWTError:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                            detail='Could not validate user.')
    

@router.get("/", response_model=UserOut)
async def read_current_user(current_user: User = Depends(get_current_user)):
    return current_user




