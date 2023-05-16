import React, { useEffect, useState } from "react";
import '../css/Course.css'
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
export const PDFViewer = (props) => {
    console.log("props", props)
    const myState = useSelector(state => state.CourseReducer)
    const [open, setOpen] = useState(false);
    const [pdfContent, setPDFContent] = useState(props.url)
    const navigate = useNavigate();
    useEffect(() => {
    }, [])

    const handleChange = async (soda) => {
        setOpen(true)
        setPDFContent(props.url)
    }

    const handleClose = () => {

        setOpen(false);
    }
    return (
        <>
        <Dialog
                fullScreen
                open={open}
                onClose={handleClose}
                TransitionComponent={Transition}
            >
                <AppBar sx={{ position: 'relative' }}>
                    <Toolbar>
                      
                        <div style={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'flex-end' }}><IconButton
                            edge="end"
                            color="inherit"
                            onClick={handleClose}
                            aria-label="close"
                        >
                            <CloseIcon />
                        </IconButton>
                        </div>
                    </Toolbar>
                </AppBar>
               
                <object style={{ width: '100vw', height: '100vh' }} data={pdfContent} type="application/pdf" width="100%" height="100%">
                    <p>Alternative text - include a link <a href="abc.pdf">to the PDF!</a></p>
                </object>
            </Dialog>
            <div onClick={()=>handleChange("soda")} style={{ cursor: 'pointer' }} className="card">
            <div className="card-image" >
                <img className="card-image-display" src={'https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/PDF_file_icon.svg/1200px-PDF_file_icon.svg.png'} onError={() => 'src=https://public-v2links.adobecc.com/d096df37-ca37-4026-553f-8cfa6bec09ec/component?params=component_id%3A634ba680-536e-4b6f-b4a3-41986b9b22f5&params=version%3A0&token=1679461552_da39a3ee_5b75718b73ea33c3022cbe352cbeb9bcb66597f0&api_key=CometServer1'} />
                {!props.isStudent && <IconButton style={{ position: 'absolute', top: '-80px', right: '-50px', background: 'black', color: 'white' }}>
                    <CloseIcon />
                </IconButton>
                }
            </div>

            <div style={{ height: '37%', width: '100%', marginLeft: '10px', marginBottom: '10px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', rowGap: '2' }}>
                <div style={{ color: '#0A0102', marginLeft: '0px', fontSize: '14px' }}><span> {props.name}</span></div>


            </div>
            

        </div>
        </>
       
    )
}