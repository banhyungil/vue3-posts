<template>
  <div>
    <h2>게시글 수정</h2>
    <hr class="my-4" />
    <PostForm
      @submit.prevent="edit"
      v-model:title="form.title"
      v-model:contents="form.contents"
    >
      <template v-slot:actions>
        <button
          type="button"
          class="btn btn-outline-danger me-2"
          @click="goDetailPage"
        >
          취소
        </button>
        <button class="btn btn-primary">수정</button>
      </template>
    </PostForm>
    <AppAlert :items="alerts"></AppAlert>
  </div>
</template>

<script setup>
import { getPostById, updatePost } from '@/api/posts';
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import PostForm from '@/components/posts/PostForm.vue';

const route = useRoute();
const router = useRouter();
const id = route.params.id;

const form = ref({
  title: null,
  contents: null,
  createdAt: null,
});

const fetchPost = async () => {
  try {
    const { data } = await getPostById(id);
    setForm(data);
  } catch (error) {
    console.error(error);
    vAlert(error.message);
  }
};
fetchPost();

const setForm = ({ title, contents, createdAt }) => {
  form.value.title = title;
  form.value.contents = contents;
  form.value.createdAt = createdAt;
};

const edit = async () => {
  try {
    await updatePost(id, { ...form.value }); // spread operator
    vAlert('수정이 완료되었습니다!', 'success');
  } catch (error) {
    console.error(error);
    vAlert(error.message);
  }
};

const goDetailPage = () => router.push({ name: 'PostDetail', params: { id } });

// alert
const alerts = ref([]);
const vAlert = (message, type = 'error') => {
  alerts.value.push({ message, type });

  setTimeout(() => {
    alerts.value.shift();
  }, 2000);
};
</script>

<style lang="scss" scoped></style>
