import * as React from 'react';
import { makeStyles } from '@mui/styles';
import toolsApi from "../services/toolsApi"
import { ThemeContext } from '@emotion/react';
import Button from '@mui/material/Button'
import { DataGrid, GridColDef, GridApi, GridCellValue } from '@mui/x-data-grid';
const handleDelete = () => {

}
const handleEdit = () => {

}
const columns = [{ field: "id", headerName: "Id", width: 70 },
{ field: "name", headerName: "name", width: 130 },
{ field: "endpoint", headerName: "Endpoint", width: 130 },
{ field: "enum", headerName: "enum", width: 130 },
{
    field: "Edit",
    renderCell: (cellValues) => {
        return (
            <Button
                variant="contained"
                color="primary"
                onClick={(event) => {
                    handleEdit(event, cellValues);
                }}
            >
                Edit
            </Button>
        );
    }
},
{
    field: "Delete",
    renderCell: (cellValues) => {
        return (
            <Button
                variant="contained"
                color="primary"
                onClick={(event) => {
                    handleDelete(event, cellValues);
                }}
            >
                Delete
            </Button>
        );
    }
}
]
export default function UserManagement() {
    const [rows, setRows] = React.useState([])

    let row = []
    const addUser = () => {
        setRows((prevRows) => [...prevRows, { id: rows.length + 1, email: "user1@gmail.com", password: "12345678", username: "hey" }]);
    }
    const getTools = async () => {
        let tool = await toolsApi.getTools()
        console.log(tool)
        row = tool.map((key, index) => {
            return { id: index, name: key.name, description: key.description, endpoint: key.endpoint, enum: key.enum }
        })
        console.log(row)
        setRows(row)
    };
    React.useEffect(() => {
        if (rows.length === 0)
            getTools()
    }, []);
    return <>
        {rows.length == 0 ? <div>wait</div> :
            <div style={{ height: 400, width: '100%' }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={6}
                    rowsPerPageOptions={[5]}
                    onSelectionModelChange={itm => console.log(itm)}
                />
            </div>}
        <Button onClick={() => addUser()}>Add User</Button>
    </>
}
