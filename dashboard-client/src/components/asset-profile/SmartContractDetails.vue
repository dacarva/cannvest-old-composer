<template>
  <d-card v-if="contract" class="card-small mb-4">

    <!-- Card Header -->
    <d-card-header class="border-bottom">
      <h6 class="m-0">Detalles del contracto</h6>
    </d-card-header>

    <d-list-group flush >
      <d-list-group-item class="p-3">
        <d-row>
          <d-col>
            <div>
              <d-form-row>
                <!-- Lot ID -->
                <d-col md="6" class="form-group">
                  <label>ID del contrato</label>
                  <d-form-input type="text" placeholder="ID del contrato" v-bind:value="contract.contractId" readonly/>
                </d-col>
              </d-form-row>

                <!-- Detalles del productor -->
              <d-form-row>

                <d-col md="6" class="form-group">
                  <label>ID del Productor</label>
                  <d-form-input type="text" placeholder="ID del productor" v-bind:value="producerId" readonly />
                </d-col>                  

                <d-col md="6" class="form-group">
                  <label>Nombre del Productor</label>
                  <d-form-input type="text" placeholder="Nombre del productor" v-bind:value="producerName" readonly />
                </d-col>    
              </d-form-row>

                <!-- Detalles del consumidor -->
              <d-form-row>

                <d-col md="6" class="form-group">
                  <label>ID del Consumidor</label>
                  <d-form-input type="text" placeholder="ID del consumidor" v-bind:value="consumerId" readonly />
                </d-col>                  

                <d-col md="6" class="form-group">
                  <label>Nombre del Consumidor</label>
                  <d-form-input type="text" placeholder="Nombre del consumidor" v-bind:value="consumerName" readonly />
                </d-col>    
              </d-form-row>

              <d-form-row>
                <d-col md="4" class="form-group">
                  <d-form-row>
                    <d-col md="12" class="form-group">
                      <label>Precio unitario base</label>
                      <d-form-input type="number" placeholder="Precio unitario" v-bind:value="contract.unitPrice" readonly />
                    </d-col>
                  </d-form-row>
                  <d-form-row>
                    <d-col md="12" class="form-group">
                      <label>Día de llegada</label>
                      <!-- TO MAKE INPUT -->
                      <d-form-input type="text" placeholder="Día de llegada" v-bind:value="arrivalDateTime.toLocaleDateString()" readonly />
                    </d-col>
                  </d-form-row>                  

                </d-col>
                <d-col md="4" class="form-group">
                  <d-form-row>
                    <d-col md="12" class="form-group">
                    <label>Temperatura Mínima Permitida</label>
                    <d-form-input type="number" placeholder="Temperatura Mínima Permitida" v-bind:value="contract.minTemperature" readonly />
                    </d-col>
                  </d-form-row>
                  <d-form-row>
                    <d-col md="12" class="form-group">
                    <label>Temperatura Máxima Permitida</label>
                    <d-form-input type="number" placeholder="Temperatura Máxima Permitida" v-bind:value="contract.maxTemperature" readonly />
                    </d-col>
                  </d-form-row>
                </d-col>
                <d-col md="4" class="form-group">
                  <d-form-row>
                    <d-col md="12" class="form-group">
                    <label>Factor de Penalidad para Temperatura Mínima</label>
                    <d-form-input type="number" placeholder="Factor de Penalidad para Temperatura Mínima" v-bind:value="contract.minPenaltyFactor" readonly />
                    </d-col>
                  </d-form-row>
                  <d-form-row>
                    <d-col md="12" class="form-group">
                    <label>Factor de Penalidad para Temperatura Máxima</label>
                    <d-form-input type="number" placeholder="Factor de Penalidad para Temperatura Máxima" v-bind:value="contract.maxPenaltyFactor" readonly />
                    </d-col>
                  </d-form-row>                  
                </d-col>
              </d-form-row>

              <smart-contract-update-form v-if="updateNeed" :contract="contract" :arrivalDateTime="arrivalDateTime" v-on:contractUpdated="forceRerender" />

            </div>
          </d-col>
        </d-row>
      </d-list-group-item>
    </d-list-group>
  </d-card>

</template>

<script>
  import axios from 'axios';
  import SmartContractUpdateForm from '@/components/forms/SmartContractUpdateForm.vue'

  function getStringAfterSubstring (string, character) {
    return string.substring(string.indexOf(character) + character.length)
  }

  export default {
    name: 'smart-contract-details',
    data () {
      return {
        consumerName : null,
        producerName : null,
      }
    },
    props: {
      contract: {
        type: Object,
      },
      updateNeed : {
        type: Boolean
      }
    },
    methods: {

      forceRerender () {
        console.log('render called');
        this.$emit('contractUpdated');
      },

      getConsumerProducerNames () {
        const consumerEndPoint = this.$hyperledgerApiUrl + 'Consumer/' + this.consumerId;
        const producerEndPoint = this.$hyperledgerApiUrl + 'Producer/' + this.producerId;

        axios.get(consumerEndPoint).then((res) => {
            // console.log("RESPONSE RECEIVED: ", res);
            this.consumerName = res.data.name;
          }).catch((err) => {
              console.log("AXIOS ERROR: ", err);
          });    

        axios.get(producerEndPoint).then((res) => {
            // console.log("RESPONSE RECEIVED: ", res);
            this.producerName = res.data.name;
          }).catch((err) => {
              console.log("AXIOS ERROR: ", err);
          });              
      },

    },
    computed : {
      arrivalDateTime : function () {
        return new Date(this.contract.arrivalDateTime);
      },

      consumerId : function () {
        return getStringAfterSubstring(this.contract.consumer,'#');
      },
      producerId : function () {
        return getStringAfterSubstring(this.contract.producer,'#');
      },         
    },
    created () {
    },
    mounted () {
      this.getConsumerProducerNames()
    },
    components : {
      SmartContractUpdateForm
    }

  };
</script>
