from fastapi import FastAPI, UploadFile, Form
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import time
import uuid
import os
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(title="ProtoQol Integrity Engine API", version="1.0")

# CORS Configuration for the frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # For demo purposes, allow all. Update before production.
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Campaign(BaseModel):
    fund_name: str
    title: str
    requirements: str
    reward: int

@app.get("/api/v1/dashboard/stats")
async def get_stats():
    return {
        "total_impact": 15000,
        "recent_activity": [
            {
                "tx_hash": "3xMq8bY1p9...",
                "verdict": "ADAL",
                "timestamp": time.time() * 1000 - 100000,
                "ai_dialogue": [{"node": "BIY-01", "wisdom": "Action aligned with ethical standards."}]
            },
            {
                "tx_hash": "7gF2k1L8x0...",
                "verdict": "FAILED",
                "timestamp": time.time() * 1000 - 50000,
                "ai_dialogue": [{"node": "BIY-02", "wisdom": "Potential metadata mismatch detected."}]
            }
        ]
    }

@app.post("/api/v1/etch_deed")
async def etch_deed(description: str = Form(...), mission_id: str = Form(...), api_key: str = Form(None)):
    # Simulating AI consensus and Solana blockchain interaction
    time.sleep(1.5)
    return {
        "status": "crystalized",
        "tx_hash": str(uuid.uuid4()).replace("-", "")[:16],
        "impact_points": 500,
        "ai_dialogue": [
            {"node": "BIY-01", "wisdom": "Analyzing text context... Action seems genuine."},
            {"node": "BIY-02", "wisdom": "Cross-referencing with mandate... Confirmed."},
            {"node": "BIY-03", "wisdom": "Consensus reached. Authenticity verified."}
        ]
    }

@app.post("/api/v1/campaigns")
async def create_campaign(campaign: Campaign):
    # Simulating saving a campaign
    return {"status": "success", "campaign_id": str(uuid.uuid4())}

@app.get("/api/v1/gateway/missions")
async def get_missions():
    return {
        "mission-1": {
            "client": "Green Earth Fund",
            "requirements": "Plant 100 trees in urban areas."
        },
        "mission-2": {
            "client": "EduForAll",
            "requirements": "Provide IT workshops for elderly."
        }
    }


