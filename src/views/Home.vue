<template>
  <div class="home">

      <div class="container">
        <Header></Header>
      </div>

   <!-- <HelloWorld msg="Welcome to Your Vue.js App"/>  -->
  
      <div class="container" id="musicList">
        <Music></Music>
      </div>
  </div>

</template>

<script>
// @ is an alias to /src
//import HelloWorld from '@/components/HelloWorld.vue'
import Header from '../components/Header.vue'
import Music from '../components/Music.vue'

export default {
  name: 'home',
  components: {
//    HelloWorld,
    Header,
    Music
  }
}
</script>
