import * as React from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import { Box } from "@mui/material";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import sampleimg from "../images/eour.jpeg";

function CourseCard() {
  return (
    <Card
      style={{
        width: "18vw",
        height: "50vh",
        border: "1px solid #E2E2E2",
        display: "flex",
        flexDirection: "column",
        background: "#FFFFFF 0% 0% no-repeat padding-box",
        borderRadius: "3px",
        opacity: 1,
      }}
    >
      <Box
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: "60%",
          background: "#F5F5F5 0% 0% no-repeat padding-box",
          borderRadius: "2px 2px 0px 0px",
          opacity: "1",
        }}
      >
        <Box
          style={{
            width: "50%",
            height: "140px",
          }}
        >
          <CardMedia
            component="img"
            height="140px"
            width="100%"
            image={sampleimg}
            alt="Course"
          />
        </Box>
      </Box>
      <Box
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: "40%",
          // border: '1px solid green'
        }}
      >
        <Box
          style={{
            width: "85%",
            height: "100px",
            // border: '1px solid yellow',
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box
            style={{
              // border: '1px solid pink',
              width: "100%",
              height: "25px",
              color: "#0A0102",
              font: "normal normal normal 14px/19px Roboto",
              letterSpacing: "0px",
              alignItems: "center",
            }}
          >
            Vfx Advance
          </Box>
          <Box
            style={{
              // border: '1px solid blue',
              width: "100%",
              height: "25px",
              color: "#878787",
              font: "normal normal normal 10px/13px Roboto",
              letterSpacing: "0px",
              alignItems: "center",
            }}
          >
            By Jatin Kumar
            <Box> Duration : 30 Hr</Box>
          </Box>
          <Box
            style={{
              // border: '1px solid purple',
              width: "100%",
              height: "25px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Box
              style={{
                background: "#388E3C 0% 0% no-repeat padding-box",
                borderRadius: "1px",
                opacity: "1",
                width: "18%",
                height: "20px",
                color: "#FFFFFF",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontSize: "13px",
                //border : "2px solid red"
              }}
            >
              4.5
              <StarBorderIcon fontSize="x-small" />
            </Box>
            <Box
              style={{
                color: "#878787",
                letterSpacing: "0px",
                paddingLeft: "7px",
                //border : "2px solid red"
              }}
            >
              (20)
            </Box>
          </Box>
          <Box
            style={{
              // border: '1px solid brown',
              width: "100%",
              height: "25px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Box
              style={{
                color: "#0A0102",
                font: "normal normal normal 12px/16px Roboto",
                letterSpacing: "0px",
              }}
            >
              Rs. 1500
            </Box>
            <Box
              style={{
                color: "#878787",
                font: "normal normal normal 10px/13px Roboto",
                letterSpacing: "0px",
                marginLeft: "7px",
                textDecoration: "line-through",
              }}
            >
              Rs. 2000
            </Box>
          </Box>
        </Box>
      </Box>
    </Card>
  );
}

export default CourseCard;
