import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Button, CircularProgress, FormControl, InputAdornment, TablePagination, TextField, ToggleButton, ToggleButtonGroup } from '@mui/material';
import theme from '../color/color';
import CustomizedMenus from './Menu';
import SearchIcon from '@mui/icons-material/Search';
import { getGradesFullData } from '../api/curso.api';
import CustomizedMenusGrades from './MenuGrades';
import { useNavigate } from 'react-router-dom';
import GradeIcon from '@mui/icons-material/Grade';
import FaceIcon from '@mui/icons-material/Face';

function createData(name, section, teacher, students, duration, startdate,enddate,starttime,endtime,classes,total,classdays) {
  return {
    name, 
    section, 
    teacher, 
    students, 
    duration, 
    startdate,
    enddate,
    starttime,
    endtime,
    classes,
    total,
    classdays:["Monday","Tuesday",'Wednesday']
  };
}



// const rows = [
//     createData('Matematica 4', "A", "Mario Molina", 24, "4 Weeks", '8/16/24','8/17/24',"00:00:00","23:00:00",3,12),
//     createData('Matematica 4', "A", "Mario Molina", 24, "4 Weeks", '8/16/24','8/17/24',"00:00:00","23:00:00",3,12),
//     createData('Matematica 4', "A", "Mario Molina", 24, "4 Weeks", '8/16/24','8/17/24',"00:00:00","23:00:00",3,12),
//     createData('Matematica 4', "A", "Mario Molina", 24, "4 Weeks", '8/16/24','8/17/24',"00:00:00","23:00:00",3,12),
//     createData('Matematica 4', "A", "Mario Molina", 24, "4 Weeks", '8/16/24','8/17/24',"00:00:00","23:00:00",3,12),

//   ];

function Row(props) {
  const { row,id,rol } = props;
  const [open, setOpen] = React.useState(false);
  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell align="center">{row.nombreCurso}</TableCell>
        <TableCell align="center">{row.seccion}</TableCell>
        <TableCell align="center">{row.id_profesor}</TableCell>
        <TableCell align="center">{row.students}</TableCell>
        <TableCell align="center">{row.duracionCurso} Weeks</TableCell>
        <TableCell align={"center"}><CustomizedMenusGrades idfila={row._id} id={id} rol={rol}></CustomizedMenusGrades></TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={7}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
              Schedule
              </Typography>
              <Table size='small'>
                <TableHead>
                  <TableRow>
                    <TableCell align="center">Start Date</TableCell>
                    <TableCell align="center">End Date</TableCell>
                    <TableCell align="center">Start Time</TableCell>
                    <TableCell align="center">End Time</TableCell>
                    <TableCell align="center">Days a week</TableCell>
                    <TableCell align="center">Total Classes</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow >
                      <TableCell align="center">{row.fechaInicio}</TableCell>
                      <TableCell align="center">{row.fechaFin}</TableCell>
                      <TableCell align="center">{row.starttime}</TableCell>
                      <TableCell align="center">{row.endtime}</TableCell>
                      <TableCell align="center">{row.classes.length}</TableCell>
                      <TableCell align="center">{row.totalClases}</TableCell>
                    </TableRow>
                </TableBody>
              </Table>
              <TableRow sx={{ display:"flex", flexDirection:"column"}}>
              <h4 style={{color: theme.palette.primary.dark,marginLeft:'auto', marginRight:'auto',}}>Class days</h4>
                  <ToggleButtonGroup
      value={row.classes}
      aria-label="text formatting"
      style={{
        marginLeft:'auto',
        marginRight:'auto',
        position:"relative"
      }}
    >
      <ToggleButton value="Sunday" aria-label="bold" disabled style={{minWidth:75,minHeight:75}}>
      Sun
      </ToggleButton>
      <ToggleButton value="Monday" aria-label="bold" disabled style={{minWidth:75,minHeight:75}}>
      Mon
      </ToggleButton>
      <ToggleButton value="Tuesday" aria-label="bold" disabled style={{minWidth:75,minHeight:75}}>
      Tues
      </ToggleButton>
      <ToggleButton value="Wednesday" aria-label="bold" disabled style={{minWidth:75,minHeight:75}}>
      Wed
      </ToggleButton>
      <ToggleButton value="Thursday" aria-label="bold"disabled style={{minWidth:75,minHeight:75}}>
      Thurs
      </ToggleButton>
      <ToggleButton value="Friday" aria-label="bold" disabled style={{minWidth:75,minHeight:75}}>
      Fri
      </ToggleButton>
      <ToggleButton value="Saturday" aria-label="bold" disabled style={{minWidth:75,minHeight:75}}>
      Sat
      </ToggleButton>
    </ToggleButtonGroup>
                  </TableRow>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    calories: PropTypes.number.isRequired,
    carbs: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    history: PropTypes.arrayOf(
      PropTypes.shape({
        amount: PropTypes.number.isRequired,
        customerId: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
      }),
    ).isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    protein: PropTypes.number.isRequired,
  }).isRequired,
};

  

