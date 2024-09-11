from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import predict
from routers import health

app = FastAPI()

app.include_router(predict.router)
app.include_router(health.router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # p/ permitir requisições do frontend
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "working"}
