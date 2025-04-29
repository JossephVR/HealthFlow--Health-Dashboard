# Import necessary modules
from pydantic import BaseModel, EmailStr, Field
from datetime import datetime
from typing import List, Optional
import re

# Custom Validators 

# Validate gender input: must be either "Masculino" or "Femenino"
def validate_gender(v: str) -> str:
    if v not in ['Masculino', 'Femenino']:
        raise ValueError('Género debe ser Masculino o Femenino')
    return v

# Validate password: at least 10 characters, includes letters, numbers, and symbols
def validate_password(v: str) -> str:
    if not re.match(r'^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{10,}$', v):
        raise ValueError('La contraseña debe tener al menos 10 caracteres, letras, números y símbolos')
    return v

# User Schemas

# Base schema for user information (shared by Create and Update)
class UserBase(BaseModel):
    email: EmailStr
    username: str
    birthday: datetime
    gender: str = Field(..., validate_default=validate_gender)

# Schema for creating a new user (requires password, weight, and height)
class UserCreate(UserBase):
    password: str = Field(..., validate_default=validate_password)
    current_weight: float
    current_height: float

# Schema for updating a user
class UserUpdate(UserBase):
    new_password: Optional[str] = None    # Optional: new password (if changing it)
    current_password: Optional[str] = None # Optional: needed to confirm old password if changing

# Schema for user login
class UserLogin(BaseModel):
    username: str
    password: str

# Schema for returning user info (with user ID)
class User(UserBase):
    id: int

    class Config:
        from_attributes = True  # Allow model conversion from ORM objects

# Health Metrics Schemas 

# Base schema for weight records
class WeightBase(BaseModel):
    date: datetime
    weight: float

# Base schema for height records
class HeightBase(BaseModel):
    date: datetime
    height: float

# Base schema for body composition records
class BodyCompositionBase(BaseModel):
    date: datetime
    fat: float
    muscle: float
    water: float

# Base schema for water consumption records
class WaterConsumptionBase(BaseModel):
    date: datetime
    water_amount: int  # Number of glasses

# Base schema for daily steps records
class DailyStepsBase(BaseModel):
    date: datetime
    steps_amount: int

# Base schema for exercise records
class ExerciseBase(BaseModel):
    date: datetime
    exercise_name: str
    duration: int  # Exercise duration in minutes

# Base schema for body fat percentage records
class BodyFatPercentageBase(BaseModel):
    date: datetime
    fat_percentage: float

# Special Use Schemas 

# Schema for importing bulk data (for example, loading from a file)
class ImportData(BaseModel):
    import_type: str    # Type of data being imported (e.g., "weights", "steps")
    data: List[dict]    # List of records as dictionaries

# Schema for responding with user's current statistics (dashboard)
class CurrentStats(BaseModel):
    weight: Optional[float] = None
    height: Optional[float] = None
    bmi: Optional[float] = None
    body_composition: Optional[dict] = None
    fat_percentage: Optional[float] = None
    water_consumed: int = 0
    steps: int = 0
    exercises: List[dict] = []  # List of exercises performed

# Schema for representing a single historical data point
class HistoricalData(BaseModel):
    date: datetime
    value: float

# Schema for representing historical exercise data
class ExerciseHistory(BaseModel):
    date: datetime
    exercises: int   # Number of exercises
    duration: int    # Total exercise duration
