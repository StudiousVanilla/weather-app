<template>
  <div>
    <AppHeader :location.sync="location"></AppHeader>
    <Weather v-bind:location="location"></Weather>
    <div></div>
  </div>
</template>

<script>
import AppHeader from "./components/Header";
import Weather from "./components/Weather";

export default {
  name: "app",

  components: { AppHeader, Weather },

  data() {
    return {
      location: ""
    };
  }
};
</script>

<style>

body{
  background: linear-gradient(to top right, white, rgb(42, 83, 160));
  height: 100vh;
}



@media only screen and (max-width: 768px) {
  * {
  margin: 0;
  padding: 0;
  font: inherit;
  vertical-align: baseline;
  font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
    "Lucida Sans", Arial, sans-serif;
}

  body {
    height: 100%;
    background: linear-gradient(to top right, white, rgb(42, 83, 160));
    min-width: 230px;
    color: black;
  }
}

</style>
