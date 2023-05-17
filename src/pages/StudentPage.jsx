import React, { useEffect, useState } from "react";
import "../css/StudentPage.css";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import SchoolIcon from "@mui/icons-material/School";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import { MyProfile } from "../components/MyProfile";
import { Course } from "../components/Course";
import { useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import { useDispatch, useSelector } from "react-redux";
import { getAllCourses, getMyCourses } from "../services/StudentService";
import imj from "../images/online-education.png";
import { GiBookshelf } from "react-icons/gi";

export const StudentPage = () => {
  const myState = useSelector((state) => state.CourseReducer1);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [availableCoursesList, setAvailableCoursesList] = useState({
    data: [],
  });
  const [myCoursesList, setmyCoursesList] = useState({ data: [] });
  const [coursesList, setCoursesList] = useState({
    data: [],
  });
  const [border, setBorder] = useState({
    availableCourses: "2px solid #fff",
    myCourses: null,
    myProfile: null,
    logOut: null,
  });
  useEffect(() => {
    console.log("user details hai bhai ye", myState.userDetails);
    const dbCall = async () => {
      var availableCoursesData = await getAllCourses();
      console.log("available courses", availableCoursesData);
      var myCoursesData = await getMyCourses(myState.userDetails.email);
      setCoursesList((prevData) => ({
        ...prevData,
        data: availableCoursesData,
      }));
      setmyCoursesList((prevData) => ({
        ...prevData,
        data: myCoursesData,
      }));
      setAvailableCoursesList((prevData) => ({
        ...prevData,
        data: availableCoursesData,
      }));
      dispatch({
        type: "updateStudentCourses",
        value: {
          myCourses: myCoursesData,
        },
      });
    };
    dbCall();
  }, []);

  const [choice, setChoice] = useState("Available Courses");
  const changeFilterValue = (event) => {
    // setFilter(event.target.value);
  };
  const changeChoice = async (choice) => {
    setBorder((prevBorder) => ({
      ...prevBorder,
      availableCourses: null,
      myCourses: null,
      myProfile: null,
      logOut: null,
    }));
    switch (choice) {
      case "My Courses":
        setChoice("My Courses");
        setCoursesList((prevData) => ({
          ...prevData,
          data: myCoursesList.data,
        }));
        setBorder((prevBorder) => ({
          ...prevBorder,
          myCourses: "2px solid #fff",
        }));
        break;
      case "Available Courses":
        setCoursesList((prevData) => ({
          ...prevData,
          data: availableCoursesList.data,
        }));
        setBorder((prevBorder) => ({
          ...prevBorder,
          availableCourses: "2px solid #fff",
        }));
        setChoice("Available Courses");
        break;
      case "My Profile":
        setChoice("My Profile");
        setBorder((prevBorder) => ({
          ...prevBorder,
          myProfile: "2px solid #fff",
        }));
        break;
      case "Logout":
        setChoice("Logout");
        dispatch({
          type: "removeToken",
        });
        navigate("/");
        setBorder((prevBorder) => ({
          ...prevBorder,
          logOut: "2px solid #fff",
        }));
        break;
    }
  };

  return (
    <div className="main-container">
      <div className="header">
        <div className="icon">
          <img
            src={imj}
            style={{ marginBottom: "0.5rem", height: "35px", width: "35px" }}
          />
          <div>
            <h4> Class Enrollment System</h4>
          </div>
        </div>
        <div className="search-bar">
          <Paper
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
              }
            }}
            component="form"
            sx={{
              borderRadius: "10px",
              height: "35px",
              background: "#fff",
              p: "2px 4px",
              display: "flex",
              alignItems: "center",
              width: 400,
            }}
          >
            <IconButton sx={{ p: "10px" }} aria-label="menu">
              <SearchIcon />
            </IconButton>
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="Search..."
              inputProps={{ "aria-label": "search google maps" }}
            />
          </Paper>
        </div>
        <div className="user-activities">
          <div
            style={{ border: border.availableCourses, cursor: "pointer" }}
            onClick={() => changeChoice("Available Courses")}
            className="icon-value"
          >
            <AccountBalanceIcon fontSize="large" />
            <div>Available Courses</div>
          </div>
          <div
            style={{ border: border.myCourses, cursor: "pointer" }}
            onClick={() => changeChoice("My Courses")}
            className="icon-value"
          >
            <SchoolIcon fontSize="large" />
            <div>My Courses</div>
          </div>
          <div
            style={{ border: border.myProfile, cursor: "pointer" }}
            onClick={() => changeChoice("My Profile")}
            className="icon-value"
          >
            <PersonOutlineIcon fontSize="large" />
            <div>My Profile</div>
          </div>
          <div
            style={{ border: border.logOut, cursor: "pointer" }}
            onClick={() => changeChoice("Logout")}
            className="icon-value"
          >
            <LogoutIcon fontSize="large" />
            <div>Logout</div>
          </div>
        </div>
      </div>
      <div className="body">
        <div className="course-grid">
          {choice === "My Profile" ? (
            <MyProfile />
          ) : (
            <Grid container spacing={2}>
              {coursesList.data.map((e) => {
                return (
                  <Grid item xs={3}>
                    <Course
                      choice={choice}
                      disabled={myState.coursesEnrolled.filter(p=>p.c_id==e.c_id).length>0}
                      isStudent={true}
                      id={e.c_id}
                      name={e.name}
                      instructor={e.instructor}
                      lastDate={e.lastDate}
                      duration={e.duration}
                      seatsLeft={e.seatsLeft}
                      courseDescription={e.course_description}
                      fee={e.fee}
                      url = {e.url}
                    />
                  </Grid>
                );
              })}
            </Grid>
          )}
        </div>
        <div className="pagination"></div>
      </div>
    </div>
  );
};
