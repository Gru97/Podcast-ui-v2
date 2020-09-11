<template>
    <div>
        <Sidebar/>
        <router-link :to="{name : 'NewChannel'}">
            <div style="margin: 200px 400px 0 auto!important;">ساخت کانال</div>
        </router-link>      
    </div>
</template>

<script>
import Sidebar from '@/components/Sidebar.vue'

export default {
  name: 'Home',
  components: {
    Sidebar
  },
}
</script>