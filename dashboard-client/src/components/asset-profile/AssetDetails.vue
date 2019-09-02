<template>
  <d-card class="card-small mb-4 pt-3">

    <!-- Card Header -->
    <d-card-header class="border-bottom text-center">

      <!-- Asset Avatar -->
      <div class="mb-3 mx-auto">
        <img class="rounded-circle" :src="assetAvatar" :alt="assetId" width="110">
      </div>

      <!-- Asset Name -->
      <h4 class="mb-0">ID del {{ assetType }}: {{ assetId }}</h4>

      <!-- Contenido del lote -->
      <span class="text-muted d-block mb-2">{{ assetDescription }}</span>

    </d-card-header>

    <d-list-group flush>

      <!-- Asset Performance Report -->
      <d-list-group-item class="px-4">
        <div class="progress-wrapper">
          <strong class="text-muted d-block mb-2">{{ utils.performanceReportTitle }}</strong>
          <d-progress class="progress-sm">
            <span class="progress-value">{{ utils.performanceReportValue }}%</span>
            <d-progress-bar :max="100" :value="utils.performanceReportValue" />
          </d-progress>
        </div>
      </d-list-group-item>
    </d-list-group>

  </d-card>
</template>

<script>
const utils = {
  avatar: require('@/assets/images/logos/hyperledger.png'),
  performanceReportTitle: 'Estado de producción',
  performanceReportValue: 74,
  metaTitle: 'Description',
  metaValue: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio eaque, quidem, commodi soluta qui quae minima obcaecati quod dolorum sint alias, possimus illum assumenda eligendi cumque?',
}

function getStringAfterSubstring(parentString, substring) {
    return parentString.substring(parentString.indexOf(substring) + substring.length)
}

export default {
  name : 'asset-details',
  data () {
    return {
      utils: utils
    }
  },
  props : {
    asset : {
      type: Object,
    },
  },
  computed : {
    assetAvatar : function () {
      const assetType = getStringAfterSubstring(this.asset.$class,'org.agrotracker.network.');
      if (assetType === 'ProductLot') {
        return require('@/assets/images/logos/hyperledger.png');
      }
      else if (assetType === 'Producer') {
        return require('@/assets/images/logos/agrotracker-producer.png');
      }
      else if (assetType === 'Consumer') {
        return require('@/assets/images/logos/agrotracker-consumer.png');
      }
      return require('@/assets/images/logos/hyperledger.png');
    },
    assetId : function () {
      const assetType = getStringAfterSubstring(this.asset.$class,'org.agrotracker.network.');
      if (assetType === 'ProductLot') {
        return this.asset.lotId;
      }
      else if (assetType === 'Producer') {
        return this.asset.participantId;
      }
      else if (assetType === 'Consumer') {
        return this.asset.participantId;
      }
      return 'No ID';
    },
    assetDescription : function () {
      const assetType = getStringAfterSubstring(this.asset.$class,'org.agrotracker.network.');
      if (assetType === 'ProductLot') {
        return 'Producto: ' + this.asset.type.toLowerCase() ;
      }
      else if (assetType === 'Producer') {
        return 'Productor de: ' + this.asset.address.country;
      }
      else if (assetType === 'Consumer') {
        return 'Consumidor de: ' + this.asset.address.country;
      }
      return 'N/A';
    },
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
  mounted() {
  },
};
</script>
