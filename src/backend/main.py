from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from backend.routers import predict, history, etl

app = FastAPI()

app.include_router(predict.router)
app.include_router(history.router)
app.include_router(etl.router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],  # p/ permitir requisições do frontend
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "working"}
