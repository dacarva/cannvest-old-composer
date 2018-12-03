<template>

  <d-container fluid class="main-content-container px-4">
    <custom-dropdown  :options="producerIds" v-model="selectedProducerId" v-on:input="setSelectedProducer"> </custom-dropdown>
    <asset-profile v-if="selectedProducer" :asset="selectedProducer" :key="componentKey" v-on:dataChanged="setSelectedProducer"></asset-profile>
  </d-container>
    
</template>

<script>
  import axios from 'axios';
  import CustomDropdown from '@/components/forms/CustomDropdown.vue';

  import AssetProfile from '@/components/assets-participants/AssetProfile.vue';

  function stringAfterCharacter (string, character) {
    return string.substring(string.indexOf(character) + character.length)
  }

  export default {
    data () {
      return {
        producerIds: [],
        producers: [],
        selectedProducerId : '',
        componentKey: 0,
        selectedProducer: null
      }
    },
    methods: {
      getProducers () {
        axios.get(this.$hyperledgerApiUrl + 'Producer/').then(response => {
          this.producerIds = response.data.map(a => a.participantId);
          this.producers = response.data.map(a => a);
        });
      },
      setSelectedProducer () {
        if (this.selectedProducer === null) {
          for (let i = 0; i < this.producers.length; i++){
            let producer = this.producers[i];
            if (producer.participantId === this.selectedProducerId){
              this.selectedProducer = producer;
            }
          } 
        }
        else {
          axios.get(this.$hyperledgerApiUrl + 'Producer/' + this.selectedProducerId).then(response => {
            this.selectedProducer = response.data;
          });
        }
        this.forceRerender();
      },
      forceRerender () {
        this.componentKey += 1;
      }
    },
    mounted () {
    },
    created () {
      this.getProducers();
      this.setSelectedProducer();
    },
    computed: {
    },
    components: {
      CustomDropdown,
      AssetProfile,
    }
  }
</script>