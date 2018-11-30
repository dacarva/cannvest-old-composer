<template>
  <div>
    <d-row>
      <!-- Users Overview -->
      <d-col lg="6" md="6" sm="12" class="mb-4">
        <!-- <sensor-chart /> -->
        <sensor-chart :title="`Temperatura (ºC)`"  :data="temperatureReadings" :labels="temperatureTimeStamp" v-if="temperatureReadings" />

      </d-col>

      <!-- Users by Device (lite) -->
      <d-col lg="6" md="6" sm="12" class="mb-4">
        <sensor-chart :title="`Humedad Relativa (%)`"  :data="rHReadings" :labels="rHTimeStamp" v-if="rHReadings" />
      </d-col>
    </d-row>
    <d-row>
      <!-- Users Overview -->
      <d-col lg="6" md="6" sm="12" class="mb-4">
        <!-- <sensor-chart /> -->
        <sensor-chart :title="`Luminosidad (lumen)`"  :data="lumenReadings" :labels="lumenTimeStamp" v-if="lumenReadings" />

      </d-col>

      <!-- Users by Device (lite) -->
      <d-col lg="6" md="6" sm="12" class="mb-4">
        <sensor-chart :title="`Humedad del Suelo (%)`"  :data="moistureReadings" :labels="moistureTimeStamp" v-if="moistureReadings" />
      </d-col>
    </d-row>
    <d-row>
      <d-col lg="12" md="12" sm="12" class="mb-4">
        <ipfs-uploader :productLotId = "productLotId"/>
      </d-col>
    </d-row>
  </div>
</template>

<script>
import SensorChart from '@/components/charts/SensorChart.vue';
import IpfsUploader from '@/components/forms/IpfsUploader.vue';



export default {
  name: 'asset-data',
  components: {
    SensorChart,
    IpfsUploader
  },
  props: {
    asset: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
    };
  },
  methods: {
  },
  computed: {
    //NOTA:WE HAVE TO ENSURE THAT WE HAVE DATA IN THE BLOCKCHAIN TO SHOW THE MODULE
    temperatureReadings: function () {
      return this.asset.temperatureReadings.map(a => a.temperature);
    },
    temperatureTimeStamp: function () {
      return this.asset.temperatureReadings.map(a => a.timestamp).map(t => {
        let date = new Date(t);
        return date.getTime();
      });
    },

    rHReadings: function () {
      return this.asset.rhReadings.map(a => a.humidity);
    },
    rHTimeStamp: function () {
      return this.asset.rhReadings.map(a => a.timestamp).map(t => {
        let date = new Date(t);
        return date.getTime();
      });
    },

    lumenReadings: function () {
      return this.asset.lumenReadings.map(a => a.lumen);
    },
    lumenTimeStamp: function () {
      return this.asset.lumenReadings.map(a => a.timestamp).map(t => {
        let date = new Date(t);
        return date.getTime();
      });
    },

    moistureReadings: function () {
      return this.asset.moistureReadings.map(a => a.moisture);
    },
    moistureTimeStamp: function () {
      return this.asset.moistureReadings.map(a => a.timestamp).map(t => {
        let date = new Date(t);
        return date.getTime();
      });
    },

    productLotId: function () {
      return this.asset.lotId;
    }
  },
};
</script>

