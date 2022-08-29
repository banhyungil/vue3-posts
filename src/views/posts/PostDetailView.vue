<template>
  <div>
    <h2>{{ post.title }}</h2>
    <p>{{ post.contents }}</p>
    <p class="text-muted">{{ post.createdAt }}</p>
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
        <button class="btn btn-outline-danger" @click="remove">삭제</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { deletePost, getPostById } from '@/api/posts';
import { ref } from 'vue';

// 내장 속성 setup안에서 사용하는 법, define<props> 함수 이용
const props = defineProps({
  id: Number,
});
const router = useRouter();
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
const post = ref({});

const fetchPost = async () => {
  try {
    const { data } = await getPostById(props.id);
    setPost(data);
  } catch (error) {
    console.error(error);
  }
};
const setPost = ({ title, contents, createdAt }) => {
  post.value.title = title;
  post.value.contents = contents;
  post.value.createdAt = createdAt;
};

const goListPage = () => {
  router.push({ name: 'PostList' });
};
fetchPost();
const remove = async () => {
  try {
    if (confirm('삭제 하시겠습니까?') === false) return;

    await deletePost(props.id);
    router.push({ name: 'PostList' });
  } catch (error) {
    console.log(error);
  }
};

const goEditPage = () => {
  router.push({ name: 'PostEdit', params: { id: props.id } });
};
</script>

<style lang="scss" scoped></style>
