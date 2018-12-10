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
  print ("Working on:", api_url)
  if r.status_code != 200:
    print ("Error:", r.status_code)
  else:
    print ("Success", r.status_code)
  time.sleep(10)

#Create 3 extra lots:

lot_2 = {
  "$class": "org.agrotracker.network.ProductLot",
  "lotId": "LOT-002",
  "type": "POPPY",
  "status": "SEEDED",
  "unitCount": 100,
  "contract": "resource:org.agrotracker.network.Contract#CON-001"
}

lot_3 = {
  "$class": "org.agrotracker.network.ProductLot",
  "lotId": "LOT-003",
  "type": "POPPY",
  "status": "SEEDED",
  "unitCount": 1000,
  "contract": "resource:org.agrotracker.network.Contract#CON-001"
}

lot_4 = {
  "$class": "org.agrotracker.network.ProductLot",
  "lotId": "LOT-004",
  "type": "COCA",
  "status": "SEEDED",
  "unitCount": 100,
  "contract": "resource:org.agrotracker.network.Contract#CON-001"
}

# post_data(base_url + 'ProductLot', lot_2)
# post_data(base_url + 'ProductLot', lot_3)
# post_data(base_url + 'ProductLot', lot_4)


while True:

  print("Cycle started")

  #Get dummy sensor data
  temperature = random.randint(25,30)
  humidity = random.randint(40,60)
  moisture = random.randint(40,60)
  lumen = random.randint(700,1000)
  ipfs = 'Qmxx' + str(random.randint(1,100))
  note = 'ABC' + str(random.randint(1,100))
  
  for lot in range(1,2):
    print("Cycle started for LOT-00" + str(lot) )

    #Get dummy sensor data
    temperature = random.randint(25,30)
    humidity = random.randint(40,60)
    moisture = random.randint(40,60)
    lumen = random.randint(700,1000)
    ipfs = 'Qmxx' + str(random.randint(1,100))
    note = 'ABC' + str(random.randint(1,100))

    lotId = 'org.agrotracker.network.ProductLot#LOT-00' + str(lot)
    #Create JSON objects for each reading
    temperature_reading = {
      "$class": "org.agrotracker.network.TemperatureReading",
      "temperature": temperature,
      "lot": lotId
    }

    humidity_reading = {
      "$class": "org.agrotracker.network.RhReading",
      "humidity": humidity,
      "lot":lotId
    }
    
    moisture_reading = {
    "$class": "org.agrotracker.network.MoistureReading",
    "moisture": moisture,
    "lot": lotId
    }

    lumen_reading = {
      "$class": "org.agrotracker.network.LumenReading",
      "lumen": lumen,
      "lot": lotId
    }

    ipfs_reading = {
      "$class": "org.agrotracker.network.IpfsFileReading",
      "ipfsFile": ipfs,
      "lot": lotId
    }

    process_note_reading = {
      "$class": "org.agrotracker.network.ProcessNoteReading",
      "processNote": note,
      "noteTitle": note,      
      "lot": lotId
    }      
  
    post_data(base_url + 'TemperatureReading', temperature_reading)
    post_data(base_url + 'RhReading', humidity_reading)
    post_data(base_url + 'MoistureReading', moisture_reading)
    post_data(base_url + 'LumenReading', lumen_reading)
    # post_data(base_url + 'ProcessNoteReading', process_note_reading)
    #post_data(base_url + 'IpfsFileReading', ipfs_reading)


  #Sleep for 5 minutes
  #time.sleep(20)