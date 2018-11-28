<template>
  <aside :class="['main-sidebar', 'col-12', 'col-md-3', 'col-lg-2', 'px-0', sidebarVisible ? 'open' : '']">
    <!-- <div class="main-navbar">
      <nav class="navbar align-items-stretch navbar-light bg-white flex-md-nowrap border-bottom p-0">
        <a class="navbar-brand w-100 mr-0" href="#" style="line-height: 25px;">
          <div lass="d-table m-auto">
            <img id="main-logo" class="d-inline-block align-top mr-1" style="max-width: 25px;" src="@/assets/images/shards-dashboards-logo.svg" alt="Shards Dashboard">
            <span v-if="!hideLogoText" class="d-none d-md-inline ml-1">Shards Dashboard</span>            
          </div>
        </a>
        <a class="toggle-sidebar d-sm-inline d-md-none d-lg-none" @click="handleToggleSidebar()">
          <i ></i>
        </a>
      </nav>
    </div> -->

    <!-- <form action="">
      <div>
        <div>
          <div>
            <i>

            </i>
          </div>
        </div>
        <input type="text">
      </div>
    </form> -->

    <div></div>
  </aside>
</template>
<script>
  export default {
    name: 'sidebar'
  };
</script>

<style>
  .main-sidebar {}  
</style>