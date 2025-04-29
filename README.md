# Health Dashboard

## Description
A web-based health dashboard that allows users to visualize and track their health data, including weight, body composition, daily activity, and more. Users can register, log in, and access a personalized dashboard displaying real-time metrics and historical data. The dashboard includes various sections like general health overview, historical data comparisons, and the ability to import data from external sources. It provides an interactive experience with visualizations such as graphs and scorecards to track progress over time

The frontend is built with React, providing an intuitive user interface, while the backend is powered by FastAPI to handle API requests and manage data. The data is stored in a SQLite database.

## Features
- **User Authentication**: Secure login and registration functionality.
- **Sensor Data Import**: Import health data from CSV files (e.g., weight, height, body composition, water intake, steps, exercise duration).
- **Dashboard**: Visual representation of current health data including weight, body composition, BMI, water intake, and daily steps.
- **Historical Data**: Time-based analysis and comparison of health metrics over different periods (week, month, 3 months, 6 months, 1 year).
- **User Profile Management**: Option to view and edit user details, including email, username, password, and health metrics.

## Tech Stack
- **Frontend**: React, Fetch API, CSS (with Tailwind)
- **Backend**: FastAPI
- **Database**: SQLite (using SQLAlchemy for ORM)
- **Visualization**: React Chart Libraries (e.g., MUI, Chart.js, or others)

## Project setup
### Backend
#### 1. Create and activate the virtual enviroment 

```bash
python -m venv venv
source venv/bin/activate  # Unix/Mac
.\venv\Scripts\activate   # Windows
```

#### 2. Install dependencies 
```bash
pip install -r requirements.txt
```

#### 3. Start the server 

```bash
uvicorn app.main:app --reload
```

### Frontend

#### 1. Install dependencies
```bash
npm install
```

#### 2. Run the frontend server
```bash
npm run dev
```
 - This starts the React development server. It should be accessible at http://localhost:5173

## Credits

### Authors:
- Josseph Valverde Robles
- Alejandro Jiménez Ulloa


