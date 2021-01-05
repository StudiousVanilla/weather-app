<template>
  <div>
    <div class="container">
      <div class="main-info">
        <div class="image-container">
          <img class="main-icon icon" v-bind:src="icon" v-bind:alt="main" />
        </div>

        <div class="time-temp-container">
          <p class="main-time">
            <font-awesome-icon
              :icon="['fas', 'clock']"
              style="color:#2ECC40"
              class="icon"
            />
            {{ time }}
          </p>
          <span class="main-temp">
            <font-awesome-icon
              :icon="['fas', 'temperature-high']"
              class="temp-icon icon"
              v-bind:style="{ color: thermometer }"
            />
            {{ temperature }}
          </span>
        </div>
      </div>

      <div class="extra-container">
        <div class="legend">
          <font-awesome-icon
            :icon="['fas', 'info-circle']"
            class="icon legend-icon"
            v-on:click="legendReveal = !legendReveal"
          />
        </div>
        <div class="extra-info">
          <p>
            <font-awesome-icon
              :icon="['fas', 'wind']"
              style="color:gray"
              class="icon"
            />
            {{ wind }}
          </p>
          <p>
            <font-awesome-icon
              :icon="['fas', feelsIcon]"
              v-bind:style="{ color: thermometer }"
              class="icon"
            />
            {{ feelsLike }}
          </p>
          <p>
            <font-awesome-icon
              :icon="['fas', 'water']"
              style="color:brown"
              class="icon"
            />
            {{ humidity }}
          </p>
          <p>
            <font-awesome-icon
              :icon="['fas', 'cloud']"
              style="color:white"
              class="icon"
            />
            {{ clouds }}
          </p>
          <p>
            <font-awesome-icon
              :icon="['fas', 'calendar']"
              style="color:yellow"
              class="icon"
            />
            {{ date }}
          </p>
        </div>
        <transition name="fade">
          <div v-if="legendReveal" class="legend-info-container">
            <p class="legend-info">- Wind Speed</p>
            <p class="legend-info">- Feels Like</p>
            <p class="legend-info">- Humidty</p>
            <p class="legend-info">- Cloud Cover</p>
            <p class="legend-info">- Date</p>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
// need to add prop, or whatever, to captures seach input data which will be fed into the fetch API call url in the 'q={city}' parameter

export default {
  props: ["location"],
  watch: {
    location: function(newVal) {
      this.GetWeather(newVal);
    }
  },

  data() {
    return {
      overlayCover: false,

      data: "",

      date: "",
      dateChange: 0,
      temperature: "",
      thermometer: "",
      time: "",
      feelsLike: "",
      feelsIcon: "mug-hot",
      wind: "",
      humidity: "",
      clouds: "",
      main: "",
      icon: "",

      legendReveal: false
    };
  },
  methods: {
    async GetWeather(x) {
      try {
        // returns a promise
        const response = await fetch(
          "https://api.openweathermap.org/data/2.5/weather?q=" +
            x +
            "&appid=bab5205da283e3ba9711e3884b5780f7&lang=en"
        );
        // converts promise into a json object
        this.data = await response.json();

        // turn off overlay
        this.overlayCover = false;

        // updates wetaher information for location
        await this.setTemp();
        await this.setThermometer();
        await this.setTime();
        await this.setDate();
        await this.setFeelsLike();
        await this.setFeelsIcon();
        await this.setWind();
        await this.setHumidity();
        await this.setClouds();
        await this.setMain();
        await this.setIcon();
      } catch (err) {
        console.log(err);
        this.overlayCover = true;
      }
    },

    // adds a '0' to minute clock if needed
    getMinutes() {
      let baseTimeUTC = new Date();
      if (baseTimeUTC.getMinutes() / 10 < 1) {
        return "0" + baseTimeUTC.getMinutes();
      } else {
        return baseTimeUTC.getMinutes();
      }
    },

    setTime() {
      const baseTimeUTC = new Date();

      const timeCheck =
        // add '-3600' to 'this.data.timezone' during summer daylight savings
        baseTimeUTC.getHours() + (this.data.timezone) / 3600;

      // resets time based on 24 hour clock, moving the date value uo or down where necessary
      if (timeCheck >= 24) {
        this.dateChange = 1;
        this.time = timeCheck - 24 + ":" + this.getMinutes();
      } else if (timeCheck < 0) {
        this.dateChange = -1;
        this.time = timeCheck + 24 + ":" + this.getMinutes();
      } else {
        this.time = timeCheck + ":" + this.getMinutes();
      }
    },

    // there will be problems of timezones moving to different days
    setDate() {
      const baseTimeUTC = new Date();
      this.date =
        baseTimeUTC.getDate() +
        this.dateChange +
        "/" +
        (baseTimeUTC.getMonth() + 1) +
        "/" +
        baseTimeUTC.getFullYear();
    },

    setTemp() {
      // temp API data is converted to celsius, from kelvin, and rounded to 1 decimal place
      this.temperature =
        Math.round((this.data.main.temp - 273) * 10) / 10 + "°C";
    },

    setThermometer() {
      if (Math.round((this.data.main.temp - 273) * 10) / 10 >= 24) {
        this.thermometer = "rgb(204, 29, 29)";
      } else if (Math.round((this.data.main.temp - 273) * 10) / 10 >= 15) {
        this.thermometer = "rgb(221, 125, 15)";
      } else if (Math.round((this.data.main.temp - 273) * 10) / 10 >= 8) {
        this.thermometer = "rgb(226, 226, 14)";
      } else {
        this.thermometer = "rgb(6, 84, 173)";
      }
    },

    setFeelsLike() {
      this.feelsLike =
        Math.round((this.data.main.feels_like - 273) * 10) / 10 + "°C";
    },

    setFeelsIcon() {
      if (Math.round((this.data.main.feels_like - 273) * 10) / 10 >= 18) {
        this.feelsIcon = "pepper-hot";
      } else if (Math.round((this.data.main.feels_like - 273) * 10) / 10 >= 7) {
        this.feelsIcon = "mug-hot";
      } else {
        this.feelsIcon = "icicles";
      }
    },

    setWind() {
      this.wind = this.data.wind.speed + " m/s";
    },

    setHumidity() {
      this.humidity = this.data.main.humidity + "%";
    },

    setClouds() {
      this.clouds = this.data.clouds.all + "%";
    },

    setMain() {
      this.main = this.data.weather[0].main;
    },

    setIcon() {
      this.icon =
        "http://openweathermap.org/img/wn/" +
        this.data.weather[0].icon +
        "@2x.png";
    },

    test() {
      console.log("test");
    }
  },

  created() {
    this.GetWeather("London");
  }
};

