from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import predict, history


app = FastAPI()

app.include_router(predict.router)
app.include_router(history.router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "working"}