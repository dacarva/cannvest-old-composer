<template>
  <d-container fluid class="main-content-container px-4">
    <h1>Agregar un nuevo consumidor</h1>

    <add-participant-form :key="componentKey" :participantType="'Consumer'" v-on:productLotAdded="forceRerender"/>

  </d-container>
</template>

<script>
  import AddParticipantForm from '@/components/forms/AddParticipantForm.vue'

  export default {
    name: 'add-consumer',
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
      AddParticipantForm,
    }
  }
</script>
