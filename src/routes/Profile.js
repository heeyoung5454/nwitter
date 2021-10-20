import { authService } from "fbase";
import React from "react";
import { useHistory } from "react-router";

//자동으로 import 시켜주기(다른 파일에서 접금할때 자동완성됨)
export default () => {
  const history = useHistory();
  //https://firebase.google.com/docs/reference/js/v8/firebase.auth.Auth#signout
  const onLogOutClick = () => {
    authService.signOut();
    history.push("/");
  };
  return (
    <>
      Profile
      <button onClick={onLogOutClick}>로그아웃</button>
    </>
  );
};
