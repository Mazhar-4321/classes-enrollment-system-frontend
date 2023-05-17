import React, { useEffect, useState } from "react";
import AssignmentIcon from "@mui/icons-material/Assignment";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import SchoolIcon from "@mui/icons-material/School";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import { MyProfile } from "../components/MyProfile";
import Certificate from "../images/certificate.png";
import Image1 from "../images/myImage.png";
import html2pdf from "html-to-pdf-js";
import { Course } from "../components/Course";
import Grid from "@mui/material/Grid";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  cancelCourse,
  getAllCourses,
  getHighestMarks,
  getMyCourses,
  getQuiz,
} from "../services/StudentService";
import { pickersToolbarButtonClasses } from "@mui/x-date-pickers/internals";
import { PDFViewer } from "../components/PDFViewer";
import { useLocation } from "react-router-dom";
import { TakeQuiz } from "../components/TakeQuiz";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { ClaimCertificate } from "../components/ClaimCertificate";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import DescriptionIcon from "@mui/icons-material/Description";
import QuizIcon from "@mui/icons-material/Quiz";
import BackspaceIcon from "@mui/icons-material/Backspace";
import CardMembershipIcon from "@mui/icons-material/CardMembership";
import imj from "../images/online-education.png";
import "../css/CourseNotes.css";
import "../css/StudentPage.css";
import ReactPlayer from "react-player";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
export const CourseNotes = () => {
  const [sampleurl, setsampleurl] = useState([]);
  const myState = useSelector((state) => state.CourseReducer1);
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const [snackbar, setSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("");
  let grade = "A";
  const [availableCoursesList, setAvailableCoursesList] = useState({
    data: [],
  });
  const [myCoursesList, setmyCoursesList] = useState({ data: [] });
  const [quiz, setQuiz] = useState([]);
  const [coursesList, setCoursesList] = useState({
    data: [],
  });
  const [border, setBorder] = useState({
    notes: "2px solid #fff",
    takeQuiz: null,
    cancelCourse: null,
    claimCertificate: null,
  });

  function handleVideoFetching() {
    const key = location.state.url ; 


    console.log("URL KEY IS ------------>", key);

    fetch(
    
      ` https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet%2CcontentDetails&playlistId=${key}&key=AIzaSyCtFHWi6FkcJJez6t9cg0CPzxa5Cv4gF98 `
    )
      .then((data) => data.json())
      .then((data) => {
        const videoIds = data.items.map((item) => item.contentDetails.videoId);
        console.log("----------->", videoIds);
        const urls = videoIds.map(
          (id) => `https://www.youtube.com/watch?v=${id}`
        );
        //   const title = data.items.map((item) => item.snoppets.title);

        setsampleurl(urls);
      })
      .catch((error) => {
        console.error("Error fetching video IDs:", error);
        setsampleurl([]);
      });
  }
  useEffect(() => {
   
    handleVideoFetching()

    const dbCall = async () => {
      const quizResponse = await getQuiz(location.state.id);
      console.log("quiz Response", quizResponse);
      setQuiz(quizResponse);
      console.log(
        myState.coursesEnrolled.get(location.state.id).notes.split(",")
      );
      setmyCoursesList((prevData) => ({
        ...prevData,
        data: myState.coursesEnrolled.get(location.state.id).notes.split(","),
      }));
      //    setmyCoursesList(prevData=>(
      //     {...prevData,data:myState.coursesEnrolled.get(location.state.id).notes.split(","))})
      // var availableCoursesData = await getAllCourses();

      // console.log("available courses", availableCoursesData)
      // var myCoursesData = await getMyCourses(myState.userDetails.email);
      // setCoursesList(prevData => ({
      //     ...prevData, data: availableCoursesData
      // }))
      // setmyCoursesList(prevData => ({
      //     ...prevData, data: myCoursesData
      // }))
      // setAvailableCoursesList(prevData => ({
      //     ...prevData, data: availableCoursesData
      // }))
      // dispatch({
      //     type:'updateStudentCourses',
      //     value:{
      //        myCourses:myCoursesData

      //     }
      // })

    };
  
    dbCall();
  }, []);
  const playBackdrop = () => {};
  const [choice, setChoice] = useState("Notes");
  const changeFilterValue = (event) => {
    // setFilter(event.target.value);
  };
  const changeChoice = async (choice) => {
    setBorder((prevBorder) => ({
      ...prevBorder,
      notes: null,
      takeQuiz: null,
      cancelCourse: null,
      claimCertificate: null,
    }));
    console.log(location.state);
    switch (choice) {
      case "Notes":
        setChoice("Notes");
        setBorder((prevBorder) => ({
          ...prevBorder,
          notes: "2px solid #fff",
        }));
        break;
      case "Take Quiz":
        setBorder((prevBorder) => ({
          ...prevBorder,
          takeQuiz: "2px solid #fff",
        }));
        setChoice("Take Quiz");
        break;
      case "Cancel Course":
        setChoice("Cancel Course");
        var cancelCourse1 = await cancelCourse(location.state.id);
        console.log("cancellll", cancelCourse1);
        if (cancelCourse1) {
          dispatch({
            type: "delteCourse",
            value: location.state.id,
          });
          navigate("/StudentPage");
        }
        setBorder((prevBorder) => ({
          ...prevBorder,
          cancelCourse: "2px solid #fff",
        }));
        break;
      case "Claim Certificate":
        setChoice("Claim Certificate");
        var getMarks = await getHighestMarks(location.state.id);
        console.log("got marks", getMarks);
        if (getMarks == "Fail") {
          setSnackbar(true);
          setSnackbarMessage("Certificate Can't be downloaded");
          setSnackbarSeverity("error");
          return;
        }
        if (getMarks == "Success") {
          console.log("Pass", getMarks[0].max - 1);
          if (getMarks[0] > 8) {
            grade = "A";
          }
          if (getMarks[0] > 7 && getMarks[0] <= 8) {
            grade = "B";
          }
          if (getMarks[0] > 6 && getMarks[0] <= 7) {
            grade = "C";
          }
          if (getMarks[0] < 6) {
            grade = "D";
          }
          var element = document.getElementById("domEl");
          element.style.display = "block";
          // html2pdf(element)
          var opt = {
            margin: 0,
            filename: `${myState.userDetails.firstName}`,
            image: { type: "jpeg", quality: 1 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
          };
          html2pdf().set(opt).from(element).save();
          setTimeout(() => {
            element.style.display = "none";
          }, 10);
        } else {
          setSnackbar(true);
          setSnackbarMessage("Minimum 80% Required To Download Certificate");
          setSnackbarSeverity("error");
          return;
        }
        console.log("ress", getMarks);
        setBorder((prevBorder) => ({
          ...prevBorder,
          claimCertificate: "2px solid #fff",
        }));
        break;
    }
  };

  function handlegohome() {
    navigate("/StudentPage");
  }
  return (
    <div className="main-container">
      <Snackbar
        open={snackbar}
        onClose={() => setSnackbar(false)}
        autoHideDuration={1000}
      >
        <Alert severity={snackbarSeverity} sx={{ width: "100%" }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
      <div className="header">
        <div onClick={handlegohome} className="icon">
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
          <div onClick={() => changeChoice("Notes")} className="icon-value">
            {/* <AccountBalanceIcon /> */}
            <DescriptionIcon fontSize="large" />
            <div>Notes</div>
          </div>
          <div onClick={() => changeChoice("Take Quiz")} className="icon-value">
            <QuizIcon fontSize="large" />
            <div>Take Quiz</div>
          </div>
          <div
            style={{ border: border.cancelCourse, cursor: "pointer" }}
            onClick={() => changeChoice("Cancel Course")}
            className="icon-value"
          >
            <BackspaceIcon fontSize="large" />
            <div>Cancel Course</div>
          </div>
          <div
            style={{ border: border.claimCertificate, cursor: "pointer" }}
            onClick={() => changeChoice("Claim Certificate")}
            className="icon-value"
          >
            <CardMembershipIcon fontSize="large" />
            <div>Claim Certificate</div>
          </div>
        </div>
      </div>
      <div className="body">
        <div className="notesTitle">
          <h2 style={{ color: " #8739F9" }}>Notes</h2>
        </div>
        {choice == "Notes" ? (
          <div className="course-grid">
            {choice === "My Profile" ? (
              <MyProfile />
            ) : (
              <Grid container spacing={2}>
                {myCoursesList.data.map((e, i) => {
                  return (
                    <Grid item xs={3}>
                      <PDFViewer name={"pdf" + (i + 1)} url={e} />
                    </Grid>
                  );
                })}
              </Grid>
            )}

            <div className="videoSection">
              
              <h2 style={{ color: " #8739F9" }}>Video Tutorials</h2>

              <div className="videoList">
                {sampleurl.map((url) => (

                <div className="videoFrame">
                  <ReactPlayer height={"100%"} width={"100%"} controls className="player" url={url} />
      
                  </div>


                 
                ))}
              </div>
            </div>
          </div>
        ) : choice == "Take Quiz" ? (
          <TakeQuiz courseId={location.state.id} quiz={quiz} />
        ) : choice == "Claim Certificate" ? (
          <div
            id="domEl"
            style={{ display: "none", width: "100vw", height: "1050px" }}
          >
            <img
              style={{ width: "850px", height: "1050px" }}
              src={Certificate}
            />
            <div style={{ top: "480px", left: "300px", position: "absolute" }}>
              {myState.userDetails.firstName} {myState.userDetails.lastName}
            </div>
            <div style={{ top: "680px", left: "300px", position: "absolute" }}>
              {location.state.courseName}
            </div>
            <div
              style={{
                top: "770px",
                left: "300px",
                fontSize: "8px",
                position: "absolute",
              }}
            >
              {new Date().getDate() +
                "-" +
                new Date().getMonth() +
                "-" +
                new Date().getFullYear()}
            </div>
            <div style={{ top: "860px", left: "550px", position: "absolute" }}>
              Grade:{grade}
            </div>
            <img
              style={{
                top: "750px",
                left: "600px",
                fontSize: "8px",
                position: "absolute",
              }}
              src={Image1}
            />
          </div>
        ) : (
          <div>Cancel Course</div>
        )}
      </div>
    </div>
  );
};
