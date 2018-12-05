<template>
  <d-card class="card-small">

    <!-- Form Example -->
    <d-card-header class="border-bottom">
      <h6 class="m-0">Agregar un nuevo Lote de producto</h6>
    </d-card-header>

    <d-list-group flush>
      <d-list-group-item class="p-3">
        <d-row>
          <d-col>
            <d-form v-on:submit.prevent="handleAddLot">
              <d-form-row>

                <d-col md="6" class="form-group">
                  <label>ID del Lote de producto</label>
                  <d-input type="text" placeholder="ID del Lote de producto" v-bind:state="productLotIdState" v-model="productLotId" required/>
                  <d-form-invalid-feedback v-if="productLotIdState === 'invalid'">Por favor escriba un código de identificación de lote válido</d-form-invalid-feedback>

                </d-col>
                <d-col md="6">
                  <label>Tipo de producto</label>
                  <d-select required v-model="selectedType">
                    <option v-for="(item, index) in productType" :key="index">
                        {{ index }}
                    </option>
                  </d-select>                                        
                </d-col>
              </d-form-row>
              <d-form-row>
                <d-col md="6" class="form-group">
                  <label>Estado del producto</label>
                  <d-select required v-model="selectedStage">
                    <option v-for="(item, index) in productionStage" :key="index">
                        {{ index }}
                    </option>
                  </d-select>
                </d-col>
                <d-col md="6">
                  <label>Unidades del producto</label>
                  <d-input type="number" placeholder="Unidades del producto" min="1" v-bind:state="productLotUnitsState" v-model="productLotUnits" value="1" required/>  
                  <d-form-invalid-feedback v-if="productLotUnitsState === 'invalid'">Por favor escriba un número de unidades válido</d-form-invalid-feedback>                  
                </d-col> 
              </d-form-row>

              <d-form-row>
                <d-col md="6" class="form-group">
                  <!-- <label>ID del contrato</label> //COMPLETAR
                  <d-input type="text" placeholder="ID del contrato" required/>   -->
                  <label>ID del contrato</label>
                  <d-select required v-model="contractId">
                    <option v-for="(contract, index) in existingContractIds" :key="index">
                        {{ contract }}
                    </option>
                  </d-select>
                </d-col>
                <d-col md="6">
                </d-col>
              </d-form-row>                                 

              <d-button type="submit">Crear Lote de producto</d-button>
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
    name: 'add-product-lot-form',
    data () {
      return {
        productionStage : {
          'SEMBRADO' : 'SEEDED',
          'COSECHADO' : 'HARVESTED',
          'ENTREGADO' : 'DELIVERED'
        },
        productType : {
          'CANNABIS' : 'CANNABIS',
          'COCA' : 'COCA',
          'AMAPOLA' : 'POPPY'
        },
        productLotId : null,
        selectedType : null,
        selectedStage : null,
        productLotUnits : null,
        existingLotIds : null,
        existingContractIds : null,
        contractId : null,
      }
    },
    methods: {
      getContracts () {
        const endPoint = this.$hyperledgerApiUrl + 'Contract';
        axios.get(endPoint).then((res) => {
          // console.log("RESPONSE RECEIVED: ", res);
          this.existingContractIds = Array.from(res.data.map(a => a.contractId)); 
          }).catch((err) => {
              console.log("AXIOS ERROR: ", err);
          });         
      },
      handleAddLot () {
        axios.get(this.$hyperledgerApiUrl + 'ProductLot').then(response => {
          console.log(response);
          this.existingLotIds = Array.from(response.data.map(a => a.lotId));
        }).then(x => {
          let inLot = false;
          for (let i = 0; i < this.existingLotIds.length; i++) {
            if (this.productLotId === this.existingLotIds[i]) {
              inLot = true;
              break;
            }
          }
          if (!inLot) {
            this.writeOnBlockchain();
          }
          else {
            this.productLotIdExistingState = 'invalid';
            alert('El ID seleccionado ya está en uso. Por favor utilizar otro ID');
          }
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
        // console.log(this.payLoad);
        const endPoint = this.$hyperledgerApiUrl + 'ProductLot';
        axios.post(endPoint, this.payLoad, this.$hyperledgerApiConfig).then((res) => {
          console.log("RESPONSE RECEIVED: ", res);
          alert('El lote de producto se ha agregado satisfactoriamente');
          this.$emit('productLotAdded');
          this.$forceUpdate();
        }).catch((err) => {
            console.log("AXIOS ERROR: ", err);
          alert('El lote de producto NO se ha agregado. Inténtelo de nuevo');
        });

      },

    },
    components: {
    },
    computed : {
      payLoad : function () {
        return {
          "$class": "org.agrotracker.network.ProductLot",
          "lotId": this.productLotId,
          "type": this.productType[this.selectedType],
          "status": this.productionStage[this.selectedStage],
          "unitCount": 100,
          "contract" : this.contractId
        }
      },
      productLotIdState: function () {
        return this.checkValidState(this.productLotId);
      },
      productLotUnitsState: function () {
        return this.checkValidState(this.productLotUnits);
      },
    },
    created () {
      this.getContracts()
    }
  }
</script>

