import * as React from 'react';
import { makeStyles } from '@mui/styles';
import UserApi from '../services/UserApi';
import { ThemeContext } from '@emotion/react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import Button from '@mui/material/Button'
import { DataGrid, GridColDef, GridApi, GridCellValue } from '@mui/x-data-grid';
import { useNavigate } from "react-router-dom";
import Add from "../components/Add"
import Update from "../components/Update"
import { Typography } from '@mui/material';

export default function UserManagement() {
    const [rows, setRows] = React.useState([])
    const [open, setOpen] = React.useState(false);
    const [update,setUpdate]=React.useState(false)
    const [chosen,setChosen]=React.useState("")
    const theme = useTheme();
    const handleDelete = async (event, cellValues) => {
        UserApi.delete({ id: cellValues.row.id })
    }
    const handleEdit = (event, cellValues) => {
        // cellValues.row
        setChosen(cellValues.row)
        setOpen(true);
        setUpdate(true);
    }
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    const navigate = useNavigate();
  
    const handleClose = () => {
        console.log("close")
        setOpen(false);
        setUpdate(true);
    };
    const addUser = () => {
        setOpen(true);
        setUpdate(false);
        UserApi.add()
        setRows((prevRows) => [...prevRows, ]);
    }
    const getUsers = async () => {
        let response = await UserApi.getUsers()
        if (!response.success) {
            window.alert("you have to login again")
            navigate("/login")
        }
        console.log(response)
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
        { field: "email", headerName: "Email", width: 130 },
        { field: "type", headerName: "Type", width: 130 },
        { field: "username", headerName: "Username", width: 130 },
        {
            field: "Edit", renderCell: (cellValues) => {
                return (<Button variant="contained" color="primary"
                    onClick={(event) => {
                        handleEdit(event, cellValues);
                    }}>
                    Edit</Button>);
            }
        },
        {
            field: "Delete", renderCell: (cellValues) => {
                return (<Button variant="contained" color="primary"
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
        {rows.length == 0 ? <div>wait</div> :
            <div style={{ height: 400, width: '100%' }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={6}
                    rowsPerPageOptions={[5]}
                // onSelectionModelChange={}
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
                       {update? <Update user={chosen}></Update>:<Add></Add>}
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
