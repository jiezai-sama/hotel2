import Vue from 'vue'
import router from './router'
import store from './store'
import App from './App.vue'
import VueSocketIO from 'vue-socket.io'
import axios from 'axios'
import { Button,Toast,NavBar,Swipe, SwipeItem,Lazyload  } from 'vant';


axios.defaults.baseURL='http://127.0.0.1:3000'
Vue.prototype.axios=axios;

Vue.use(Toast);
Vue.use(Button);
Vue.use(NavBar);
Vue.use(Swipe);
Vue.use(SwipeItem);
Vue.use(Lazyload);

Vue.use(new VueSocketIO({
	debug: true,
	connection: 'http://127.0.0.1:3001',
	vuex: {
		store,
		actionPrefix: 'SOCKET_',
		mutationPrefix: 'SOCKET_'
	}
}))

Vue.config.productionTip = false


new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
