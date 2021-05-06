# import dependencies
import os
from flask_pymongo import PyMongo
from flask import Flask, jsonify, render_template, request, redirect
from bson import json_util

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
  ballers = mongo.db.nbaPlayers.find()

  output = [
      {"_id":{"$oid":"60931f5a438d62eda5583df0"},"Name":"DeAndre' Bembry","Photo":"https://www.basketball-reference.com/req/202104203/images/players/bembrde01.jpg",
            "City":"Charlotte, North Carolina","Country":"us","Age":25,"Tm":"ATL","Lg":"NBA","Pos":"SG","G":189,"GS":23,"MP":18.02,"FG":2.25,"FGA":5.08,"FG%":0.45,"3P":0.32,"3PA":1.32,
            "3P%":0.24,"2P":1.9,"2PA":3.78,"2P%":0.51,"eFG%":0.48,"FT":0.65,"FTA":1.12,"FT%":0.53,"ORB":0.55,"DRB":2.53,"TRB":3.08,"AST":1.75,"STL":0.9,"BLK":0.38,"TOV":1.33,"PF":1.6,
            "PTS":5.52,"PER":9.2,"TS%":0.49,"3PAr":0.25,"FTr":0.21,"ORB%":3.28,"DRB%":14.95,"TRB%":9.02,"AST%":13.6,"STL%":2.17,"BLK%":1.75,"TOV%":18.7,"USG%":15.9,"OWS":-0.6,"DWS":0.85,
            "WS":0.25,"WS/48":0.01,"OBPM":-3.88,"DBPM":0.58,"BPM":-3.28,"VORP":-0.18,"Rank in Photo":546,"Rank in City":511,"Rank in Country":449,"Rank in Age":318,"Rank in Tm":590,
            "Rank in Lg":590,"Rank in Pos":135,"Rank in G":334,"Rank in GS":381,"Rank in MP":327,"Rank in FG":356,"Rank in FGA":346,"Rank in FG%":239,"Rank in 3P":416,"Rank in 3PA":398,
            "Rank in 3P%":478,"Rank in 2P":279,"Rank in 2PA":276,"Rank in 2P%":243,"Rank in eFG%":408,"Rank in FT":420,"Rank in FTA":347,"Rank in FT%":553,"Rank in ORB":334,"Rank in DRB":269,
            "Rank in TRB":289,"Rank in AST":215,"Rank in STL":131,"Rank in BLK":227,"Rank in TOV":172,"Rank in PF":333,"Rank in PTS":381,"Rank in PER":463,"Rank in TS%":472,"Rank in 3PAr":436,
            "Rank in FTr":334,"Rank in ORB%":308,"Rank in DRB%":259,"Rank in TRB%":288,"Rank in AST%":205,"Rank in STL%":98,"Rank in BLK%":206,"Rank in TOV%":49,"Rank in USG%":401,
            "Rank in OWS":576,"Rank in DWS":268,"Rank in WS":454,"Rank in WS/48":509,"Rank in OBPM":494,"Rank in DBPM":147,"Rank in BPM":431,"Rank in VORP":513,"%ile in Photo":7.46,
            "%ile in City":13.39,"%ile in Country":23.9,"%ile in Age":46.1,"%ile in Tm":0,"%ile in Lg":0,"%ile in Pos":77.12,"%ile in G":43.39,"%ile in GS":35.42,"%ile in MP":44.58,
            "%ile in FG":39.66,"%ile in FGA":41.36,"%ile in FG%":59.49,"%ile in 3P":29.49,"%ile in 3PA":32.54,"%ile in 3P%":18.98,"%ile in 2P":52.71,"%ile in 2PA":53.22,"%ile in 2P%":58.81,
            "%ile in eFG%":30.85,"%ile in FT":28.81,"%ile in FTA":41.19,"%ile in FT%":6.27,"%ile in ORB":43.39,"%ile in DRB":54.41,"%ile in TRB":51.02,"%ile in AST":63.56,"%ile in STL":77.8,
            "%ile in BLK":61.53,"%ile in TOV":70.85,"%ile in PF":43.56,"%ile in PTS":35.42,"%ile in PER":21.53,"%ile in TS%":20,"%ile in 3PAr":26.1,"%ile in FTr":43.39,"%ile in ORB%":47.8,
            "%ile in DRB%":56.1,"%ile in TRB%":51.19,"%ile in AST%":65.25,"%ile in STL%":83.39,"%ile in BLK%":65.08,"%ile in TOV%":91.69,"%ile in USG%":32.03,"%ile in OWS":2.37,"%ile in DWS":54.58,
            "%ile in WS":23.05,"%ile in WS/48":13.73,"%ile in OBPM":16.27,"%ile in DBPM":75.08,"%ile in BPM":26.95,"%ile in VORP":13.05}
            
    ]
  return jsonify(output)

if __name__ == "__main__":
    app.run(debug=True)
