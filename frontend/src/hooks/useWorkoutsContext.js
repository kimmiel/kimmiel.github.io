//ch11 用這hook 取得上下文的值
import { WorkoutsContext } from "../context/WorkoutsContext";
import { useContext } from "react";

//每當拿 workout state 時 會使用這hook 取得上下文的值
export const useWorkoutsContext = () => {
  const context = useContext(WorkoutsContext);

  //如果没有context
  if (!context) {
    throw Error(
      "useWorkContext must be used inside an WorkoutsContextProvider"
    );
  }
  
  return context;
};
