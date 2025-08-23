import string

CRISIS_KEYWORDS = [
    "suicide", "kill myself", "end my life", "self harm", "self-harm", "hurt myself", "die", "give up", "cant go on", "worthless", "no way out",
    "i dont want to live", "life is not worth", "want to disappear", "nothing to live for", "ending it all", "better off dead", "tired of living", "i want to die"
]

HELPLINES = {
    "India": [
        "Kiran: 1800-599-0019",
        "Sneha: 044-24640050",
        "iCall: 9152987821",
        "Vandrevala: 1860 2662 345 or 1800 2333 330"
    ],
    "International": [
        "https://findahelpline.com"
    ]
}

CRISIS_RESPONSE = (
    "⚠️ It sounds like you may be going through a difficult time. If you or someone you know is in crisis or needs immediate help, "
    "please reach out to a mental health professional or a trusted person right away. You are not alone, and support is available.\n\n"
    "Indian Helplines:\n" + "\n".join(HELPLINES["India"]) + "\n"
    "Find more international helplines: " + HELPLINES["International"][0]
)

def detect_crisis(text: str) -> bool:
    # Remove punctuation and lowercase
    clean = text.translate(str.maketrans('', '', string.punctuation)).lower()
    return any(keyword in clean for keyword in CRISIS_KEYWORDS)
