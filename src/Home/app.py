from flask import Flask, request, jsonify
from summarizer import summarize_content

app = Flask(__name__)

@app.route('/summarize', methods=['POST'])
def summarize():
    data = request.get_json()
    content = data['content']
    summary = summarize_content(content)
    return jsonify({'summary': summary})

if __name__ == '__main__':
    app.run(debug=True)
