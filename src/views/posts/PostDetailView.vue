<template>
  <AppLoading v-if="loading"></AppLoading>
  <AppError v-else-if="error" :message="error.message"></AppError>

  <div v-else>
    <h2>{{ post.title }}</h2>
    <p>{{ post.contents }}</p>
    <p class="text-muted">{{ post.createdAt }}</p>
    <hr class="my-4" />
    <AppError v-if="removeError" :message="removeError.message" />
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
        <button @click="goEditPage" class="btn btn-outline-primary">
          수정
        </button>
      </div>
      <div class="col-auto">
        <button
          class="btn btn-outline-danger"
          @click="remove"
          :disabled="removeLoading"
        >
          <template v-if="removeLoading">
            <span
              class="spinner-border spinner-border-sm"
              role="status"
              aria-hidden="true"
            ></span>
            <span class="visually-hidden">Loading...</span>
          </template>
          <template v-else>삭제</template>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { deletePost } from '@/api/posts';
import { ref } from 'vue';
import { useAxios } from '@/hooks/useAxios';
import { useAlert } from '@/composables/alert';

// 내장 속성 setup안에서 사용하는 법, define<props> 함수 이용
const props = defineProps({
  id: String,
});
const router = useRouter();

const { data: post, loading, error } = useAxios(`/posts/${props.id}`);
/**
 * object 선언시 ref, reactive 비교
 * ref
 * 장)
 * .value를 통해 ref 상태 유지하며 object 할당가능
 * 일관성
 * 단) post.value.title, post.value.content
 *
 * reactive
 * 장) .value 없이 접근 가능
 * 단) 객체할당시 reactive 상태 손실
 *
 * ref, reactive중 하나로 선택하여 사용하면 일관성있어 가독성이 증가하지 않을가...
 */

const goListPage = () => {
  router.push({ name: 'PostList' });
};

const { vAlert, vAlertS } = useAlert();

// remove
const url = `/posts/${props.id}`;
const config = { method: 'delete' };
const options = {
  immediate: false,
  onSuccess: () => {
    vAlertS('성공적으로 삭제 했습니다.');
    router.push({ name: 'PostList' });
  },
  onError: (err) => {
    vAlert(err.message);
  },
};

const {
  loading: removeLoading,
  error: removeError,
  execute,
} = useAxios(url, config, options);

const remove = async () => {
  if (confirm('삭제 하시겠습니까?') === false) return;
  execute();
};

const goEditPage = () => {
  router.push({ name: 'PostEdit', params: { id: props.id } });
};
</script>

<style lang="scss" scoped></style>
