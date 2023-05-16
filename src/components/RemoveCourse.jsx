import React, { useEffect, useState } from "react";
import { deleteCourse, getMyCourses } from "../services/AdminService";
import Grid from '@mui/material/Grid';
import { IconButton } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import "../css/RemoveCourse.css"
import Flip from 'react-reveal/Flip';


export const RemoveCourse = () => {
    const [courses, setCourses] = useState([])
    useEffect(() => {
        const dbCall = async () => {
            try {
                var response = await getMyCourses()
                console.log("response bhaya", response)
                setCourses(response)
            } catch (err) {
                console.log("err", err)
            }
        }
        dbCall()
    }, [])

    const deleteCourses = async (id) => {
        // console.log(id);
        // console.log(courses.filter(e => e.c_id != id))
        try {
            var response = await deleteCourse(id);
            if (response) {
                setCourses(courses.filter(e => e.c_id != id))
            }
        } catch (err) {

        }
    }
    return (
        <div>
            <div className="originRemoveCourse">
            <Grid container spacing={2}>

                {
                    courses.map(e => {
                        return (
                            <Grid  sx={{marginLeft : "50px"}} item xs={2.4}>
                                        <Flip left>
                                <div style={{ cursor: 'pointer' , backgroundColor : " #F2F5F5" }} className="card" >
                                    <div className="card-image" >
                                        <img className="card-image-display" src={'https://www.shutterstock.com/image-vector/open-book-vector-clipart-silhouette-260nw-795305758.jpg'} onError={() => 'src=https://public-v2links.adobecc.com/d096df37-ca37-4026-553f-8cfa6bec09ec/component?params=component_id%3A634ba680-536e-4b6f-b4a3-41986b9b22f5&params=version%3A0&token=1679461552_da39a3ee_5b75718b73ea33c3022cbe352cbeb9bcb66597f0&api_key=CometServer1'} />
                                        <IconButton className="cancelMark">
                                            <CloseIcon className="mark" onClick={() => deleteCourses(e.c_id)} />
                                        </IconButton>

                                    </div>

                                    <div style={{ height: '37%', width: '100%', marginLeft: '10px', marginBottom: '10px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', rowGap: '2' }}>
                                        <div style={{ color: '#0A0102', marginLeft: '0px', fontSize: '14px' }}><span>Course Name : {e.name}</span></div>

                                        <div style={{ color: '#878787', fontSize: '10px', marginLeft: '0px', marginBottom: '5px' }}><span>Instructor Name : {e.instructor}</span></div>
                                        <div style={{ color: '#878787', fontSize: '10px', marginLeft: '0px', marginBottom: '5px' }}><span>Last Date To Enroll :{e.lastDate}</span></div>

                                        <div>
                                            <span style={{ marginTop: '5px', padding: '3px 7px 3px 7px', fontSize: '10px', textAlign: 'center', width: '14px', height: '13px', background: 'green', color: 'white' }}>Duration:{e.duration}hrs approx.</span  >
                                        </div>
                                        <div style={{ marginTop: '5px', }}><span style={{ fontSize: '12px' }}>Seats Left:{e.seatsLeft} </span></div>
                                    </div>
                                </div>
                                </Flip>
                            </Grid>
                        )
                    })
                }
            </Grid>
            </div>
        </div>
    )
}