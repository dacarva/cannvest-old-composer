<template>
  <d-card>
    <d-card-header class="border-bottom">
      <h6 class="m-0">Adjuntar archivos relevantes para el lote de producto</h6>
    </d-card-header>
    <d-card-body>
      <vue-dropzone id="drop1" :options="dropOptions" @vdropzone-file-added="vfileAdded" @vdropzone-success="vsuccess"></vue-dropzone>
    </d-card-body>
  </d-card>

</template>

<script>

  import vue2Dropzone from 'vue2-dropzone';
  import * as fileReaderPullStream from 'pull-file-reader';

  import axios from 'axios';

  export default {
    name: "ipfs-uploader",
    components : {
       vueDropzone: vue2Dropzone,
    },
    data () {
      return {
        dropOptions : {
          url: "https://httpbin.org/post"
        },
      }
    },
    props: {
      productLotId: {
        type: String
      }
    },
    methods: {
      vfileAdded(file){},
      async vsuccess(file,response){

        const fileName = file.name;
        const fileStream = fileReaderPullStream(file);
        const results = await this.$ipfs.add(fileStream);
        const hash = results[0].hash;
        console.log(fileName);
        console.log(hash);
        const payLoad = {
          "$class": "org.agrotracker.network.IpfsFileReading",
          "ipfsFile": hash,
          "originalFileName": fileName,
          "lot": "resource:org.agrotracker.network.ProductLot#" + this.productLotId
        }

        axios.post(this.$hyperledgerApiUrl + 'IpfsFileReading', payLoad, this.$hyperledgerApiConfig).then((res) => {
          console.log("RESPONSE RECEIVED: ", res);
          this.$emit('ipfsFileUploaded');

        }).catch((err) => {
            console.log("AXIOS ERROR: ", err);
        });
      },
    }  
  }

</script>