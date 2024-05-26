from fastapi import FastAPI, HTTPException, Depends, Request, status
from typing import Annotated
from sqlalchemy.orm import Session, aliased
from pydantic import BaseModel, ValidationError,Field
from database import SessionLocal, engine
import models 
from fastapi.middleware.cors import CORSMiddleware
from typing import List, Optional
import auth
from auth import get_current_user
import random
import string
from datetime import datetime
from fastapi.encoders import jsonable_encoder
from passlib.context import CryptContext
from models import User
import logging
import joblib
import numpy as np
import sklearn
from email_utils import send_email
import logging
from io import BytesIO
from fastapi.responses import StreamingResponse,JSONResponse
import base64


app = FastAPI()
model = joblib.load('model.pkl')
app.include_router(auth.router)

models.Base.metadata.create_all(bind=engine)


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
    allow_credentials=True,

)

def generate_id():
    # Generates a random string of 6 alphanumeric characters
    characters = string.ascii_letters + string.digits
    return ''.join(random.choice(characters) for _ in range(6))

def generate_id_DATSCAN():
    characters = string.ascii_letters + string.digits
    return ''.join(random.choice(characters) for _ in range(8))

def generate_id_RECORD():
    characters = string.ascii_letters + string.digits
    return ''.join(random.choice(characters) for _ in range(10))


def generate_id_APPOINTMENT():
    characters = string.ascii_letters + string.digits
    return ''.join(random.choice(characters) for _ in range(12))

def generate_id_SUPPORT():
    characters = string.ascii_letters + string.digits
    return ''.join(random.choice(characters) for _ in range(14))




class InputData(BaseModel):
    input: list




class UserBase(BaseModel):
    UserID: str
    FirstName: str
    LastName: str
    PhoneNumber: str
    DateOfBirth: str
    Email: str
    Gender: str
    Username: str
    hashed_password: str
    Status: str
    Address: str

    
class UserModel(UserBase):
    

    class Config:
        orm_mode = True






class DATSCANBase(BaseModel):
    caudate_R: float
    caudate_L: float
    putamen_R: float
    putamen_L: float
    Datscan_Result :bool
    UserID:str
    
class DATSCANModel(DATSCANBase):
    DATSCANID: str= Field(default_factory=generate_id_DATSCAN)

    class Config:
        orm_mode = True    




class DATSCANUpdateBase(BaseModel):
    caudate_R: float
    caudate_L: float
    putamen_R: float
    putamen_L: float
    Datscan_Result :bool
    
    
class DATSCANUpdateModel(DATSCANUpdateBase):
   

    class Config:
        orm_mode = True  




    


class RBDBase(BaseModel):
    RBDResponse1: str 
    RBDResponse2: str 
    RBDResponse3: str 
    RBDResponse4: str 
    RBDResponse5: str 
    RBDResponse6: str 
    RBDResponse7: str 
    RBDResponse8: str 
    RBDResponse9: str 
    RBDResponse10: str 
    RBDResponse11: str 
    RBDResponse12: str 
    RBDResponse13: str 
    RBDResponse14: str 
    RBDResponse15: str 
    RBDResponse16: str 
    RBDResponse17: str 
    RBDResponse18: str 
    RBDResponse19: str 
    RBDResponse20: str 
    UserID:str

class RBDModel(RBDBase):
    QuestionID: str= Field(default_factory=generate_id_DATSCAN)
    class Config:
        orm_mode = True





class RBDUpdateBase(BaseModel):
    RBDResponse1: str 
    RBDResponse2: str 
    RBDResponse3: str 
    RBDResponse4: str 
    RBDResponse5: str 
    RBDResponse6: str 
    RBDResponse7: str 
    RBDResponse8: str 
    RBDResponse9: str 
    RBDResponse10: str 
    RBDResponse11: str 
    RBDResponse12: str 
    RBDResponse13: str 
    RBDResponse14: str 
    RBDResponse15: str 
    RBDResponse16: str 
    RBDResponse17: str 
    RBDResponse18: str 
    RBDResponse19: str 
    RBDResponse20: str 

class RBDUpdateModel(RBDUpdateBase):
    
    class Config:
        orm_mode = True








class HealthDataBase(BaseModel):
    UPSIT: int
    UserID:str 
    DATSCANID: str
    QuestionID: str
    
