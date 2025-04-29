from fastapi import FastAPI, Depends, HTTPException, status
from sqlalchemy.orm import Session
from datetime import datetime, timedelta
from . import crud, schemas  # Import database operations and request/response models
from .models import Base
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from . import app  # Assuming `app` is initialized in another file


# Database configuration
SQLALCHEMY_DATABASE_URL = "sqlite:///./health_tracker.db"
engine = create_engine(
    SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False}
)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Create all database tables
Base.metadata.create_all(bind=engine)


# Dependency: database session
def get_db():
    db = SessionLocal()
    try:
        yield db  # Provide the database session
    finally:
        db.close()  # Close session after use


# API endpoints

# User Registration
@app.post("/register", response_model=schemas.User)
def register(user: schemas.UserCreate, db: Session = Depends(get_db)):
    # Check if email is already registered
    if crud.get_user_by_email(db, user.email):
        raise HTTPException(status_code=400, detail="Email ya registrado")
    # Check if username already exists
    if crud.get_user_by_username(db, user.username):
        raise HTTPException(status_code=400, detail="Ya existe un usuario con ese nombre")
    # Create and return new user
    return crud.create_user(db, user)

# User Login
@app.post("/login")
def login(user_credentials: schemas.UserLogin, db: Session = Depends(get_db)):
    # Fetch user by username
    user = crud.get_user_by_username(db, user_credentials.username)
    # Verify user exists and password matches
    if not user or not crud.verify_password(user_credentials.password, user.password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Credenciales inválidas"
        )
    return {"user_id": user.id}

# Placeholder Logout (no session/token management here)
@app.post("/logout")
def logout():
    return {"message": "Logged out successfully"}

# Get user by ID
@app.get("/users/{user_id}", response_model=schemas.User)
def get_user(user_id: int, db: Session = Depends(get_db)):
    db_user = crud.get_user(db, user_id)
    if db_user is None:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")
    return db_user

# Update user profile
@app.put("/users/{user_id}", response_model=dict)
def update_user(
    user_id: int,
    user_update: schemas.UserUpdate,
    db: Session = Depends(get_db)
):
    db_user = crud.get_user(db, user_id)
    if not db_user:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")
    
    # If changing password, verify the current password first
    if user_update.new_password:
        if not user_update.current_password:
            raise HTTPException(status_code=400, detail="Contraseña actual requerida para cambiar contraseña")
        if not crud.verify_password(user_update.current_password, db_user.password):
            raise HTTPException(status_code=401, detail="Contraseña inválida")
    
    # Check if the new email is already registered
    if user_update.email != db_user.email:
        if crud.get_user_by_email(db, user_update.email):
            raise HTTPException(status_code=400, detail="Email ya registrado")
    
    # Check if the new username already exists
    if user_update.username != db_user.username:
        if crud.get_user_by_username(db, user_update.username):
            raise HTTPException(status_code=400, detail="Ya existe un usuario con ese nombre")
    
    # Update user information
    db_user.email = user_update.email
    db_user.username = user_update.username
    db_user.birthday = user_update.birthday
    db_user.gender = user_update.gender
    
    # Update password if a new one is provided
    if user_update.new_password:
        db_user.password = user_update.new_password
    
    db.commit()
    
    # Notify frontend if username or password has changed
    credentials_changed = (
        user_update.username != db_user.username or 
        user_update.new_password is not None
    )
    
    return {
        "message": "Perfil actualizado correctamente",
        "credentials_changed": credentials_changed
    }

# Import user health data (e.g., steps, exercise, water intake)
@app.post("/users/{user_id}/import")
def import_data(
    user_id: int,
    import_data: schemas.ImportData,
    db: Session = Depends(get_db)
):
    user = crud.get_user(db, user_id)
    if not user:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")
    
    try:
        crud.import_user_data(
            db=db,
            user_id=user_id,
            import_type=import_data.import_type,
            data=import_data.data
        )
        return {"message": "Datos importados correctamente"}
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

# Get current statistics for the dashboard
@app.get("/dashboard/{user_id}/current", response_model=schemas.CurrentStats)
def get_current_stats(user_id: int, db: Session = Depends(get_db)):
    user = crud.get_user(db, user_id)
    if not user:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")
    
    return crud.get_current_stats(db, user_id)

# Get historical data for metrics (e.g., last week, month, etc.)
@app.get("/dashboard/{user_id}/history")
def get_history(
    user_id: int,
    metric: str,
    period: str,
    db: Session = Depends(get_db)
):
    user = crud.get_user(db, user_id)
    if not user:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")
    
    # Define periods like 1 week, 1 month, 3 months, etc.
    end_date = datetime.now()
    period_map = {
        "1w": timedelta(weeks=1),
        "1m": timedelta(days=30),
        "3m": timedelta(days=90),
        "6m": timedelta(days=180),
        "1y": timedelta(days=365)
    }
    
    if period not in period_map:
        raise HTTPException(status_code=400, detail="Período inválido")
    
    start_date = end_date - period_map[period]
    
    try:
        result = crud.get_metric_history(db, user_id, metric, start_date)
        
        # For cumulative metrics, like steps or water intake, also return the total
        if metric in ["water", "steps", "exercise"]:
            return {
                "data": result["data"],
                "total": result["total"]
            }
        return result
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
