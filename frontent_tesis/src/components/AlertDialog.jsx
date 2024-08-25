import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useStore from '../store/useStore';
import { DeleteTeacher } from '../api/profesor.api';
import { DeleteStudent } from '../api/alumno.api';
import { DeleteGrade } from '../api/curso.api';

export default function AlertDialog() {
  // const [open, setOpen] = React.useState(false);
  const {inc,count,dialog,CloseDialog,id,SetID,grade,student,teacher,DeleteGradeFalse,DeleteStudentFalse,DeleteTeacherFalse} = useStore()
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    CloseDialog();
  };
  
  const DeleteGradeProcess = async ()=>{
    const respuesta = await DeleteGrade(id)
    if (respuesta[0]==400) {
    console.log(respuesta[1].msg)
    }else if (respuesta[0]==200) {
      console.log(respuesta[1].msg)
      CloseDialog();
      inc()
      DeleteGradeFalse()
    }
  }


  const DeleteTeacherProcess = async ()=>{
    const respuesta = await DeleteTeacher(id)
    if (respuesta[0]==400) {
    console.log(respuesta[1].msg)
    }else if (respuesta[0]==200) {
      console.log(respuesta[1].msg)
      CloseDialog();
      inc()
      DeleteTeacherFalse()
    }
  }
  const DeleteStudentProcess = async ()=>{
    const respuesta = await DeleteStudent(id)
    if (respuesta[0]==400) {
    console.log(respuesta[1].msg)
    }else if (respuesta[0]==200) {
      console.log(respuesta[1].msg)
      CloseDialog();
      inc()
      DeleteStudentFalse()
    }
  }


  return (
    <React.Fragment>
      <Dialog
        open={dialog}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {
          grade ? "Delete Grade ?" :
          teacher ? "Delete Teacher ?" :
          "Delete Student"
          }
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {
            grade ? "Are you sure you want to delete this grade? there are 15 students signed up for this grade." :
            teacher ? "Are you sure you want to delete this Teacer? they have assigned 3 grades " :
            "Are you sure you want to delete this Student?"              
            }
            
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={()=>{
            grade ? DeleteGradeProcess():
            teacher ? DeleteTeacherProcess():
            DeleteStudentProcess()
            }} autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
