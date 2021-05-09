# import dependencies
import os
from flask_pymongo import PyMongo
from flask import Flask, jsonify, render_template, request, redirect

##########################################################
# Create an app
app = Flask(__name__)
##########################################################
# Connect to MongoDB
##########################################################
#myclient = db.MongoClient("mongodb://localhost:27017/projectNBA")
app.config["MONGO_URI"] = "mongodb://localhost:27017/projectNba"
mongo = PyMongo(app)

##########################################################
# Decorate Flask Routes
##########################################################

# 3. Define the route
@app.route("/")
def home():
    return render_template("index.html")

@app.route("/intro.html")
def intro():
    return render_template("intro.html")

@app.route("/players.html")
def players():
    return render_template("players.html")

@app.route("/index.html")
def hometown():
    return render_template("index.html")

@app.route("/Skill.html")
def skill():
    return render_template("Skill.html")

@app.route("/states")
def about():
    return render_template("states.html")

@app.route('/players')
def get_players():
  players = []
  usaP = mongo.db.nbaPlayers.find({}, {"_id": 0})
  for p in usaP:
       players.append(p)
       print(p)
  # del ballers['_id']
  return jsonify({"status": "success", "payload": players})


@app.route('/states/api')
def get_states():
  states = []
  usaStates = mongo.db.states.find({}, {"_id": 0})
  for s in usaStates:
       states.append(s)
       print(s)
      # del ballers['_id']
  return jsonify({"status": "success", "payload": states})

@app.route('/cities')
def get_cities():
  city = []
  usaCity = mongo.db.city.find({}, {"_id": 0})
  for c in usaCity:
       city.append(c)
       print(c)
  # del ballers['_id']
  return jsonify({"status": "success", "payload": city})

if __name__ == "__main__":
    app.run(debug=True)
