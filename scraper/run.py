import os
from flask import Flask, render_template, request, Response, jsonify
from scrape import load_data

app = Flask(__name__)

@app.route('/')
def index():
    data = load_data()
    print(data)
    return jsonify(data)

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5001))
    app.run(host='0.0.0.0', port=port)
