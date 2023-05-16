import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { UploadCourse2 } from './UploadCourse2';
import { RemoveCourse } from '../components/RemoveCourse';
import QuestionForm from './UploadQuestion';
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import ApproveCourseCertificateRequest from '../components/ApproveCourseCertificateRequest';
import DashBoard from './DashBoard';
import "../css/AdminDashBoard.css"



export default function LabTabs() {
  const [value, setValue] = React.useState('1');
  const [visualData, setVisualData] = React.useState([])
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleChange = (event, newValue) => {
    if (newValue == 5) {
      dispatch({
        type: 'removeToken'
      })
      navigate("/");
    }
    setValue(newValue);
  };

  return (
    <Box classname sx={{ width: '100vw', typography: 'body1' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList centered flexContainer sx={{ width: '100vw', typography: 'body1' }} onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Dashboard" value="1" />
            <Tab label="Upload/Edit Course" value="2" />
            <Tab label="Remove Course" value="3" />
      
            <Tab label="Upload Quiz" value="4" />
            <Tab label="Logout" value="5" />
 
          </TabList>
        </Box>
        <TabPanel value="1"><DashBoard  visualData={visualData}/></TabPanel>
        <TabPanel value="2"><UploadCourse2 /></TabPanel>
        <TabPanel value="3"><RemoveCourse /></TabPanel>
 
        <TabPanel value="4"><QuestionForm /></TabPanel>
       <TabPanel value="5">Logout</TabPanel>

      </TabContext>
    </Box>
  );
}