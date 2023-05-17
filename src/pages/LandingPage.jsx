import React, { useState } from "react";
import { Box, TextField } from "@mui/material";
import Button from "@mui/material/Button";
import "../css/LandingPage.css";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Bounce from "react-reveal/Bounce";
import OTPInput, { ResendOTP } from "otp-input-react";
import DisabledByDefaultIcon from "@mui/icons-material/DisabledByDefault";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { registerUser, reset } from "../services/UserService";
import { validateEmail, login } from "../services/UserService";
import { useNavigate } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { useDispatch, useSelector } from "react-redux";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css"; // optional

const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
const passwordRegex =
  /((?=.*[0-9])(?=.*[A-Z])(?=.{8,}$).*)(^([a-zA-Z0-9]*[^a-zA-Z0-9][a-zA-Z0-9]*)$)/;
const nameRegex = /[A-Z][A-za-z0-9]{2,}/;

const style1 = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  height: 100,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
const style2 = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  height: 360,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
const style3 = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  height: 150,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export const LandingPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const myState = useSelector((state) => state.CourseReducer);
  const [snackbar, setSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("");
  const [view, setView] = useState(true);
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
  const [openForProceed, setOpenForProceed] = React.useState(false);

  const [open2, setOpen2] = React.useState(false);

  const [open3, setOpen3] = React.useState(false);

  const [userType, setUserType] = React.useState("");

  const handleOpen2 = async () => {
    if (signInObject.email.length > 0 && !signInRegex.email.error) {
      const data = {
        email: signInObject.email,
      };
      await validateEmail(data);
      setOpen2(true);
      setOpen3(false);
    } else {
      setSnackbar(true);
      setSnackbarMessage("Please Enter Correct Email");
      setSnackbarSeverity("error");
    }
  };

  const handleOpen3 = () => setOpen3(true);

  const [OTP, setOTP] = useState("");

  const [loginDisable, setLoginDisable] = useState(true);

  const [ProceedDisable, setProceedDisable] = useState(true);


  const [emailLoginDisable, setEmailLoginDisable] = useState("");

  const handleLogin = async () => {

    try {
      var loginResponse = await login(signInObject);
      console.log("lklklk", loginResponse.data.data.split(",")[0]);
      if (loginResponse.data.data.split(",")[0] == "null") {
        setSnackbar(true);
        setSnackbarMessage("Your Admin Privilige is Blocked");
        setSnackbarSeverity("error");
        return;
      }
      if (loginResponse) {
        dispatch({
          type: "updateToken",
          value: loginResponse.data.data,
        },
        
  
        );
        if (loginResponse.data.data.split(",")[0] == "admin") {
          //console.log("token@@@@@@@@@@@@@@@@@@@@@",loginResponse.data.data.split(",")[2])
          localStorage.setItem("token",loginResponse.data.data.split(",")[2])
          navigate("/AdminPage");
        } else {
      //    console.log("token@@@@@@@@@@@@@@@@@@@@@@@@@",loginResponse.data.data.split(",")[4])
          localStorage.setItem("token",loginResponse.data.data.split(",")[4])
          navigate("/StudentPage");
        }
      }
    } catch (err) {
      console.log(err);
      setSnackbar(true);
      setSnackbarMessage("Invalid Username Or Password");
      setSnackbarSeverity("error");
    }
  };

  const handleUserType = (event) => {
    setUserType(event.target.value);

    if( 
      
            signUpObject.firstName.length > 0,
         signUpObject.lastName.length > 0,
       signUpObject.email.length > 0,
    signUpObject.password.length > 0,
    userType.length>0,
             !signUpRegex.email.error,
         !signUpRegex.firstName.error,
      !signUpRegex.lastName.error,
   !signUpRegex.password.error)
     
    {setProceedDisable(false)}

  };

  const handleOpenForProceed = async () => {
    console.log("===== WE ARE IN HANDLEOPENPROCEED ======")
    console.log(signUpObject )
    console.log(signUpRegex)
    if (
      (
            signUpObject.firstName.length > 0,
         signUpObject.lastName.length > 0,
       signUpObject.email.length > 0,
    signUpObject.password.length > 0,
    userType.length>0,
             !signUpRegex.email.error,
         !signUpRegex.firstName.error,
      !signUpRegex.lastName.error,
   !signUpRegex.password.error)
    ) 
    {
      console.log("true")
      setOpenForProceed(true);
      const data = {
        email: signUpObject.email,
      };
      const response = await validateEmail(data);
    } else {
      console.log(false)
      setSnackbar(true);
      setSnackbarMessage("Please Enter Valid Details");
      setSnackbarSeverity("error");
    }
  };

  const handleOtp = async () => {
    console.log("=====================================================")
   // alert(userType);
    const data2 = {
      firstName: signUpObject.firstName,
      lastName: signUpObject.lastName,
      email: signUpObject.email,
      password: signUpObject.password,
      otp: OTP,
      role: userType.toLowerCase(),
    };
    try {
      const response = await registerUser(data2);
      if (response) {
        setSnackbar(true);
        setSnackbarMessage("Registration Success");
        setSnackbarSeverity("success");
        setOpenForProceed(false)

      }
    } catch (err) {
      setSnackbar(true);
      setSnackbarMessage("Registration Failed");
      setSnackbarSeverity("error");
    }
  };

  const [signInObject, setSignInObject] = useState({
    email: "",
    password: "",
  });
  const [signUpObject, setSignUpObjet] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [signInRegex, setSignInRegex] = useState({
    email: {
      error: false,
      helperText: "",
    },
    password: {
      error: false,
      helperText: "",
    },
  });
  const [signUpRegex, setSignUpRegex] = useState({
    firstName: {
      error: false,
      helperText: "",
    },
    lastName: {
      error: false,
      helperText: "",
    },
    email: {
      error: false,
      helperText: "",
    },
    password: {
      error: false,
      helperText: "",
    },
  });

  const changeEmail = (event) => {
    setSignInObject((prevObj) => ({
      ...prevObj,
      email: event.target.value,
    }));

    var email = event.target.value;
    if (!email.match(emailRegex)) {
      setSignInRegex((previousState) => ({
        ...previousState,
        email: {
          helperText: "Invalid Email",
          error: true,
        },
      }));
    } else {
      setEmailLoginDisable(true);
      setSignInRegex((previousState) => ({
        ...previousState,
        email: {
          helperText: "",
          error: false,
        },
      }));
    }
  };

  const resetPassword = async () => {
    try {
      var response = await reset({
        otp: OTP,
        password: signInObject.password,
        email: signInObject.email,
      });
      if (response) {
        setSnackbar(true);
        setSnackbarMessage("Password Reset Successfully");
        setSnackbarSeverity("success");
        setOpen2(false)

      }
    } catch (err) {
      setSnackbar(true);
      setSnackbarMessage("Error Resetting Password");
      setSnackbarSeverity("error");
    }
  };

  const changeEmailSignup = (event) => {
    setSignUpObjet((prevObj) => ({
      ...prevObj,
      email: event.target.value,
    }));

    var email = event.target.value;

    if (!email.match(emailRegex)) {
      setSignUpRegex((previousState) => ({
        ...previousState,
        email: {
          helperText: "Invalid Email",
          error: true,
        },
      }));
    } else {
      setEmailLoginDisable(true);
      setSignUpRegex((previousState) => ({
        ...previousState,
        email: {
          helperText: "",
          error: false,
        },
      }));
    }
  };

  const changePassword = (event) => {
    setSignInObject((prevObj) => ({
      ...prevObj,
      password: event.target.value,
    }));

    var password = event.target.value;
    if (!password.match(passwordRegex)) {
      setSignInRegex((previousState) => ({
        ...previousState,
        password: {
          helperText: "Invalid Password",
          error: true,
        },
      }));
    } else {
      if (emailLoginDisable) {
        setLoginDisable(false);
      }
      setSignInRegex((previousState) => ({
        ...previousState,
        password: {
          helperText: "",
          error: false,
        },
      }));
    }
  };

  const changePasswordSignUp = (event) => {
    setSignUpObjet((prevObj) => ({
      ...prevObj,
      password: event.target.value,
    }));

    var password = event.target.value;
    if (!password.match(passwordRegex)) {
      setSignUpRegex((previousState) => ({
        ...previousState,
        password: {
          helperText: "Invalid Password",
          error: true,
        },
      }));
    } else {
     
      if (emailLoginDisable) {
        setLoginDisable(false);
      }
      setSignUpRegex((previousState) => ({
        ...previousState,
        password: {
          helperText: "",
          error: false,
        },
      }));
    }
  };

  const checkFirstName = (event) => {
    setSignUpObjet((prevObj) => ({
      ...prevObj,
      firstName: event.target.value,
    }));

    var name = event.target.value;

    if (!name.match(nameRegex)) {
      setSignUpRegex((previousState) => ({
        ...previousState,
        firstName: {
          helperText: "Invalid FirstName",
          error: true,
        },
      }));
    } else {
      setSignUpRegex((previousState) => ({
        ...previousState,
        firstName: {
          helperText: "",
          error: false,
        },
      }));
    }
  };

  const checkLastName = (event) => {
    setSignUpObjet((prevObj) => ({
      ...prevObj,
      lastName: event.target.value,
    }));

    var lastName = event.target.value;

    if (!lastName.match(nameRegex)) {
      setSignUpRegex((previousState) => ({
        ...previousState,
        lastName: {
          helperText: "Invalid LastName",
          error: true,
        },
      }));
    } else {
      setSignUpRegex((previousState) => ({
        ...previousState,
        lastName: {
          helperText: "",
          error: false,
          
        },
      }));
    }
  };

  const onSnackbarClose = () => {
    setSnackbar(false);
  };
  const onAlertClose = () => {
    setSnackbar(false);
  };

  return (
    <div>
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
      <div className="origin">
        {/*  */}

        {view ? (
          <Bounce left>
            <div className="Box2">
              <div className="SignIn">
                <div
                  style={{
                    display: "flex",
                    rowGap: "20px",
                    width: "75%",
                    flexDirection: "column",
                    justifyContent: "space-around",
                    alignItems: "center",
                  }}
                >
                  <h2 className="Projectname">Class Enrollment System</h2>
                  <TextField
                    error={signInRegex.email.error}
                    onInput={changeEmail}
                    helperText={signInRegex.email.helperText}
                    size="small"
                    fullWidth
                    margin="dense"
                    id="outlined-basic"
                    label="Email id"
                    variant="outlined"
                  />
                  <Tippy
                    content={
                      <span>
                        Password Should have atleast one special
                        character,number,uppercase letter and minimum 8
                        character
                      </span>
                    }
                  >
                    <TextField
                      error={signInRegex.password.error}
                      type="password"
                      onInput={changePassword}
                      helperText={signInRegex.password.helperText}
                      id="outlined-basic"
                      size="small"
                      fullWidth
                      label="Password"
                      variant="outlined"
                    />
                  </Tippy>
                  <div
                   
                    style={{
                      display: "flex",
                      width: "100%",
                      fontSize: "10px",
                      justifyContent: "flex-end",
                      marginTop: "-20px",
                      cursor: "pointer",
                    }}
               
                  >
                    <p  className="forgotpassbutton"
                    onClick={handleOpen3}>Forgot Password?</p>
                  </div>

                  <Modal
                    open={open3}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                  >
                    <Box sx={style3}>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          rowGap: "20px",

                          justifyContent: "space-around",
                          alignItems: "center",
                        }}
                      >
                        <DisabledByDefaultIcon
                          className="cancelbutton3"
                          onClick={() => {
                            setOpen3(false);
                          }}
                        />
                        <TextField
                          error={signInRegex.email.error}
                          type={changeEmail}
                          onInput={changeEmail}
                          helperText={signInRegex.email.helperText}
                          id="outlined-basic"
                          size="small"
                          fullWidth
                          label="Enter Email id"
                          variant="outlined"
                        />
                        <Button
                          onClick={handleOpen2}
                          fullWidth
                          style={{
                            background: "#1C266E",
                            textTransform: "none",
                          }}
                          variant="contained"
                          disableFocusRipple="true"
                        >
                          Validate Email
                        </Button>
                      </div>
                    </Box>
                  </Modal>

                  <Modal
                    open={open2}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                  >
                    <Box sx={style2}>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          rowGap: "20px",

                          justifyContent: "space-around",
                          alignItems: "center",
                        }}
                      >
                        <DisabledByDefaultIcon
                          className="cancelbutton2"
                          onClick={() => {
                            setOpen2(false);
                          }}
                        />
                        <Typography
                          id="modal-modal-title"
                          variant="h6"
                          component="h2"
                          color={"#1C266E"}
                          sx={{ marginTop: "-10px" }}
                        >
                          Please Enter Otp
                        </Typography>
                        <OTPInput
                          value={OTP}
                          onChange={setOTP}
                          autoFocus="true"
                          OTPLength={4}
                          otpType="number"
                          disabled={false}
                        />

                        <TextField
                          error={signInRegex.password.error}
                          type="password"
                          onInput={changePassword}
                          helperText={signInRegex.password.helperText}
                          id="outlined-basic"
                          size="small"
                          fullWidth
                          label="Password"
                          variant="outlined"
                        />
                        <TextField
                          error={signInRegex.password.error}
                          type={changePassword}
                          onInput={changePassword}
                          helperText={signInRegex.password.helperText}
                          id="outlined-basic"
                          size="small"
                          fullWidth
                          label="Confirm Password"
                          variant="outlined"
                        />
                        <Button
                          onClick={() => resetPassword()}
                          fullWidth
                          style={{
                            background: "#1C266E",
                            textTransform: "none",
                          }}
                          variant="contained"
                          disableFocusRipple="true"
                        >
                          Reset Password
                        </Button>
                      </div>
                    </Box>
                  </Modal>

                  <Button
                    className="loginbutton"
                    disabled={loginDisable}
                    onClick={handleLogin}
                    fullWidth
                    variant="contained"
                    disableFocusRipple="true"
                  >
                    Login
                  </Button>

                  <div style={{ display: "flex", gap: "0.2rem" }}>
                    Not a member?
                    <div
                      style={{ color: "blue", cursor: "pointer" }}
                      onClick={() => setView(!view)}
                    >
                      SignUp
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Bounce>
        ) : (
          <Bounce left>
            <div className="Box3">
              <div className="SignUp">
                <div
                  style={{
                    display: "flex",
                    rowGap: "1rem",
                    width: "75%",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <h2 className="Projectname">Class Enrollment System</h2>
                  <div
                    style={{
                      display: "flex",
                      width: "90%",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                      rowGap: "0.5rem",
                      height: "50%",
                    }}
                  >
                    <TextField
                      style={{ maxHeight: "10vh" }}
                      onChange={checkFirstName}
                      size="small"
                      fullWidth
                      margin="dense"
                      id="outlined-basic"
                      label="First Name"
                      variant="outlined"
                      error={signUpRegex.firstName.error}
                      helperText={signUpRegex.firstName.helperText}
                    />

                    <TextField
                      style={{ maxHeight: "10vh" }}
                      onInput={checkLastName}
                      id="outlined-basic"
                      size="small"
                      fullWidth
                      margin="dense"
                      label="Last Name"
                      variant="outlined"
                      error={signUpRegex.lastName.error}
                      helperText={signUpRegex.lastName.helperText}
                    />

                    <TextField
                      style={{ maxHeight: "10vh" }}
                      type={"email"}
                      onChange={changeEmailSignup}
                      id="outlined-basic"
                      size="small"
                      fullWidth
                      margin="dense"
                      label="Email"
                      variant="outlined"
                      error={signUpRegex.email.error}
                      helperText={signUpRegex.email.helperText}
                    />

                    <TextField
                      type={"password"}
                      style={{ maxHeight: "10vh" }}
                      onInput={changePasswordSignUp}
                      id="outlined-basic"
                      size="small"
                      fullWidth
                      margin="dense"
                      label="Password"
                      variant="outlined"
                      error={signUpRegex.password.error}
                      helperText={signUpRegex.password.helperText}
                    />

                    <FormControl className="fc">
                      <InputLabel id="demo-simple-select-label">
                        Select
                      </InputLabel>
                      <Select
                        labelId="labelsignup"
                        id="labelsignup"
                        value={userType}
                        label="Select"
                        onChange={handleUserType}
                        sx={{ height: "2.5rem" }}
                      >
                        <MenuItem value={"Student"}>Student</MenuItem>
                        <MenuItem value={"Admin"}>Admin</MenuItem>
                      </Select>
                    </FormControl>

                    <Button
                    disabled = {ProceedDisable}
                      onClick={handleOpenForProceed}
                      fullWidth
                      variant="contained"
                    >
                      Proceed
                    </Button>
                    <div style={{ display: "flex", gap: "0.2rem" }}>
                      {" "}
                      Already a member?
                      <div
                        style={{ color: "blue", cursor: "pointer" }}
                        onClick={() => setView(!view)}
                      >
                        Login
                      </div>
                    </div>
                  </div>

                  <Modal
                    open={openForProceed}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                  >
                    <Box sx={style1}>
                      <DisabledByDefaultIcon
                        className="cancelbutton"
                        onClick={() => {
                          setOpenForProceed(false);
                        }}
                      />
                      <Typography
                        id="modal-modal-title"
                        variant="h6"
                        component="h2"
                        color={"#1C266E"}
                        sx={{ marginTop: "-10px" }}
                      >
                        Please Enter Otp
                      </Typography>
                      <OTPInput
                        value={OTP}
                        onChange={setOTP}
                        autoFocus="true"
                        OTPLength={4}
                        otpType="number"
                        disabled={false}
                      />
                      <button
                        style={{ marginTop: "1rem", marginLeft: "22rem" }}
                        onClick={handleOtp}
                      >
                        Verify
                      </button>
                    </Box>
                  </Modal>
                </div>
              </div>
            </div>
          </Bounce>
        )}
      </div>
    </div>
  );
};
