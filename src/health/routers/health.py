from fastapi import APIRouter, status, HTTPException
import httpx

router = APIRouter(tags=["health"])

@router.get("/health", status_code=status.HTTP_200_OK)
async def health_check():
    backend_url = "http://localhost:3001/health_backend"
    frontend_url = "http://localhost:3000/api/health"

    async with httpx.AsyncClient() as client:
        try:
            # Faz requisição ao backend
            backend_response = await client.get(backend_url)
            backend_response.raise_for_status()
            backend_health = backend_response.json()

            # Faz requisição ao frontend
            frontend_response = await client.get(frontend_url)
            frontend_response.raise_for_status()
            frontend_health = frontend_response.json()

        except httpx.HTTPStatusError as e:
            raise HTTPException(
                status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
                detail=f"Error reaching one of the services: {str(e)}"
            )
    
    return {
        "status": "healthy",
        "backend_connection": backend_health,
        "frontend_connection": frontend_health,
    }
