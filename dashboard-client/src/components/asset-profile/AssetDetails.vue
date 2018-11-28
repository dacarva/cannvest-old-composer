<template>
  <d-card class="card-small mb-4 pt-3">

    <!-- Card Header -->
    <d-card-header class="border-bottom text-center">

      <!-- Asset Avatar -->
      <div class="mb-3 mx-auto">
        <img class="rounded-circle" :src="utils.avatar" :alt="asset.lotId" width="110">
      </div>

      <!-- Asset Name -->
      <h4 class="mb-0">ID del Lote: {{ asset.lotId }}</h4>

      <!-- Asset Job Title -->
      <span class="text-muted d-block mb-2">{{ asset.jobTitle }}</span>

      <!-- Contenido del lote -->
      <span class="text-muted d-block mb-2">Producto: {{ asset.type.toLowerCase() }}</span>


      <!-- Asset Follow -->
      <!-- <d-button pill outline size="sm" class="mb-2"> <i class="material-icons mr-1">person_add</i> Follow</d-button> -->

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

      <!-- Asset Meta -->
      <!-- <d-list-group-item>
        <strong class="text-muted d-block mb-2">{{ utils.metaTitle }}</strong>
        <span>{{ utils.metaValue }}</span>
      </d-list-group-item> -->
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
const defaultAssetDetails = {
  name: 'Sierra Brooks',
  avatar: require('@/assets/images/avatars/0.jpg'),
  jobTitle: 'Project Manager',
  performanceReportTitle: 'Workload',
  performanceReportValue: 74,
  metaTitle: 'Description',
  metaValue: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio eaque, quidem, commodi soluta qui quae minima obcaecati quod dolorum sint alias, possimus illum assumenda eligendi cumque?',
};

export default {
  name: 'asset-details',
  data () {
    return {
      utils: utils
    }
  },
  props: {
    asset: {
      type: Object,
      default() {
        return defaultAssetDetails;
      },
    },
  },
};
</script>
