import React, { useEffect } from "react";
import '../css/Course.css'
import { IconButton } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Flip from 'react-reveal/Flip';
import sampleimg from "../images/71OsIaHonQL._SL1500_.jpg"

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

export const Course = (props) => {
    console.log("props", props);
   
    const myState = useSelector(state => state.CourseReducer)
    const [snackbar, setSnackbar] = useState(false)
    const [snackbarMessage,setSnackbarMessage]=useState('')
    const [snackbarSeverity,setSnackbarSeverity]=useState('')
    const navigate = useNavigate();
    const onSnackbarClose = () => {
        setSnackbar(false)
      }
      const onAlertClose = () => {
        setSnackbar(false)
      }
    useEffect(() => {

    }, [])

    const handleChange = async () => {
        // alert(props.name)
        switch (props.choice) {
            case 'Available Courses':
                if (myState.coursesEnrolled.has(props.id)) {
                    setSnackbar(true)
                    return
                }
                navigate("/CourseDetail", {
                    state: {
                        id: props.id,
                        courseName: props.name,
                        instructor: props.instructor,
                        lastDate: props.lastDate,
                        duration: props.duration,
                        seatsLeft: props.seatsLeft,
                        courseDescription: props.courseDescription,
                        fee : props.fee
                    }
                })
                break;
            case 'My Courses': 
                navigate("/CourseNotes", {
                    state: {
                        id: props.id,
                        courseName: props.name,
                        instructor: props.instructor,
                        lastDate: props.lastDate,
                        duration: props.duration,
                        seatsLeft: props.seatsLeft,
                        courseDescription: props.courseDescription,
                        url : props.url,
                    }
                });
                break;
        }

    }
    return (
        <>
            <Snackbar open={snackbar} autoHideDuration={1000} onClose={onSnackbarClose}>
                <Alert onClose={onAlertClose} severity='info' sx={{ width: '100%' }}>
                    {'Course Already Enrolled'}
                </Alert>
            </Snackbar>
            <Flip left>
            <div onClick={handleChange} style={{ cursor: 'pointer' ,  backgroundColor : "#F5F5F5" ,  boxShadow : "0px 0px 10px rgba(0, 0, 0, 0.3)"}} className="card">
                <div className="card-image" >
                    <img className="card-image-display" src={sampleimg} onError={() => 'src=https://public-v2links.adobecc.com/d096df37-ca37-4026-553f-8cfa6bec09ec/component?params=component_id%3A634ba680-536e-4b6f-b4a3-41986b9b22f5&params=version%3A0&token=1679461552_da39a3ee_5b75718b73ea33c3022cbe352cbeb9bcb66597f0&api_key=CometServer1'} />
                    {!props.isStudent && <IconButton style={{ position: 'abslute', top: '-80px', right: '-50px', background: 'black', color: 'white' }}>
                        <CloseIcon />
                    </IconButton>
                    }
                </div>

                <div style={{ height: '37%', width: '100%', marginLeft: '10px', marginBottom: '10px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', rowGap: '2' }}>
                    <div style={{ color: '#0A0102', marginLeft: '0px', fontSize: '14px' }}><span>Course Name : {props.name}</span></div>

                    <div style={{ color: '#878787', fontSize: '10px', marginLeft: '0px', marginBottom: '5px' }}><span>Instructor Name : {props.instructor}</span></div>
                    <div style={{ color: '#878787', fontSize: '10px', marginLeft: '0px', marginBottom: '5px' }}><span>Last Date To Enroll :{props.lastDate}</span></div>

                    <div>
                        <span style={{ marginTop: '5px', padding: '3px 7px 3px 7px', fontSize: '10px', textAlign: 'center', width: '14px', height: '13px', background: 'green', color: 'white' }}>Duration:{props.duration}hrs approx.</span  >
                    </div>
                    <div style={{ marginTop: '5px', }}><span style={{ fontSize: '12px' }}>Seats Left:{props.seatsLeft} </span></div>
                </div>
            </div>
            </Flip>

        </>

    )
}