import React, { useState } from "react";
import AppRouter from "components/Router";
import { authService } from "fbase";

function App() {
  // https://firebase.google.com/docs/reference/js/v8/firebase.auth.Auth#currentuser
  //authService.currentUser = firebase의 현재 유저정보값으로 로그인 여부 확인
  const [isLoggedIn, setIsLoggedIn] = useState(authService.currentUser);
  return (
    // 라우터에 props 잔달
    <>
      <AppRouter isLoggedIn={isLoggedIn} />

      <footer>&copy {new Date().getFullYear()} nwitter</footer>
    </>
  );
}

export default App;
