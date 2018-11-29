<template>
  <d-card class="card-small mb-4 pt-3">
    <d-card-body>
      <label for="component-dropdown">Selección de lote de producto: </label>
      <br>
      <select
        v-model="selectedOption"
        @input="event => { $emit('input', event.target.value) }"
        >
        <option v-for="option in options" :value="option">{{ option }}</option>
      </select>      
    </d-card-body>
  </d-card>
</template>

<script>

export default {
  name: 'custom-dropdown',
  props: {
    value: null,
    options: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      selectedOption: null
    }
  },
  mounted () {
    this.selectedOption = this.value;
  },
  watch: {
    value: function (newVal) {
      this.selectedOption = newVal;
    }
  }
};

</script>