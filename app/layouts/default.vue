<template>
  <div class="flex flex-col gap-4 md:flex-row md:gap-8 md:p-12 p-4">
    <SideBar />
    <!-- REQUIRED -->
    <div class="grow">
      <slot />
    </div>
  </div>



  
</template>