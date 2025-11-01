# Named Entity Recognition Tool

A web-based application for automatically extracting and identifying named entities from text using Natural Language Processing. The system recognizes people, organizations, locations, dates, monetary values, and other key information from unstructured text.

## Overview

This tool provides an intuitive interface for performing Named Entity Recognition (NER) on any text input. Users can paste text or upload documents, and the system will automatically identify and categorize important entities, displaying them with visual highlights and providing detailed analytics.

The application uses state-of-the-art NLP models to achieve high accuracy across different text types, including news articles, business documents, social media content, and academic papers.

## Features

The application offers several key capabilities:

**Entity Detection**: Automatically identifies multiple entity types including persons, organizations, locations, dates, monetary amounts, facilities, products, and events.

**Visual Interface**: Provides color-coded highlighting of detected entities directly in the text, making it easy to scan and understand the content at a glance.

**Interactive Analysis**: Users can click on entities in the sidebar to highlight all occurrences throughout the text, enabling quick analysis of entity distribution and frequency.

**Sample Texts**: Includes pre-loaded example texts across different domains such as business, news, sports, research, and startup scenarios to demonstrate capabilities.

**Real-time Processing**: Analyzes text instantly as it is entered or pasted, providing immediate feedback and results.

**Export Options**: Allows users to download detected entities in CSV format for further analysis or record-keeping.

## Technology Stack

### Backend

The backend is built with Python and uses the following technologies:

- FastAPI for creating a modern, high-performance API
- spaCy or Hugging Face Transformers for NLP and entity recognition
- Uvicorn as the ASGI server
- Python 3.10 or higher

### Frontend

The frontend uses modern JavaScript technologies:

- React 18 for building the user interface
- Vite as the build tool and development server
- Tailwind CSS for styling
- Axios for making API requests

## Prerequisites

Before setting up the project, ensure you have the following installed:

- Python 3.10 or higher
- Node.js 18 or higher
- pip (Python package manager)
- npm (Node package manager)
- Git

## Installation and Setup

### Clone the Repository

First, clone the repository to your local machine:
```bash
git clone https://github.com/Nishtha031105/ner-ml-project.git
cd ner-ml-project
```

### Backend Setup

Navigate to the backend directory and set up the Python environment:
```bash
cd backend
```

Create a virtual environment to isolate project dependencies:
```bash
python -m venv venv
```

Activate the virtual environment:

On Windows:
```bash
venv\Scripts\activate
```

On macOS and Linux:
```bash
source venv/bin/activate
```

Install the required Python packages:
```bash
pip install -r requirements.txt
```

Download the NER model. You have two options:

For faster performance with smaller model size:
```bash
python -m spacy download en_core_web_sm
```

For better accuracy with larger model size (recommended):
```bash
python -m spacy download en_core_web_trf
```

Start the backend server:
```bash
uvicorn app.main:app --reload --port 8000
```

The backend API will now be running at http://localhost:8000

You can verify it's working by visiting http://localhost:8000/health in your browser.

### Frontend Setup

Open a new terminal window and navigate to the frontend directory:
```bash
cd frontend
```

Install the required Node.js packages:
```bash
npm install
```

Start the development server:
```bash
npm run dev
```

The frontend application will now be running at http://localhost:5173

Open your browser and navigate to http://localhost:5173 to use the application.

## Project Structure
```
NER(ML Project)/
├── backend/
│   ├── app/
│   │   ├── main.py                 # Main FastAPI application
│   │   ├── model.py                # NER model wrapper
│   │   ├── transformer_model.py    # Transformer model implementation
│   │   └── schemas.py              # Pydantic data models
│   ├── requirements.txt            # Python dependencies
│   ├── train_model.py             # Script for training custom models
│   └── download_dataset.py        # Dataset download utilities
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Editor.jsx         # Text input component
│   │   │   ├── HighlightedText.jsx    # Display component with highlights
│   │   │   └── EntityList.jsx     # Sidebar entity list
│   │   ├── App.jsx                # Main application component
│   │   ├── api.js                 # API communication functions
│   │   └── main.jsx               # Application entry point
│   ├── package.json               # Node.js dependencies
│   └── vite.config.js             # Vite configuration
├── .gitignore
└── README.md
```

## Usage

### Basic Usage

1. Open the application in your browser at http://localhost:5173

2. Enter or paste text into the text area. You can also click one of the sample text buttons to load pre-written examples.

3. Click the "Analyze Text" button to process the text.

4. View the results with color-coded entity highlights in the main panel and a detailed entity list in the sidebar.

5. Click on any entity in the sidebar to highlight all occurrences of that entity in the text.

6. Use the "Export as CSV" button to download the detected entities for external use.

### Entity Types

The system can identify the following types of entities:

- **PERSON**: Names of people, including both real and fictional characters
- **ORG**: Organizations such as companies, government agencies, and institutions
- **GPE**: Geopolitical entities like countries, cities, and states
- **LOC**: Non-geopolitical locations including mountain ranges, bodies of water, and regions
- **FAC**: Facilities such as buildings, airports, highways, and bridges
- **PRODUCT**: Physical objects including vehicles, foods, and consumer goods
- **EVENT**: Named events including wars, battles, sports events, and natural disasters
- **WORK_OF_ART**: Titles of books, songs, movies, and other creative works
- **LAW**: Named legal documents and laws
- **LANGUAGE**: Any named language
- **DATE**: Dates and time periods in various formats
- **TIME**: Times of day or durations shorter than a day
- **PERCENT**: Percentage values including the percent symbol
- **MONEY**: Monetary amounts including currency symbols
- **QUANTITY**: Measurements of weight, distance, and other quantities
- **ORDINAL**: Ordinal numbers such as first, second, third
- **CARDINAL**: Cardinal numbers that do not fall under other categories

## Training Custom Models

If you want to train a custom NER model on your own data:

### Downloading Datasets

The project includes scripts for downloading common NER datasets:
```bash
cd backend
python download_dataset.py
```

This will prompt you to choose from available datasets such as CoNLL-2003 or WNUT-17.

### Training Process

After downloading a dataset, train your model:
```bash
python train_model.py
```

The script will guide you through choosing training parameters and will save the trained model to the `custom_ner_model` directory.

### Using Your Custom Model

To use your trained model, update the model loading code in `backend/app/main.py`:
```python
nlp = spacy.load("./custom_ner_model")
```

Then restart the backend server.