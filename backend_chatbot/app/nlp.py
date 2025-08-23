from transformers import pipeline
from functools import lru_cache

EMOTION_LABELS = {"sadness", "joy", "anger", "fear", "surprise", "neutral"}

@lru_cache
def get_emotion_pipeline():
	return pipeline(
		"text-classification",
		model="j-hartmann/emotion-english-distilroberta-base",
		top_k=1
	)

def get_emotion_label(text: str) -> str:
	classifier = get_emotion_pipeline()
	result = classifier(text)
	if isinstance(result, list) and len(result) > 0:
		label = result[0][0]["label"].lower()
		if label in EMOTION_LABELS:
			return label
	return "neutral"

def choose_strategy(emotion: str) -> str:
	mapping = {
		"sadness": "reflect",
		"joy": "info",
		"anger": "open_question",
		"fear": "suggestion",
		"surprise": "info",
		"neutral": "open_question"
	}
	return mapping.get(emotion, "open_question")

def generate_response(user_text: str, emotion: str, strategy: str) -> str:
	templates = {
		"reflect": (
			"I'm here for you. It sounds like you're feeling {emotion}. "
			"Would you like to talk more about it? Remember, you're not alone and I'm here to listen."
		),
		"open_question": (
			"Thank you for sharing. What do you think might help you feel a bit better? "
			"Sometimes talking about it can make a difference. Is there someone you trust you could reach out to?"
		),
		"suggestion": (
			"It can be tough to feel {emotion}. Would you like to try a simple breathing exercise or take a short walk? "
			"Small actions can sometimes help us feel a little more in control."
		),
		"info": (
			"It's great to notice your feelings of {emotion}. If you'd like, I can share some tips on maintaining well-being or answer any questions you have. "
			"Is there a topic you'd like to learn more about?"
		)
	}
	template = templates.get(strategy, templates["open_question"])
	return template.format(emotion=emotion)
