import "./App.css";
import { LandingPage } from "./pages/LandingPage";
import { CourseDetail } from "../src/pages/CourseDetail";
import { UploadCourse2 } from "./pages/UploadCourse2";
import DashBoard from "./pages/DashBoard";
import ProtectedRoute, { AdminProtectedRoute, StudentProtectedRoute } from './Routes/ProtectedRoutes';
import AuthRoute from './Routes/AuthRoute';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from 'react-redux';
import store, { persistStorage } from './store';
import { PersistGate } from "redux-persist/integration/react";
import { StudentPage } from "./pages/StudentPage";
import { useSelector } from "react-redux";
import { CourseNotes } from "./pages/CourseNotes";
import AdminDashBoard from "./pages/AdminDashBoard";
const AppWrapper = () => {

  return (
    <Provider store={store}> // Set context
      <App /> // Now App has access to context
    </Provider>
  )
}
function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistStorage}>

        <BrowserRouter>


          <Routes>
            <Route path="/" exact element={<AuthRoute><LandingPage /></AuthRoute>} />
            <Route path="/CourseDetail" element={<StudentProtectedRoute><CourseDetail /></StudentProtectedRoute>} />
            <Route path="/UpdateCourse2" element={<ProtectedRoute><UploadCourse2 /></ProtectedRoute>} />
            <Route path="/AdminDashBoard" element={<ProtectedRoute><DashBoard /></ProtectedRoute>} />
            <Route path="/StudentPage" element={<StudentProtectedRoute> <StudentPage /> </StudentProtectedRoute>} />
            <Route path="/CourseNotes" element={<StudentProtectedRoute> <CourseNotes /></StudentProtectedRoute>} />
            <Route path='/AdminPage' element={<AdminProtectedRoute><AdminDashBoard /></AdminProtectedRoute>} />
          </Routes>

        </BrowserRouter>
      </PersistGate>
    </Provider>

  );
}

export default App;


