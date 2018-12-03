<template>
  <d-card v-if="asset" class="card-small mb-4">

    <!-- Card Header -->
    <d-card-header class="border-bottom">
      <h6 class="m-0">Detalles del {{ assetType }}</h6>
    </d-card-header>

    <d-list-group flush >
      <d-list-group-item class="p-3">
        <d-row>
          <d-col>
            <d-form v-on:submit.prevent="handleSubmit">
              <d-form-row>

                <!-- Lot ID -->
                <d-col md="6" class="form-group">
                  <label>ID del {{ assetType }}</label>
                  <d-form-input type="text" v-bind:placeholder="'ID del' + assetType" v-bind:value="assetId" readonly/>
                </d-col>

              </d-form-row>

              <d-form-row>
                <!-- Detalles del productor o Consumidor -->
                <d-col md="6" class="form-group">
                  <label>Nombre del {{ assetType }}</label>
                  <d-form-input type="text" v-bind:placeholder="'Nombre del' + assetType" v-bind:value="assetId" readonly />

                </d-col>                  

                <!-- Correo del productor o consumidor -->

                <d-col md="6" class="form-group">
                  <label>Correo electrónico del {{ assetType }}</label>
                  <d-form-input type="email" v-bind:value="asset.email" readonly />
                </d-col>    
              </d-form-row>

              <!-- Address -->

              <d-form-row>

                <d-col md="6" class="form-group">
                  <label>Pais del {{ assetType }}</label>
                  <d-form-input type="text" v-bind:value="asset.address.country" readonly />                  
                </d-col>   

                <d-col md="6" class="form-group">
                  <label>Estado de licencia</label>
                  <br>
                  <h4 class="bg-success text-white text-center" v-if="asset.validLicense">ACTIVA</h4>
                  <h4 class="bg-danger text-white text-center" v-else>SUSPENDIDA</h4>
                </d-col>
              </d-form-row>
              <hr>

              <d-form-row>
                <!-- Detalles del productor o Consumidor -->
                <d-col md="6" class="form-group">
                  <label>Actualización del país del {{ assetType }}</label>
                  <d-form-input type="text" v-bind:state="countryState" placeholder="País" v-model="updatedParticipantData.country"  />                  
                  <d-form-invalid-feedback v-if="countryState === 'invalid'">Por favor escriba una código de país válido</d-form-invalid-feedback>

                </d-col>                  

                <!-- Correo del productor o consumidor -->

                <d-col md="6" class="form-group">
                  <label>Actualización de correo electrónico</label>
                  <d-form-input type="email" v-bind:state="emailState" placeholder="E-mail" v-model="updatedParticipantData.email"  />
                  <d-form-invalid-feedback v-if="emailState === 'invalid'">Por favor escriba una dirección de correo electrónico válida</d-form-invalid-feedback>

                </d-col>    
              </d-form-row>

              <d-form-row>

                <d-col md="6" class="form-group text-center">
                  <d-button type="submit" >Actualizar datos</d-button>
                </d-col>
                <d-col md="6" class="form-group text-center">
                  <d-button theme="danger" v-if="asset.validLicense" v-on:click="suspendLicense">Suspender Licencia</d-button>
                  <d-button theme="success" v-else v-on:click="activateLicense">Activar Licencia</d-button>

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

  function getStringAfterSubstring (string, character) {
    return string.substring(string.indexOf(character) + character.length)
  }

  export default {
    name: 'participant-account-details',
    data () {
      return {
        updatedParticipantData : {
          country: null,
          email: null,
        },
        payLoad : {
          "$class": this.asset.$class,
          "accountBalance": this.asset.accountBalance,
          "validLicense": this.asset.validLicense,
          "email": this.asset.email,
          "address" : {
            "$class": "org.agrotracker.network.Address",
            "country": this.asset.address.country            
          }               
        }
      }
    },
    props: {
      asset: {
        type: Object,
        default: 'Account Details',
      },
    },
    methods: {
      handleSubmit () {

        //Something has changed
        if (this.updatedParticipantData.country || this.updatedParticipantData.email) {
          //Country has changed
          if (this.updatedParticipantData.country) {
            this.payLoad.address.country = this.updatedParticipantData.country;
          }
          //Email has changed
          if (this.updatedParticipantData.email) {
            this.payLoad.email = this.updatedParticipantData.email;
          }
          this.writeOnBlockchain(this.payLoad);
        }
      },
      suspendLicense () {
        if (this.asset.validLicense) {
          this.payLoad.validLicense = false;
          this.writeOnBlockchain(this.payLoad);
        }
      },
      activateLicense () {
        if (!this.asset.validLicense) {
          this.payLoad.validLicense = true;
          this.writeOnBlockchain(this.payLoad);
        }
      },      
      writeOnBlockchain(payLoad) {
        const assetType = getStringAfterSubstring(this.asset.$class,'org.agrotracker.network.');
        const endPoint = this.$hyperledgerApiUrl + assetType + '/' + this.asset.participantId;
        axios.put(endPoint, payLoad, this.$hyperledgerApiConfig).then((res) => {
          console.log("RESPONSE RECEIVED: ", res);
          this.$emit('participantUpdated');
        }).catch((err) => {
            console.log("AXIOS ERROR: ", err);
        });

      },
    },
    computed: {  
      assetType : function () {
        const assetType = getStringAfterSubstring(this.asset.$class,'org.agrotracker.network.');
        if (assetType === 'ProductLot') {
          return 'Lote';
        }
        else if (assetType === 'Producer') {
          return 'Productor';
        }
        else if (assetType === 'Consumer') {
          return 'Consumidor';
        }
        return 'N/A';
      },
      assetId : function () {
        const assetType = getStringAfterSubstring(this.asset.$class,'org.agrotracker.network.');
        if (assetType === 'ProductLot') {
          return this.asset.lotId;
        }
        else if (assetType === 'Producer') {
          return this.asset.participantId;
        }
        else if (assetType === 'Consumer') {
          return this.asset.participantId;
        }
        return 'No ID';
      },
      emailState: function () {
        if (this.updatedParticipantData.email !== null )  {
          if  (this.updatedParticipantData.email === '') {
            return 'invalid';
          }          
          return 'valid';
        }
        return null;
      },
      countryState: function () {
        if (this.updatedParticipantData.country !== null ) {
          if  (this.updatedParticipantData.country === '') {
            return 'invalid';
          }     
          return 'valid';
        }
        return null;
      }                
    },
    created () {

    },
    mounted () {

    },

  };
</script>
