import React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import "../css/MyProfile.css";
import { useSelector } from 'react-redux';

export const MyProfile = () => {

  const { firstName, lastName, email } = useSelector(state => state.CourseReducer1.userDetails);

  return (
    <div className="originMyProfile">
      
      <div className="myProfile">
      <h2 style={{ color: " #1c266e" }}>Update Profile </h2>
        <TextField
          //  sx={{width:'35%',margin:'20px'}}
          sx={{width : "80%"}}
          fullWidth
          id="outlined-required"
          label="First Name"
          defaultValue= {firstName}
        />
        <TextField
          // sx={{width:'35%',margin:'20px'}}
          sx={{width : "80%"}}
          fullWidth
          id="outlined-required"
          label="Last Name"
          defaultValue={lastName}
        />

        <TextField
          //  sx={{width:'35%',margin:'20px'}}
          sx={{width : "80%"}}
          fullWidth
          id="outlined-required"
          label="Email"
          defaultValue={email}
        />

        <TextField
         
          sx={{width : "80%"}}
          fullWidth
          id="outlined-required"
          type="password"
          label="Password"
          defaultValue="TBD"
        />
        <div className="submit">
          <Button sx={{ textTransform: "none" , marginBottom : "2rem" }} variant="contained">
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
};
