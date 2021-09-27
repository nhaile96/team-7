import numpy as np
#import pandas as pd
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func
import psycopg2 

from flask import Flask, jsonify

#################################################
# Database Setup
#################################################
engine = create_engine(f'postgresql://postgres:postgres@localhost/project-2')
conn=engine.connect()
# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(engine, reflect=True)

# save reference to tables
mf_df_class= Base.classes.mf_df_top100
etf_df_class=Base.classes.etf_df_top100

session=Session(engine)

# flask set up

app= Flask(__name__)

@app.route("/")
def welcome():
    """All Available API Routes."""
    return(
        f"Available Routes:<br/>"
        f"/api/v1.0/etf_info<br/>"
        f"/api/v1.0/mutualfunds_info"
    )


@app.route("/api/v1.0/etf_info")
def info_etf():

    results=session.query(etf_df_class.fund_symbol, etf_df_class.fund_extended_name,etf_df_class.inception_date,\
    etf_df_class.investment_type,etf_df_class.size_type,etf_df_class.top10_holdings, etf_df_class.fund_return_ytd,\
    etf_df_class.fund_return_10years,etf_df_class.net_asset_value).order_by(etf_df_class.fund_return_10years.desc()).all()

    etf_total=[]
    for result in results:
        row={}
        row["fund_symbol"]=result[0]
        row["fund_extended_name"]=result[1]
        row["inception_date"]=result[2]
        row["investment_type"]=result[3]
        row["size_type"]=result[4]
        row["top10_holdings"]=result[5]
        row["fund_return_ytd"]=result[6]
        row["fund_return_10years"]=result[7]
        row["net_asset_value"]=result[8]
        etf_total.append(row)
    
    return jsonify(etf_total)

@app.route("/api/v1.0/mutualfunds_info")
def mf_info():
    results1=session.query(mf_df_class.fund_symbol, mf_df_class.fund_extended_name,mf_df_class.inception_date,\
    mf_df_class.investment_type,mf_df_class.size_type,mf_df_class.top10_holdings, mf_df_class.fund_return_ytd,\
    mf_df_class.fund_return_10years,mf_df_class.net_asset_value).order_by(mf_df_class.fund_return_10years.desc()).all()

    mf_total=[]
    for result in results1:
        row={}
        row["fund_symbol"]=result[0]
        row["fund_extended_name"]=result[1]
        row["inception_date"]=result[2]
        row["investment_type"]=result[3]
        row["size_type"]=result[4]
        row["top10_holdings"]=result[5]
        row["fund_return_ytd"]=result[6]
        row["fund_return_10years"]=result[7]
        row["net_asset_value"]=result[8]
        mf_total.append(row)
    
    return jsonify(mf_total)





if __name__ == '__main__':
    app.run(debug=True)