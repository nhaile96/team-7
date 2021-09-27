import numpy as np
import pandas as pd
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func

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