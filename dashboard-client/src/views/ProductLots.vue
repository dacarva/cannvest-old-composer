<template>

  <d-container fluid class="main-content-container px-4">
    <custom-dropdown  :options="productLotIds" v-model="selectedLotId" > </custom-dropdown>
    <asset-profile v-if="selectedLot" :asset="selectedLot"></asset-profile>
    <asset-data v-if="selectedLot" :asset="selectedLot" :key="componentKey"></asset-data>
  </d-container>
    
</template>

<script>
  import axios from 'axios';
  import CustomDropdown from '@/components/forms/CustomDropdown.vue';
  // import IpfsUploader from '@/components/forms/IpfsUploader.vue';

  import AssetProfile from '@/components/assets-participants/AssetProfile.vue';
  import AssetData from '@/components/assets-participants/AssetData.vue';


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
      }
    },
    methods: {
      getProductLots () {
        axios.get(this.$hyperledgerApiUrl + 'ProductLot').then(response => {
          this.productLotIds = response.data.map(a => a.lotId);
          this.productLots = response.data.map(a => a);
        });
      },
      forceRerender () {
        this.componentKey += 1;  
      }
    },
    mounted () {
    },
    created () {
      this.getProductLots();
    },
    computed: {
      selectedLot : function () {
        for (let i = 0; i < this.productLots.length; i++){
          let lot = this.productLots[i];
          if (lot.lotId === this.selectedLotId){
            this.forceRerender();
            return lot;
          }
        }
        return null;
      },
    },
    components: {
      CustomDropdown,
      AssetProfile,
      AssetData,
      // IpfsUploader
    }
  }
</script>