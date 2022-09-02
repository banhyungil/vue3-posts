<template>
  <div>
    <h2>게시글 목록</h2>
    <hr class="mr-4" />
    <PostFilter
      v-model:title="reqParams.title_like"
      v-model:limit="reqParams._limit"
    ></PostFilter>
    <hr class="my-4" />
    <AppGrid :items="posts">
      <template v-slot:default="{ item }">
        <PostItem
          :title="item.title"
          :contents="item.contents"
          :created-at="item.createdAt"
          @click="goPage(item.id)"
          @modal="openModal(item)"
        ></PostItem>
      </template>
    </AppGrid>
    <AppPagination
      v-model:curPage="reqParams._page"
      :page-count="pageCount"
    ></AppPagination>

    <Teleport to="#modal">
      <PostModal
        v-model="show"
        :title="modalTitle"
        :contents="modalContents"
        :createdAt="modalCreatedAt"
      ></PostModal>
    </Teleport>
    <Teleport to="#modal">
      <div>Hello World!</div>
    </Teleport>
    <hr class="my-5" />
    <AppCard>
      <PostDetail :id="'1'"></PostDetail>
    </AppCard>
  </div>
</template>

<script setup>
import PostItem from '@/components/posts/PostItem.vue';
import PostDetail from '@/views/posts/PostDetailView.vue';
import PostFilter from '@/components/posts/PostFilter.vue';
import PostModal from '@/components/posts/PostModal.vue';
import { getPosts } from '@/api/posts.js';
import { ref, watchEffect } from 'vue';
import { useRouter } from 'vue-router';
import { computed } from 'vue';

const router = useRouter();
const posts = ref([]);
const reqParams = ref({
  _sort: 'createdAt',
  _order: 'desc',
  _limit: 3,
  _page: 1,
  title_like: '',
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

// modal
const show = ref(false);
const modalTitle = ref('');
const modalContents = ref('');
const modalCreatedAt = ref('');
const openModal = ({ title, contents, createdAt }) => {
  show.value = true;
  modalTitle.value = title;
  modalContents.value = contents;
  modalCreatedAt.value = createdAt;
};
</script>

<style lang="scss" scoped></style>
