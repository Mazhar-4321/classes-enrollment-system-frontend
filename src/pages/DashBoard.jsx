//import Header from "../components/Header.jsx";
import { Box, Grid } from "@mui/material";
import CourseCard from "../components/CourseCard.jsx"
import { Container } from "@mui/material";
//import Pie from "../components/PieGraph.js";
import "../css/DashBoard.css"
import { useEffect, useState } from "react";
import { getDashboardData 
  , getDashboardDatabox 
  , getDashboardDatabox2
  , getDashboardDatabox3 } from "../services/AdminService.js";
import { Bar, Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto';





function DashBoard() {



  const [totalStudents, settotalStudents] = useState("");

  const [totalCourses , settotalCourses] = useState("");

  const [catalog, setcatalog] = useState(false);

  const [totalNotes, settotalNotes] = useState("");

  const [trending, settrending] = useState("");

  const [dataForAdminDashBoard, setdataForAdminDashBoard] = useState([]);

useEffect(() => {

    adminDashBoardDbCall();
   

},[]);


  const adminDashBoardDbCall = async () => {
    
    var response = await getDashboardData();
    var response2 = await getDashboardDatabox();
    var response3 = await getDashboardDatabox2();
    var response4 = await getDashboardDatabox3();


 

    console.log("IN DASHBOARD DB CALL---->",response)
    
    const courses = response;
    const courseWithLeastSeats = courses.sort((a, b) => parseInt(a.seatsLeft) - parseInt(b.seatsLeft))[0];
    console.log('Course with least seats left:', courseWithLeastSeats);
    settrending(courseWithLeastSeats.name)
 
    console.log ("=========== total students ===============>",response2[0]["COUNT( role_name )"])
   
    console.log ("============ toatal courses ==============>",response3[0]["COUNT( * )"])
   
    console.log ("============ toatal notes ==============>",response4[0]["COUNT( * )"])
   
    setdataForAdminDashBoard(response)
    
    settotalStudents ( response2[0]["COUNT( role_name )"] )
    settotalCourses ( response3[0]["COUNT( * )"] )
    settotalNotes ( response4[0]["COUNT( * )"] )

    if(totalCourses > 10 ){
      setcatalog(true)
    }


    
  //setdataForAdminDashBoard(response2)


    
      
  }


  const data1 = {
  
    labels: dataForAdminDashBoard.map((i) => i.name),
    datasets: [
      {
        label: 'Enrollments',
        data:  dataForAdminDashBoard.map((i) => i.enrollments),
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 2,
      },
    ],
  };

  

  const data2 = {
  
    labels: dataForAdminDashBoard.map((i) => i.name),
    datasets: [
      {
        label: 'Seats Left',
        data:  dataForAdminDashBoard.map((i) => i.seatsLeft),
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 2,
      },
    ],
  };
  
  const options = {
    scales: {
      y: {
        min: 0,
        max: 10,
        stepSize: 1,
        
      },
    },
  };

  
  return (
    <div>

      <div className="originAdminDashboard">
    
      <div className="dashRow1">
        <div className="box1">
        <p className="boxnumber">{totalStudents}</p>
        <p className="textTitle" >Students </p>
     </div>
     <div className="box1">
        <p className="boxnumber">{totalCourses}</p>
        <p className="textTitle" >Courses </p>
        </div>
        <div className="box1">
        <p className="boxnumber">{totalNotes}</p>
        <p className="textTitle" >Notes </p>
        </div>
        <div className="box1">
        <p className="boxnumber">{trending}</p>
        <p className="textTitle"  > Trending </p>
        </div>
        <div className="box1">
          { catalog ? 
        <p className="boxnumber"> <div style={{color : "green"}}>▲</div> </p> 
      :
      <p className="boxnumber"> <div style={{color : "red"}}>▼</div> </p>  }
        <p className="textTitle" > Catalog </p>
        </div>



    </div>
    <div className="dashrow2">
      <div className="barChart">
    <h2 style={{color : "#1c266e"}}>Bar Chart</h2>
    <Bar data={data1} options={options} />
    </div>
    <div className="barChart">
    <h2 style={{color : "#1c266e"}}>Line Chart</h2>
    <Line data={data2} options={options} />
    </div>
    </div>
    </div>
  </div>
  );
}

export default DashBoard;
