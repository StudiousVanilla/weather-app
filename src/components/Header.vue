<template>
  <div>
    <p class="top-banner">Oisín's Weather App</p>
    <div class="search">
      <span class="material-icons">search</span>
      <!-- Runs function 'test' and binds data variable 'location' to whatever is written into the input field upon submission-->
      <form v-on:submit.prevent>
        <input
          class="search-input"
          type="text"
          placeholder="London..."
          v-model="location"
          @keyup="$emit('update:location', location)"
        />
        <!-- Also emits the value of 'location' which is caught by the parent component, to in turn be then sent to the Weaher component  -->
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      location: ""
    };
  },
  methods: {}
};
</script>

<style scoped>
.top-banner {
  text-align: center;
  font-size: 7vw;
  color: rgb(255, 255, 255);
  padding: 2vh 0 2vh 0;
  border-bottom: 1px solid rgb(90, 87, 87);
}

.search {
  background-color: transparent;
  width: 100%;
  font-size: 5vw;
  padding: 1vh 0;
  display: flex;
  justify-content: flex-start;
  align-items: baseline;

  box-shadow: 0 2px 4px -1px rgba(0, 0, 0, 0.2), 0 4px 5px 0 rgba(0, 0, 0, 0.14),
    0 1px 10px 0 rgba(0, 0, 0, 0.12);
}

span {
  font-size: 4vw;
  margin: 0 1.5vw 0 2vw;
}

form {
  width: 80%;
}

.search-input {
  width: 100%;
  padding: 1vw 2vw;
  border: none;
  outline-color: rgb(245, 209, 174);
  background-color: transparent;
}

.search-input:focus {
  border-color: rgb(223, 187, 226);
}

::-webkit-input-placeholder {
  font-style: italic;
  opacity: 0.5;
  color: white;
}
:-moz-placeholder {
  font-style: italic;
  opacity: 0.5;
  color: white;
}
::-moz-placeholder {
  font-style: italic;
  opacity: 0.5;
  color: white;
}
:-ms-input-placeholder {
  font-style: italic;
  opacity: 0.5;
  color: white;
}
</style>
