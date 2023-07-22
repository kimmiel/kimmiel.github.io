//ch n8 用這AuthContext 取得上下文的applcation用白資料
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

//每當拿 workout state 時 會使用這hook 取得上下文的值
export const useAuthContext = () => {
  const context = useContext(AuthContext);

  //如果没有context
  if (!context) {
    throw Error(
      "AuthContext must be used inside an AuthContextProvider"
    );
  }
  
  return context;
};
//ch n8 end