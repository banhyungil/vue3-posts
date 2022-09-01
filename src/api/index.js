import axios from 'axios';

function create(baseURL, options) {
  const obj = { baseURL, ...options };
  const instance = axios.create(obj); // axios instance 생성 with custom config

  return instance;
}

// export axios instance
export const posts = create(`${import.meta.env.VITE_APP_API_URL}posts`);
// development : http://localhost:5000/posts/
// production : http://localhost:5001/posts/
