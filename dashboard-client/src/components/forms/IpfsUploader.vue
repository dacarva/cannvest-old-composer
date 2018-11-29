<template>
  <div>
    <vue-dropzone id="drop1" :options="dropOptions" @vdropzone-file-added="vfileAdded" @vdropzone-success="vsuccess"></vue-dropzone>
    <button v-on:click="fillTemperature">Fill Data</button>
  </div>
</template>

<script>

  import vue2Dropzone from 'vue2-dropzone';
  import * as fileReaderPullStream from 'pull-file-reader';
  import axios from 'axios';

  /**
   * Gateways for IPFS and Composer REST API
   */

  const ipfsTunnel = 'bdbafb20.ngrok.io';
  const composerTunnel = 'http://3979b4ec.ngrok.io/api/';

// const ipfs = window.IpfsApi('localhost', '5001');
  const ipfs = window.IpfsApi(ipfsTunnel, '80', {protocol: 'http'});
  const axiosURL = composerTunnel;

  const axiosConfig = {
    headers: {
      'Content-Type': 'application/json',
      'Accept' : 'application/json'
    }
  }
  export default {
    name: "ipfs-uploader",
    components : {
       vueDropzone: vue2Dropzone
    },
    methods: {
      vfileAdded(file){
      },
      vsuccess(file,response){
        console.log(file);
        console.log(response);

        const fileStream = fileReaderPullStream(file);

        // let content = ipfs.types.Buffer.from(file);
        let results = ipfs.files.add(fileStream).then((res) => {
          let hash = res[0].hash;
          console.log(hash);
          //when IPFS hash created
          //GET test
          axios.get(axiosURL + 'grower').then((grower) => {
            console.log(grower);
          });

          let postData = {
            "$class": "org.acme.shipping.perishable.Grower",
            "email": "david3@grower.com",
            "address": {
              "$class": "org.acme.shipping.perishable.Address",
              "country": "COL",
              "city" : hash
            },
            "accountBalance": 0
          };


          //POST test
          axios.post(axiosURL + 'grower', postData, axiosConfig).then((res) => {
            console.log("RESPONSE RECEIVED: ", res);
          }).catch((err) => {
            console.log("AXIOS ERROR: ", err);
          });
        });
      },
      fillTemperature(){

        let i;
        for (i = 0; i < 5; i++){
          let t = 20 + (Math.random() * 5);

          let temperatureData = {
            "$class": "org.acme.shipping.perishable.TemperatureReading",
            "centigrade": t,
            "shipment": "resource:org.acme.shipping.perishable.Shipment#SHIP_001",
          }
          
          axios.post(axiosURL + 'temperatureReading', temperatureData, axiosConfig).then((res) => {
              console.log("RESPONSE RECEIVED: ", res);
          }).catch((err) => {
              console.log("AXIOS ERROR: ", err);
          });
        }
      }
    },
    data: () => ({
      dropOptions: {
        url: "https://httpbin.org/post"
      }
    }),
  }

</script>