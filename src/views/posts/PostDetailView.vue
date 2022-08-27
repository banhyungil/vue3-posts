<template>
  <div>
    <h2>{{ form.title }}</h2>
    <p>{{ form.contents }}</p>
    <p class="text-muted">{{ form.createdAt }}</p>
    <hr class="my-4" />
    <div class="row g-2">
      <div class="col-auto">
        <button class="btn btn-outline-dark">이전글</button>
      </div>
      <div class="col-auto">
        <button class="btn btn-outline-dark">다음글</button>
      </div>
      <div class="col-auto me-auto"></div>
      <div class="col-auto">
        <button @click="goListPage" class="btn btn-outline-dark">목록</button>
      </div>
      <div class="col-auto">
        <button @click="goEditPage" class="btn btn-outline-dark">수정</button>
      </div>
      <div class="col-auto">
        <button class="btn btn-outline-danger">삭제</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router';
import { getPostById } from '@/api/posts';
import { ref } from 'vue';

const route = useRoute();
const router = useRouter();
const id = route.params.id;
/**
 * object 선언시 ref, reactive 비교
 * ref
 * 장) .value를 통해 ref 상태 유지하며 object 할당가능
 * 단) form.value.title, form.value.content
 *
 * reactive
 * 장) .value 없이 접근 가능
 * 단) 객체할당시 reactive 상태 손실
 */
const form = ref({});
// reactive()

const fetchPost = () => {
  const data = getPostById(id);
  form.value = { ...data };
};
const goListPage = () => {
  router.push({ name: 'PostList' });
};
fetchPost();

const goEditPage = () => {
  router.push({ name: 'PostEdit', params: { id } });
};
</script>

<style lang="scss" scoped></style>
