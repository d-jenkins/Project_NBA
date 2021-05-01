# import dependencies
import numpy as np

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func

from flask_pymongo import PyMongo

from flask import Flask, jsonify, render_template

# Import pgadmin password from python file
from nbapw import pw

#################################################
# Create Postgres Database Connection
#################################################
engine = create_engine(f'postgresql://postgres:{pw}@localhost:5432/project_nba')
#engine = create_engine(f'postgresql://{connection_string}')
# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(engine, reflect=True)

# Create references to tables
# placeholder = Base.classes.placeholder

##########################################################
# Connect to MongoDB
##########################################################
# app.config["MONGO_URI"] = "mongodb://localhost:27017/project_nba"
# mongo = PyMongo(app)



##########################################################
# Setup Flask
##########################################################

# Create an app
app = Flask(__name__)

##########################################################
# Decorate Flask Routes
##########################################################

# 3. Define the route
@app.route("/")
def home():
    return render_template("index.html")

if __name__ == "__main__":
    app.run(debug=True)
