from cryptography.fernet import Fernet
import hashlib
import os
from dotenv import load_dotenv

load_dotenv()

# 🔑 Load encryption key from environment (must stay constant across runs!)
SECRET_KEY = os.getenv("ENCRYPTION_KEY")

if not SECRET_KEY:
    raise ValueError(
        "❌ ENCRYPTION_KEY not found in environment. "
        "Generate one with Fernet.generate_key() and set it in your .env file."
    )

# If it's a string from env, ensure it's bytes
fernet = Fernet(SECRET_KEY.encode() if isinstance(SECRET_KEY, str) else SECRET_KEY)


def encrypt_data(value: str) -> str:
    """Reversible encryption for storing sensitive data"""
    return fernet.encrypt(value.encode()).decode()


def decrypt_data(value: str) -> str:
    """Decrypt encrypted data"""
    return fernet.decrypt(value.encode()).decode()


def hash_deterministic(value: str) -> str:
    """Deterministic hash for searching (non-reversible)"""
    return hashlib.sha256(value.encode()).hexdigest()