<template>
  <div>
    <h2>게시글 목록</h2>
    <hr class="my-4" />
    <div class="row g-3">
      <div v-for="post in posts" :key="post.id" class="col-4">
        <PostItem
          :title="post.title"
          :contents="post.contents"
          :created-at="post.createdAt"
          @click="goPage(post.id)"
        ></PostItem>
      </div>
    </div>
    <hr class="my-4" />
    <AppCard>
      <PostDetail :id="2"></PostDetail>
    </AppCard>
  </div>
</template>

<script setup>
import PostItem from '@/components/posts/PostItem.vue';
import PostDetail from '@/views/posts/PostDetailView.vue';
import AppCard from '@/components/AppCard.vue';
import { getPosts } from '@/api/posts.js';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const posts = ref([]);

// destructuring assignment two ways
// 1. Binding pattern : 선언식과 함께 사용 (var, let, const)
// 2. assignment pattern : keyword로 시작하지 않음, 정해진 target key 위치에 할당 됨.
// const numbers = [];
// const obj = {a:1, b:2};
// ({ a: numbers[0], b: numbers[1] } = obj);  // 소괄호로 '{}'block으로 인식하지 않게 한다.
const fetchPosts = async () => {
  try {
    ({ data: posts.value } = await getPosts());
  } catch (error) {
    console.log(error);
  }
};

fetchPosts();

const goPage = (id) => {
  // router.push(`/posts/${id}`);
  router.push({
    name: 'PostDetail',
    params: {
      id,
    },
  });
};
</script>

<style lang="scss" scoped></style>
