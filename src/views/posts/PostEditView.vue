<template>
  <AppLoading v-if="loading"></AppLoading>
  <AppError v-else-if="error" :message="error.message"></AppError>
  <div v-else>
    <h2>게시글 수정</h2>
    <hr class="my-4" />
    <AppError v-if="editError" :message="editError.message" />
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
        <button class="btn btn-primary" :disabled="editLoading">
          <template v-if="editLoading">
            <span
              class="spinner-border spinner-border-sm"
              role="status"
              aria-hidden="true"
            ></span>
            <span class="visually-hidden">Loading...</span>
          </template>
          <template v-else>수정</template>
        </button>
      </template>
    </PostForm>
  </div>
</template>

<script setup>
import { getPostById, updatePost } from '@/api/posts';
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import PostForm from '@/components/posts/PostForm.vue';
import { useAlert } from '@/composables/alert';

const { vAlert, vAlertS } = useAlert();
const route = useRoute();
const router = useRouter();
const id = route.params.id;

const loading = ref(false);
const error = ref(null);

const form = ref({
  title: null,
  contents: null,
  createdAt: null,
});

const fetchPost = async () => {
  try {
    loading.value = true;
    const { data } = await getPostById(id);
    setForm(data);
  } catch (err) {
    error.value = err;
    vAlert(err.message);
  } finally {
    loading.value = false;
  }
};
fetchPost();

const setForm = ({ title, contents, createdAt }) => {
  form.value.title = title;
  form.value.contents = contents;
  form.value.createdAt = createdAt;
};

const editError = ref(null);
const editLoading = ref(false);
const edit = async () => {
  try {
    editLoading.value = true;
    await updatePost(id, { ...form.value }); // spread operator
    vAlertS('수정이 완료되었습니다!');
    router.push({ name: 'PostDetail' });
  } catch (err) {
    editError.value = err;
    vAlert(err.message);
  } finally {
    editLoading.value = false;
  }
};

const goDetailPage = () => router.push({ name: 'PostDetail', params: { id } });
</script>

<style lang="scss" scoped></style>
