import "../css/SuperUserList.css";
import React, { useState, useEffect } from "react";
import {
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
} from "@mui/material";

import { getAdminsRequests, grantAdminRequest } from "../services/SuperService";

import Flip from "react-reveal/Flip";

function SuperUserListApprove() {
  const [AdminsRequests, setAdminsRequests] = useState([]);
  const initalDataSet = async () => {
    const data = await getAdminsRequests();
    setAdminsRequests(data.data.data);
  };

  useEffect(() => {
    // getAdminsRequests()
    // .then((res) => {
    //   setAdminsRequests(res.data.data)
    // })
    initalDataSet();
  }, []);

  const handleApproval = async (email) => {
    console.log("===========handle approval===========", email);
    await grantAdminRequest(email);
    initalDataSet();
  };

  return (
    <div className="superOriginBackGround">
      <Flip left>
        <div className="superMainBox">
          <h2 style={{ color: " #1c266e" }}>Approve Access</h2>
          <div className="ListOfDetails">
            <List>
              {AdminsRequests.map((user) => (
                <ListItem>
                  <ListItemText
                    primary={user.firstName + " " + user.lastName}
                    secondary={user.email}
                  />
                  {
                    <ListItemSecondaryAction>
                      <Button
                        variant="contained"
                        onClick={() => {
                          handleApproval(user.email);
                        }}
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
