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
import { useRoute, useRouter } from 'vue-router';
import PostForm from '@/components/posts/PostForm.vue';
import { useAlert } from '@/composables/alert';
import { useAxios } from '@/hooks/useAxios';

const { vAlert, vAlertS } = useAlert();
const route = useRoute();
const router = useRouter();
const id = route.params.id;

const { data: form, loading, error } = useAxios(`/posts/${id}`);

// edit
const url = `/posts/${id}`;
const config = { method: 'patch' };
const options = {
  immediate: false,
  onSuccess: () => {
    vAlertS('수정이 완료되었습니다!');
    router.push({ name: 'PostDetail' });
  },
  onError: (err) => {
    vAlert(err.message);
  },
};

const {
  loading: editLoading,
  error: editError,
  execute,
} = useAxios(url, config, options);

const edit = () => {
  execute({ ...form.value });
};

// const edit = async () => {
//   try {
//     editLoading.value = true;
//     await updatePost(id, { ...form.value }); // spread operator
//     vAlertS('수정이 완료되었습니다!');
//     router.push({ name: 'PostDetail' });
//   } catch (err) {
//     editError.value = err;
//     vAlert(err.message);
//   } finally {
//     editLoading.value = false;
//   }
// };

const goDetailPage = () => router.push({ name: 'PostDetail', params: { id } });
</script>

<style lang="scss" scoped></style>
