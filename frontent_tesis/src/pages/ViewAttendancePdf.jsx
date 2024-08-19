import React from 'react';
import Pdf from '../components/PDF';
import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';
import { IconButton, Toolbar, Typography } from '@mui/material';
import ArrowBack from '@mui/icons-material/ArrowBack';
import theme from '../color/color';
import { useLocation, useNavigate } from 'react-router-dom';

function ViewAttendancePdf(props) {
  const {state} = useLocation();
  const { id,rol,idfila } = state; // Read values passed on state

  const navigate = useNavigate();
    return (
      <>
     <Toolbar sx={{ backgroundColor: theme.palette.primary.light, marginBottom: '30px'}}>
      <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }} onClick={()=>{navigate("/Attendace", { state: { id: id,rol:rol } });}}>
        <ArrowBack sx={{color: theme.palette.primary.dark}} />
      </IconButton>
      <Typography sx={{color: theme.palette.primary.dark}} variant="h6" noWrap component="div">
        Print Attendance
      </Typography>
</Toolbar>

<div style={{display:"flex",flexDirection:"row", width:"100%",height:"100%"}}>
      <PDFViewer style={{marginLeft:"auto",marginRight:"auto",backgroundColor:"#404040"}} showToolbar={true} width={1460} height={640}>
        <Pdf id={idfila}/>
      </PDFViewer>
    </div>


      </>
        
    );
}

export default ViewAttendancePdf;