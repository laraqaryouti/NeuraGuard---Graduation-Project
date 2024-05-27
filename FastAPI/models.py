from database import Base
from sqlalchemy import Column, Integer, String, Boolean, Float,UniqueConstraint, CheckConstraint,ForeignKey,DateTime
import datetime as _dt
import sqlalchemy.orm as _orm
import passlib.hash as _hash 
import database as database
from sqlalchemy.orm import relationship
import uuid
import string
import random
from sqlalchemy.sql import func


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




class User(Base):
    __tablename__ = 'User'

    UserID = Column(String(6), primary_key=True, default=generate_id)
    FirstName = Column(String, nullable=False)
    LastName = Column(String, nullable=False)
    PhoneNumber = Column(String, nullable=False, unique=True)
    DateOfBirth = Column(String, nullable=False, default='MM-DD-YYYY')
    Email = Column(String, nullable=False, unique=True)
    Gender = Column(String, nullable=False)
    Username = Column(String, nullable=False, unique=True)
    hashed_password = Column(String, nullable=False)
    Status = Column(String)
    Address = Column(String)

    healthdata = relationship("HealthData", back_populates="user")
    datscan = relationship("DATSCAN", back_populates="user", uselist=False)
    doctor = relationship("Doctor", back_populates="user", uselist=False)
    patient = relationship("Patient", back_populates="user", uselist=False)
    rbd_responses = relationship("RBDQuestionnaire", back_populates="user")
    support = relationship("UserSupport", back_populates="user", uselist=False)
    
    
    

class DATSCAN(Base):
    __tablename__ = 'DATSCAN'

    DATSCANID = Column(String(8), primary_key=True,default=generate_id_DATSCAN)
    DATSCANDate = Column(String, default='DD-MM-YYYY')
    caudate_L = Column(Float, nullable=False)
    caudate_R = Column(Float, nullable=False)
    putamen_L = Column(Float, nullable=False)
    putamen_R = Column(Float, nullable=False)
    putamen_L_ant = Column(Float, nullable=False)
    putamen_R_ant = Column(Float, nullable=False)
    Datscan_Result = Column(Integer, CheckConstraint("Datscan_Result IN (0, 1)"), nullable=False)
    UserID=Column(String(6),ForeignKey('User.UserID'),nullable=False)


    user = relationship("User", back_populates="datscan")
    healthdata = relationship("HealthData", back_populates="datscan")
    

class HealthData(Base):
    __tablename__ = 'HealthData'

    RecordID = Column(String(10), primary_key=True, default=generate_id_RECORD)
    UPSIT = Column(Integer, nullable=False)
    UserID = Column(String(6), ForeignKey('User.UserID'), nullable=False)
    DATSCANID = Column(String(8), ForeignKey('DATSCAN.DATSCANID'), nullable=False)
    QuestionID=Column(String(10),ForeignKey('RBDQuestionnaire.QuestionID'))
    
    
    
    user = relationship("User", back_populates="healthdata")
    datscan = relationship("DATSCAN", back_populates="healthdata")
    rbd = relationship("RBDQuestionnaire",back_populates="healthdata")

class RBDQuestionnaire(Base):
    __tablename__ = 'RBDQuestionnaire'

    QuestionID = Column(String(10), primary_key=True,default=generate_id)
    RBDResponse1 = Column(String, CheckConstraint("RBDResponse1 IN ('Yes', 'No')"), nullable=False)
    RBDResponse2 = Column(String, CheckConstraint("RBDResponse2 IN ('Yes', 'No')"), nullable=False)
    RBDResponse3 = Column(String, CheckConstraint("RBDResponse3 IN ('Yes', 'No')"), nullable=False)
    RBDResponse4 = Column(String, CheckConstraint("RBDResponse4 IN ('Yes', 'No')"), nullable=False)
    RBDResponse5 = Column(String, CheckConstraint("RBDResponse5 IN ('Yes', 'No')"), nullable=False)
    RBDResponse6 = Column(String, CheckConstraint("RBDResponse6 IN ('Yes', 'No')"), nullable=False)
    RBDResponse7 = Column(String, CheckConstraint("RBDResponse7 IN ('Yes', 'No')"), nullable=False)
    RBDResponse8 = Column(String, CheckConstraint("RBDResponse8 IN ('Yes', 'No')"), nullable=False)
    RBDResponse9 = Column(String, CheckConstraint("RBDResponse9 IN ('Yes', 'No')"), nullable=False)
    RBDResponse10 = Column(String, CheckConstraint("RBDResponse10 IN ('Yes', 'No')"), nullable=False)
    RBDResponse11 = Column(String, CheckConstraint("RBDResponse11 IN ('Yes', 'No')"), nullable=False)
    RBDResponse12 = Column(String, CheckConstraint("RBDResponse12 IN ('Yes', 'No')"), nullable=False)
    RBDResponse13 = Column(String, CheckConstraint("RBDResponse13 IN ('Yes', 'No')"), nullable=False)
    RBDResponse14 = Column(String, CheckConstraint("RBDResponse14 IN ('Yes', 'No')"), nullable=False)
    RBDResponse15 = Column(String, CheckConstraint("RBDResponse15 IN ('Yes', 'No')"), nullable=False)
    RBDResponse16 = Column(String, CheckConstraint("RBDResponse16 IN ('Yes', 'No')"), nullable=False)
    RBDResponse17 = Column(String, CheckConstraint("RBDResponse17 IN ('Yes', 'No')"), nullable=False)
    RBDResponse18 = Column(String, CheckConstraint("RBDResponse18 IN ('Yes', 'No')"), nullable=False)
    RBDResponse19 = Column(String, CheckConstraint("RBDResponse19 IN ('Yes', 'No')"), nullable=False)
    RBDResponse20 = Column(String, CheckConstraint("RBDResponse20 IN ('Yes', 'No')"), nullable=False)
    UserID = Column(String(6), ForeignKey('User.UserID'), nullable=False)
    
    healthdata = relationship("HealthData",back_populates="rbd")
    # user=relationship("User",back_populates="rbd")
    user = relationship("User", back_populates="rbd_responses")


