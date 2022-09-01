<template>
  <nav class="mt-5" aria-label="Page navigation example">
    <ul class="pagination justify-content-center">
      <li class="page-item" :class="isDisabledPrev">
        <a
          class="page-link"
          aria-label="Previous"
          @click.prevent="$emit('update:curPage', curPage - 1)"
        >
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>
      <li
        class="page-item"
        v-for="page in pageCount"
        :key="page"
        :class="{ active: curPage === page }"
      >
        <a class="page-link" @click.prevent="$emit('update:curPage', page)">
          {{ page }}
        </a>
      </li>
      <li class="page-item" :class="isDisabledNext">
        <a
          class="page-link"
          aria-label="Next"
          @click.prevent="$emit('update:curPage', curPage + 1)"
        >
          <span aria-hidden="true">&raquo;</span>
        </a>
      </li>
    </ul>
  </nav>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  curPage: {
    type: Number,
    required: true,
  },
  pageCount: {
    type: Number,
    required: true,
  },
});

defineEmits(['update:curPage']);

const isDisabledPrev = computed(() => ({ disabled: props.curPage === 1 }));
const isDisabledNext = computed(() => ({
  disabled: props.curPage === props.pageCount,
}));
</script>

<style lang="scss" scoped></style>
