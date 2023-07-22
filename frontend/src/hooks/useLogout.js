// ch n11 1 logout function
import { useAuthContext } from "./useAuthContext"; //用來update useAuthContext
import { useWorkoutsContext } from "./useWorkoutsContext"; //ch n17 用来get goble storage
export const useLogout = () => {
  //從useAuthContext拿dispatch function
  const { dispatch } = useAuthContext();
  const { dispatch: workoutsDispatch } = useWorkoutsContext(); // ch n17 ?

  const logout = () => {
    //remove user from storage
    localStorage.removeItem("user"); //user名字是在useSignup定的

    //dispatch logout action
    dispatch({ type: "LOGOUT" }); //觸法在AuthContext的LOGOUT action
    workoutsDispatch({ type: "SET_WORKOUTS", payload: null }); //ch n17 clear goble workout state 防止看到其他用户的data
  };
  return { logout };
};
