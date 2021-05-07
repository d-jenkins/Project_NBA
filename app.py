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
    return render_template("intro.html")

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

@app.route("/about.html")
def about():
    return render_template("about.html")

@app.route('/ballers')
def get_ballers():
  data = []
  usaB = mongo.db.nbaPlayers.find({}, {"_id": 0})
  for b in usaB:
       data.append(b)
       print(b)
  # del ballers['_id']
  return jsonify({"status": "success", "payload": data})

if __name__ == "__main__":
    app.run(debug=True)
