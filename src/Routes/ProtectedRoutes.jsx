import { Outlet, Navigate } from "react-router-dom";
   import store from '../store'
     // import {store} from '../store'
const ProtectedRoute = ({ children }) => {
 
  // const [loggedIn, setLogggedIn] = React.useState(false);
  if (localStorage.getItem("token")) {
    return children;
  }
  return <Navigate to="/" />;
};

export const StudentProtectedRoute =({children})=>{
  const state=store.getState().CourseReducer1
  console.log("mai hu na",state)
  if(state.token!=null&&state.userRole==='student'){
    return children;
  }
  return <Navigate to="/" />
}

export const AdminProtectedRoute =({children})=>{
  const state=store.getState().CourseReducer1
  console.log("mai hu na",state)
  if(state.token!=null&&state.userRole==='admin'){
    return children;
  }
  return <Navigate to="/" />
}
export default ProtectedRoute;