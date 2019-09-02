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
                  <label>ID del Lote</label>
                  <d-form-input type="text" placeholder="ID del Lote" v-bind:value="asset.lotId" readonly/>
                </d-col>

                <!-- Product Type -->
                <d-col md="6" class="form-group">
                  <label>Tipo de producto</label>
                  <d-form-input type="text" placeholder="Tipo de producto"  v-bind:value="productType[asset.type]" readonly/>
                </d-col>
              </d-form-row>
              <d-form-row>
                <!-- Lot ID -->
                <d-col md="6" class="form-group">
                  <label>Número de unidades</label>
                  <d-form-input type="text" placeholder="Número de unidades" v-bind:value="asset.unitCount" readonly/>
                </d-col>

                <!-- Product Type -->
                <d-col md="6" class="form-group">
                  <label>Estado de producción</label>
                  <d-form-input type="text" placeholder="Tipo de producto"  v-bind:value="productionStage[asset.status]" readonly/>
                </d-col>
              </d-form-row>              

              <d-form-row>
                <!-- Detalles del productor -->
                <!-- Productor -->
                <d-col md="6" class="form-group">
                  <label for="assetProducer">ID del Productor</label>
                  <d-form-input type="email" placeholder="ID del Productor" v-bind:value="productLotProducerId" readonly />
                </d-col>

                <d-col md="6" class="form-group">
                  <label for="assetProducer">Nombre del Productor</label>
                  <d-form-input type="email" placeholder="Nombre del Productor" v-bind:value="productLotProducerId" readonly />
                </d-col>
              </d-form-row>

              <d-form-row>
                <d-col md="6" class="form-group">
                  <label for="producerEmail">Correo electrónico del Productor</label>
                  <d-form-input type="email" placeholder="Email del Productor" v-bind:value="productLotProducer.email" readonly />
                </d-col>
                <d-col md="6" class="form-group">
                  <label for="producerCountry">País del Productor</label>
                  <d-form-input type="text" placeholder="País del Productor" v-bind:value="productLotProducer.address.country" readonly />              
                </d-col>                    
              </d-form-row>

              <!-- Address -->

              <d-form-row>

                <d-col md="6" class="form-group">
                  <label>Estado de licencia</label>
                  <br>
                  <d-button theme="success" class="mb-2 mr-1"  v-if="productLotProducer.validLicense">Activa</d-button>
                  <d-button theme="danger" class="mb-2 mr-1"  v-if="!productLotProducer.validLicense">Inactiva</d-button>
                </d-col>          
              </d-form-row>
            </d-form>
          </d-col>
        </d-row>
      </d-list-group-item>
    </d-list-group>


  </d-card>

</template>

<script>
  import axios from 'axios';

  function getStringAfterSubstring (string, character) {
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
        productionStage : {
          'SEEDED' : 'SEMBRADO',
          'HARVESTED' : 'COSECHADO',
          'DELIVERED' : 'ENTREGADO'
        },
        productType : {
          'CANNABIS' : 'CANNABIS',
          'COCA' : 'COCA',
          'POPPY' : 'AMAPOLA'
        },        
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
        axios.get(this.$hyperledgerApiUrl + 'Contract/' + this.selectedLotContractId).then(response => {
          this.selectedLotContract = response.data;
          this.productLotProducerId = getStringAfterSubstring(this.selectedLotContract.producer,"#");
          this.productLotConsumerId = getStringAfterSubstring(this.selectedLotContract.consumer,"#");                   
        });  
      },
      getConsumerData () {
        axios.get(this.$hyperledgerApiUrl + 'Consumer/' + this.productLotConsumerId).then(response => {
          this.productLotConsumer = response.data[0];
        });  
      },
      getProducerData () {
        axios.get(this.$hyperledgerApiUrl + 'Producer/' + this.productLotProducerId).then(response => {
          this.productLotProducer = response.data[0];
        });  
      }      
    },
    computed: {  
      selectedLotContractId: function () {
        return getStringAfterSubstring(this.asset.contract,"#");
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
