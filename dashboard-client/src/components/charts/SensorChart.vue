<template>
  <d-card class="card-small h-100">

    <!-- Card Header -->
    <d-card-header class="border-bottom">
      <h6 class="m-0">{{ title }}</h6>
      <div class="block-handle"></div>
    </d-card-header>

    <d-card-body class="pt-0">


      <!-- Legend & Chart -->
      <div ref="legend"></div>
      <canvas height="200" ref="canvas" style="max-width: 100% !important;"></canvas>

    </d-card-body>
  </d-card>
</template>

<script>

//FALTA ARREGLAR EL HOVER

import Chart from '../../utils/chart';

const defaultChartData = {
  labels: Array.from(new Array(30), (_, i) => (i === 0 ? 1 : i)),
  datasets: [{
    label: 'Current Month',
    fill: 'start',
    data: [500, 800, 320, 180, 240, 320, 230, 650, 590, 1200, 750, 940, 1420, 1200, 960, 1450, 1820, 2800, 2102, 1920, 3920, 3202, 3140, 2800, 3200, 3200, 3400, 2910, 3100, 4250],
    backgroundColor: 'rgba(0,123,255,0.1)',
    borderColor: 'rgba(0,123,255,1)',
    pointBackgroundColor: '#ffffff',
    pointHoverBackgroundColor: 'rgb(0,123,255)',
    borderWidth: 1.5,
    pointRadius: 0,
    pointHoverRadius: 3,
  }],
};



export default {
  name: 'sensor-chart',
  props: {
    title: {
      type: String,
      default: 'Users Overview',
    },
    labels: {
      type: Array,
    },
    data: {
      type: Array,
    }
  },
  computed: {
    chartData: function () {
      const defaultColor = '193,58,80';
      const temperatureColor = '0,123,255';
      const hrColor = '188,196,82';
      const lumenColor = '216,145,45';
      const moistureColor = '178,219,76';

      let borderColor = 'rgba(defaultColor,1)';
      let backgroundColor = 'rgba(defaultColor,0.1)';
      let pointHoverBackgroundColor = 'rgb(defaultColor)';

      function setColor(color) {
        borderColor = 'rgba('+ color + ',1)';
        backgroundColor = 'rgba('+ color + ',0.1)';
        pointHoverBackgroundColor = 'rgb('+ color + ')';
      }

      if (this.title === 'Temperatura (ºC)'){
        setColor(temperatureColor);
      }

      if (this.title === 'Humedad Relativa (%)'){
        setColor(hrColor);
      }

      if (this.title === 'Luminosidad (lumen)'){
        setColor(lumenColor);
      }
      
      if (this.title === 'Humedad del Suelo (%)'){
        setColor(moistureColor);
      }      

      return {
        labels: this.labels,
        datasets: [{
          label: this.title,
          fill: 'start',
          data: this.data,
          backgroundColor: backgroundColor,
          borderColor: borderColor,
          pointBackgroundColor: '#ffffff',
          pointHoverBackgroundColor: pointHoverBackgroundColor,
          borderWidth: 1.5,
          pointRadius: 0,
          pointHoverRadius: 3,        
        }]
      }
    },
    chartOptions: function () {
      return {

        responsive: true,
        legend: {
          position: 'top',
          // display: false
        },
        elements: {
          line: {
            // A higher value makes the line look skewed at this ratio.
            tension: 0.3,
          },
          point: {
            radius: 0,
          },
        },
        scales: {
          xAxes: [{
            type: 'time',
            time: {
              displayFormats: {
                minute: 'DD-MM-YYYY HH:mm'
              },
            },
            ticks: {
              source: 'auto'
            }
          }],
          yAxes: [{
            ticks: {
              beginAtZero: true,
              suggestedMax: 50,
            },
            scaleLabel: {
              display: true,
              labelString: this.title
            }
          }],
        },
        hover: {
          mode: 'nearest',
          intersect: false,
        },
        tooltips: {
          custom: false,
          mode: 'nearest',
          intersect: false,
        },
              
      }
    },

    sensorChart: function () {

      const sensorChart = new Chart(this.$refs.canvas, {
        type: 'LineWithLine',
        data: this.chartData,
        options: this.chartOptions,
      });      
      return sensorChart
    }
  },

  methods:{
    renderChart () {

        
      const chartMeta = this.sensorChart.getDatasetMeta(0);
      chartMeta.data[0]._model.radius = 0;
      chartMeta.data[this.chartData.datasets[0].data.length - 1]._model.radius = 0;

      // Render the chart.
      this.sensorChart.render();
    }
  },
  mounted() {
    this.renderChart()
  }
};
</script>
