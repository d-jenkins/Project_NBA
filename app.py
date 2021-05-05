# import dependencies
import os
from flask_pymongo import PyMongo
from flask import Flask, jsonify, render_template, request, redirect

# Import pgadmin password from python file
#from nbapw import pw


##########################################################
# Setup Flask
##########################################################
# Create an app
app = Flask(__name__)
##########################################################
# Connect to MongoDB
##########################################################
#myclient = db.MongoClient("mongodb://localhost:27017/projectNBA")
conn = app.config["MONGO_URI"] = "mongodb://localhost:27017/projectNBA"
mongo = PyMongo(app)


##########################################################
# Decorate Flask Routes
##########################################################

# 3. Define the route
@app.route("/")
def home():
    return render_template("index.html")

@app.route('/ballers', methods=['GET'])
def get_ballers():
  ballers = mongo.db.nbaPlayers
  output = []
  for b in ballers.find():
    output.append({'name' : b['name'], 'Page' : b['Page']})
  return jsonify({'result' : output})

    

if __name__ == "__main__":
    app.run(debug=True)
