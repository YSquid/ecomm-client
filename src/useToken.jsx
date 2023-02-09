import { useState } from 'react';

export default function useToken() {
  //get token from session storage (taken from resposne from server on /login route)
  const getToken = () => {
    const tokenString = sessionStorage.getItem('token');
    const userToken = JSON.parse(tokenString);
    //first time we load, no user token, so use the optional chaining operator
    return userToken?.token
  };

  //set token state by calling getToken()
  const [token, setToken] = useState(getToken());

  //save the token in sessionStorage, and setToken state
  const saveToken = userToken => {
    sessionStorage.setItem('token', JSON.stringify(userToken));
    setToken(userToken.token);
  };

  //return an object with our token, and our setToken function
  //setToken function is passed down to other elements from App for when they need to render login
  return {
    setToken: saveToken,
    token
  }
}