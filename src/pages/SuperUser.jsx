import * as React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import SuperUserListApprove from "../components/SuperUserListApprove";
import SuperUserListDisapprove from "../components/SuperUserListDisapprove";
import TextField from '@mui/material/TextField';
import { useEffect, useState } from "react";
import Button from '@mui/material/Button';
import  '../css/SuperUser.css'



export default function SuperUser() {
  const [value, setValue] = React.useState("1");
  const [password, setpassword] = useState("");
  const [codeValidation, setcodeValidation] = useState(false);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


  const handlesubmit = () => {

     if(password === "admin"){
      setcodeValidation(true)
     }
     else{
      alert("WRONG PASSWORD")
     }


  }







  return (
    <Box classname = "originSuper" >


   { codeValidation ? 
        
        <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider"  }}>
          <TabList
            onChange={handleChange}
            centered
            flexContainer
            aria-label="lab API tabs example"
          >
            <Tab label="Approve" value="1" />
            <Tab label="Disapprove" value="2" />
          </TabList>
        </Box>
        <TabPanel value="1">
          <SuperUserListApprove />
        </TabPanel>
        <TabPanel value="2">
          <SuperUserListDisapprove />
        </TabPanel>
      </TabContext>  :        
      
      

    <div className="Verification">
      <div className="boxcode">
        <p  style={{fontSize : "20px"}}  >ENTER PASSWORD</p>
        <TextField type="password" onChange={(e) => setpassword(e.target.value)}  id="outlined-basic" label="Password" variant="outlined" />
         <Button variant="contained"  onClick={handlesubmit}>Submit</Button>
         </div>
    </div>


   }
    </Box>
  );
}
