//context作用把内容提供(export)給其他元件(js)使用
//ch n8 1 先用react跟蹤user的狀態eg是login or logout
import { createContext, useReducer, useEffect } from "react"; //ch n8 要從react拿 createContext , useReducer
//ch n13 useEffect 在refresh時看,localstorage有沒data
export const AuthContext = createContext();

//ch n8 3設定user的狀態(login or logout )並return相應資料
export const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return { user: action.payload };
    case "LOGOUT":
      return { user: null };
    default:
      return state;
  }
};
//ch n8 3 設定user的狀態,把整個application 包起来export 給其他元件(js)
export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
  });

  //ch n13 useEffect 在refresh時看,localstorage有沒data
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user")); //因为localStorage的资料是string所以,JSON.parse change data(string) to data(Json)

    // 如果localStorage有data,自動登入
    if (user) {
      dispatch({ type: "LOGIN", payload: user }); //登入
    }
  }, []);

  console.log("AuthContext state: ", state);
  // .Provider ? 把application包起来
  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

//0:30