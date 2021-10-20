import React, { useEffect, useState } from "react";
import AppRouter from "components/Router";
import { authService } from "fbase";

function App() {
  //firebase 초기화
  const [init, setInit] = useState(false);
  // https://firebase.google.com/docs/reference/js/v8/firebase.auth.Auth#currentuser
  //authService.currentUser = firebase의 현재 유저정보값으로 로그인 여부 확인
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  //authService.onAuthStateChanged 로그인/로그아웃 시 상태변화를 알아차림(firebase 시작될때 시간이 걸리기때문에 로그인상태를 바로 인식하지 못함)
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  }, []);

  return (
    // 라우터에 props 잔달
    <>
      {init ? <AppRouter isLoggedIn={isLoggedIn} /> : "로그인 중 ...."}
      <footer>&copy {new Date().getFullYear()} nwitter</footer>
    </>
  );
}

export default App;
