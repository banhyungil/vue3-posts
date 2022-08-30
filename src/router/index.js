import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import AboutView from '@/views/AboutView.vue';
import PostCreateView from '@/views/posts/PostCreateView.vue';
import PostDetailView from '@/views/posts/PostDetailView.vue';
import PostListView from '@/views/posts/PostListView.vue';
import PostEditView from '@/views/posts/PostEditView.vue';
import NotFoundView from '@/views/NotFoundView.vue';
import NestedView from '@/views/nested/NestedView.vue';
import NestedOneView from '@/views/nested/NestedOneView.vue';
import NestedTwoView from '@/views/nested/NestedTwoView.vue';
import NestedHomeView from '@/views/nested/NestedHomeView.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView,
  },
  {
    path: '/about',
    name: 'About',
    component: AboutView,
  },
  {
    path: '/posts',
    name: 'PostList',
    component: PostListView,
  },
  {
    path: '/posts/create',
    name: 'PostCreate',
    component: PostCreateView,
  },
  {
    // /posts/i
    // /posts/am
    // /posts/me
    path: '/posts/:id',
    name: 'PostDetail',
    component: PostDetailView,
    props: true,
    // props: (route) => ({ id: parseInt(route.params.id) }),
  },
  {
    path: '/posts/:id/edit',
    name: 'PostEdit',
    component: PostEditView,
  },
  {
    path: '/:pathMatch123123(.*)*', // param 뒤에 parentheses로 regexp를 사용할 수 있음. 그 뒤에는 repetable 사용(*, +, ?) *는 0번 이상 반복, 정규표현식문법이랑같다.
    name: 'NotFound',
    component: NotFoundView,
  },
  {
    path: '/nested',
    name: 'Nested',
    component: NestedView,
    children: [
      {
        path: 'one', // 부모 path는 prefix됨, 맨 앞 '/' 제외
        name: 'NestedOne',
        component: NestedOneView,
      },
      {
        path: 'two',
        name: 'NestedTwo',
        component: NestedTwoView,
      },
      {
        path: '',
        name: 'NestedHome',
        component: NestedHomeView,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  // history: createWebHashHistory(),
  routes, // Short for routes:routes
});

// HashMode
// 장점 : url 뒤에 #이 붙는다. #뒤에 주소는 무시되는데 서버배포시에 서버설정 필요없이 할 수 있다.
// 단점 : SEO에는 나쁘다.

export default router;
