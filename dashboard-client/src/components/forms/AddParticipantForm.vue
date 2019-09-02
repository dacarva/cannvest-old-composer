<template>
  <d-card class="card-small">

    <!-- Form Example -->
    <d-card-header class="border-bottom">
      <h6 class="m-0">Agregar un nuevo {{ participantTypeEs }}</h6>
    </d-card-header>

    <d-list-group flush>
      <d-list-group-item class="p-3">
        <d-row>
          <d-col>
            <d-form v-on:submit.prevent="handleAddParticipant">
              <d-form-row>

                <d-col md="6" class="form-group">
                  <label>ID del {{ participantTypeEs }}</label>
                  <d-input type="text" :placeholder="'ID del ' + participantTypeEs" v-bind:state="participantIdState" v-model="participantId" required/>
                  <d-form-invalid-feedback v-if="participantIdState === 'invalid'">Por favor escriba un código de identificación de lote válido</d-form-invalid-feedback>

                </d-col>
                <d-col md="6">
                  <label>Nombre del {{ participantTypeEs }}</label>
                  <d-input type="text" :placeholder="'Nombre del ' + participantTypeEs " v-bind:state="participantNameState" v-model="participantName" required/>  
                  <d-form-invalid-feedback v-if="participantNameState === 'invalid'">Por favor escriba un nombre de participante válido</d-form-invalid-feedback>                  
                </d-col>
              </d-form-row>
              <d-form-row>
                <d-col md="6" class="form-group">
                  <label>País del {{ participantTypeEs }}</label>
                  <d-select v-model="participantCountry" required>
                    <option v-for="(country, index) in $countryCodes" :key="index">{{country}}</option>
                  </d-select>
                </d-col>
                <d-col md="6">
                  <label>Correo electrónico del {{ participantTypeEs }}</label>
                  <d-input type="email" :placeholder="'Correo electrónico del ' + participantTypeEs " v-bind:state="participantEmailState" v-model="participantEmail" required/>  
                  <d-form-invalid-feedback v-if="participantEmailState === 'invalid'">Por favor escriba un correo electrónico válido</d-form-invalid-feedback>                  
                </d-col>
              </d-form-row>
              <d-form-row>
                <d-col md="6">
                  <label>Balance de cuenta ($)</label>
                  <d-input type="number" placeholder="Balance de cuenta ($)" v-bind:state="participantAccountBalanceStante" v-model="participantAccountBalance" min="0" required/>  
                  <d-form-invalid-feedback v-if="participantAccountBalanceStante === 'invalid'">Por favor escriba un balance válido</d-form-invalid-feedback>                  
                </d-col>                 
              </d-form-row>
              <hr>
              <d-button type="submit">Crear {{ participantTypeEs }}</d-button>
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
    name: 'add-participant-form',
    data () {
      return {
        participantId : null,
        existingParticipantIds : null,
        participantEmail : null,
        participantCountry: null,
        participantName : null,
        participantAccountBalance: null,
      }
    },
    props: {
      participantType : String
    },
    methods: {

      handleAddParticipant () {
        axios.get(this.$hyperledgerApiUrl + this.participantType).then(response => {
          console.log(response);
          this.existingParticipantIds = Array.from(response.data.map(a => a.lotId));
        }).then(x => {
          let inParticipants = false;
          for (let i = 0; i < this.existingParticipantIds.length; i++) {
            if (this.participantId === this.existingParticipantIds[i]) {
              inParticipants = true;
              break;
            }
          }
          if (!inParticipants) {
            this.writeOnBlockchain();
          }
          else {
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
        console.log(this.payLoad);
        const endPoint = this.$hyperledgerApiUrl + this.participantType;
        axios.post(endPoint, this.payLoad, this.$hyperledgerApiConfig).then((res) => {
          console.log("RESPONSE RECEIVED: ", res);
          alert('El ' + this.participantTypeEs + ' se ha agregado satisfactoriamente');
          this.$emit('participantAdded');
        }).catch((err) => {
            console.log("AXIOS ERROR: ", err);
          alert('El ' + this.participantTypeEs + ' NO se ha agregado. Int∑éntelo de nuevo');
        });

      },

    },
    computed : {
      participantTypeEs : function () {
        if (this.participantType === 'Producer') {
          return 'Productor';
        }
        if (this.participantType === 'Consumer') {
          return 'Consumidor';
        }
        return null;
      },
      payLoad : function () {
        return {
          "$class": "org.agrotracker.network." + this.participantType,
          "accountBalance": this.participantAccountBalance, // By default
          "validLicense": true, // By default
          "email": this.participantEmail,
          "participantId": this.participantId,
          "name" : this.participantName,
          "address": {
            "country" : this.participantCountry
          }
        }
      },
      participantEmailState: function () {
        return this.checkValidState(this.participantEmail);
      },
      participantIdState: function () {
        return this.checkValidState(this.participantId);
      },
      participantCountryState: function () {
        return this.checkValidState(this.participantCountry);
      },
      participantAccountBalanceStante: function () {
        return this.checkValidState(this.participantAccountBalance);
        // return null;
      },
      participantNameState: function () {
        return this.checkValidState(this.participantName);
      },                          
    },
    components: {
    },    
  }
</script>

