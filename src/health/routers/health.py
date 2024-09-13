from fastapi import APIRouter, status, HTTPException
import httpx

router = APIRouter(tags=["health"])

BACKEND_URL = "http://itcross-backend:3001/health_backend"
FRONTEND_URL = "http://itcross-frontend:3000/api/health"

@router.get("/health", status_code=status.HTTP_200_OK)
async def health_check():
    backend_health = await check_backend()
    frontend_health = await check_frontend()

    # Retorna a resposta final com a saúde dos dois serviços
    return {
        "status": "healthy",
        "backend_connection": backend_health,
        "frontend_connection": frontend_health,
    }

async def check_backend():
    async with httpx.AsyncClient() as client:
        try:
            # Verifica a saúde do backend
            response = await client.get(BACKEND_URL)
            response.raise_for_status()
            backend_health = response.json()
            print('Backend funcionando:', backend_health)
            return backend_health
        except httpx.RequestError as e:
            print(f"Erro ao chamar o backend: {e}")
            return {"status": "unhealthy", "error": str(e)}

async def check_frontend():
    async with httpx.AsyncClient() as client:
        try:
            # Verifica a saúde do frontend
            response = await client.get(FRONTEND_URL)
            response.raise_for_status()
            frontend_health = response.json()
            print('Frontend funcionando:', frontend_health)
            return frontend_health
        except httpx.RequestError as e:
            print(f"Erro ao chamar o frontend: {e}")
            return {"status": "unhealthy", "error": str(e)}

