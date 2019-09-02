<template>
  <d-card v-if="contract" class="card-small mb-4">

    <!-- Card Header -->
    <d-card-header class="border-bottom">
      <h6 class="m-0">Detalles de la transacción</h6>
    </d-card-header>

    <d-list-group flush >
      <d-list-group-item class="p-3">
        <d-row>
          <d-col>
            <d-form v-on:submit.prevent="executeTransaction">
              <d-form-row>
                <d-col md="4" class="form-group">
                  <label>Temperatura mínima registrada(ºC)</label>
                  <d-form-input type="number" placeholder="Temperatura mínima registrada(ºC)" v-bind:value="lowestTemperatureReading.temperature"  readonly/>
                </d-col>
                <d-col md="4" class="form-group">
                  <label>Temperatura máxima registrada(ºC)</label>
                  <d-form-input type="number" placeholder="Temperatura máxima registrada(ºC)" v-bind:value="highestTemperatureReading.temperature"  readonly/>
                </d-col>
                <d-col md="4" class="form-group">
                  <label>Número de unidades</label>
                  <d-form-input type="number" placeholder="Número de unidades" v-bind:value="selectedLot.unitCount"  readonly/>
                </d-col>                                              
              </d-form-row>
              <d-form-row>
                <d-col md="4" class="form-group">
                  <label>Penalidad por temperatura mínima</label>
                  <d-form-input type="number" placeholder="Penalidad por temperatura mínima" v-bind:value="minTemperaturePenalty"  readonly/>
                </d-col>
                <d-col md="4" class="form-group">
                  <label>Penalidad por temperatura máxima</label>
                  <d-form-input type="number" placeholder="Penalidad por temperatura máxima" v-bind:value="maxTemperaturePenalty"  readonly/>
                </d-col> 
                <d-col md="4" class="form-group">
                  <label>Pago sin penalidades ($)</label>
                  <d-form-input type="number" placeholder="Pago sin penalidades" v-bind:value="originalPayment"  readonly/>
                </d-col>                             
              </d-form-row>
              <d-form-row>
                <d-col md="4" class="form-group">
                  <label>Penalidad total por unidad</label>
                  <d-form-input type="number" placeholder="TPenalidad total por unidad" v-bind:value="totalUnitPenalty"  readonly/>
                </d-col>                

                <d-col md="4" class="form-group">
                  <label>Penalidad total en el lote</label>
                  <d-form-input type="number" placeholder="Penalidad por temperatura máxima" v-bind:value="totalLotPenalty"  readonly/>
                </d-col> 
                <d-col md="4" class="form-group">
                  <label>Pago tras penalidades ($)</label>
                  <d-form-input type="number" placeholder="Pago tras penalidades" v-bind:value="totalPayment"  readonly/>
                  <h6 v-if="totalPayment === 0">Se hizo la entrega después de la fecha establecida en el contrato. La paga será igual a 0</h6>
                </d-col>                               
              </d-form-row>
              <div v-if="this.selectedLot.status !== 'DELIVERED'">
                <d-button  type="submit">Ejecutar Transacción</d-button>
              </div>
              <div v-else>
                <h4 >El producto ya ha sido entregado</h4>
              </div>
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
    name: 'product-lot-received-transaction',
    data () {
      return {
        lowestTemperatureReading : null,
        highestTemperatureReading : null,
        minTemperaturePenalty : null,
        maxTemperaturePenalty : null,
      }
    },
    props: {
      selectedLot : {
        type : Object
      },
      contract : {
        type : Object
      }
    },
    methods: {
      executeTransaction () {
        if (new Date(this.contract.arrivalDateTime) < new Date()){
          alert('Se hizo la entrega después de la fecha establecida en el contrato. La paga será igual a 0');
        }
        this.writeOnBlockchain();
      },
      writeOnBlockchain() {
        const endPoint = this.$hyperledgerApiUrl + 'ProductLotReceived';
        axios.post(endPoint, this.payLoad, this.$hyperledgerApiConfig).then((res) => {
          // console.log("RESPONSE RECEIVED: ", res);
          alert('El contrato se ha modificado satisfactoriamente');
          this.$emit('transactionExecuted');
        }).catch((err) => {
          console.log("AXIOS ERROR: ", err);
        });
      },
      calculatePenalties () {
        let temperatureReadings = this.selectedLot.temperatureReadings;
        if (temperatureReadings) {
          temperatureReadings.sort(function(a,b){
            return a.temperature - b.temperature;
          });
          this.lowestTemperatureReading = temperatureReadings[0];
          this.highestTemperatureReading = temperatureReadings[temperatureReadings.length - 1];
          let penalty = 0;
          // does the lowest temperature violate the contract?
          if (this.lowestTemperatureReading.temperature < this.contract.minTemperature) {
            this.minTemperaturePenalty = (this.contract.minTemperature - this.lowestTemperatureReading.temperature) * this.contract.minPenaltyFactor;
            penalty += this.minTemperaturePenalty;
          }
          else {
            this.minTemperaturePenalty = 0;
          }
          // does the highest temperature violate the contract?
          if (this.highestTemperatureReading.temperature > this.contract.maxTemperature) {
              this.maxTemperaturePenalty = (this.highestTemperatureReading.temperature - this.contract.maxTemperature) * this.contract.maxPenaltyFactor;
              penalty += this.maxTemperaturePenalty;
          }
          else {
            this.maxTemperaturePenalty = 0;
          }
          // console.log('total penalty', penalty * this.selectedLot.unitCount)
        }
      }
    },
    computed : {
      totalUnitPenalty : function () {
        return (this.minTemperaturePenalty + this.maxTemperaturePenalty).toFixed(2);
      },
      totalLotPenalty : function () {
        return this.totalUnitPenalty * this.selectedLot.unitCount;
      },
      originalPayment : function () {
        return this.contract.unitPrice * this.selectedLot.unitCount;
      },
      totalPayment : function () {
        if (new Date(this.contract.arrivalDateTime) < new Date()){
          return 0;
        }
        return this.originalPayment - this.totalLotPenalty;
      },
      payLoad : function () {
        return {
          "$class": "org.agrotracker.network.ProductLotReceived",
          "lot": "org.agrotracker.network.ProductLot#" + this.selectedLot.lotId,
        }
      }
    },
    created () {
      this.calculatePenalties();
    },
    mounted () {
    },
    components : {
    }

  };
</script>
