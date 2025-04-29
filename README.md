## Quick setup con venv

### Backend
```bash
# 1. Create and activate the virtual enviroment (Crear y activar entorno virtual) 
python -m venv venv
source venv/bin/activate  # Unix/Mac
.\venv\Scripts\activate   # Windows

# 2. Install dependencies (Instalar dependencias)
pip install -r requirements.txt

# 3. Start the server (Iniciar servidor)
uvicorn app.main:app --reload
```

### Frontend
```bash
npm install
npm run dev
```