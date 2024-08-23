import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import CommentIcon from '@mui/icons-material/Comment';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useEffect } from 'react';
import { DeleteTeacher, getallteachers } from '../api/profesor.api';
export default function CheckboxList() {
  const [teachers,setteachers] = React.useState([])
  const [change,setchage] = React.useState(0)



  async function GetTeachers() {
    const respuesta = await getallteachers()
    setteachers(respuesta)

  }
  useEffect(()=>{
    GetTeachers()
  },[change])

  async function DeleteProcess(id) {
    const respuesta = await DeleteTeacher(id)
    if (respuesta[0]==400) {
    console.log(respuesta[1].msg)
    }else if (respuesta[0]==200) {
      console.log(respuesta[1].msg)
      setchage(change + 1)
    }
    
  }

  return (
    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      {teachers&&teachers.map((value) => {
        const labelId = `checkbox-list-label-${value}`;

        return (
          <ListItem
            key={value}
            secondaryAction={
              <IconButton edge="end" aria-label="comments">
                <DeleteForeverIcon onClick={()=>{DeleteProcess(value._id)}}/>
              </IconButton>
            }
            disablePadding
          >
            <ListItemButton role={undefined} dense>
              <ListItemText id={labelId} primary={value.nombrecompleto} />
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
  );
}
