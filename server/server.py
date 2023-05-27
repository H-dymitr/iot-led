from flask import Flask, request
from flask_cors import CORS, cross_origin

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

global ledStatus
ledStatus = "on"

global rolletStatus
rolletStatus = "open"


@app.route("/")
def hello():
    return "Hello World!"


# get led status
@app.route("/led")
def led():
    return {"status": ledStatus}


# set led status
@app.route("/led", methods=["POST"])
def set_led():
    global ledStatus
    ledStatus = request.get_json()["status"]
    return {"status": ledStatus}


# # get roller status
@app.route("/rollet")
def roller():
    return {"status": rolletStatus}


# set roller status
@app.route("/rollet", methods=["POST"])
def set_roller():
    global rolletStatus
    rolletStatus = request.get_json()["status"]
    return {"status": rolletStatus}


if __name__ == "__main__":
    app.run()
