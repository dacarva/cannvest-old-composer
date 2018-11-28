<template>
  <div class="container-fluid">
    <div class="row">
      <!-- <h1>Default here</h1> -->
      <!-- Insert sidebar -->
      <!-- <navbar></navbar> -->
      
      <!-- <sidebar></sidebar> -->

      <slot></slot>

      <!-- <footer></footer> -->

      <!-- <app-footer></app-footer> -->
      <!-- Insert content -->
    </div>
  </div>
</template>

<script>
  import Sidebar from '@/components/layout/Sidebar/Sidebar.vue';
  import Navbar from '@/components/layout/Navbar/Navbar.vue';
  import AppFooter from '@/components/layout/Footer/AppFooter.vue';

  export default {
    name : 'analytics',
    components: {
      Sidebar,
      Navbar,
      AppFooter
    },
  }
</script>