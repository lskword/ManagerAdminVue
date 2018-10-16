import IsRequest from "../utils/request"

export function login (username, password) {
  // body...
  const data = JSON.stringify({
    username,
    password
  });
  return IsRequest({
    url: '/api/login',
    method: "post",
    data
  })
}

export function register(userName, passWord) {
  const data = {
    userName,
    passWord
  }
  return IsRequest({
    url: "/api/register",
    params: data,
    method: 'get'
  })
}
