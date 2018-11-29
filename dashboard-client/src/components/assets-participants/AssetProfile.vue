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
        <asset-account-details :asset="asset" />
      </d-col>
    </d-row>
  </div>
</template>

<script>
import AssetDetails from '@/components/asset-profile/AssetDetails.vue';
import AssetAccountDetails from '@/components/asset-profile/AssetAccountDetails.vue';


export default {
  name: 'asset-profile',

  props: {
    asset: {
      type: Object,
      required: true,
    },
  },
  components: {
    AssetDetails,
    AssetAccountDetails
  },
};
</script>

