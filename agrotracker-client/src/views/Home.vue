<template>
  <div class="small">
    <line-chart :chart-data="datacollection"></line-chart>
    <button @click="fillData()">Randomize</button>
  </div>
</template>

<script>
  import LineChart from '@/components/LineChart.js';
  import axios from 'axios';

  export default {
    components: {
      LineChart
    },
    data () {
      return {
        datacollection: null,
        response: 'not yet'
      }
    },
    created () {

    },
    mounted () {
      this.fillData()
    },
    methods: {
      fillData () {
        const composer_url = "http://localhost:3000/api/ProductLot/LOT_001";
        axios.get(composer_url).then(response => {
          let results = response.data.temperatureReadings;
          let temperature = results.map(a => a.temperature);
          let timestamp = results.map(a => a.timestamp);

          this.datacollection = {
            labels: timestamp.map(t => {
              let date = new Date(t);
              return date.getTime()
            }),
            datasets: [{
              label: 'Data One',
              backgroundColor: '#f87979',
              data: temperature
            }]
          };
        });
      },
      fetchData () {
      }
    }
  }
</script>

<style>
  .small {
    max-width: 600px;
    margin:  150px auto;
  }
</style>
