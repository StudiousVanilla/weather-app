import Vue from "vue";
import App from "./App.vue";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faWind,
  faTemperatureLow,
  faTemperatureHigh,
  faClock,
  faCalendar,
  faIcicles,
  faPepperHot,
  faCloud,
  faUmbrella,
  faWater,
  faMugHot,
  faInfoCircle
} from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(faTemperatureLow); // actual temperature
library.add(faTemperatureHigh); // actual temperature

library.add(faClock); // time
library.add(faCalendar); // date
library.add(faUmbrella); // precipitation %
library.add(faWind); // wind speed
library.add(faWater); // humidity
library.add(faCloud); // cloud cover

library.add(faPepperHot); // feels like hot
library.add(faMugHot); // feels like mild
library.add(faIcicles); // feels like cold

library.add(faInfoCircle); // for legend

Vue.component("font-awesome-icon", FontAwesomeIcon);

Vue.config.productionTip = false;

new Vue({
  el: "#app",
  render: h => h(App)
});
