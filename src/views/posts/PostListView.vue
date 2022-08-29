<template>
  <div>
    <h2>게시글 목록</h2>
    <hr class="mr-4" />
    <form @submit.prevent>
      <div class="row g-3">
        <div class="col">
          <input
            v-model="reqParams.title_like"
            type="text"
            class="form-control"
          />
        </div>
        <div class="col-3">
          <select class="form-select" v-model="reqParams._limit">
            <option value="3">3개씩 보기</option>
            <option value="6">6개씩 보기</option>
            <option value="9">9개씩 보기</option>
          </select>
        </div>
      </div>
    </form>
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
    <nav class="mt-5" aria-label="Page navigation example">
      <ul class="pagination justify-content-center">
        <li class="page-item" :class="{ disabled: reqParams._page === 1 }">
          <a
            class="page-link"
            aria-label="Previous"
            @click.prevent="reqParams._page--"
          >
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>
        <li
          class="page-item"
          v-for="page in pageCount"
          :key="page"
          :class="{ active: reqParams._page === page }"
        >
          <a class="page-link" @click.prevent="reqParams._page = page">
            {{ page }}
          </a>
        </li>
        <li
          class="page-item"
          :class="{ disabled: reqParams._page === pageCount }"
        >
          <a
            class="page-link"
            aria-label="Next"
            @click.prevent="reqParams._page++"
          >
            <span aria-hidden="true">&raquo;</span>
          </a>
        </li>
      </ul>
    </nav>
    <hr class="my-5" />
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
import { ref, watchEffect } from 'vue';
import { useRouter } from 'vue-router';
import { computed } from 'vue';

const router = useRouter();
const posts = ref([]);
const reqParams = ref({
  _sort: 'createdAt',
  _order: 'desc',
  _limit: '3',
  _page: 1,
  title_like: '9',
});

// pagination
const totalCount = ref(0);
const pageCount = computed(() =>
  Math.ceil(totalCount.value / reqParams.value._limit),
);

// destructuring assignment two ways
// 1. Binding pattern : 선언식과 함께 사용 (var, let, const)
// 2. assignment pattern : keyword로 시작하지 않음, 정해진 target key 위치에 할당 됨.
// const numbers = [];
// const obj = {a:1, b:2};
// ({ a: numbers[0], b: numbers[1] } = obj);  // 소괄호로 '{}'block으로 인식하지 않게 한다.
const fetchPosts = async () => {
  try {
    const { data, headers } = await getPosts(reqParams.value);
    posts.value = data;
    totalCount.value = headers['x-total-count'];
  } catch (error) {
    console.log(error);
  }
};
watchEffect(fetchPosts); // 초기에 바로 실행됨.
//fetchPosts();

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
