import React, { useEffect, useState } from "react";
import "../css/UploadCourse2.css";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { storage } from "../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { message, Upload } from "antd";
import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import {
  checkIfFileExists,
  deleteFileById,
  getCourseById,
  getMyCourses,
  updateCourse,
  uploadCourse,
} from "../services/AdminService";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Jump from "react-reveal/Jump";
import Tippy from "@tippyjs/react";

import InputAdornment from "@mui/material/InputAdornment";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import HelpIcon from "@mui/icons-material/Help";

const props = {
  name: "file",
  action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
  headers: {
    authorization: "authorization-text",
  },
  onChange(info) {
    if (info.file.status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === "done") {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};

export function UploadCourse2() {
  const [files, setFiles] = useState([]);
  const [currentCourseId, setCurrentCourseId] = useState("abcdef");
  const [course, setCourse] = useState("");
  const [courses, setCourses] = useState([]);
  const [courseObject, setCourseObject] = useState({
    courseName: "",
    courseDescription: "",
    lastDayToEnroll: "",
    duration: "",
    seatsLeft: "",
    notes: [],
    instructorName: "",
    url: "",
    fee: "",
  });

  const [flag, setFlag] = useState(true);
  const [snackbar, setSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("");
  let imagesLink = [];
  const [age, setAge] = React.useState("");
  useEffect(() => {
    const dbCall = async () => {
      try {
        var response = await getMyCourses();
        console.log("from useeffect----", response);
        response.push({
          c_id: "abcdef",
          course_description: "",
          duration: "",
          instructor: "",
          lastDate: "",
          name: "New",
          seatsLeft: "",
        });
        setCourses(response);

        // console.log("split",response.notes.split(","))
        setFiles(response.notes.split(","));
      } catch (err) {
        console.log("err", err);
      }
    };
    dbCall();
  }, []);

  const getCourseDetails = async (courseId) => {
    try {
      setCurrentCourseId(courseId);
      if (courseId == "abcdef") {
        setCourseObject((prevObject) => ({
          ...prevObject,
          courseName: "",
          courseDescription: "",
          lastDayToEnroll: "",
          duration: "",
          instructorName: "",
          url: "",
          fee: "",
        }));
        setFiles([]);
        return;
      }
      var courseDetails = await getCourseById(courseId);
      console.log("values", courseDetails[0]);
      setCourseObject((prevObject) => ({
        ...prevObject,
        courseName: courseDetails[0].name,
        courseDescription: courseDetails[0].course_description,
        lastDayToEnroll: courseDetails[0].name,
        duration: courseDetails[0].duration,
        instructorName: courseDetails[0].instructor,
        url: courseDetails[0].url,
        fee: courseDetails[0].fee,
      }));
      if (courseDetails[0].notes) {
        var array = courseDetails[0].notes.split(",");
        var newArray = array.map((e) => {
          var split = e.split("~");
          return {
            name: split[1],
            path: split[0],
          };
        });
        setFiles(newArray);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const handleChange = (event) => {
    setCourse(event.target.value);
  };
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };
  const [value, setValue] = React.useState(dayjs(`${new Date().getFullYear()}-${new Date().getMonth()+1}-${new Date().getDate()}`));
  const uploadImage = async (files) => {
    console.log("====== IN UPLOAD IMAGE ======");
    for (const [key, file] of Object.entries(files)) {
      const imageRef = ref(storage, `images/${file.name}`);
      uploadBytes(imageRef, file)
        .then((res) => getDownloadURL(res.ref))
        .then((err) => {
          console.log("INSIDE UPLOAD IMG---->", err);
          if (files.length - 1 === imagesLink.length) {
            imagesLink.push({
              name: file.name,
              path: err,
            });

            const callDB = async () => {
              try {
                console.log("--------------------");
                var response = null;
                if (currentCourseId == "abcdef") {
                  response = await uploadCourse(courseObject, imagesLink);
                } else {
                  response = await updateCourse(
                    courseObject,
                    imagesLink,
                    currentCourseId
                  );
                }

                if (response) {
                  setOpen(false);
                  setCourseObject((preVData) => ({
                    ...preVData,
                    courseName: "",
                    courseDescription: "",
                    lastDayToEnroll: "",
                    duration: "",
                    seatsLeft: "",
                    notes: [],
                    instructorName: "",
                  }));
                  setFlag(false);
                  setSnackbarMessage("Course Uploaded Successfully");
                  setSnackbarSeverity("success");
                  setSnackbar(true);
                }
              } catch (err) {
                setOpen(false);
                setFlag(false);
                setSnackbarMessage("Course Uploaded Failed");
                setSnackbarSeverity("error");
                setSnackbar(true);
              }
            };
            callDB();
          } else {
            imagesLink.push({
              name: file.name,
              path: err,
            });
          }
        });
    }
  };

  const onSnackbarClose = () => {
    setSnackbar(false);
  };
  const onAlertClose = () => {
    setSnackbar(false);
  };
  const uploadCourseToDatabase = async () => {
    console.log("-------INSIDE uploadCourseToDatabase FUNCTION-------");
    setOpen(true);
    if (
      courseObject.courseName.length < 1 ||
      courseObject.courseDescription.length < 1 ||
      courseObject.lastDayToEnroll.length < 1 ||
      courseObject.duration.length < 1 ||
      courseObject.instructorName.length < 1 ||
      files.length < 1
    ) {
      setSnackbar(true);
      setSnackbarMessage("All Fields Are Mandatory");
      setSnackbarSeverity("error");
      setOpen(false);
      return;
    }
    var date = courseObject.lastDayToEnroll;
    var currentYear = new Date().getFullYear();
    var currentMonth = new Date().getMonth();
    var currentDay = new Date().getDate();
    var year = new Date(date).getFullYear();
    var month = new Date(date).getMonth();
    var day = new Date(date).getDate();
    if (year == currentYear && month == currentMonth && day <= currentDay) {
      setSnackbar(true);
      setSnackbarMessage("Please Select A Valid Date");
      setSnackbarSeverity("error");
      setOpen(false);
      return;
    }
    console.log(files);
    //await checkIfFileExists(files)
    console.log(
      "mama",
      files.filter((e) => e.path == null)
    );
    //setFiles(files.filter(e=>e.path==null))
    uploadImage(files.filter((e) => e.path == null));
  };
  const changeCourseName = (event) => {
    setCourseObject((prevObj) => ({
      ...prevObj,
      courseName: event.target.value,
    }));
  };
  const changeCourseDescription = (event) => {
    setCourseObject((prevObj) => ({
      ...prevObj,
      courseDescription: event.target.value,
    }));
  };
  const changeLastDayToEnroll = (value) => {
    setCourseObject((prevObj) => ({
      ...prevObj,
      lastDayToEnroll: value,
    }));
  };
  const changeSeatsLeft = (event) => {
    setCourseObject((prevObj) => ({
      ...prevObj,
      seatsLeft: event.target.value,
    }));
  };
  const changeInstructorName = (event) => {
    setCourseObject((prevObj) => ({
      ...prevObj,
      instructorName: event.target.value,
    }));
  };
  const changeDuration = (event) => {
    setCourseObject((prevObj) => ({
      ...prevObj,
      duration: event.target.value,
    }));
  };
  const changeUrl = (event) => {
    setCourseObject((prevObj) => ({
      ...prevObj,
      url: event.target.value,
    }));
  };
  const changeFee = (event) => {
    setCourseObject((prevObj) => ({
      ...prevObj,
      fee: event.target.value,
    }));
  };

  const getFile = (event) => {
    var oldFiles = [...files];
    var newFiles = Object.values(event.target.files);
    console.log(oldFiles, newFiles.length);
    if (oldFiles.length == 0) {
      setFiles(newFiles);
    } else {
      var map = new Map();
      newFiles.forEach((e) => map.set(e.name, 1));
      // console.log(oldFiles)
      console.log(map);
      var finalArray = oldFiles.filter((e) => !map.has(e.name));
      console.log(oldFiles, finalArray);
      setFiles(newFiles.concat(finalArray));
    }
  };

  const deleteFileFromDB = async (fileId) => {
    if (currentCourseId != "abcdef") {
      var response = await deleteFileById(currentCourseId, fileId);
      console.log(response);
    }
  };

  return (
    <>
      <Snackbar
        open={snackbar}
        autoHideDuration={6000}
        onClose={onSnackbarClose}
      >
        <Alert
          onClose={onAlertClose}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
      {flag && (
        <div>
          <Backdrop
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={open}
            onClick={handleClose}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
          <div className="originForCourseUpload2">
            <Jump>
              <div className="mainTf">
                <h2 className="CourseDetails">Course Details</h2>
                <div className="tfRow0">
                  <Box className="dropDown">
                    <FormControl className="textFiled">
                      <InputLabel id="demo-simple-select-label">
                        Courses
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={course}
                        label="Age"
                        onChange={handleChange}
                      >
                        {courses.map((e) => (
                          <MenuItem
                            onClick={() => getCourseDetails(e.c_id)}
                            value={e.c_id}
                          >
                            {e.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Box>
                  {/* <input
                    style={{ display: "none" }}
                    type="image"
                    multiple
                    id="courseImg"
                  ></input>
                  <label className="uploadCourseImage">
                    Click to upload Course Image
                  </label> */}
                </div>
                <div className="tfRow1">
                  <TextField
                    id="outlined-basic"
                    className="textFiled"
                    label="CourseName"
                    value={courseObject.courseName}
                    //  defaultValue={courseObject.courseName}
                    onChange={changeCourseName}
                    variant="outlined"
                  />
                  <TextField
                    id="outlined-basic"
                    onChange={changeInstructorName}
                    value={courseObject.instructorName}
                    className="textFiled"
                    label="InstrctorName"
                    variant="outlined"
                  />
                </div>
                <div className="tfRow2">
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={["DatePicker", "DatePicker"]}>
                      <DatePicker
                        sx={{ width: "15rem" }}
                        label="Last Day To Enroll"
                        value={value}
                        format="YYYY/MM/DD"
                        onChange={(newValue) => changeLastDayToEnroll(newValue)}
                      />
                    </DemoContainer>
                  </LocalizationProvider>
                  <TextField
                    id="outlined-basic"
                    onChange={changeDuration}
                    value={courseObject.duration}
                    className="textFiled"
                    label="Duration"
                    variant="outlined"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">Hr</InputAdornment>
                      ),
                    }}
                  />
                </div>
                <div className="tfRow3">
                  <TextField
                    id="outlined-basic"
                    onChange={changeCourseDescription}
                    label="Course Description"
                    value={courseObject.courseDescription}
                    className="textFiled"
                    multiline
                    maxRows={4}
                    variant="outlined"
                  />

                  <input
                    style={{ display: "none" }}
                    type="file"
                    id="img"
                    multiple
                    onChange={getFile}
                  ></input>
                  <label className="uploadLabel" for="img">
                    Click to upload notes
                  </label>
                </div>
                <div className="tfRow5">
                  <TextField
                    id="outlined-basic"
                    label="PlayList Id"
                    className="textFiled"
                    variant="outlined"
                    value={courseObject.url}
                    onChange={changeUrl}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <HelpIcon
                            style={{ cursor: "pointer" }}
                            onClick={() =>
                              window.open(
                                "https://www.youtube.com/watch?v=oRGEOtcZc0o",
                                "_blank"
                              )
                            }
                          />
                        </InputAdornment>
                      ),
                    }}
                  />

                  <TextField
                    id="outlined-basic"
                    label="Fee"
                    className="textFiled"
                    variant="outlined"
                    value={courseObject.fee}
                    onChange={changeFee}
                    type="number"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <CurrencyRupeeIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                </div>

                <div
                  style={{
                    display: "flex",
                    width: "100%",
                    justifyContent: "center",
                    alignItems: "center",
                    flexWrap: "wrap",
                    // border : "2px solid yellow",
                    rowGap: "5px",
                    overflow: "hidden",
                  }}
                >
                  {files.map((v) => (
                    <Tippy content={<span> Click to Delete</span>}>
                      <div
                        className="uploadedfiles"
                        key={v.name}
                        onClick={() => {
                          setFiles(files.filter((f) => f.name !== v.name));
                        }}
                      >
                        {v.name}
                      </div>
                    </Tippy>
                  ))}
                </div>
                <div className="tfRow4">
                  <Button
                    variant="contained"
                    size="medium"
                    className="uploadCourseButton"
                    onClick={uploadCourseToDatabase}
                  >
                    Upload Course
                  </Button>
                </div>
              </div>
            </Jump>
          </div>
        </div>
      )}
    </>
  );
}
