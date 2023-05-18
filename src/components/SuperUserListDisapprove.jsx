import "../css/SuperUserList.css";
import React, { useState, useEffect } from "react";
import {
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
} from "@mui/material";

import Flip from "react-reveal/Flip";
import {
  getAdminsRequestsRejection,
  grantAdminRequestRejection,
} from "../services/SuperService";

function SuperUserListDisapprove() {
  const [AdminsRequests, setAdminsRequests] = useState([]);

  useEffect(() => {
    getAdminsRequestsRejection().then((res) => {
      setAdminsRequests(res.data.data);
    });
  }, []);

  const handleDispproval = async (email) => {
    console.log("===== handleDispproval========", email);
    await grantAdminRequestRejection(email);
    getAdminsRequestsRejection().then((res) => {
      setAdminsRequests(res.data.data);
    });
  };

  return (
    <div className="superOriginBackGround">
      <Flip left>
        <div className="superMainBox">
          <h2 style={{ color: " #1c266e" }}> Revoke Access</h2>
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
                          handleDispproval(user.email);
                        }}
                      >
                        Disapprove Privilige
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

export default SuperUserListDisapprove;