class HealthDataModel(HealthDataBase):
    RecordID:str= Field(default_factory=generate_id_RECORD)
    class Config:
        orm_mode = True   



class HealthDataUpdateBase(BaseModel):
    UPSIT: int
    
    
class HealthDataUpdateModel(HealthDataUpdateBase):

    class Config:
        orm_mode = True   


        
        
        
class AppointmentStatusUpdateBase(BaseModel):
    
    AppointmentStatus: Optional[str] = None
    
        

class AppointmentStatusUpdateModel(AppointmentStatusUpdateBase):
    
    class Config:
        orm_mode = True   


class AppointmentDoctorRescheduleUpdateBase(BaseModel):
    
    AppointmentDate: Optional[datetime] = None
    
        

class AppointmentDoctorRescheduleUpdateModel(AppointmentDoctorRescheduleUpdateBase):
    
    class Config:
        orm_mode = True   


class AppointmentRescheduleUpdateBase(BaseModel):
    TypeOfAppointment: str
    AppointmentDate: Optional[datetime] = None  # Default to None as default values are handled by SQLAlchemy
    PaymentMethod: str
    DoctorID: str
   
    AppointmentStatus: Optional[str] = None
    Description: Optional[str] = None
        

class AppointmentRescheduleUpdateModel(AppointmentRescheduleUpdateBase):
    
    class Config:
        orm_mode = True   



        
class AppointmentBase(BaseModel):
    TypeOfAppointment: str
    AppointmentDate: Optional[datetime] = None  # Default to None as default values are handled by SQLAlchemy
    PaymentMethod: str
    DoctorID: str
    PatientID: str
    AppointmentStatus: str
    Description: Optional[str] = None
        

class AppointmentModel(AppointmentBase):
    AppointmentID:str= Field(default_factory=generate_id_APPOINTMENT)
    class Config:
        orm_mode = True   



class PatientBase(BaseModel):
    UserID: str
    DiseaseProgression: str
    
    
class PatientModel(PatientBase):
    UserID: str

    class Config:
        orm_mode = True 



class DoctorBase(BaseModel):
    
    Speciality: str
    LicenseNumber: str
    OfficeLocation: str
    Insurance :str

    
class DoctorModel(DoctorBase):
    UserID: str

    class Config:
        orm_mode = True  




class UserSupportBase(BaseModel):
    
    UserID: str
    SupportType: str
    Status: str
    Description :str

    
class UserSupportModel(UserSupportBase):
    SupportID:str= Field(default_factory=generate_id_SUPPORT)

    class Config:
        orm_mode = True  



class DoctorInfo(BaseModel):
    UserID: str
    FirstName: str
    LastName: str
    Username: str
    Speciality: str
    LicenseNumber: str
    OfficeLocation: str
    Insurance: str
    PhoneNumber: str
    Address: str
    Email: str

    class Config:
        orm_mode = True

class PatientUserInfo(BaseModel):
    user_id: str
    first_name: str
    last_name: str
    username: str
    phone_number: str
    address: str
    gender:str
    status:str
    disease_progression: str
    email: str
    date_of_birth:str

    class Config:
        orm_mode = True


class AppointmentDetailedInfo(BaseModel):
    appointment_id: str
    type_of_appointment: str
    appointment_date: Optional[datetime] = None 
    payment_method: str
    doctor_name: str
    patient_name: str
    appointment_status: str
    description: str
    patient_status:str
    patient_id:str
    doctor_id:str
    patient_age:int
    patient_number:str
    class Config:
        orm_mode = True






class UserUpdate(BaseModel):
    FirstName: Optional[str]
    LastName: Optional[str]
    DateOfBirth: Optional[str]
    PhoneNumber: Optional[str]
    Email: Optional[str]
    Address: Optional[str]
    Gender: Optional[str]

class UserUpdateModel(UserUpdate):
    
    class Config:
        orm_mode = True


class ClinicalRecord(BaseModel):
    UserID: str
    SymptomHistory: Optional[str]
    TreatmentPlan: Optional[str]
    Allergies: Optional[str]
    AbilityToDoTasksWithoutAssistance: Optional[str]
    OtherMedicalConditions: Optional[str]
    InsuranceCompany: Optional[str]
    FamilyMembersWithPD: Optional[str]




class ClinicalRecordModel(ClinicalRecord):
    ClinicalID: str= Field(default_factory=generate_id_RECORD)
    class Config:
      orm_mode = True



