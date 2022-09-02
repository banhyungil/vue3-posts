import { format } from 'date-fns';
export default {
  install(app) {
    app.config.globalProperties.$format = format;
    app.provide('format', format);
  },
};
