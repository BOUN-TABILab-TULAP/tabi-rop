import * as React from 'react';
import UserApi from '../services/UserApi';
import {Dialog,DialogActions,DialogContent,DialogContentText ,DialogTitle} from '@mui/material/';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import {Button,Box } from '@mui/material'
import { DataGrid, GridCellValue } from '@mui/x-data-grid';
import { useNavigate } from "react-router-dom";
import Add from "../components/Add"
import Update from "../components/Update"
import { Typography } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
export default function UserManagement() {
    const [rows, setRows] = React.useState([])
    const [open, setOpen] = React.useState(false);
    const [update,setUpdate]=React.useState(false)
    const [chosen,setChosen]=React.useState("")
    const theme = useTheme();
    const [wait,setWait]=React.useState(false)
   
    const handleDelete = async (event, cellValues) => {
        setWait(true) 
       if( window.confirm(`are you sure about deleting ${cellValues.username}?`))
       { const response=await UserApi.delete({ id: cellValues.row.id })
       
        if(response.success){
          await getUsers()
          setWait(false)
          window.alert("User has been deleted successfull")
        }
        else{
            setWait(false)
            window.alert(response.message)
        }}
        setWait(false)

    }
    const handleEdit = (event, cellValues) => { 
        setChosen(cellValues.row)
        setOpen(true);
        setUpdate(true);
    }
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const navigate = useNavigate();
    const handleClose = () => {
        setOpen(false);
        setUpdate(true);
    };
    const addUser = async () => {
        setOpen(true);
        setUpdate(false);
        UserApi.add()
        setRows((prevRows) => [...prevRows, ]);
        await UserApi.getUsers()   
    }
    const getUsers = async () => {
        let response = await UserApi.getUsers()
        if (!response.success) {
            window.alert("you have to login again")
            navigate("/login")
        }
        row = response.data.map((key, index) => {
            return { id: key._id, type: key.type_enum, email: key.email, username: key.username }
        })
        setRows(row)
    };
    React.useEffect(() => {
        if (rows.length === 0)
            getUsers()
    }, []);
    const columns = [
        { field: "email", headerName: "Email",flex: 0.4,maxWidth:300,minWidth:100},
        { field: "type", headerName: "Type", flex: 0.3,minWidth:80 },
        { field: "username", headerName: "Username",flex: 0.3,minWidth:80  },
        {
            field: "Edit",width: 150, renderCell: (cellValues) => {
                return (<Button variant="contained" 
                    onClick={(event) => {
                        handleEdit(event, cellValues);
                    }}>
                    Edit</Button>);
            }
        },
        {
            field: "Delete",width: 150, renderCell: (cellValues) => {
                return (<Button variant="contained" 
                    onClick={(event) => {
                        handleDelete(event, cellValues);
                    }}
                >
                    Delete </Button>);
            }
        }
    ]
    let row = []
   
    return <>
        {rows.length == 0 ? <Box sx={{ display: 'flex' }}><CircularProgress/></Box> :
            <div style={{ height:"700px" }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    
                    rowsPerPageOptions={[20]}
                />
            </div>}
        <Button onClick={(event)=>{addUser()}}>Add User</Button>
        <div >
            <Dialog 
                fullScreen={fullScreen}
                open={open}
                onClose={handleClose}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="responsive-dialog-title">
                     {!update? <Typography variant='h4' align="center">Add User</Typography>:<Typography variant='h4' center>Update {chosen.username}</Typography>}
                </DialogTitle>
                <DialogContent sx={{width:"500px"}} >
                    <DialogContentText>
                       {update? <Update user={chosen}></Update>:<Add setOpen={setOpen}></Add>}
                      
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} autoFocus>
                        Exit
                    </Button>
                </DialogActions>
            </Dialog>
        </div>

    </>
}