class ClinicalRecordUpdate(BaseModel):
    SymptomHistory: Optional[str]
    TreatmentPlan: Optional[str]
    Allergies: Optional[str]
    AbilityToDoTasksWithoutAssistance: Optional[str]
    OtherMedicalConditions: Optional[str]
    InsuranceCompany: Optional[str]
    FamilyMembersWithPD: Optional[str]
    


class ClinicalRecordUpdateModel(ClinicalRecord):
    
    class Config:
      orm_mode = True


class PatientMedications(BaseModel):
    UserID: str
    CurrentMedications: str
    Type: str
    Duration: int
    StartDate: str 
    
class PatientMedicationsModel(PatientMedications):
    MedicineID : str = Field(default_factory=generate_id_RECORD)   
    
    class Config:
      orm_mode = True


class DoctorQualifications(BaseModel):
    UserID: str
    Qualifications: Optional[str]
    About: Optional[str]

class DoctorQualificationsModel(DoctorQualifications):

    class Config:
      orm_mode = True

class DoctorQualificationsUpdate(BaseModel):
    Qualifications: Optional[str]
    About: Optional[str]

class DoctorQualificationsUpdateModel(DoctorQualificationsUpdate):

    class Config:
      orm_mode = True



class CombinedData(BaseModel):
    UserID: str
    caudate_R: float
    caudate_L: float
    putamen_R: float
    putamen_L: float
    Datscan_Result: int
    UPSIT: int
    RBDResponse1: str
    RBDResponse2: str
    RBDResponse3: str
    RBDResponse4: str
    RBDResponse5: str
    RBDResponse6: str
    RBDResponse7: str
    RBDResponse8:str
    RBDResponse9: str
    RBDResponse10: str
    RBDResponse11: str
    RBDResponse12: str
    RBDResponse13: str
    RBDResponse14: str
    RBDResponse15: str
    RBDResponse16: str
    RBDResponse17: str
    RBDResponse18: str
    RBDResponse19: str
    RBDResponse20: str

    class Config:
        orm_mode = True









def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


db_dependency = Annotated[Session, Depends(get_db)]
user_dependancy = Annotated[dict, Depends(get_current_user)]



@app.post('/predict')
def predict(data: InputData):
    try:
        input_array = np.array(data.input).reshape(1, -1)  # Ensure input is a 2D array
        prediction = model.predict(input_array)
        return {'prediction': prediction.tolist()}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))






@app.get("/", status_code=status.HTTP_200_OK)
async def user(user:user_dependancy,db:db_dependency):
    if user is None:
        raise HTTPException(status_code=401, detail="Authentication Failed")
    return {"User": user}



@app.post("/DATSCAN/", response_model=DATSCANModel)
async def create_DATSCAN(DATSCAN: DATSCANBase, db: db_dependency):
    try:
        db_DATSCAN = models.DATSCAN(**DATSCAN.model_dump())
        db.add(db_DATSCAN)
        db.commit()
        db.refresh(db_DATSCAN)
        return db_DATSCAN
    except ValidationError as e:
        raise HTTPException(status_code=400, detail=str(e))




@app.get("/DATSCAN/", response_model=list[DATSCANModel])
async def read_DATSCANs(db:db_dependency, skip: int = 0, limit: int = 100):
    DATSCAN = db.query(models.DATSCAN).offset(skip).limit(limit).all()
    return DATSCAN

@app.post("/RBDQuestionnaire/", response_model=RBDModel, )
async def create_RBD(RBD: RBDBase, db: Session = Depends(get_db)):
    try:
        # Create an instance of the SQLAlchemy model using the Pydantic model dictionary
        db_RBD = models.RBDQuestionnaire(**RBD.model_dump())
        db.add(db_RBD)
        db.commit()
        db.refresh(db_RBD)
        return db_RBD
    except ValidationError as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))
    except Exception as e:
        # To catch any other exceptions that might occur
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))



@app.get("/RBDQuestionnaire/", response_model=list[RBDModel])
async def read_RBDQuestionnaire(db:db_dependency, skip: int = 0, limit: int = 100):
    RBDQuestionnaire = db.query(models.RBDQuestionnaire).offset(skip).limit(limit).all()
    return RBDQuestionnaire




