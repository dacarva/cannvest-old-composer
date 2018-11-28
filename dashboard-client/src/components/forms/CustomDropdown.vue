<template>
  <div>
    <select
      v-model="selectedOption"
      @input="event => { $emit('input', event.target.value) }"
      >
      <option v-for="option in options" :value="option">{{ option }}</option>
    </select>
  </div>
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