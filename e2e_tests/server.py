from flask import Flask, jsonify, request
from flask_cors import CORS
import json
import datetime
import os

def pwd(file_name):
  dir = os.path.dirname(__file__)
  return os.path.join(dir, 'data', file_name)

app = Flask(__name__)
CORS(app)

def getServiceDay():
  now = datetime.datetime.now()
  midnight = now.replace(hour=0, minute=0, second=0, microsecond=0)
  return (now - midnight).seconds

def loadJSON(file_name):
  with open(pwd(str(file_name + '.json'))) as json_data:
    data = json.load(json_data)
    return jsonify(data)

def alertData():
  return loadJSON('alerts')

def departureData(vehicleTypes):
  pathName = ""

  if "BUS" in vehicleTypes:
    pathName = 'departures_bus.json'
  elif "TRAM" in vehicleTypes:
    pathName = 'departures_tram.json'
  else:
    pathName = 'departures_others.json'

  with open(pwd(pathName), 'r') as json_data:
    data = json_data.read().replace('${SERVICE_DAY}', str(getServiceDay()))
    return jsonify(json.loads(data))

@app.route('/geocoding/v1/search', methods=['GET'])
def search():
  return loadJSON('address')

@app.route('/geocoding/v1/reverse', methods=['GET'])
def reverse():
  return loadJSON('reverse')

@app.route('/routing/v1/routers/hsl/index/graphql', methods=['POST'])
def graphQL():
  reqData = request.get_json()

  if "alerts" in reqData["query"]:
    return alertData()

  return departureData(reqData['variables']['vehicleTypes'])

@app.route('/routing/v1/routers/hsl/index/graphql/batch', methods=['POST'])
def batch():
  return jsonify(json.loads('[]'))

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