@app.post("/HealthData/", response_model=HealthDataModel)
async def create_db_HealthData(HEALTHDATA: HealthDataBase, db: Session = Depends(get_db),):
    try:
        db_HealthData=models.HealthData(**HEALTHDATA.model_dump())
        db.add(db_HealthData)
        db.commit()
        db.refresh(db_HealthData)
        return db_HealthData
    except ValidationError as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))

@app.get("/HealthData/", response_model=list[HealthDataModel])
async def read_RBDQuestionnaire(db:db_dependency, skip: int = 0, limit: int = 100):
    HealthData = db.query(models.HealthData).offset(skip).limit(limit).all()
    return HealthData


@app.get("/Doctor/", response_model=list[DoctorModel])
async def read_Doctor(db:db_dependency, skip: int = 0, limit: int = 100):
    Doctor = db.query(models.Doctor).offset(skip).limit(limit).all()
    return Doctor



@app.get("/User/", response_model=list[UserModel])
async def read_User(db:db_dependency, skip: int = 0, limit: int = 100):
    User = db.query(models.User).offset(skip).limit(limit).all()
    return User



@app.get("/doctors", response_model=list[DoctorInfo])
def read_doctors(db: Session = Depends(get_db)):
    # Perform an SQL join to gather details from both tables
    result = db.query(models.User, models.Doctor).join(models.Doctor, models.User.UserID == models.Doctor.UserID).all()
    return [
        {
            "UserID": user.UserID,
            "FirstName": user.FirstName,
            "LastName": user.LastName,
            "Username": user.Username,
            "Speciality": doctor.Speciality,
            "LicenseNumber": doctor.LicenseNumber,
            "OfficeLocation": doctor.OfficeLocation,
            "Insurance": doctor.Insurance,
            "PhoneNumber": user.PhoneNumber,
            "Address": user.Address,
            "Email" : user.Email,
        } for user, doctor in result
    ]


@app.post("/Appointment/", response_model=AppointmentModel)
async def create_db_Appointment(APPOINTMENT: AppointmentBase, db: Session = Depends(get_db),):
    try:
        db_Appointment=models.Appointment(**APPOINTMENT.model_dump())
        db.add(db_Appointment)
        db.commit()
        db.refresh(db_Appointment)
        return db_Appointment
    except ValidationError as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))
    except Exception as e:
        # To catch any other exceptions that might occur
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))

@app.get("/Appointment/", response_model=list[AppointmentModel])
async def read_Appointment(db:db_dependency, skip: int = 0, limit: int = 100):
    Appointment = db.query(models.Appointment).offset(skip).limit(limit).all()
    return Appointment



@app.post("/Patient/", response_model=PatientModel)
async def create_db_Patient(PATIENT: PatientBase, db: Session = Depends(get_db),):
    try:
        db_Patient=models.Patient(**PATIENT.model_dump())
        db.add(db_Patient)
        db.commit()
        db.refresh(db_Patient)
        return db_Patient
    except ValidationError as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))
    except Exception as e:
        # To catch any other exceptions that might occur
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))
    

@app.get("/Patient/", response_model=list[PatientModel])
async def read_Patient(db:db_dependency, skip: int = 0, limit: int = 100):
    Patient = db.query(models.Patient).offset(skip).limit(limit).all()
    return Patient


@app.get("/patients", response_model=list[PatientUserInfo])
def read_patients(db: Session = Depends(get_db)):
    # Perform an SQL join to gather details from both tables
    result = db.query(models.User, models.Patient).join(models.Patient, models.User.UserID == models.Patient.UserID).all()
    return [
        {
                "user_id": user.UserID,
                "first_name": user.FirstName,
                "last_name": user.LastName,
                "username": user.Username,
                "phone_number": user.PhoneNumber,
                "address": user.Address,
                "status": user.Status,
                "date_of_birth": user.DateOfBirth,
                "gender": user.Gender,
                "email": user.Email,
                "disease_progression": patient.DiseaseProgression
            } for user, patient in result
    ]


def calculate_age(birthdate):
    birthdate = datetime.strptime(birthdate, "%Y-%m-%d")
    today = datetime.today()
    age = today.year - birthdate.year - ((today.month, today.day) < (birthdate.month, birthdate.day))
    return age


