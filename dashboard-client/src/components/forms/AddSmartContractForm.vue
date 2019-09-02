
<template>
  <d-card class="card-small">

    <!-- Form Example -->
    <d-card-header class="border-bottom">
      <h6 class="m-0">Agregar un nuevo contrato</h6>
    </d-card-header>
    <d-list-group flush >
      <d-list-group-item class="p-3">
        <d-row>
          <d-col>
            <d-form v-on:submit.prevent="handleAddContract">
              <d-form-row>
                <!-- Lot ID -->
                <d-col md="6" class="form-group">
                  <label>ID del contrato</label>
                  <d-form-input type="text" placeholder="ID del contrato" v-model="contractId" v-bind:state="contractIdState"  required/>
                  <d-form-invalid-feedback v-if="contractIdState === 'invalid'">Por favor escriba un código de contrato válido</d-form-invalid-feedback>
                </d-col>
              </d-form-row>

                <!-- Detalles del productor -->
              <d-form-row>

                <d-col md="6" class="form-group">
                  <label>ID del Productor</label>
                  <d-select v-model="producerId" required>
                    <option v-for="(producer, index) in existingProducerIds" :key="index">{{producer}}</option>
                  </d-select>                  
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
                  <d-select v-model="consumerId" required>
                    <option v-for="(consumer, index) in existingConsumerIds" :key="index">{{consumer}}</option>
                  </d-select>                     
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
                      <label>Precio unitario base ($)</label>
                      <d-form-input type="number" placeholder="Precio unitario" v-model="unitPrice" v-bind:state="unitPriceState" min="0" required />       
                      <d-form-invalid-feedback v-if="unitPriceState === 'invalid'">Por favor escriba un precio unitario válido</d-form-invalid-feedback>
                    </d-col>
                  </d-form-row>
                  <d-form-row>
                    <d-col md="12" class="form-group">
                      <label>Día de llegada</label>
                      <d-datepicker v-model="arrivalDateTime"/> 
                    </d-col>
                  </d-form-row>                     
                </d-col>

                <d-col md="4" class="form-group">
                  <d-form-row>
                    <d-col md="12" class="form-group">
                    <label>Temperatura Mínima Permitida</label>
                    <d-form-input type="number" placeholder="Temperatura Mínima Permitida" v-model="minTemperature" v-bind:state="minTemperatureState" required />
                      <d-form-invalid-feedback v-if="minTemperatureState === 'invalid'">Por favor escriba un valor de temperatura mínima válido</d-form-invalid-feedback>
                    </d-col>
                  </d-form-row>
                  <d-form-row>
                    <d-col md="12" class="form-group">
                    <label>Temperatura Máxima Permitida</label>
                    <d-form-input type="number" placeholder="Temperatura Máxima Permitida" v-model="maxTemperature" v-bind:state="maxTemperatureState" required />
                      <d-form-invalid-feedback v-if="maxTemperatureState === 'invalid'">Por favor escriba un valor de temperatura máximo válido</d-form-invalid-feedback>
                    </d-col>
                  </d-form-row>
                </d-col>
                <d-col md="4" class="form-group">
                  <d-form-row>
                    <d-col md="12" class="form-group">
                    <label>Factor de Penalidad para Temperatura Mínima</label>
                    <d-form-input type="number" placeholder="Factor de Penalidad Mínimo" v-model="minPenaltyFactor" v-bind:state="minPenaltyFactorState" min="0" required />
                    <d-form-invalid-feedback v-if="minPenaltyFactorState === 'invalid'">Por favor escriba un valor de penalidad para temperatura máxima válido</d-form-invalid-feedback>
                    </d-col>
                  </d-form-row>
                  <d-form-row>
                    <d-col md="12" class="form-group">
                    <label>Factor de Penalidad para Temperatura Máxima</label>
                    <d-form-input type="number" placeholder="Factor de Penalidad Máximo" v-model="maxPenaltyFactor" v-bind:state="maxPenaltyFactorState" min="0" required />
                    <d-form-invalid-feedback v-if="maxPenaltyFactorState === 'invalid'">Por favor escriba un valor de penalidad para temperatura mínima válido</d-form-invalid-feedback>
                    </d-col>
                  </d-form-row>                  
                </d-col>                          
              </d-form-row>
              <d-form-row>
                <d-col md="12" class="form-group text-center">
                  <d-button type="submit" >Actualizar datos</d-button>
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

  export default {
    name: 'add-smart-contract-form',
    data () {
      return {
        contractId : null,
        unitPrice : null,
        arrivalDateTime: new Date(),
        minTemperature: null,
        maxTemperature: null,
        minPenaltyFactor: null,
        maxPenaltyFactor: null,            
        existingConsumerIds : null,
        existingProducerIds : null,
        existingConsumers : null,
        existingProducers : null,
        consumerId : null,
        producerId : null,                
      }
    },
    methods: {
      handleAddContract () {
        axios.get(this.$hyperledgerApiUrl + 'Contract').then(response => {
          console.log(response);
          this.existingContractIds = Array.from(response.data.map(a => a.contractId));
        }).then(x => {
          let inContracts = false;
          for (let i = 0; i < this.existingContractIds.length; i++) {
            if (this.contractId === this.existingContractIds[i]) {
              inContracts = true;
              break;
            }
          }
          if (!inContracts) {
            this.writeOnBlockchain();
          }
          else {
            alert('El ID seleccionado ya está en uso. Por favor utilizar otro ID');
          }
        }).catch((err) => {
          console.log("AXIOS ERROR: ", err);
        });
      },

      getParticipantIds(participant) {
        const endPoint = this.$hyperledgerApiUrl + participant;
        axios.get(endPoint).then((res) => {
          // console.log("RESPONSE RECEIVED: ", res);
          const participantIdArray = Array.from(res.data.map(a => a.participantId));
          const participantArray = Array.from(res.data.map(a => a));

          if (participant === 'Consumer') {
            this.existingConsumers = participantArray;
            this.existingConsumerIds = participantIdArray;
          }
          if (participant === 'Producer') {
            this.existingProducers = participantArray;
            this.existingProducerIds = participantIdArray;
          }            
          }).catch((err) => {
              console.log("AXIOS ERROR: ", err);
          }); 
      },

      checkValidState (data) {
        if (data !== null )  {
          if  (data=== '') {
            return 'invalid';
          }          
          return 'valid';
        }
        return null;
      },

      writeOnBlockchain() {
        console.log(this.payLoad);
        const endPoint = this.$hyperledgerApiUrl + 'Contract'
        axios.post(endPoint, this.payLoad, this.$hyperledgerApiConfig).then((res) => {
          console.log("RESPONSE RECEIVED: ", res);
          alert('El contrato se ha agregado satisfactoriamente');
          this.$emit('contractAdded');
        }).catch((err) => {
            console.log("AXIOS ERROR: ", err);
          alert('El contrato NO se ha agregado. Inténtelo de nuevo');
        });

      },

    },
    computed : {
      consumerName : function () {
        if(this.existingConsumers) {
          for (let i = 0; i < this.existingConsumers.length; i++) {
            if (this.existingConsumers[i].participantId === this.consumerId ) {
              return this.existingConsumers[i].name;
            }
          }
        }
        return null;
      },
      producerName : function () {
        if (this.existingProducers){
          for (let i = 0; i < this.existingProducers.length; i++) {
            if (this.existingProducers[i].participantId === this.producerId ) {
              return this.existingProducers[i].name;
            }
          }
        }
        return null;
      },      
      payLoad : function () {
        return {
          "$class": "org.agrotracker.network.Contract",
          "contractId": this.contractId,
          "producer": this.producerId,
          "consumer": this.consumerId,
          "arrivalDateTime": this.payLoadDateTime,
          "unitPrice": this.unitPrice,
          "minTemperature": this.minTemperature,
          "maxTemperature": this.maxTemperature,
          "minPenaltyFactor": this.minPenaltyFactor,
          "maxPenaltyFactor": this.maxPenaltyFactor
        }
      },
      payLoadDateTime: function () {
        let dateTime = this.arrivalDateTime;
        dateTime.setHours(0);
        dateTime.setMinutes(0);
        dateTime.setSeconds(0);
        return dateTime.toISOString();
      },
      contractIdState: function () {
        return this.checkValidState(this.contractId);
      },      
      unitPriceState: function () {
        return this.checkValidState(this.unitPrice);
      },
      minTemperatureState: function () {
        return this.checkValidState(this.minTemperature);
      },
      maxTemperatureState: function () {
        return this.checkValidState(this.maxTemperature);
      },
      temperatureDifferenceValidState : function () {
        if ((this.minTemperatureState === 'valid') && (this.maxTemperatureState === 'valid')) {
          if (this.minTemperatureState < this.maxTemperatureState) {
            return true;
          }
        }
        return false;
      },          
      minPenaltyFactorState: function () {
        return this.checkValidState(this.minPenaltyFactor);
      },
      maxPenaltyFactorState: function () {
        return this.checkValidState(this.maxPenaltyFactor);
      },              
    },
    components: {
    },
    created () {
      this.getParticipantIds('Consumer'),
      this.getParticipantIds('Producer')
    }
  }
</script>

