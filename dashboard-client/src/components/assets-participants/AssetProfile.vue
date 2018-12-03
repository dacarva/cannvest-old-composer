<template>
  <div>
    <!-- Page Header -->
    <d-row no-gutters class="page-header py-4">
      <d-col col sm="4" class="text-center text-sm-left mb-4 mb-sm-0">
        <span class="text-uppercase page-subtitle"></span>
        <!-- <h3 class="page-title">Características del Lote</h3> -->
      </d-col>
    </d-row>

    <!-- Content -->
    <d-row>
      <d-col lg="4">
        <asset-details :asset="asset"></asset-details> 
      </d-col>
      <d-col lg="8">
        <asset-account-details :asset="asset" v-if="assetType === 'Lote'" />

        <participant-account-details :asset="asset" v-if="assetType !== 'Lote'" v-on:participantUpdated="forceRerender"  />

      </d-col>
    </d-row>
  </div>
</template>

<script>
import AssetDetails from '@/components/asset-profile/AssetDetails.vue';
import ParticipantAccountDetails from '@/components/asset-profile/ParticipantAccountDetails.vue';
import AssetAccountDetails from '@/components/asset-profile/AssetAccountDetails.vue';



function getStringAfterSubstring(parentString, substring) {
    return parentString.substring(parentString.indexOf(substring) + substring.length)
}

export default {
  name: 'asset-profile',
  data () {
    return {
      componentKey: 0,
    }
  },
  props: {
    asset: {
      type: Object,
      required: true,
    },
  },
  methods: {
    forceRerender () {
      this.$emit('dataChanged')
    }   
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
    }
  },
  components: {
    AssetDetails,
    ParticipantAccountDetails,
    AssetAccountDetails
  },
  mounted() {
  },
};
</script>

