import * as React from 'react';
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import PrintIcon from '@mui/icons-material/Print';
import FilterListIcon from '@mui/icons-material/FilterList';
import { visuallyHidden } from '@mui/utils';
import SearchIcon from '@mui/icons-material/Search';
import { getallstudents, getStundetsByTeacher } from '../api/alumno.api';
import { GetGrades, getstudentgrade, getTeacherGrades } from "../api/curso.api";
import {Button, CircularProgress, colors, FormControl,TextField,InputAdornment,InputLabel,Select,MenuItem, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CustomizedMenus from './Menu';
import useStore from '../store/useStore';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// Since 2020 all major browsers ensure sort stability with Array.prototype.sort().
// stableSort() brings sort stability to non-modern browsers (notably IE11). If you
// only support modern browsers you can replace stableSort(exampleArray, exampleComparator)
// with exampleArray.slice().sort(exampleComparator)
function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  // { 
  //   id: 'ID', 
  //   label: 'Student ID', 
  //   minWidth: 80,
  //   format: (value) => value.toFixed(2)
  // },
  {
    id: 'ID',
    label: 'Cedula',
    minWidth:  80,
    align: 'right',
    format: (value) => value.toFixed(2),
  },

  { id: 'LName', 
    label: 'Last Name', 
    minWidth:  80,
    format: (value) => value.toFixed(2),

  },
  {
    id: 'FName',
    label: 'First Name',
    minWidth:  80,
    align: 'right',
    format: (value) => value.toFixed(2),
  },
  {
    id: 'Gender',
    label: 'Gender',
    minWidth:  80,
    align: 'right',
    format: (value) => value.toFixed(2),
  },
  {
    id: 'Age',
    label: 'Age',
    minWidth:  80,
    align: 'right',
    format: (value) => value.toFixed(2),
  },
  {
    id: 'Grade',
    label: 'Grade',
    minWidth:  80,
    align: 'right',
    format: (value) => value.toFixed(2),
  },{
    id: 'Section',
    label: 'Section',
    minWidth:  80,
    align: 'right',
    format: (value) => value.toFixed(2),
  },
  {
    id: 'Attendance',
    label: 'Attendance %',
    minWidth:  80,
    align: 'right',
    format: (value) => value.toFixed(2),
  },
];



