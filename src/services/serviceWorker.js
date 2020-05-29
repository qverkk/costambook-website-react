import axios from 'axios';

const url = "http://localhost:8090"

export const fetchPosts = async () => {
  const token = localStorage.token
  const response = await axios({
    method: 'GET',
    url: `${url}/posts`,
    headers: {
      "Authorization": token
    }
  })

  return response.data;
}

export const fetchPostsForUserId = async data => {
  const token = localStorage.token
  const response = await axios({
    method: 'GET',
    url: `${url}/posts`,
    params: {
      userId: data.userId
    },
    headers: {
      "Authorization": token,
      "Content-type": "application/json"
    }
  })

  return response.data;
}

export const fetchCommentsForPostId = async postId => {
  const token = localStorage.token
  const response = await axios({
    method: 'GET',
    url: `${url}/comments`,
    params: {
      postId: postId
    },
    headers: {
      "Authorization": token
    }
  })

  return response.data;
}

export const createCommentForPost = async (data) => {
  const token = localStorage.token
  const user = localStorage.userId

  let request = JSON.stringify({
    "postId": data.postId,
    "userId": user,
    "text": data.comment
  });

  console.log(request)

  const response = await axios({
    method: 'POST',
    url: `${url}/comments`,
    data: request,
    headers: {
      "Authorization": token,
      "Content-type": "application/json"
    }
  })

  return response.data;
}

export const fetchLikes = async (data) => {
  const token = localStorage.token

  const response = await axios({
    method: 'GET',
    url: `${url}/likes`,
    data: data,
    params: {
      "postId": data.postId
    },
    headers: {
      "Authorization": token,
      "Content-type": "application/json"
    }
  })

  return response.data;
}

export const postLikes = async (data) => {
  const token = localStorage.token

  const response = await axios({
    method: 'POST',
    url: `${url}/likes`,
    data: data,
    headers: {
      "Authorization": token,
      "Content-type": "application/json"
    }
  })

  return response.data;
}

export const getUserData = async (data) => {
  const token = localStorage.token

  const response = await axios({
    method: 'GET',
    url: `${url}/user`,
    params: {
      id: data.userId
    },
    headers: {
      "Authorization": token,
      "Content-type": "application/json"
    }
  })

  return response.data;
}

export const registerNewUser = async (userRegister) => {
  const response = await axios.post(`${url}/user/register`, userRegister, {
    headers: {
      "content-type": "application/json"
    }
  })
    return response
}