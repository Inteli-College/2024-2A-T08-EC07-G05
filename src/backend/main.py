from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import predict, history, train

app = FastAPI()

app.include_router(predict.router)
app.include_router(history.router)
app.include_router(train.router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "working"}
