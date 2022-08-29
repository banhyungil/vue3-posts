<template>
  <div>
    <h2>게시글 등록</h2>
    <hr class="my-4" />
    <form action="">
      <div class="mb-3">
        <label for="exampleFormControlInput1" class="form-label">제목</label>
        <input
          type="text"
          class="form-control"
          id="title"
          v-model="form.title"
        />
      </div>
      <div class="mb-3">
        <label for="exampleFormControlTextarea1" class="form-label">내용</label>
        <textarea
          class="form-control"
          id="contents"
          rows="3"
          v-model="form.contents"
        ></textarea>
      </div>
      <div class="pt-4">
        <button
          type="button"
          class="btn btn-outline-dark me-2"
          @click="goListPage"
        >
          목록
        </button>
        <button class="btn btn-primary" @click="save">저장</button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { createPost } from '@/api/posts';

const router = useRouter();
const form = ref({
  title: null,
  content: null,
});

const save = () => {
  try {
    const data = {
      ...form.value,
      createdAt: Date.now(),
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
