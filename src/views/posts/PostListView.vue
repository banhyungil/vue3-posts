<template>
  <div>
    <h2>게시글 목록</h2>
    <hr class="mr-4" />
    <PostFilter
      v-model:title="reqParams.title_like"
      v-model:limit="reqParams._limit"
    ></PostFilter>
    <hr class="my-4" />
    <AppLoading v-if="loading"></AppLoading>
    <AppError v-else-if="error" :message="error.message"></AppError>
    <template v-else>
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
    </template>

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
      <PostDetail :id="'2'"></PostDetail>
    </AppCard>
  </div>
</template>

<script setup>
import PostItem from '@/components/posts/PostItem.vue';
import PostDetail from '@/views/posts/PostDetailView.vue';
import PostFilter from '@/components/posts/PostFilter.vue';
import PostModal from '@/components/posts/PostModal.vue';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { computed } from 'vue';
import AppLoading from '@/components/app/AppLoading.vue';
import AppError from '@/components/app/AppError.vue';
import { useAxios } from '@/hooks/useAxios';

const router = useRouter();
const reqParams = ref({
  _sort: 'createdAt',
  _order: 'desc',
  _limit: 3,
  _page: 1,
  title_like: '',
});

const {
  response,
  data: posts,
  error,
  loading,
} = useAxios('/posts', { method: 'get', params: reqParams });

// pagination
const totalCount = computed(() => response.value.headers['x-total-count']);
const pageCount = computed(() =>
  Math.ceil(totalCount.value / reqParams.value._limit),
);

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
