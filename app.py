# import dependencies
import numpy as np

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func

from flask import Flask, jsonify



##########################################################
# Setup Database
##########################################################

engine = create_engine("location to DB")

# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(engine, reflect=True)

# Create references to tables
placeholder = Base.classes.placeholder


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
    print("Server received request for 'home' page...)
    return "Welcome to my 'Home' page! This is where I will introduce my website or project"

@app.route("/about")
def about():
    print("Server received request for 'About' page...")
    return "Welcome to my 'About' page!"

if __name__ == "__main__":
    app.run(debug=True)
