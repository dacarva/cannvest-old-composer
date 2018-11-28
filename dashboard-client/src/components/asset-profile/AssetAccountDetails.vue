<template>
  <d-card v-if="productLotProducer" class="card-small mb-4">

    <!-- Card Header -->
    <d-card-header class="border-bottom">
      <h6 class="m-0">Detalles del producto</h6>
    </d-card-header>

    <d-list-group flush>
      <d-list-group-item class="p-3">
        <d-row>
          <d-col>
            <d-form>
              <d-form-row>

                <!-- Lot ID -->
                <d-col md="6" class="form-group">
                  <label for="assetId">ID del Lote</label>
                  <d-form-input type="text" id="assetId" placeholder="ID del Lote" v-bind:value="asset.lotId" readonly/>
                </d-col>

                <!-- Product Type -->
                <d-col md="6" class="form-group">
                  <label for="assetProductType">Tipo de producto</label>
                  <d-form-input type="text" id="assetProductType" placeholder="Tipo de producto"  v-bind:value="asset.type" readonly/>
                </d-col>

              </d-form-row>

              <d-form-row>
                <!-- Detalles del productor -->
                <!-- Productor -->
                <d-col md="6" class="form-group">
                  <label for="assetProducer">Nombre del Productor</label>
                  <d-form-input type="email" id="assetProducer" placeholder="Nombre del Productor" v-bind:value="productLotProducerId" readonly />
                </d-col>

                <!-- Password -->
                <d-col md="6" class="form-group">
                  <label for="producerEmail">Correo electrónico del Productor</label>
                  <d-form-input type="email" id="producerEmail" placeholder="Email del Productor" v-bind:value="productLotProducer.email" readonly />
                </d-col>

              </d-form-row>

              <!-- Address -->

              <d-form-row>
                <d-col md="6" class="form-group">
                  <label for="producerCountry">País del Productor</label>
                  <d-form-input type="text" id="producerCountry" placeholder="País del Productor" v-bind:value="productLotProducer.address.country" readonly />              
                </d-col>    
                <d-col md="6" class="form-group">
                  <label>Estado de licencia</label>
                  <br>
                  <d-button theme="success" class="mb-2 mr-1" id="" v-if="productLotProducer.validLicense">Activa</d-button>
                  <d-button theme="danger" class="mb-2 mr-1" id="" v-if="!productLotProducer.validLicense">Inactiva</d-button>
                  
                </d-col>          
              </d-form-row>

              <!-- <d-form-row> -->
                <!-- City -->
                <!-- <d-col md="6" class="form-group">
                  <label for="feInputCity">City</label>
                  <d-form-input type="text" id="feInputCity" />
                </d-col> -->

                <!-- State -->
                <!-- <d-col md="4" class="form-group">
                  <label for="feInputState">State</label>
                  <d-select :value="null" id="feInputState">
                    <option :value="null" selected>Choose...</option>
                    <option>...</option>
                  </d-select>
                </d-col> -->

                <!-- Zip Code -->
                <!-- <d-col md="2"  class="form-group">
                  <label for="inputZip">Zip</label>
                  <input type="text" class="form-control" id="inputZip">
                </d-col> -->

              <!-- </d-form-row> -->
            </d-form>
          </d-col>
        </d-row>
      </d-list-group-item>
    </d-list-group>


  </d-card>

</template>

<script>
  import axios from 'axios';

  const hyperledgerApiUrl = "http://localhost:3000/api/";

  function stringAfterCharacter (string, character) {
    return string.substring(string.indexOf(character) + character.length)
  }

  export default {
    name: 'asset-account-details',
    data () {
      return {
        selectedLotContract: null,
        productLotProducerId: '',
        productLotConsumerId: '',
        productLotConsumer: null,
        productLotProducer: null,
      }
    },
    props: {
      asset: {
        type: Object,
        default: 'Account Details',
      },
    },
    methods: {
      getContractData () {
        axios.get(hyperledgerApiUrl + 'Contract/' + this.selectedLotContractId).then(response => {
          this.selectedLotContract = response.data;
          this.productLotProducerId = stringAfterCharacter(this.selectedLotContract.producer,"#");
          this.productLotConsumerId = stringAfterCharacter(this.selectedLotContract.consumer,"#");                   
        });  
      },
      getConsumerData () {
        axios.get(hyperledgerApiUrl + 'Consumer/' + this.productLotConsumerId).then(response => {
          this.productLotConsumer = response.data[0];
        });  
      },
      getProducerData () {
        axios.get(hyperledgerApiUrl + 'Producer/' + this.productLotProducerId).then(response => {
          this.productLotProducer = response.data[0];
        });  
      }      
    },
    computed: {
      selectedLotContractId: function () {
        return stringAfterCharacter(this.asset.contract,"#");
      },
    },
    created () {
      this.getContractData(),
      this.getConsumerData(),
      this.getProducerData()
    },
    mounted () {
    },

  };
</script>
