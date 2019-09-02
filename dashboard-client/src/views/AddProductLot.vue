<template>
  <d-container fluid class="main-content-container px-4">
    <h1>Agregar un nuevo lote de producto</h1>

    <add-product-lot-form :key="componentKey" v-on:productLotAdded="forceRerender"/>



  </d-container>
</template>

<script>
  import AddProductLotForm from '@/components/forms/AddProductLotForm.vue'

  export default {
    name: 'add-product-lot',
    data () {
      return {
        componentKey : 0,
      }
    },
    methods: {
      forceRerender () {
        this.componentKey += 1;
      }
    },
    components: {
      AddProductLotForm      
    }
  }
</script>
