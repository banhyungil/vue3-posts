// axios
const posts = [
  { id: 1, title: '제목1', contents: '내용1', createdAt: '2020-01-01' },
  { id: 2, title: '제목2', contents: '내용2', createdAt: '2020-02-02' },
  { id: 3, title: '제목3', contents: '내용3', createdAt: '2020-03-03' },
  { id: 4, title: '제목4', contents: '내용4', createdAt: '2020-04-04' },
  { id: 5, title: '제목5', contents: '내용5', createdAt: '2020-05-05' },
];

export function getPosts() {
  return posts;
}

export function getPostById(id) {
  const numberId = parseInt(id);
  return posts.find((item) => item.id === numberId);
}
