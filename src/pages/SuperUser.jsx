import * as React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import SuperUserListApprove from "../components/SuperUserListApprove";
import SuperUserListDisapprove from "../components/SuperUserListDisapprove";

export default function SuperUser() {
  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box classname sx={{ width: "100vw", typography: "body1" }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList
            onChange={handleChange}
            centered
            flexContainer
            sx={{ width: "100vw", typography: "body1" }}
            aria-label="lab API tabs example"
          >
            <Tab label="Approve" value="1" />
            <Tab label="Disapprove" value="2" />
          </TabList>
        </Box>
        <TabPanel value="1">
          <SuperUserListApprove />
        </TabPanel>
        <TabPanel value="2">
          <SuperUserListDisapprove />
        </TabPanel>
      </TabContext>
    </Box>
  );
}