export default function EnhancedTable(id) {
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [selected, setSelected] = React.useState([]);
  const [idselected, setidselected] = React.useState([]);
  const [dense, setDense] = React.useState(false);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [rows,setrows] = React.useState([])
  const [rowsfiltred,setrowsfiltred] = React.useState([])
  const [error,seterror] = React.useState(false)
  const [errorText,seterrorText] = React.useState('error')
  const [loading,setloading] = React.useState(true)
  const [search, setSearch] = React.useState("")
  const [grades,setgrades] = React.useState([])
  const [grade,setgrade] = React.useState("")

  const navigate = useNavigate();

  function EnhancedTableHead(props) {
    const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
      props;
    const createSortHandler = (property) => (event) => {
      onRequestSort(event, property);
    };
  
    return (
      <TableHead>
        <TableRow>
          <TableCell padding="checkbox">
            <Checkbox
              color="primary"
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={rowCount > 0 && numSelected === rowCount}
              onChange={onSelectAllClick}
              inputProps={{
                'aria-label': 'select all desserts',
              }}
            />
          </TableCell>
          {headCells.map((headCell) => (
            <TableCell
              key={headCell.id}
              align={"center"}
              padding={headCell.disablePadding ? 'none' : 'normal'}
              sortDirection={orderBy === headCell.id ? order : false}
            >
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : 'asc'}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
                {orderBy === headCell.id ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                  </Box>
                ) : null}
              </TableSortLabel>
            </TableCell>
          ))}
          <TableCell align={'center'}>
                  Options
                </TableCell>
        </TableRow>
      </TableHead>
    );
  }
  
  EnhancedTableHead.propTypes = {
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
  };
  













  function EnhancedTableToolbar(props) {
    const { numSelected } = props;
    
  
    return (
      <Toolbar
        sx={{
          pl: { sm: 2 },
          pr: { xs: 1, sm: 1 },
          ...(numSelected > 0 && {
            bgcolor: (theme) =>
              alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
          }),
        }}
      >
        {numSelected > 0 ? (
          <Typography
            sx={{ flex: '1 1 100%' }}
            color="inherit"
            variant="subtitle1"
            component="div"
          >
            {numSelected} selected
          </Typography>
        ) : (
          <Typography
            sx={{ flex: '1 1 100%' }}
            variant="h6"
            id="tableTitle"
            component="div"
          >
            Students
          </Typography>
        )}
  
        {numSelected > 0 ? (
          <Tooltip title="Print">
            <IconButton onClick={()=>{navigate("/ViewPdf", { state: { id: id.id,rol:id.rol,idfila:idselected } });}}>
              <PrintIcon />
            </IconButton>
          </Tooltip>
        ) : (
          <Tooltip title="Filter list">
            <IconButton>
              <FilterListIcon />
            </IconButton>
          </Tooltip>
        )}
      </Toolbar>
    );
  }
  
  EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
  };

  async function getstudentsdata() {
    if (id.rol===0) {
      const respuesta = await getallstudents()
      const data = []
    if (respuesta[0]==400) {
      seterror(true)
      seterrorText(respuesta[1].msg)
    }else if (respuesta[0]==200) {
      
      for (let index = 0; index < respuesta[1].length; index++) {
      const nombre = respuesta[1][index].nombrecompleto.split(' ');
     
      const result = await getstudentgrade(respuesta[1][index].id_curso)

      const student ={
        _ID:respuesta[1][index]._id,
        ID:respuesta[1][index].cedula,
        LName:nombre[1],
        FName:nombre[0],
        Gender:respuesta[1][index].genero,
        Age:respuesta[1][index].edad,
        Grade:result[0].nombreCurso,
        Section:result[0].seccion,
        Attendance:`${Math.trunc(respuesta[1][index].percentage)}%`
      }
      data.push(student)
      
    }
    setrows(data)
    }
    }else{
      const respuesta = await getStundetsByTeacher(id.id)
      const data = []
    if (respuesta[0]==400) {
      seterror(true)
      seterrorText(respuesta[1].msg)
    }else if (respuesta[0]==200) {
      
      for (let index = 0; index < respuesta[1].length; index++) {
      const nombre = respuesta[1][index].nombrecompleto.split(' ');
     
      const result = await getstudentgrade(respuesta[1][index].id_curso)

      const student ={
        _ID:respuesta[1][index]._id,
        ID:respuesta[1][index].cedula,
        LName:nombre[1],
        FName:nombre[0],
        Gender:respuesta[1][index].genero,
        Age:respuesta[1][index].edad,
        Grade:result[0].nombreCurso,
        Section:result[0].seccion,
        Attendance:`${Math.trunc(respuesta[1][index].percentage)}%`
      }
      data.push(student)
      
    }
    setrows(data)
    }
    }
    
  }

  async function setteachersGrades() {
    if (id.rol==0) {
      const respuesta = await GetGrades()
    if (respuesta[0]==400) {
    }else if (respuesta[0]==200) {
      setgrades(respuesta[1])
    }
    }else{
      const respuesta = await getTeacherGrades(id.id)
      if (respuesta[0]==400) {
      }else if (respuesta[0]==200) {
        setgrades(respuesta[1])
      }
    }
    
  }

  const {inc,count} = useStore()

  React.useEffect(()=>{
    getstudentsdata()
    setteachersGrades()
  },[count])


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

    if (data.filter(item => item.ID.toLowerCase().includes(lowerSearchCode)).length==0) {
    }
    return data.filter(item => (item.ID.toLowerCase().includes(lowerSearchCode) || item.FName.toLowerCase().includes(lowerSearchCode) || item.LName.toLowerCase().includes(lowerSearchCode)))
  }


  React.useEffect(() => {
    const timeout = setTimeout(async () => {
      if(rows.length != 0) {
        await setrowsfiltred(SearchByGrade(rows))
        setPage(0);
      }
    }, 500);
    return () => clearTimeout(timeout);
  }
  , [grade]) 

