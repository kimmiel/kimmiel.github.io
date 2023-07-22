//ch n12 把json web token傳到後端 ,Hit backend Api Endpoint
//1 滙入useState , useAuthContext
import { useState } from "react";
import { useAuthContext } from "./useAuthContext"; //用來update useAuthContext
//
export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();
  //get email ane password
  const login = async (email, password) => {
    //初始化
    setIsLoading(true);
    setError(null);
    // sent a post requst
    const response = await fetch("/api/user/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });
    //get json data
    const json = await response.json();
    //if  response 失敗
    if (!response.ok) {
      setIsLoading(false);
      setError(json.error);
    }
    if (response.ok) {
      //save the user(json web token) to local storage, 'user'代表资料名字
      localStorage.setItem("user", JSON.stringify(json)); //set a new item 將json從object變成(stringify),string才可存入localStorage
      //update the auth context
      dispatch({ type: "LOGIN", payload: json });
      setIsLoading(false);
    }
  };
  return { login, isLoading, error };
};
// "proxy": "http://localhost:4000", 代表