@app.get("/appointments/detailed", response_model=list[AppointmentDetailedInfo])
def read_detailed_appointments(db: Session = Depends(get_db)):
      doctor_user = aliased(models.User, name="doctor_user")
      patient_user = aliased(models.User, name="patient_user")
      result = db.query(
        models.Appointment,
        doctor_user,
        patient_user
         ).join(
        models.Doctor, models.Appointment.DoctorID == models.Doctor.UserID
        ).join(
        doctor_user, models.Doctor.UserID == doctor_user.UserID
        ).join(
        models.Patient, models.Appointment.PatientID == models.Patient.UserID
        ).join(
        patient_user, models.Patient.UserID == patient_user.UserID
        ).all()
      detailed_appointments = [
        {
            "appointment_id": appointment.AppointmentID,
            "type_of_appointment": appointment.TypeOfAppointment,
            "appointment_date": appointment.AppointmentDate.strftime('%Y-%m-%d %H:%M:%S'),
            "payment_method": appointment.PaymentMethod,
            "patient_id": patient_user.UserID,
            "doctor_id": doctor_user.UserID,
            "doctor_name": f"{doctor_user.FirstName} {doctor_user.LastName}",
            "patient_name": f"{patient_user.FirstName} {patient_user.LastName}",
            "appointment_status": appointment.AppointmentStatus,
            "description": appointment.Description,
            "patient_status": patient_user.Status,
            "patient_age": calculate_age(patient_user.DateOfBirth),
            "patient_number": patient_user.PhoneNumber,
        } for appointment, doctor_user, patient_user in result
    ]
      return detailed_appointments






@app.patch("/Appointment/{appointment_id}", response_model=AppointmentStatusUpdateModel)
async def update_appointment(appointment_id: str, update_data: AppointmentStatusUpdateBase, db: Session = Depends(get_db)):
    db_appointment = db.query(models.Appointment).filter(models.Appointment.AppointmentID == appointment_id).first()
    if not db_appointment:
        raise HTTPException(status_code=404, detail="Appointment not found")

    update_data_dict = update_data.model_dump(exclude_unset=True)
    
    for key, value in update_data_dict.items():
        if value is not None:  # Skip empty string values
            setattr(db_appointment, key, value)

    db.add(db_appointment)
    db.commit()
    db.refresh(db_appointment)
    return db_appointment





@app.patch("/AppointmentReschedule/{appointment_id}", response_model=AppointmentRescheduleUpdateModel)
async def update_appointment(appointment_id: str, update_data: AppointmentRescheduleUpdateBase, db: Session = Depends(get_db)):
    db_appointment = db.query(models.Appointment).filter(models.Appointment.AppointmentID == appointment_id).first()
    if not db_appointment:
        raise HTTPException(status_code=404, detail="Appointment not found")

    update_data_dict = update_data.model_dump(exclude_unset=True)
    
    for key, value in update_data_dict.items():
        if value is not None:  # Skip empty string values
            setattr(db_appointment, key, value)

    db.add(db_appointment)
    db.commit()
    db.refresh(db_appointment)
    return db_appointment



@app.patch("/AppointmentDoctorReschedule/{appointment_id}", response_model=AppointmentDoctorRescheduleUpdateModel)
async def update_appointment(appointment_id: str, update_data: AppointmentDoctorRescheduleUpdateBase, db: Session = Depends(get_db)):
    db_appointment = db.query(models.Appointment).filter(models.Appointment.AppointmentID == appointment_id).first()
    if not db_appointment:
        raise HTTPException(status_code=404, detail="Appointment not found")

    update_data_dict = update_data.model_dump(exclude_unset=True)
    
    for key, value in update_data_dict.items():
        if value is not None:  # Skip empty string values
            setattr(db_appointment, key, value)

    db.add(db_appointment)
    db.commit()
    db.refresh(db_appointment)
    return db_appointment





@app.patch("/DATSCANUpdate/{user_id}", response_model=DATSCANUpdateModel)
async def update_datscan(user_id: str, update_data: DATSCANUpdateBase, db: Session = Depends(get_db)):
    db_datscan = db.query(models.DATSCAN).filter(models.DATSCAN.UserID == user_id).first()
    if not db_datscan:
        raise HTTPException(status_code=404, detail="DatScan not found")

    update_data_dict = update_data.model_dump(exclude_unset=True)
    
    for key, value in update_data_dict.items():
        if value is not None:  # Skip empty string values
            setattr(db_datscan, key, value)

    db.add(db_datscan)
    db.commit()
    db.refresh(db_datscan)
    return db_datscan




