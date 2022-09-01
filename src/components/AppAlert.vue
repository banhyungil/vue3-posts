<template>
  <Transition name="slide">
    <div v-if="show" class="alert app-alert" :class="typeStyle" role="alert">
      {{ message }}
    </div>
  </Transition>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  show: {
    type: Boolean,
    default: false,
  },
  message: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    default: 'error',
    validation: (value) => ['success', 'error'].includes(value),
  },
});
// class 값을 직접 바인딩하지 않기위해 computed로 class 추출. 종속성을 낮추기 위함.
const typeStyle = computed(() =>
  props.type === 'error' ? 'alert-danger' : 'alert-primary',
);
</script>

<style scoped>
.app-alert {
  position: fixed;
  top: 10px;
  right: 10px;
}

/* .v-enter-from,
.v-leave-to {
  opacity: 0;
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}
.v-enter-to,  transition기본 클래스
.v-leave-from { 
  opacity: 1;
} */
.slide-enter-from,  /* named transition */
.slide-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}

.slide-enter-active,
.slide-leave-active {
  transition: all 0.5s ease;
}
.slide-enter-to,
.slide-leave-from {
  opacity: 1;
  transform: translateY(0px);
}
</style>
