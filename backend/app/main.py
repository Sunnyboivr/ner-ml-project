from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import spacy

# Create the app
app = FastAPI()

# Allow frontend to talk to backend (fixes connection errors)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# load the trained model (or use default English model if custom model doesn't exist)
try:
    nlp = spacy.load("./custom_ner_model")
except OSError:
    nlp = spacy.load("en_core_web_sm")

# Define what data we expect to receive
class TextInput(BaseModel):
    text: str

# The main function - receives text, returns entities
@app.post("/analyze")
def analyze_text(input_data: TextInput):
    # Run AI on the text
    doc = nlp(input_data.text)
    
    # Extract all entities (names, places, etc.)
    entities = []
    for ent in doc.ents:
        entities.append({
            "text": ent.text,           # The actual word/phrase
            "label": ent.label_,        # Type (PERSON, ORG, etc.)
            "start": ent.start_char,    # Where it starts in text
            "end": ent.end_char         # Where it ends
        })
    
    # Count how many of each type
    counts = {}
    for ent in entities:
        label = ent["label"]
        counts[label] = counts.get(label, 0) + 1
    
    return {
        "entities": entities,
        "counts": counts
    }

# Health check - to test if server is running
@app.get("/health")
def health():
    return {"status": "healthy"}