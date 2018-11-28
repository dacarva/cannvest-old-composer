<template>
  <div>
    <label for="component-dropdown">Selección de lote de producto: </label>
    <custom-dropdown id="component-dropdown" :options="productLotIds" v-model="selectedLotId" > </custom-dropdown>
    <ul>
      <li v-for="(item, index) in selectedLot" :key="index">
        {{ index }} {{ item }}
      </li>
    </ul>




    <asset-profile v-if="selectedLot" :asset="selectedLot"></asset-profile>

        <d-row>
      <!-- Users Overview -->
      <d-col lg="8" md="6" sm="12" class="mb-4">
        <bo-users-overview />
      </d-col>

      <!-- Users by Device (lite) -->
      <d-col lg="4" md="6" sm="12" class="mb-4">
        <bo-users-by-device />
      </d-col>
    </d-row>
    
  </div>
</template>

<script>
  import axios from 'axios';
  import CustomDropdown from '@/components/forms/CustomDropdown.vue';
  import AssetProfile from '@/components/assets-participants/AssetProfile.vue';
  import UsersOverview from '@/components/blog/UsersOverview.vue';
  import UsersByDevice from '@/components/blog/UsersByDeviceLite.vue';

  const hyperledgerApiUrl = "http://localhost:3000/api/";

  function stringAfterCharacter (string, character) {
    return string.substring(string.indexOf(character) + character.length)
  }

  export default {
    data () {
      return {
        productLotIds: [],
        productLots: [],
        selectedLotId : '',
      }
    },
    methods: {
      getProductLots () {
        axios.get(hyperledgerApiUrl + 'ProductLot').then(response => {
          this.productLotIds = response.data.map(a => a.lotId);
          this.productLots = response.data.map(a => a);
        });
      },
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
            return lot;
          }
        }
        return null;
      },
    },
    components: {
      CustomDropdown,
      AssetProfile,
      boUsersOverview: UsersOverview,
      boUsersByDevice: UsersByDevice
    }
  }
</script>