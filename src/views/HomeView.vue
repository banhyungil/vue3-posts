<template>
  <div>
    <h2>Home View</h2>
    <p>{{ $route.name }}</p>
    <button class="btn btn-primary" @click="goAboutPage">About으로 이동</button>
  </div>
  <!-- <h2>{{ $person.name }}</h2>
  <button class="btn btn-primary" @click="person.say">click person</button> -->
</template>

<script>
export default {
  created() {
    // 글로벌 전역변수는 setup에서는 못접근한다. 컴포넌트가 생성되기 전이기 떄문
    // console.log(this.$person.name);
    // this.$person.say();
    // console.log('myPlugin :', this.$myPlguinFn);
  },
};
</script>
<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();
const goAboutPage = () => {
  router.push('/about');
};

// const person = inject('person');
// console.log('person.name ', person.name);
</script>

<style lang="scss" scoped></style>
