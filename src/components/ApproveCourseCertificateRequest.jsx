import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';

import { getCertificateRequests } from '../services/AdminService';

export default function ApproveCourseCertificateRequest() {
  const [checked, setChecked] = React.useState([0]);
  const [requests,setRequests] =React.useState([])
React.useEffect(()=>{
const dbCall=async()=>{
var response=await getCertificateRequests();
setRequests(response);
}
dbCall()
},[])
  const handleToggle = (value) => () => {
    console.log(value.name,value.student_id)
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  return (
    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      {requests.map((value) => {
        const labelId = `checkbox-list-label-${value}`;

        return (
          <ListItem
            key={value.student_id}
            
            disablePadding
          >
            <ListItemButton role={undefined} onClick={handleToggle(value)} dense>
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  checked={checked.indexOf(value) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ 'aria-labelledby': labelId }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={value.student_id} />
              <ListItemText id={labelId} primary={value.name} />
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
  );
}