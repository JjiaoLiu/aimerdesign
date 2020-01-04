import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from "./axios";
import BaiduMap from 'vue-baidu-map'
import './assets/element-variables.scss'
import {toast} from './utils/toast'

Vue.use(BaiduMap, {
	ak: 'cq2acx2IkAVcGyWpMDie3G9X'
});
import VueMeta from 'vue-meta'

Vue.use(VueMeta, {
	// optional pluginOptions
	refreshOnceOnNavigation: true
})
import {
	Button,
	Col,
	Row,
	Tabs,
	TabPane,
	Collapse,
	CollapseItem,
	InputNumber,
	Image,
	Message,
	MessageBox,
	Select,
	Option,
	Radio,
	RadioGroup,
	Loading
} from 'element-ui';
// fade/zoom 等
import 'element-ui/lib/theme-chalk/base.css';
// collapse 展开折叠
import CollapseTransition from 'element-ui/lib/transitions/collapse-transition';

Vue.component(CollapseTransition.name, CollapseTransition);
// import InfiniteScroll from "element-ui/packages/infiniteScroll";
import './assets/common.scss'

Vue.use(Loading.directive);
Vue.use(axios);
Vue.use(Button);
Vue.use(Col);
Vue.use(Row);
Vue.use(Tabs);
Vue.use(TabPane);
Vue.use(Collapse);
Vue.use(CollapseItem);
// Vue.use(InfiniteScroll);
Vue.use(InputNumber);
Vue.use(Select);
Vue.use(Option);
Vue.use(Image);
Vue.use(Radio);
Vue.use(RadioGroup);
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$message = Message;
Vue.prototype.$toast = toast;
import store from './store'

Vue.config.productionTip = false;
new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app');
