<template>
  <div>
    <h2>게시글 등록</h2>
    <hr class="my-4" />
    <PostForm
      @submit.prevent="save"
      v-model:title="form.title"
      v-model:contents="form.contents"
    >
      <template #actions>
        <button
          type="button"
          class="btn btn-outline-dark me-2"
          @click="goListPage"
        >
          목록
        </button>
        <button class="btn btn-primary">저장</button>
      </template>
    </PostForm>
  </div>
</template>

<script setup>
import { inject, ref } from 'vue';
import { useRouter } from 'vue-router';
import { createPost } from '@/api/posts';
import PostForm from '@/components/posts/PostForm.vue';

const format = inject('format');
const router = useRouter();
const form = ref({
  title: null,
  content: null,
});

const save = () => {
  try {
    const data = {
      ...form.value,
      createdAt: format(new Date(), 'yyyy-MM-dd'),
    };

    createPost(data);
    router.push({ name: 'PostList' });
  } catch (error) {
    console.log(error);
  }
};
const goListPage = () => router.push({ name: 'PostList' });
</script>

<style lang="scss" scoped></style>