export default function CollapsibleTable(params) {
    
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [page, setPage] = React.useState(0);
    const [rows,setrows] = React.useState([])
    const [rowsfiltred,setrowsfiltred] = React.useState([])
    const [search, setSearch] = React.useState("")
    const [loading,setloading] = React.useState(true)
    const navigate = useNavigate();


    async function getData() {
        const respuesta = await getGradesFullData()
            if (respuesta[0]==400) {
    
            }else if (respuesta[0]==200) {
                setrows(respuesta[1])
                
            }
    }
    
    React.useEffect(()=>{
        getData()
    },[])
    
    const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  
    const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  //chequea cada vez que se cambia el valor search y filtra la data
  React.useEffect(() => {
    const timeout = setTimeout(async () => {
      if(rows.length != 0) {
        await setrowsfiltred(filterDataBySearch(rows))
        setPage(0);
        setloading(false)
      }
    }, 500);
    return () => clearTimeout(timeout);
  }
  , [rows, search]) 

//funcion para filtar la data
  const filterDataBySearch = (data) => {
    if(!data) return []
    if(!search) return data
    // return data.filter(item => item.packing_code.includes(searchCode))
    // set all to lower case
    const lowerSearchCode = search.toLowerCase()

    if (data.filter(item => item.nombreCurso.toLowerCase().includes(lowerSearchCode)).length==0) {
    }
    return data.filter(item => (item.nombreCurso.toLowerCase().includes(lowerSearchCode)))
  }


  return (
    <Box sx={{ width: '100%',display:"flex",flexDirection:"column" }}>


<Box sx={{ width: '100%',display:"flex",flexDirection:"row" }}>

<FormControl sx={{width: '20%',marginBottom:"10px",marginRight:"10px"}}>

<TextField
      id="input-with-icon-textfield"
      label="Search"
      value={search}
      onChange={(e)=>{setSearch(e.target.value)}}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
      }}
    />
                 </FormControl>

                 <Box sx={{display:"flex",marginLeft:"auto" }}>

                 <Button sx={{background:'#6FB555',marginBottom:"15px",marginRight:"25px"}} variant="contained" startIcon={<FaceIcon />} onClick={()=>{navigate("/RegisterT", { state: { id: params.id,rol:params.rol } });}}>
        New Teacher
    </Button>


                 <Button sx={{background:'#6FB555',marginBottom:"15px"}} variant="contained" startIcon={<GradeIcon />} onClick={()=>{navigate("/NewGrade", { state: { id: params.id,rol:params.rol } });}}>
        New Grade
    </Button>

</Box>

                 

                 
</Box>


    


    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell size='small'/>
            <TableCell align="center">Grade</TableCell>
            <TableCell align="center">Section</TableCell>
            <TableCell align="center">Teacher</TableCell>
            <TableCell align="center">Students</TableCell>
            <TableCell align="center">Duration</TableCell>
            <TableCell align='center'>Options</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rowsfiltred
          .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
          .map((row) => (
            <Row key={row.name} row={row} id={params.id} rol={params.rol} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    {loading&&
            <Box sx={{ display: 'flex', width:"100%",marginTop:"10px" }}>
            <CircularProgress sx={{marginLeft:"auto",marginRight:"auto"}} />
          </Box>
           }
    <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
    </Box>
    
    
  );
}
