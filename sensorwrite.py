#This a simple script to generate dummy sensor data and upload it to the blockchain

import json
import requests
import random
import time

base_url = 'http://localhost:3000/api/'
headers = {
  'Content-Type' : 'application/json',
  'Accept' : 'application/json'
}

def post_data(api_url, json_data):
  r = requests.post(api_url, headers=headers, data=json.dumps(json_data))
  if r.status_code != 200:
    print ("Error:", r.status_code)
  else:
    print (r.status_code)
  time.sleep(20)

while True:

  print("Cycle started")

  #Get dummy sensor data
  temperature = random.randint(1,40)
  humidity = random.randint(1,100)
  moisture = random.randint(1,100)
  lumen = random.randint(100,1000)
  ipfs = 'Qmxx' + str(random.randint(1,100))
  note = 'ABC' + str(random.randint(1,100))

  #Create JSON objects for each reading
  temperature_reading = {
    "$class": "org.agrotracker.network.TemperatureReading",
    "temperature": temperature,
    "lot": "org.agrotracker.network.ProductLot#LOT_001"
  }

  humidity_reading = {
    "$class": "org.agrotracker.network.RhReading",
    "humidity": humidity,
    "lot": "org.agrotracker.network.ProductLot#LOT_001"
  }
  
  moisture_reading = {
  "$class": "org.agrotracker.network.MoistureReading",
  "moisture": moisture,
  "lot": "org.agrotracker.network.ProductLot#LOT_001"
  }

  lumen_reading = {
    "$class": "org.agrotracker.network.LumenReading",
    "lumen": lumen,
    "lot": "org.agrotracker.network.ProductLot#LOT_001"
  }

  ipfs_reading = {
    "$class": "org.agrotracker.network.IpfsFileReading",
    "ipfsFile": ipfs,
    "lot": "org.agrotracker.network.ProductLot#LOT_001"
  }

  process_note_reading = {
    "$class": "org.agrotracker.network.ProcessNoteReading",
    "processNote": note,
    "lot": "org.agrotracker.network.ProductLot#LOT_001"
  }  
  
  post_data(base_url + 'TemperatureReading', temperature_reading)
  post_data(base_url + 'RhReading', humidity_reading)
  post_data(base_url + 'MoistureReading', moisture_reading)
  post_data(base_url + 'LumenReading', lumen_reading)
  post_data(base_url + 'IpfsFileReading', ipfs_reading)
  post_data(base_url + 'ProcessNoteReading', process_note_reading)


  #Sleep for 5 minutes
  time.sleep(300)