<template>
  <div>
    <h2>게시글 등록</h2>
    <hr class="my-4" />
    <AppError v-if="error" :message="error.message" />
    <PostForm
      @submit.prevent="save"
      v-model:title="form.title"
      v-model:contents="form.contents"
    >
      <template v-slot:actions>
        <button
          type="button"
          class="btn btn-outline-dark me-2"
          @click="goListPage"
        >
          목록
        </button>
        <button class="btn btn-primary" :disabled="loading">
          <template v-if="loading">
            <span
              class="spinner-border spinner-border-sm"
              role="status"
              aria-hidden="true"
            ></span>
            <span class="visually-hidden">Loading...</span>
          </template>
          <template v-else>저장</template>
        </button>
      </template>
    </PostForm>
  </div>
</template>

<script setup>
import { inject, ref } from 'vue';
import { useRouter } from 'vue-router';
import PostForm from '@/components/posts/PostForm.vue';
import { useAlert } from '@/composables/alert';
import { useAxios } from '@/hooks/useAxios';

const { vAlert, vAlertS } = useAlert();

const format = inject('format');
const router = useRouter();
const form = ref({
  title: null,
  contents: null,
});

const url = '/posts';
const config = {
  method: 'post',
  data: { ...form.value, createdAt: format(new Date(), 'yyyy-MM-dd') },
};
const options = {
  immediate: false,
  onSuccess: () => {
    vAlertS('등록이 완료되었습니다.');
    router.push({ name: 'PostList' });
  },
  onError: (err) => {
    vAlert(err.message);
  },
};

const { error, loading, execute } = useAxios(url, config, options);

const save = async () => {
  const createdAt = format(new Date(), 'yyyy-MM-dd');
  execute({ ...form.value, createdAt });
};
// const save = async () => {
//   try {
//     loading.value = true;
//     const data = {
//       ...form.value,
//       createdAt: format(new Date(), 'yyyy-MM-dd'),
//     };
//     await createPost(data);

//     vAlertS('등록이 완료되었습니다.');
//     router.push({ name: 'PostList' });
//   } catch (err) {
//     error.value = err;
//     vAlert(err.message);
//   } finally {
//     loading.value = false;
//   }
// };
const goListPage = () => router.push({ name: 'PostList' });
</script>

<style lang="scss" scoped></style>
