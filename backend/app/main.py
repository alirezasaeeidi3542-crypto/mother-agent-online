from fastapi import FastAPI
from mother_agent import MotherAgent
from child_agent import ChildAgentManager

app = FastAPI(title="Mother Agent API")

mother_agent = MotherAgent()
child_manager = ChildAgentManager()

@app.get("/")
async def root():
    return {"message": "Mother Agent Online!"}

@app.post("/create-child")
async def create_child(data: dict):
    child_id = mother_agent.create_child_agent(data)
    return {"child_id": child_id, "status": "created"}

@app.get("/children")
async def list_children():
    return {"children": child_manager.list_children()}
