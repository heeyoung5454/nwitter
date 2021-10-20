import React, { useState } from "react";
import { authService, firebaseInstance } from "fbase";

//자동으로 import 시켜주기(다른 파일에서 접금할때 자동완성됨)
const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPawwsord] = useState("");
  const [newAccount, setNewAccount] = useState(true);
  const [error, setError] = useState("");

  const onChange = (event) => {
    const {
      target: { name, value },
    } = event;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPawwsord(value);
    }
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      let data;
      if (newAccount) {
        // create account(이메일과 패스워드를 받아서 계정생성)
        //https://firebase.google.com/docs/reference/js/v8/firebase.auth.Auth#createuserwithemailandpassword
        data = await authService.createUserWithEmailAndPassword(email, password);
      } else {
        //login (파이어베이스 값 )
        //https://firebase.google.com/docs/reference/js/v8/firebase.auth.Auth#signinwithemailandpassword
        data = await authService.signInWithEmailAndPassword(email, password);
      }
      console.log(data);
    } catch (error) {
      console.log(error);
      if (error.code === "auth/weak-password") {
        setError("패스워드 길이는 최소 6글자여야 합니다");
        //setError(error.message);
      } else if (error.code == "auth/email-already-in-use") {
        setError("이미 사용중인 이메일입니다");
      }
    }
  };
  const toggleAccount = () => setNewAccount((prev) => !prev);
  const onSocialClick = async (event) => {
    const {
      target: { name },
    } = event;

    // 소셜로그인 https:firebase.google.com/docs/reference/js/v8/firebase.auth.Auth#signinwithpopup
    // Creates the provider object.
    let provider;
    if (name === "google") {
      provider = new firebaseInstance.auth.GoogleAuthProvider();
    } else if (name === "github") {
      provider = new firebaseInstance.auth.GithubAuthProvider();
    }

    const data = await authService.signInWithPopup(provider);
    console.log(data);
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input name='email' type='email' placeholder='Email' value={email} onChange={onChange} required />
        <input name='password' type='password' placeholder='password' value={password} onChange={onChange} required />
        <input type='submit' value={newAccount ? "Create Account" : "Sign In"} />
        {error}
      </form>
      <span onClick={toggleAccount}> {newAccount ? "로그인하기" : "회원가입"} </span>
      <div>
        <button onClick={onSocialClick} name='google'>
          Continue with Google
        </button>
        <button onClick={onSocialClick} name='github'>
          Continue with Github
        </button>
      </div>
    </div>
  );
};
export default Auth;
