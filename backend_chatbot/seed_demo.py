import requests
from datetime import datetime, timedelta

API = "http://127.0.0.1:8000"

# Create users
users = [
    {"name": "Alice"},
    {"name": "Bob"},
    {"name": "Priya"}
]
user_ids = []

for u in users:
    # Create user by sending a chat (user will be auto-created)
    r = requests.post(f"{API}/chat", json={"user_id": None, "message": f"Hi, I'm {u['name']}!"})
    if r.ok:
        print(f"Seeded chat for {u['name']}")
        # Get user_id from DB if needed, here we just use 1, 2, 3 for demo
        user_ids.append(len(user_ids) + 1)
    else:
        print(f"Failed to seed chat for {u['name']}")

# Seed chat messages
chats = [
    (1, "I feel anxious about exams"),
    (2, "I want to end my life"),
    (3, "I'm happy with my progress!"),
    (1, "I can't sleep at night"),
    (2, "I feel better after talking to a friend")
]
for uid, msg in chats:
    r = requests.post(f"{API}/chat", json={"user_id": uid, "message": msg})
    print(f"Chat ({uid}): {msg} -> {r.status_code}")

# Seed health reports
now = datetime.utcnow()
reports = [
    {"user_id": 1, "category": "mental_health", "description": "panic attack near library", "lat": 22.57, "lon": 88.36, "created_at": (now - timedelta(days=1)).isoformat()},
    {"user_id": 2, "category": "physical_health", "description": "sprained ankle at sports ground", "lat": 22.58, "lon": 88.37, "created_at": (now - timedelta(days=2)).isoformat()},
    {"user_id": 3, "category": "nutrition", "description": "skipped meals for 2 days", "lat": 22.59, "lon": 88.38, "created_at": (now - timedelta(days=3)).isoformat()}
]
for rep in reports:
    data = rep.copy()
    data.pop("created_at")  # API auto-generates created_at
    r = requests.post(f"{API}/reports", json=data)
    print(f"Report ({rep['category']}): {r.status_code}")
