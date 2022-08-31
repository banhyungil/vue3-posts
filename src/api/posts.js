import { posts } from '.'; // index.js를 가르킨다.

export function getPosts(params) {
  return posts.get('/', { params });
}

export function getPostById(id) {
  return posts.get(id);
}

export function createPost(data) {
  return posts.post('', data);
}

// put은 전체 데이터를 수정할 때 사용하는 method
// export function updatePost(id, data) {
//   return posts.put(id, data);
// }

export function updatePost(id, data) {
  return posts.patch(id, data);
}

export function deletePost(id) {
  return posts.delete(id);
}