class Appointment(Base):
    __tablename__ = 'Appointment'
    
    AppointmentID = Column(String(12), primary_key=True, default=generate_id_APPOINTMENT)
    TypeOfAppointment = Column(String, nullable=False)
    AppointmentDate = Column(DateTime(timezone=True), nullable=False, default=func.now())  
    PaymentMethod = Column(String, nullable=False)
    DoctorID = Column(String(6), ForeignKey('Doctor.UserID'), nullable=False)
    PatientID = Column(String, ForeignKey('Patient.UserID'), nullable=False)
    AppointmentStatus = Column(String, nullable=False)
    Description = Column(String)
    
    doctor = relationship("Doctor", back_populates="appointments")
    patient = relationship("Patient", back_populates="appointments")
    

class Doctor(Base):
    __tablename__ = 'Doctor'
    
    UserID=Column(String(6),ForeignKey('User.UserID'),primary_key=True,nullable=False)
    Speciality = Column(String, nullable=False)
    LicenseNumber = Column(String, nullable=False, unique=True)
    OfficeLocation = Column(String, nullable=False)
    Insurance = Column(String, nullable=False)

    user = relationship("User", back_populates="doctor")
    appointments = relationship("Appointment", back_populates="doctor")


    
class Patient(Base):
    __tablename__ = 'Patient'
    
    UserID = Column(String,ForeignKey('User.UserID') ,primary_key=True, nullable=False)
    DiseaseProgression = Column(String)

    user = relationship("User", back_populates="patient")
    appointments = relationship("Appointment", back_populates="patient")
    clinical_record= relationship("ClinicalRecord",back_populates="patient")
    patient_medication = relationship("PatientMedications",back_populates="patient")


class UserSupport(Base):
    __tablename__ = 'UserSupport'
    
    SupportID = Column(String(14), primary_key=True, default=generate_id_SUPPORT)
    SupportType = Column(String, nullable=False)
    Status = Column(String, nullable=False, unique=True)
    Description = Column(String)
    UserID = Column(String,ForeignKey('User.UserID') ,primary_key=True, nullable=False)

    user = relationship("User", back_populates="support")
    



class ClinicalRecord(Base):
    __tablename__ = 'ClinicalRecord'
    
    ClinicalID = Column(String(10), primary_key=True,default=generate_id_RECORD)
    UserID = Column(String(6), ForeignKey('Patient.UserID'), nullable=False)
    SymptomHistory = Column(String, nullable=True)
    TreatmentPlan = Column(String, nullable=True)
    Allergies = Column(String, nullable=True)
    AbilityToDoTasksWithoutAssistance = Column(String,CheckConstraint("AbilityToDoTasksWithoutAssistance IN ('Yes', 'No')") ,nullable=True)
    OtherMedicalConditions = Column(String, nullable=True)
    InsuranceCompany = Column(String, nullable=True)
    FamilyMembersWithPD = Column(String,CheckConstraint("FamilyMembersWithPD IN ('Yes', 'No')") ,nullable=True)
    
    patient = relationship("Patient",back_populates="clinical_record")
    
class PatientMedications(Base):
    __tablename__ = 'PatientMedications'
    
    MedicineID = Column(String(10), primary_key=True,default=generate_id_RECORD)
    UserID = Column(String, ForeignKey('Patient.UserID'))
    CurrentMedications = Column(String, nullable=False)
    Type = Column(String, nullable=False)
    Duration = Column(Integer, nullable=False)
    StartDate = Column(String, nullable=False, default='DD-MM-YYYY')    
    
    patient = relationship("Patient",back_populates="patient_medication")
    



class DoctorQualifications(Base):
    __tablename__ = 'DoctorQualifications'

    UserID = Column(String, ForeignKey('Doctor.UserID'), primary_key=True)
    Qualifications = Column(String)  
    About = Column(String)