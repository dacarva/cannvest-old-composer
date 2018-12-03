<template>

  <d-container fluid class="main-content-container px-4">
    <custom-dropdown  :options="consumerIds" v-model="selectedConsumerId" v-on:input="setSelectedConsumer"> </custom-dropdown>
    <asset-profile v-if="selectedConsumer" :asset="selectedConsumer" :key="componentKey" v-on:dataChanged="setSelectedConsumer"></asset-profile>
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
        consumerIds: [],
        consumers: [],
        selectedConsumerId : '',
        componentKey: 0,
        selectedConsumer: null
      }
    },
    methods: {
      getConsumers () {
        axios.get(this.$hyperledgerApiUrl + 'Consumer/').then(response => {
          this.consumerIds = response.data.map(a => a.participantId);
          this.consumers = response.data.map(a => a);
        });
      },
      setSelectedConsumer () {
        if (this.selectedConsumer === null) {
          for (let i = 0; i < this.consumers.length; i++){
            let consumer = this.consumers[i];
            if (consumer.participantId === this.selectedConsumerId){
              this.selectedConsumer = consumer;
            }
          } 
        }
        else {
          axios.get(this.$hyperledgerApiUrl + 'Consumer/' + this.selectedConsumerId).then(response => {
            this.selectedConsumer = response.data;
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
      this.getConsumers();
      this.setSelectedConsumer();
    },
    computed: {
    },
    components: {
      CustomDropdown,
      AssetProfile,
    }
  }
</script>