@app.patch("/RBDUpdate/{user_id}", response_model=RBDUpdateModel)
async def update_rbd(user_id: str, update_data: RBDUpdateBase, db: Session = Depends(get_db)):
    db_rbd = db.query(models.RBDQuestionnaire).filter(models.RBDQuestionnaire.UserID == user_id).first()
    if not db_rbd:
        raise HTTPException(status_code=404, detail="RBD not found")

    update_data_dict = update_data.model_dump(exclude_unset=True)
    
    for key, value in update_data_dict.items():
        if value is not None:  # Skip empty string values
            setattr(db_rbd, key, value)

    db.add(db_rbd)
    db.commit()
    db.refresh(db_rbd)
    return db_rbd



@app.patch("/HealthDataUpdate/{user_id}", response_model=HealthDataUpdateModel)
async def update_healthdata(user_id: str, update_data: HealthDataUpdateBase, db: Session = Depends(get_db)):
    db_healthdata = db.query(models.HealthData).filter(models.HealthData.UserID == user_id).first()
    if not db_healthdata:
        raise HTTPException(status_code=404, detail="HealthData not found")

    update_data_dict = update_data.model_dump(exclude_unset=True)
    
    for key, value in update_data_dict.items():
        if value is not None:  # Skip empty string values
            setattr(db_healthdata, key, value)

    db.add(db_healthdata)
    db.commit()
    db.refresh(db_healthdata)
    return db_healthdata



@app.post("/UserSupport/", response_model=UserSupportModel)
async def create_db_support(SUPPORT: UserSupportBase, db: Session = Depends(get_db),):
    try:
        db_Support=models.UserSupport(**SUPPORT.model_dump())
        db.add(db_Support)
        db.commit()
        db.refresh(db_Support)
        return db_Support
    except ValidationError as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))
    except Exception as e:
        # To catch any other exceptions that might occur
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))
    

@app.get("/UserSupport/", response_model=list[UserSupportModel])
async def read_support(db:db_dependency, skip: int = 0, limit: int = 100):
    Support = db.query(models.UserSupport).offset(skip).limit(limit).all()
    return Support




@app.patch("/user/{user_id}", response_model=UserUpdateModel)
async def update_user(user_id: str, user_update: UserUpdate, db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.UserID == user_id).first()
    if user is None:
        raise HTTPException(status_code=404, detail="User not found")

    update_data = user_update.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        setattr(user, key, value)

    db.commit()
    db.refresh(user)

    return user


@app.post("/ClinicalRecord/", response_model=ClinicalRecordModel)
async def create_clinical_record(record: ClinicalRecord, db: Session = Depends(get_db)):
    db_record = models.ClinicalRecord(**record.model_dump())
    db.add(db_record)
    db.commit()
    db.refresh(db_record)
    return db_record

@app.get("/ClinicalRecord/", response_model=list[ClinicalRecordModel])
async def read_Patient(db:db_dependency, skip: int = 0, limit: int = 100):
    Clinical = db.query(models.ClinicalRecord).offset(skip).limit(limit).all()
    return Clinical



@app.patch("/clinical_record/{user_id}", response_model=ClinicalRecordUpdateModel)
async def update_clinical_record(user_id: str, record_update: ClinicalRecordUpdate, db: Session = Depends(get_db)):
    db_record = db.query(models.ClinicalRecord).filter(models.ClinicalRecord.UserID == user_id).first()
    if db_record is None:
        raise HTTPException(status_code=404, detail="Clinical record not found")

    update_data = record_update.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        setattr(db_record, key, value)

    db.commit()
    db.refresh(db_record)
    return db_record


@app.post("/PatientMedications/", response_model=PatientMedicationsModel)
async def create_medication(medication: PatientMedications, db: Session = Depends(get_db)):
    db_medication = models.PatientMedications(**medication.model_dump())
    db.add(db_medication)
    db.commit()
    db.refresh(db_medication)
    return db_medication

@app.get("/PatientMedications/", response_model=list[PatientMedicationsModel])
async def read_Patient(db:db_dependency, skip: int = 0, limit: int = 100):
    PM= db.query(models.PatientMedications).offset(skip).limit(limit).all()
    return PM




pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


