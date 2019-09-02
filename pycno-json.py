#This a simple script to generate dummy sensor data and upload it to the blockchain

import json
import requests
import random
import time


#Pycno API data
sensor_id = 'M05D93939584D43088323'
pycno_api_token = 'zSxBWgu39zh4K8b7WzcrHNYl9qc5qbVY'

pycno_url ='https://portal.pycno.co.uk/api/v2/data/no/' + sensor_id +'.json?TK=' + pycno_api_token

json_sensor_data = requests.get(pycno_url).json()

print(json_sensor_data['TEMP'])