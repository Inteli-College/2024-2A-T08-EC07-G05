from fastapi import APIRouter, status, HTTPException, Depends
import httpx
import os
from supabase import Client
from backend.database.supabase import create_supabase_client
from datetime import datetime
import pytz

SAO_PAULO_TZ = pytz.timezone('America/Sao_Paulo')

router = APIRouter(tags=["health"])

BACKEND_URL = os.getenv("BACKEND_URL")
FRONTEND_URL = os.getenv("FRONTEND_URL")
SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY") 

def get_formatted_datetime():
    now = datetime.now(SAO_PAULO_TZ)
    return now.strftime('%d/%m/%Y_%Hh%M')

@router.get("/health", status_code=status.HTTP_200_OK)
async def health_check(supabase: Client = Depends(create_supabase_client)):
    backend_health = await check_backend()
    frontend_health = await check_frontend()
    database_health = await check_database()

    # Compila a resposta final com a saúde dos três serviços
    health_status = {
        "status": "healthy",
        "backend_connection": backend_health,
        "frontend_connection": frontend_health,
        "database_connection": database_health,
    }

    # Prepara os dados para serem inseridos no banco
    registros = [
        {"SERVICO": "backend", "HEALTH": backend_health["status"], "DATE": get_formatted_datetime()},
        {"SERVICO": "frontend", "HEALTH": frontend_health["status"], "DATE": get_formatted_datetime()},
        {"SERVICO": "database", "HEALTH": database_health["status"], "DATE": get_formatted_datetime()},
    ]

    # Insere os registros na tabela 'Health'
    response = supabase.table('Health').insert(registros).execute()

    # Verifica se a resposta contém dados inseridos como indicativo de sucesso
    if not response.data or not isinstance(response.data, list) or len(response.data) != len(registros):
        print(registros, "sem dados inseridos")
        raise HTTPException(status_code=500, detail="Erro ao inserir o registro no banco de dados")

    return health_status

async def check_backend():
    async with httpx.AsyncClient() as client:
        try:
            response = await client.get(BACKEND_URL)
            response.raise_for_status()
            backend_health = response.json()
            return {"status": "healthy"}
        except httpx.RequestError as e:
            return {"status": "unhealthy", "error": str(e)}

async def check_frontend():
    async with httpx.AsyncClient() as client:
        try:
            response = await client.get(FRONTEND_URL)
            response.raise_for_status()
            frontend_health = response.json()
            return {"status": "healthy"}
        except httpx.RequestError as e:
            return {"status": "unhealthy", "error": str(e)}

async def check_database():
    async with httpx.AsyncClient() as client:
        try:
            headers = {
                "apikey": SUPABASE_KEY,
                "Authorization": f"Bearer {SUPABASE_KEY}"
            }
            response = await client.get(f"{SUPABASE_URL}/rest/v1/Health", headers=headers)
            response.raise_for_status()
            return {"status": "healthy"}
        except httpx.HTTPStatusError as e:
            return {"status": "unhealthy", "error": str(e)}
        except httpx.RequestError as e:
            return {"status": "unhealthy", "error": str(e)}

        
