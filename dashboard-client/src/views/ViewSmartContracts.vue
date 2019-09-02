<template>

  <d-container fluid class="main-content-container px-4">
    <h4>Selección de Contrato</h4>
    <custom-dropdown  :options="contractIds" v-model="selectedContractId" v-on:input="setSelectedContract"> </custom-dropdown>
    <smart-contract-details v-if="selectedContract" :contract="selectedContract" :updateNeed="true" :key="componentKey" v-on:contractUpdated="setSelectedContract" />
  </d-container>
    
</template>

<script>
  import axios from 'axios';
  import CustomDropdown from '@/components/forms/CustomDropdown.vue';
  import SmartContractDetails from '@/components/asset-profile/SmartContractDetails.vue';

  function stringAfterCharacter (string, character) {
    return string.substring(string.indexOf(character) + character.length)
  }

  export default {
    data () {
      return {
        contractIds: [],
        contracts: [],
        selectedContractId : '',
        componentKey: 0,
        selectedContract: null
      }
    },
    methods: {
      getContracts () {
        axios.get(this.$hyperledgerApiUrl + 'Contract/').then(response => {
          this.contractIds = response.data.map(a => a.contractId);
          this.contracts = response.data.map(a => a);
        });
      },
      setSelectedContract () {
        if (this.selectedContract === null) {
          for (let i = 0; i < this.contracts.length; i++){
            let contract = this.contracts[i];
            if (contract.contractId === this.selectedContractId){
              this.selectedContract = contract;
            }
          } 
        }
        else {
          axios.get(this.$hyperledgerApiUrl + 'Contract/' + this.selectedContractId).then(response => {
            this.selectedContract = response.data;
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
      this.getContracts();
      this.setSelectedContract();
    },
    computed: {
    },
    components: {
      CustomDropdown,
      SmartContractDetails
    }
  }
</script>