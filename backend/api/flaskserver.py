# Using Flask to create an API server
# Start with returning scraped data directly to the client

# set cwd to parent
import os
import sys

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from flask import Flask, jsonify, request
from scraper.ratemyscraper import RateMyProfessorScraper

app = Flask(__name__)
school_id = 1117
scraper = RateMyProfessorScraper(id=school_id)


@app.route("/", methods=["GET"])
def index():
    return (
        jsonify(
            {
                "status": "error",
                "message": "Invalid endpoint. Please refer to the API documentation for valid endpoints.",
            }
        ),
        400,
    )


@app.route("/hello_world", methods=["GET"])
def hello_world():
    message = "Hello, World!"
    args = request.args.get("query")
    if args:
        message += f" {args}"
    return jsonify(message)


@app.route("/get_professor_data", methods=["GET"])
def get_professor_data():
    name = request.args.get("name")
    print(name)
    data = scraper.get_professor_data(name)
    return jsonify(data)


if __name__ == "__main__":
    app.run()
