<template>
  <d-form v-on:submit.prevent="handleSubmit">
    <hr>
    <d-form-row>
      <d-col md="6" class="form-group">
        <label>Precio unitario base actualizado</label>
        <d-input type="number" min="0" placeholder="Precio unitario" v-model="updatedContractData.unitPrice" v-bind:state="unitPriceState" />
      </d-col>             
      <d-col md="6" class="form-group">
        <label>Día de llegada actualizado</label>
        <d-datepicker v-model="updatedContractData.arrivalDateTime"/>
      </d-col>                   
    </d-form-row>
    <d-form-row>
      <d-col md="6" class="form-group">
          <label>Temperatura Mínima Permitida actualizada</label>
          <d-form-input type="number" placeholder="Temperatura Mínima Permitida" v-model="updatedContractData.minTemperature" v-bind:state="minTemperatureState" />                  
      </d-col>
      <d-col md="6" class="form-group">
          <label>Temperatura Máxima Permitida actualizada</label>
          <d-form-input type="number" placeholder="Temperatura Máxima Permitida" v-model="updatedContractData.maxTemperature" v-bind:state="maxTemperatureState" />                  
      </d-col>
    </d-form-row>
    <d-form-row>
      <d-col md="6" class="form-group">
          <label>Factor de Penalidad para Temperatura Mínima actualizado</label>
          <d-form-input type="number" placeholder="Factor de Penalidad para Temperatura Mínima" v-model="updatedContractData.minPenaltyFactor" min="0" v-bind:state="minPenaltyFactorState" />            
      </d-col>
      <d-col md="6" class="form-group">
          <label>Factor de Penalidad para Temperatura Máxima actualizado</label>
          <d-form-input type="number" placeholder="Factor de Penalidad para Temperatura Máxima" v-model="updatedContractData.maxPenaltyFactor" min="0" v-bind:state="maxPenaltyFactorState" />               
      </d-col>
    </d-form-row>
    <d-form-row>
      <d-col md="12" class="form-group text-center">
        <d-button type="submit" >Actualizar datos</d-button>
      </d-col>
    </d-form-row>    
  </d-form>
</template>

<script>
  import axios from 'axios';

  export default {
    name: 'smart-contract-update-form',
    data () {
      return {
        updatedContractData : {
          unitPrice: null,
          minTemperature: null,
          maxTemperature: null,
          minPenaltyFactor: null,
          maxPenaltyFactor: null,
          arrivalDateTime : this.arrivalDateTime,
        },
        payLoad : {
          "$class": "org.agrotracker.network.Contract",
          "contractId": this.contract.contractId,
          "producer": this.contract.producer,
          "consumer": this.contract.consumer,
          "arrivalDateTime": this.contract.arrivalDateTime,
          "unitPrice": this.contract.unitPrice,
          "minTemperature": this.contract.minTemperature,
          "maxTemperature": this.contract.maxTemperature,
          "minPenaltyFactor": this.contract.minPenaltyFactor,
          "maxPenaltyFactor": this.contract.maxPenaltyFactor
        }             
      }
    },
    props : {
      contract: {
        type: Object
      },
      arrivalDateTime : {
        type : Date
      }
    },
    methods : {
      checkValidState (data) {
        if (data !== null )  {
          if  (data=== '') {
            return 'invalid';
          }          
          return 'valid';
        }
        return null;
      },
      handleSubmit () {
        let changed = false;
          // If arrival DateTime has changed
        if (this.updatedContractData.arrivalDateTime !== this.arrivalDateTime) {
          // console.log('date changed')
          let updatedDateTime = this.updatedContractData.arrivalDateTime;
          updatedDateTime.setHours(0);
          updatedDateTime.setMinutes(0);
          updatedDateTime.setSeconds(0);
          this.payLoad.arrivalDateTime = updatedDateTime;
          changed = true;
        }
        if (this.updatedContractData.unitPrice && (Number(this.updatedContractData.unitPrice) !== this.contract.unitPrice)) {
          this.payLoad.unitPrice = this.updatedContractData.unitPrice;
          changed = true;
        }
        if (this.updatedContractData.minTemperature && (Number(this.updatedContractData.minTemperature) !== this.contract.minTemperature)) {
          this.payLoad.minTemperature = this.updatedContractData.minTemperature;
          changed = true;
        }
        if (this.updatedContractData.maxTemperature && (Number(this.updatedContractData.maxTemperature) !== this.contract.maxTemperature)) {
          this.payLoad.maxTemperature = this.updatedContractData.maxTemperature;
          changed = true;
        }
        if (this.updatedContractData.minPenaltyFactor && (Number(this.updatedContractData.minPenaltyFactor) !== this.contract.minPenaltyFactor)) {
          this.payLoad.minPenaltyFactor = this.updatedContractData.minPenaltyFactor;
          changed = true;
        }
        if (this.updatedContractData.maxPenaltyFactor && (Number(this.updatedContractData.maxPenaltyFactor) !== this.contract.maxPenaltyFactor)) {
          this.payLoad.maxPenaltyFactor = this.updatedContractData.maxPenaltyFactor;
          changed = true;
        }                                        
        if (changed) {
          //check than min temperature is less than max temperature
          // console.log('changed')
          if (this.payLoad.minTemperature < this.payLoad.maxTemperature) {
            this.writeOnBlockchain();
          }
          else {
            //INVALID TRANSACTION
            alert('Verifique el valor de temperatura mínimo es menor al valor de temperatura máximo');
          }
        }
        else {
            alert('No se realizaron cambios al contrato');
        }
      },
      writeOnBlockchain() {
        const endPoint = this.$hyperledgerApiUrl + 'Contract/' + this.contract.contractId;
        axios.put(endPoint, this.payLoad, this.$hyperledgerApiConfig).then((res) => {
          // console.log("RESPONSE RECEIVED: ", res);
          alert('El contrato se ha modificado satisfactoriamente');
          this.$emit('contractUpdated');
        }).catch((err) => {
          console.log("AXIOS ERROR: ", err);
        });
      },      

    },    
    computed : {

      unitPriceState: function () {
        return this.checkValidState(this.updatedContractData.unitPrice);
      },
      minTemperatureState: function () {
        return this.checkValidState(this.updatedContractData.minTemperature);
      },
      maxTemperatureState: function () {
        return this.checkValidState(this.updatedContractData.maxTemperature);
      },
      minPenaltyFactorState: function () {
        return this.checkValidState(this.updatedContractData.minPenaltyFactor);
      },
      maxPenaltyFactorState: function () {
        return this.checkValidState(this.updatedContractData.maxPenaltyFactor);
      }      
    },

  }
</script>