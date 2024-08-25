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
import useStore from '../store/useStore';


export default function CheckboxList() {
  const [teachers,setteachers] = React.useState([])
  const [change,setchage] = React.useState(0)
  const {count,SetID,DeleteTeacherTrue,OpenDialog} = useStore()

  async function GetTeachers() {
    const respuesta = await getallteachers()
    setteachers(respuesta)

  }
  useEffect(()=>{
    GetTeachers()
  },[count])

  async function DeleteProcess(id) {
    SetID(id)
    DeleteTeacherTrue()
    OpenDialog()
    
  }

  return (
    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      {teachers&&teachers.map((value) => {
        const labelId = `checkbox-list-label-${value}`;

        return (
          <ListItem
            key={value._id}
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
