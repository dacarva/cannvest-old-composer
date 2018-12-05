<template>

  <d-container fluid class="main-content-container px-4">
    <h4>Selección de Lote de producto</h4>
    <custom-dropdown  :options="productLotIds" v-model="selectedLotId" v-on:input="setSelectedLot"> </custom-dropdown>
    <asset-profile v-if="selectedLot" :asset="selectedLot"></asset-profile>
    <smart-contract-details v-if="selectedLotContract" :updateNeed="false" :contract="selectedLotContract" />

  </d-container>
    
</template>

<script>
  import axios from 'axios';
  import CustomDropdown from '@/components/forms/CustomDropdown.vue';
  import AssetProfile from '@/components/assets-participants/AssetProfile.vue';
  import SmartContractDetails from '@/components/asset-profile/SmartContractDetails.vue';


  function stringAfterCharacter (string, character) {
    return string.substring(string.indexOf(character) + character.length)
  }

  export default {
    data () {
      return {
        productLotIds: [],
        productLots: [],
        selectedLotId : '',
        componentKey: 0,
        selectedLot: null,
        selectedLotContract : null,
      }
    },
    methods: {
      getProductLots () {
        axios.get(this.$hyperledgerApiUrl + 'ProductLot').then(response => {
          this.productLotIds = response.data.map(a => a.lotId);
          this.productLots = response.data.map(a => a);
        });
      },
      setSelectedLot () {
        if (this.selectedLot === null) {

          for (let i = 0; i < this.productLots.length; i++){
            let lot = this.productLots[i];
            if (lot.lotId === this.selectedLotId){
              this.selectedLot = lot;
              this.getSelectedLotContract();
              break;
            }
          } 
        }
        else {
          axios.get(this.$hyperledgerApiUrl + 'ProductLot/' + this.selectedLotId).then(response => {
            this.selectedLot = response.data;
            this.getSelectedLotContract();
          });
        }
        this.forceRerender();
      },
      getSelectedLotContract () {
        const contractId = stringAfterCharacter(this.selectedLot.contract,'#');
        axios.get(this.$hyperledgerApiUrl + 'Contract/' + contractId).then(response => {
          console.log(response);
          this.selectedLotContract = response.data;
          console.log('Selected lot contract',this.selectedLotContract);
        });        
      },
      forceRerender () {
        this.componentKey += 1;
      },
    },
    mounted () {
    },
    created () {
      this.getProductLots();
      this.setSelectedLot();
    },
    computed: {
    },
    components: {
      CustomDropdown,
      AssetProfile,
      SmartContractDetails
    }
  }
</script>