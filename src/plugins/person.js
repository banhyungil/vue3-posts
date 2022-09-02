export default {
  install(app, options) {
    const person = {
      name: 'Half',
      say() {
        alert(this.name);
      },
      ...options, // spread operator
    };
    app.config.globalProperties.$person = person; // vue instance로 접근 가능, 컴포넌트 생성 이후 접근가능 (created hook부터)
    app.provide('person', person); // inject로 접근가능 setup hook에서 사용가능
  },
};