//funcion para filtar la data
  const SearchByGrade = (data) => {
    if(!data) return []
    if(!grade) return data
    // return data.filter(item => item.packing_code.includes(searchCode))
    // set all to lower case
    const lowerSearchCode = grade.toLowerCase()

    if (data.filter(item => item.ID.toLowerCase().includes(lowerSearchCode)).length==0) {
    }
    return data.filter(item => (item.Grade.toLowerCase().includes(lowerSearchCode)))
  }

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = rowsfiltred.map((n) => n.ID);
      setSelected(newSelected);
      const newIDSelected = rowsfiltred.map((n) => n._ID);
      setidselected(newIDSelected)
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, id,idstudent) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }
    setSelected(newSelected);
      


      const selectediD = idselected.indexOf(idstudent);
    let NewIdSelected = [];

    if (selectediD === -1) {
      NewIdSelected = NewIdSelected.concat(idselected, idstudent);
    } else if (selectediD === 0) {
      NewIdSelected = NewIdSelected.concat(idselected.slice(1));
    } else if (selectediD === idselected.length - 1) {
      NewIdSelected = NewIdSelected.concat(idselected.slice(0, -1));
    } else if (selectediD > 0) {
      NewIdSelected = NewIdSelected.concat(
        idselected.slice(0, selectediD),
        idselected.slice(selectediD + 1),
      );
    }
    setidselected(NewIdSelected)

  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rowsfiltred.length) : 0;

  const visibleRows = React.useMemo(
    () =>
      stableSort(rowsfiltred, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage,
      ),
    [order, orderBy, page, rowsPerPage,rowsfiltred],
  );

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
                 <FormControl sx={{width: '20%'}}>
                     <InputLabel id="demo-simple-select-label">Grades</InputLabel>
                         <Select
                           labelId="demo-simple-select-label"
                           id="demo-simple-select"
                           value={grade}
                           label="Grades"
                           onChange={(e)=>{
                            setgrade(e.target.value)  
                           }}
                         >
                          <MenuItem value={""}>Todos</MenuItem>
                          {
                            grades&&grades.map((grade)=>{
                              return(
                              <MenuItem key={grade._id} value={grade.nombreCurso}>{grade.nombreCurso}</MenuItem>
                              )
                            })
                          }
                              
                              
                     </Select>
                 </FormControl>

                 <Button sx={{background:'#6FB555',marginLeft:"auto",marginBottom:"15px"}} variant="contained" startIcon={<PersonAddIcon />} onClick={()=>{navigate("/RegisterS", { state: { id: id.id,rol:id.rol } });}}>
        New Student
    </Button>

      </Box>



      <Paper sx={{ width: '100%', mb: 2 }}>
        <EnhancedTableToolbar numSelected={selected.length} />
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rowsfiltred.length}
            />
            <TableBody>
              {visibleRows.map((row, index) => {
                const isItemSelected = isSelected(row.ID);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    //onClick={(event) => handleClick(event, row.ID)}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.ID}
                    selected={isItemSelected}
                    sx={{ cursor: 'pointer' }}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        color="primary"
                        onClick={(event) => handleClick(event, row.ID,row._ID)}
                        checked={isItemSelected}
                        inputProps={{
                          'aria-labelledby': labelId,
                        }}
                      />
                    </TableCell>

                    {headCells.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={"center"} style={{
                          backgroundColor: 
                          column.id=='Attendance'&& value.substring(0, value.length - 1) <= 50 ? colors.red[700] : 
                          column.id=='Attendance'&& value.substring(0, value.length - 1) <= 75 ? colors.yellow[700] :
                          column.id=='Attendance'&& value.substring(0, value.length - 1) > 75 ? colors.green[400] :
                          '',
                        }}>
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                    <TableCell key={'Options'} align={"center"}>
                      <CustomizedMenus idfila={row._ID} id={id.id} rol={id.rol}></CustomizedMenus>
                    </TableCell>
            
                  </TableRow>
                );
              })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        {!error&&loading&&
            <Box sx={{ display: 'flex', width:"100%",marginTop:"10px" }}>
            <CircularProgress sx={{marginLeft:"auto",marginRight:"auto"}} />
          </Box>
           }
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rowsfiltred.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
         {error&&<Alert severity="error" style={{position:'relative',bottom:50,marginLeft:"auto",marginRight:"auto"}}>
          {errorText}
          </Alert>}
      </Paper>
     
    </Box>
  );
}