@app.patch("/reset-password")
async def reset_password(request: Request, db: Session = Depends(get_db), current_user: dict = Depends(get_current_user)):
    try:
        data = await request.json()
        new_password = data.get("password")
        
        if not new_password or len(new_password) < 8:
            raise HTTPException(status_code=400, detail="Password must be at least 8 characters long")

        user = db.query(models.User).filter(models.User.UserID == current_user['user_id']).first()
        if not user:
            raise HTTPException(status_code=404, detail="User not found")

        user.hashed_password = pwd_context.hash(new_password)  # Hash the password
        db.commit()
        return {"message": "Password has been reset successfully"}
    except Exception as e:
        logger.error(f"Error resetting password: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")


@app.get("/DoctorQualifications/", response_model=list[DoctorQualificationsModel])
async def read_DoctorQualifications(db:db_dependency, skip: int = 0, limit: int = 100):
    Doctor_Qualifications = db.query(models.DoctorQualifications).offset(skip).limit(limit).all()
    return Doctor_Qualifications

@app.post("/DoctorQualifications/", response_model=DoctorQualificationsModel)
async def create_medication(qualification: DoctorQualifications, db: Session = Depends(get_db)):
    db_Doctor_Qualifications = models.DoctorQualifications(**qualification.model_dump())
    db.add(db_Doctor_Qualifications)
    db.commit()
    db.refresh(db_Doctor_Qualifications)
    return db_Doctor_Qualifications

@app.patch("/DoctorQualifications/{user_id}", response_model=DoctorQualificationsUpdateModel)
async def update_doctor_qualification(user_id: str, qualification: DoctorQualificationsUpdate, db: Session = Depends(get_db)):
    db_qualification = db.query(models.DoctorQualifications).filter(models.DoctorQualifications.UserID == user_id).first()
    if db_qualification is None:
        raise HTTPException(status_code=404, detail="Doctor qualification not found")

    for key, value in qualification.model_dump().items():
        setattr(db_qualification, key, value)

    db.commit()
    db.refresh(db_qualification)
    return db_qualification





@app.get("/combined-data/", response_model=CombinedData)
def get_combined_data(user_id: str, db: Session = Depends(get_db)):
    # Aliases for clarity
    datscan_alias = aliased(models.DATSCAN, name='datscan')
    healthdata_alias = aliased(models.HealthData, name='healthdata')
    rbd_alias = aliased(models.RBDQuestionnaire, name='rbd')
    
    result = db.query(
        datscan_alias, 
        healthdata_alias, 
        rbd_alias
    ).outerjoin(
        healthdata_alias, datscan_alias.UserID == healthdata_alias.UserID
    ).outerjoin(
        rbd_alias, datscan_alias.UserID == rbd_alias.UserID
    ).filter(
        datscan_alias.UserID == user_id
    ).first()
    
    if not result or not result[0] or not result[1] or not result[2]:
        raise HTTPException(status_code=404, detail="Data not found for user")
    
    datscan_data, health_data, rbd_data = result
    
    combined_data = CombinedData(
        UserID=user_id,
        caudate_R=datscan_data.caudate_R,
        caudate_L=datscan_data.caudate_L,
        putamen_R=datscan_data.putamen_R,
        putamen_L=datscan_data.putamen_L,
        Datscan_Result=datscan_data.Datscan_Result,
        UPSIT=health_data.UPSIT,
        RBDResponse1= rbd_data.RBDResponse1,
        RBDResponse2= rbd_data.RBDResponse2,
        RBDResponse3= rbd_data.RBDResponse3,
        RBDResponse4= rbd_data.RBDResponse4,
        RBDResponse5= rbd_data.RBDResponse5,
        RBDResponse6= rbd_data.RBDResponse6,
        RBDResponse7= rbd_data.RBDResponse7,
        RBDResponse8= rbd_data.RBDResponse8,
        RBDResponse9= rbd_data.RBDResponse9,
        RBDResponse10= rbd_data.RBDResponse10,
        RBDResponse11= rbd_data.RBDResponse11,
        RBDResponse12= rbd_data.RBDResponse12,
        RBDResponse13= rbd_data.RBDResponse13,
        RBDResponse14= rbd_data.RBDResponse14,
        RBDResponse15= rbd_data.RBDResponse15,
        RBDResponse16= rbd_data.RBDResponse16,
        RBDResponse17= rbd_data.RBDResponse17,
        RBDResponse18= rbd_data.RBDResponse18,
        RBDResponse19= rbd_data.RBDResponse19,
        RBDResponse20= rbd_data.RBDResponse20,
        
    )
    
    return combined_data
