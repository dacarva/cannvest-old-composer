<template>
  <div>
    <d-card-header class="border-bottom">
      <h6 class="m-0">Agregar Nota</h6>
    </d-card-header>

    <d-list-group flush>
      <d-list-group-item class="p-3">
        <d-row>
          <d-col>
            <d-form v-on:submit.prevent="handleSubmit">
              <d-form-row>
                <d-col md="6" class="form-group">
                  <label>Título</label>
                  <!-- <d-input type="text" placeholder="Título" v-model="processNote.noteTitle" required /> -->
                  <d-input type="text" v-bind:state="titleState" placeholder="Título" v-model="processNote.noteTitle" required />

                  <d-form-invalid-feedback v-if="titleState === 'invalid'">Por favor agregue un título a la nota</d-form-invalid-feedback>
                  <!-- <d-form-valid-feedback></d-form-valid-feedback> -->
                </d-col>
                <d-col md="6" class="form-group">
                  <label>Nota</label>
                  <d-textarea v-bind:state="noteState" rows="7" placeholder="Nota" v-model="processNote.noteContent" required></d-textarea>
                  <d-form-invalid-feedback v-if="noteState === 'invalid'">Por favor agregue una nota de texto</d-form-invalid-feedback>
                </d-col>
              </d-form-row>         
              <d-button type="submit" >Agregar nota de proceso</d-button>
            </d-form>
          </d-col>
        </d-row>
      </d-list-group-item>
    </d-list-group>
  </div>
</template>

<script>
  import axios from 'axios';

  export default {
    name : 'process-note',
    data () {
      return {
        processNote: {
          noteTitle: null,
          noteContent: null,
        },
      }
    },
    props : {
      productLotId: {
        type: String
      }
    },
    computed: {
        titleState: function () {
          if (this.processNote.noteTitle !== null )  {
            if  (this.processNote.noteTitle === '') {
              return 'invalid';
            }
            return 'valid';
          }
          return null;
        },
        noteState: function () {
          if (this.processNote.noteContent !== null ) {
            if  (this.processNote.noteContent === '') {
              return 'invalid';
            }            
            return 'valid';
          }
          return null;
        }        
    },
    methods : {
      handleSubmit () {
        console.log('form submitted');
        const payLoad = {
          "$class": "org.agrotracker.network.ProcessNoteReading",
          "processNote": this.processNote.noteContent,
          "noteTitle": this.processNote.noteTitle,
          "lot": "resource:org.agrotracker.network.ProductLot#" + this.productLotId
        }
        axios.post(this.$hyperledgerApiUrl + 'ProcessNoteReading', payLoad, this.$hyperledgerApiConfig).then((res) => {
          console.log("RESPONSE RECEIVED: ", res);
          this.$emit('processNoteUploaded');
        }).catch((err) => {
            console.log("AXIOS ERROR: ", err);
        });
      },
      testValidation () {
        if (this.processNote.noteTitle === null) {
          this.inputState = 'invalid';
        }
      },
    }
  }
</script>