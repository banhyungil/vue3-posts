import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { createApp } from 'vue';
import App from './App.vue';
import router from '@/router';
import focus from './directive/focus';
import color from './directive/color';
import dateFns from './plugins/date-fns';

const app = createApp(App);
app.use(router);
app.use(dateFns);
app.directive('focus', focus);
app.directive('color', color);
app.mount('#app');
import 'bootstrap/dist/js/bootstrap.js';

// app.use(funcPlugins);
// app.use(objPlugins, { name: 'HalfRoad' });
// app.use(person, { name: '홍길동1' });
// app.use(myPlguinFn);
// console.log('MODE: ', import.meta.env.MODE);
// console.log('BASE_URL: ', import.meta.env.BASE_URL);
// console.log('PROD: ', import.meta.env.PROD);
// console.log('DEV: ', import.meta.env.DEV);
console.log('VITE_APP_API_URL: ', `${import.meta.env.VITE_APP_API_URL}posts`);
