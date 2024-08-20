import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import EditIcon from '@mui/icons-material/Edit';
import Divider from '@mui/material/Divider';
import ArchiveIcon from '@mui/icons-material/Archive';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { IconButton } from '@mui/material';
import EditCalendarIcon from '@mui/icons-material/EditCalendar';
import FingerprintIcon from '@mui/icons-material/Fingerprint';
import PrintIcon from '@mui/icons-material/Print';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import { useNavigate } from 'react-router-dom';
import { DeleteStudent } from '../api/alumno.api';
import useStore from '../store/useStore';
import { PDFDownloadLink } from '@react-pdf/renderer';
import Pdf from './PDF';
const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '4px 0',
    },
    '& .MuiMenuItem-root': {
      '& .MuiSvgIcon-root': {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      '&:active': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity,
        ),
      },
    },
  },
}));



export default function CustomizedMenus(params) {

    const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };


  const {inc,count} = useStore()

  async function DeleteProcess() {
    const respuesta = await DeleteStudent(params.idfila)
    if (respuesta[0]==400) {
    console.log(respuesta[1].msg)
    }else if (respuesta[0]==200) {
      setAnchorEl(null);
      inc()
    }
    
  }


  async function AddFingerPrint() {
    setAnchorEl(null);
     const requestOptions = {
          method: 'GET',
          headers: {
            Accept: 'application/json',
          }}
        const url = `http://192.168.1.102/?param1=${params.idfila}`;
  try {
    const response = await fetch(url,requestOptions);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();
  } catch (error) {
    console.error(error.message);
  }
        navigate("/fingerprint", { state: { id: params.id,rol:params.rol } });
  }


  return (
    <div>
      <IconButton onClick={handleClick}> <MoreVertIcon></MoreVertIcon> </IconButton>
      <StyledMenu
        id="demo-customized-menu"
        MenuListProps={{
          'aria-labelledby': 'demo-customized-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem onClick={()=>{navigate(`/profile/${params.idfila}`, { state: { id: params.id,rol:params.rol } });}} disableRipple>
          <EditCalendarIcon />
          Edit Profile
        </MenuItem>
        <MenuItem onClick={()=>{AddFingerPrint()}} disableRipple>
          <FingerprintIcon />
          Add Fingerprint
        </MenuItem>
        <MenuItem onClick={()=>{navigate(`/ViewPdf`, { state: { id: params.id,rol:params.rol,idfila:[params.idfila] } });}} disableRipple>
          <PrintIcon />
          Print Attendance
        </MenuItem>
        <MenuItem onClick={()=>{DeleteProcess()}} disableRipple>
          <PersonRemoveIcon />
          Delete
        </MenuItem>
      </StyledMenu>
    </div>
  );
}
