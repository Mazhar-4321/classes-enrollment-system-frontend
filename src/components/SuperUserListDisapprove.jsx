import "../css/SuperUserList.css";
import React, { useState } from "react";
import {
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
} from "@mui/material";

import Flip from "react-reveal/Flip";

function SuperUserListDisapprove() {
  const [user, setUser] = useState([
    { id: 1, name: "Aarav Patel", email: "aarav.patel@example.com" },
    { id: 2, name: "Aditi Sharma", email: "aditi.sharma@example.com" },
    { id: 3, name: "Arjun Singh", email: "arjun.singh@example.com" },
  
  ]);

  return (
    <div className="superOriginBackGround">
      <Flip left>
        <div className="superMainBox">
          <h2 style={{ color: " #1c266e" }}> Revoke Access</h2>
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