class InputData(BaseModel):
    PATNO: int
    ENROLL_AGE: float
    AV133STDY: float
    TAUSTDY: float
    GAITSTDY: float
    PISTDY: float
    SVASTDY: float
    PPMI_ONLINE_ENROLL: float
    PHENOCNV: float
    ENRLPINKI: float
    ENRLPRKN: float
    ENRLSRDC: float
    ENRLHPSM: float
    ENRURED: float
    ENRLURRK2: float
    ENRLENCA: float
    ENRLGBA: float
    TOTAL_CORRECT: float
    PTCGBOTH: float
    DRMVIVID: float
    DRMAGRAC: float
    DRMNOCTB: float
    SLPLMBMV: float
    SLPINJUR: float
    DRMVERBL: float
    DRMFIGHT: float
    DRMUMV: float
    DRMOBJFL: float
    MVAWAKEN: float
    DRMREMEM: float
    SLPDSTRB: float
    STROKE: float
    HETRA: float
    PARKISM: float
    RLS: float
    NARCLPSY: float
    DEPRS: float
    EPILEPSY: float
    BRNINFM: float
    DATSCAN: float
    DATSCANTRC: float
    SCNLOC: float
    SCNINJCT: float
    DATSCAN_CAUDATE_R: float
    DATSCAN_CAUDATE_L: float
    DATSCAN_PUTAMEN_R: float
    DATSCAN_PUTAMEN_L: float
    DATSCAN_PUTAMEN_R_ANT: float
    DATSCAN_PUTAMEN_L_ANT: float
    DATSCAN_VISINTRP: float





@app.post('/predict')
def predict(data: InputData):
    input_data = [
        data.PATNO,
        data.ENROLL_AGE,
        data.AV133STDY,
        data.TAUSTDY,
        data.GAITSTDY,
        data.PISTDY,
        data.SVASTDY,
        data.PPMI_ONLINE_ENROLL,
        data.PHENOCNV,
        data.ENRLPINKI,
        data.ENRLPRKN,
        data.ENRLSRDC,
        data.ENRLHPSM,
        data.ENRURED,
        data.ENRLURRK2,
        data.ENRLENCA,
        data.ENRLGBA,
        data.TOTAL_CORRECT,
        data.PTCGBOTH,
        data.DRMVIVID,
        data.DRMAGRAC,
        data.DRMNOCTB,
        data.SLPLMBMV,
        data.SLPINJUR,
        data.DRMVERBL,
        data.DRMFIGHT,
        data.DRMUMV,
        data.DRMOBJFL,
        data.MVAWAKEN,
        data.DRMREMEM,
        data.SLPDSTRB,
        data.STROKE,
        data.HETRA,
        data.PARKISM,
        data.RLS,
        data.NARCLPSY,
        data.DEPRS,
        data.EPILEPSY,
        data.BRNINFM,
        data.DATSCAN,
        data.DATSCANTRC,
        data.SCNLOC,
        data.SCNINJCT,
        data.DATSCAN_CAUDATE_R,
        data.DATSCAN_CAUDATE_L,
        data.DATSCAN_PUTAMEN_R,
        data.DATSCAN_PUTAMEN_L,
        data.DATSCAN_PUTAMEN_R_ANT,
        data.DATSCAN_PUTAMEN_L_ANT,
        data.DATSCAN_VISINTRP
    ]

    try:
        input_array = np.array(input_data).reshape(1, -1)
        prediction = model.predict(input_array)
        return {'prediction': prediction.tolist()}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


def generate_strong_password(length=12):
    characters = string.ascii_letters + string.digits + string.punctuation
    password = ''.join(random.choice(characters) for i in range(length))
    return password


class ResetPasswordRequest(BaseModel):
    email: str




pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

@app.post("/reset-password/")
async def reset_password(request: ResetPasswordRequest, db: Session = Depends(get_db)):
    try:
        user = db.query(User).filter(User.Email == request.email).first()
        if not user:
            raise HTTPException(status_code=404, detail="User not found")
        
        new_password = generate_strong_password()
        user.hashed_password = pwd_context.hash(new_password)
        db.commit()

        subject = "Password Reset Request"
        body = f"Your new temporary password is: {new_password}\n\nPlease log in and change your password immediately.\n\nYou can your password after logging in by selecting on view profile on the sidebar on the left then click on Reset Password Tab then you can change your password."

        send_email(request.email, subject, body)
        
        return {"message": "A new temporary password has been sent to your email."}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))