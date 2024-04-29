<template>

  <div class="container">
    <div class="row mt-3">
      <div class="col-md-12">
        <img src="~/assets/images/banner.jpg" class="card-img-top img-fluid" style="height: 200px;object-fit: cover;opacity:1;border-radius: 10px;">
      </div>
    </div>

  </div>

</template>

<script>
import {faPlay} from '@fortawesome/free-solid-svg-icons'
export default {
  layout: 'default',
  data(){
    return {

    };
  },
  computed: {
    faPlay () {
      return faPlay
    },
  },
  mounted() {

  },
  methods: {

  },
}
</script>
