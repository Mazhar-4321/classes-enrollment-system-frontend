import "../css/SuperUserList.css";
import React, { useState , useEffect } from "react";
import {
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
} from "@mui/material";


import {getAdminsRequests} from "../services/SuperService"

import Flip from "react-reveal/Flip";

function SuperUserListApprove() {
  const [user, setUser] = useState([
    { id: 1, name: "Aarav Patel", email: "aarav.patel@example.com" },
    { id: 2, name: "Aditi Sharma", email: "aditi.sharma@example.com" },
    { id: 3, name: "Arjun Singh", email: "arjun.singh@example.com" },
    { id: 4, name: "Avi Khanna", email: "avi.khanna@example.com" },
    { id: 5, name: "Dia Mehta", email: "dia.mehta@example.com" },
    { id: 6, name: "Gauri Shah", email: "gauri.shah@example.com" },
    // { id: 7, name: "Kabir Malhotra", email: "kabir.malhotra@example.com" },
    // { id: 8, name: "Lakshmi Nair", email: "lakshmi.nair@example.com" },
    // { id: 9, name: "Riya Desai", email: "riya.desai@example.com" },
    // { id: 10, name: "Vikram Chauhan", email: "vikram.chauhan@example.com" },
  ]);

   useEffect(() => {
        
    getAdminsRequestsDB()
   
    
   }, )
   
         const  getAdminsRequestsDB = async ( ) => {

        let result = await getAdminsRequests()
          console.log("=================>",result)

         }










  return (
    <div className="superOriginBackGround">
      <Flip left>
        <div className="superMainBox">
          <h2 style={{ color: " #1c266e" }}>Approve Access</h2>
          <div className="ListOfDetails">
            <List>
              {user.map((user) => (
                <ListItem key={user.id}>
                  <ListItemText primary={user.name} secondary={user.email} />
                  {
                    <ListItemSecondaryAction>
                      <Button
                        variant="contained"
                        onClick={() => alert("Approved")}
                      >
                        Approve Privilige
                      </Button>
                    </ListItemSecondaryAction>
                  }
                </ListItem>
              ))}
            </List>
          </div>
        </div>
      </Flip>
    </div>
  );
}

export default SuperUserListApprove;
