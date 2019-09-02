<template>
  <d-container fluid class="main-content-container px-4">
    <h1>Agregar un nuevo contrato</h1>
    <add-smart-contract-form :key="componentKey" v-on:contractAdded="forceRerender"/>
  </d-container>
</template>

<script>
  import AddSmartContractForm from '@/components/forms/AddSmartContractForm.vue'
  export default {
    name: 'add-smart-contract',
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
      AddSmartContractForm      
    }
  }
</script>
