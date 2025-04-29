# Import necessary SQLAlchemy modules
from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey
from sqlalchemy.orm import relationship, declarative_base

# Create a base class for all models
Base = declarative_base()

# User Model 
class User(Base):
    __tablename__ = "users"  # Table name in the database

    # Columns
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    username = Column(String, unique=True, index=True)
    password = Column(String)
    birthday = Column(DateTime)
    gender = Column(String)

    # Define relationships to other tables
    weights = relationship("Weight", back_populates="user")
    heights = relationship("Height", back_populates="user")
    body_compositions = relationship("BodyComposition", back_populates="user")
    water_consumptions = relationship("WaterConsumption", back_populates="user")
    daily_steps = relationship("DailySteps", back_populates="user")
    exercises = relationship("Exercise", back_populates="user")
    body_fat_percentages = relationship("BodyFatPercentage", back_populates="user")

# Weight Model 
class Weight(Base):
    __tablename__ = "weights"

    # Composite Primary Key: date + user_id
    date = Column(DateTime, primary_key=True)
    user_id = Column(Integer, ForeignKey("users.id"), primary_key=True)
    weight = Column(Float)  # Weight value

    # Relationship back to user
    user = relationship("User", back_populates="weights")

# Height Model 
class Height(Base):
    __tablename__ = "heights"

    date = Column(DateTime, primary_key=True)
    user_id = Column(Integer, ForeignKey("users.id"), primary_key=True)
    height = Column(Float)  # Height value

    user = relationship("User", back_populates="heights")

# Body Composition Model 
class BodyComposition(Base):
    __tablename__ = "body_compositions"

    date = Column(DateTime, primary_key=True)
    user_id = Column(Integer, ForeignKey("users.id"), primary_key=True)
    fat = Column(Float)    # Fat mass (kg or %)
    muscle = Column(Float) # Muscle mass (kg or %)
    water = Column(Float)  # Water percentage or volume

    user = relationship("User", back_populates="body_compositions")

# Water Consumption Model 
class WaterConsumption(Base):
    __tablename__ = "water_consumptions"

    date = Column(DateTime, primary_key=True)
    user_id = Column(Integer, ForeignKey("users.id"), primary_key=True)
    water_amount = Column(Integer)  # Number of glasses consumed (each 250 ml)

    user = relationship("User", back_populates="water_consumptions")

# Daily Steps Model 
class DailySteps(Base):
    __tablename__ = "daily_steps"

    date = Column(DateTime, primary_key=True)
    user_id = Column(Integer, ForeignKey("users.id"), primary_key=True)
    steps_amount = Column(Integer)  # Number of steps taken that day

    user = relationship("User", back_populates="daily_steps")

# Exercise Model 
class Exercise(Base):
    __tablename__ = "exercises"

    date = Column(DateTime, primary_key=True)
    user_id = Column(Integer, ForeignKey("users.id"), primary_key=True)
    exercise_name = Column(String)  # Name of the exercise
    duration = Column(Integer)      # Duration in minutes

    user = relationship("User", back_populates="exercises")

# Body Fat Percentage Model 
class BodyFatPercentage(Base):
    __tablename__ = "body_fat_percentages"

    date = Column(DateTime, primary_key=True)
    user_id = Column(Integer, ForeignKey("users.id"), primary_key=True)
    fat_percentage = Column(Float)  # Body fat percentage

    user = relationship("User", back_populates="body_fat_percentages")