// try catch wrap + error display a blank thang
// try catch for 'set..' methods
</script>

<style scoped>

.main-info{
  margin-top: 50px;
  display: flex;
  justify-content: space-evenly;
}

.image-container{
  height: 20vh;
}

.main-icon{
  height: 100%;
}

.time-temp-container{
  height: 20vh;
  font-size: 2.5em;
}

.extra-container{
  margin-top: 50px;
  display: flex;
  justify-content: flex-start;
  font-size: 2em;
}

.legend{
  margin-left: 20%;
}

.extra-info{
  padding-left: 5%;
}

.legend-info-container{
  padding-left: 25%;
  color: rgb(222, 225, 228);
  font-style: italic;
  opacity: 0.7;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}






@media only screen and (max-width: 768px) {

  .container {
    display: flex;
    flex-direction: column;
    margin-top: 2%;
  }

  .main-info {
    width: 100%;
    margin: 0px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    justify-content: flex-start;
    margin-top: 1%;
  }

  .image-container {
    height: 20vh;
    width: 40%;
    display: flex;
    align-items: center;
    margin: 0 0 0 10%;
  }

  .main-icon {
    height: auto;
    width: 100%;
    transform: scale(1.1);
  }

  .time-temp-container {
    height: 20vh;
    width: 40%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    font-size: 2em;
  }

  .main-time {
    margin: 5%;
  }

  .main-temp {
    margin: 5%;
  }

  .extra-container {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    font-size: 1em;
    margin-top: 1%;
  }

  .extra-info {
    width: 45%;
    font-size: 1.5em;
    margin: 0 0 0 5%;
    padding: 0;
  }

  .extra-info p {
    margin: 0 5% 20% 5%;
  }

  .icon {
    -webkit-filter: drop-shadow(3px 3px 2px rgba(0, 0, 0, 0.7));
    filter: drop-shadow(3px 3px 2px rgba(0, 0, 0, 0.7));
  }

  .legend {
    margin: 2% 0 10% 0;
    width: 100%;
    text-align: right;
    font-size: 2em;
    height: fit-content;
    color: rgb(255, 255, 255);
  }

  .legend-icon {
    margin: 0 11% 0 0;
  }

  .legend-info-container {
    width: 45%;
    font-size: 1.5em;
    height: 100%;
    font-style: italic;
    opacity: 0.5;
    padding: 0;
  }

  .legend-info {
    margin: 0 5% 20% 5%;
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.5s;
  }

  .fade-enter,
  .fade-leave-to {
    opacity: 0;
  }
}



</style>
