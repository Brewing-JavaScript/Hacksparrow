from flask import Flask, request, jsonify
import numpy as np
import pandas as pd
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.naive_bayes import MultinomialNB
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score
from flask_cors import CORS 

MAX_SEQUENCE_LENGTH = 5000
MAX_NUM_WORDS = 25000
EMBEDDING_DIM = 300
TEST_SPLIT = 0.2

TEXT_DATA = 'https://raw.githubusercontent.com/lutzhamel/fake-news/master/data/fake_or_real_news.csv'

# Load the dataset
df = pd.read_csv(TEXT_DATA)

# Preprocess the text data
X = df['title']
y = df['label']
vectorizer = CountVectorizer(max_features=MAX_NUM_WORDS)
X = vectorizer.fit_transform(X)

# Split the data into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=TEST_SPLIT, random_state=42)

# Train a simple Naive Bayes classifier
clf = MultinomialNB()
clf.fit(X_train, y_train)

# Initialize Flask app
app = Flask(__name__)
CORS(app)

# Define a route to handle incoming requests
@app.route('/predict', methods=['POST'])
def predict():
    # Get the title from the request
    title = request.json['title']
    
    # Vectorize the title using the same vectorizer
    title_vec = vectorizer.transform([title])
    
    # Make prediction using the trained classifier
    probabilities = clf.predict_proba(title_vec)[0]
    
    # Convert probabilities to percentages
    fake_percentage = probabilities[0] * 100
    true_percentage = probabilities[1] * 100
    
    # Return the percentages as JSON response
    return jsonify({'probabilities': {'fake': fake_percentage, 'true': true_percentage}})

if __name__ == '__main__':
    # Run the Flask app on localhost with port 5000
    app.run(debug=True)
