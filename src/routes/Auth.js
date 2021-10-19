import React, { useState } from "react";

//자동으로 import 시켜주기(다른 파일에서 접금할때 자동완성됨)
const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPawwsord] = useState("");
  const onChange = (event) => {
    const {
      target: { name, value },
    } = event;
    if (name === "email") {
      console.log(value);
    } else if (name === "password") {
      setPawwsord(value);
    }
  };
  const onSubmit = (event) => {
    event.preventDefault();
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input name='email' type='email' placeholder='Email' value={email} onChange={onChange} required />
        <input name='password' type='password' placeholder='password' value={password} onChange={onChange} required />
        <input type='submit' value='LogIn' />
      </form>
      <div>
        <button>Continue with Google</button>
        <button>Continue with Github</button>
      </div>
    </div>
  );
};
export default Auth;
