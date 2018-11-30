<template>
  <div class="row">
    <div class="col">
      <div class="card card-small mb-4">
        <div class="card-header border-bottom">
          <h6 class="m-0">Archivos del lote de producto</h6>
        </div>
        <div class="card-body p-0 pb-3 text-center">
          <table class="table mb-0">
            <thead class="bg-light">
              <tr>
                <th v-for="(header, index) in tableHeaders" :key="index" scope="col" class="border-0">{{ header }}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in dummyData" :key="index">
                <td v-for="(dataPoing, index) in item" :key="index">
                  {{dataPoing}}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>  
</template>

<script>
  export default {
    name: 'ipfs-table',
    data () {
      return {
        tableHeaders: ['#','Fecha','Usuario','Nombre de Archivo','Hash','Ver Archivo'],
        dummyData : [[1,'11/01','David','File01.pdf','Qmabc123','Link'],[2,'11/02','David','File02.pdf','Qmabc1234','Link'],[3,'11/03','David','File03.pdf','Qmabc12345','Link']]
      }
    }
  }
</script>