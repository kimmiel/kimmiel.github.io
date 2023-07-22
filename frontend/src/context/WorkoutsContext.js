//ch 11 輸入新資料後即時更新  把 locan context state 改成globle context state

import { createContext, useReducer } from "react"

//找Workouts的内容,
export const WorkoutsContext = createContext()

//從Workouts的内容,找内容真正提供者

//更新Workout state
export const workoutsReducer = (state, action) => {
  // ={Workouts: null,}

  //當動作是??
  switch (action.type) {
    case "SET_WORKOUTS":
      return { workouts: action.payload }
    //當動作是創造新資料時
    case "CREATE_WORKOUT":
      return {
        workouts: [action.payload,
        ...state.workouts] //現在workouts的state
      }
      case 'DELETE_WORKOUT'://ch12
        // return object
        return{
          //是不是要删的workout filter(ture/false)
          workouts: state.workouts.filter((w)=> w._id!== action.payload._id)
        }
    //當其他
    default:
      return state
  }
}

//更新Workout state
export const WorkoutsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(workoutsReducer, {
    workouts: null
  })

  return (
    //   找Context真正提供者
    <WorkoutsContext.Provider value={{ ...state, dispatch }}>
      {/* 找Context真正提供者 */}
      {children}
    </WorkoutsContext.Provider>
  )
}
