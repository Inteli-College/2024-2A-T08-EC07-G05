from fastapi import APIRouter, status

router = APIRouter(tags=["health"])
    
@router.get("/health_backend", status_code=status.HTTP_200_OK)
def health_check_backend():
    return {"status": "healthy", "backend_connection": "sucessful"}

