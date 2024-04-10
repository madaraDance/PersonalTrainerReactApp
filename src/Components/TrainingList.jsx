import { useState, useEffect, useRef, useCallback } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import Alert from '@mui/material/Alert';
import Snackbar from "@mui/material/Snackbar";
import { format } from "date-fns";
import AddTraining from "./AddTraining";
import DeleteIcon from '@mui/icons-material/Delete';
import Button from "@mui/material/Button";

export default function TrainingList() {

    const [trainingList, setTrainingList] = useState();
    const [customerList, setCustomerList] = useState();
    const [quickFilterText, setQuickFilterText] = useState("");
    const [open, setOpen] = useState(false);
    

    const [columns] = useState([
        {
            field: 'activity',
            suppressHeaderMenuButton: true,
            width: "fullWidth"
        },
        {
            field: 'date',
            valueGetter: params => params.data.date,
            valueFormatter: (params => {
                return format(new Date(params.value), "dd.MM.yyyy hh:mm aaa");
            }),
            suppressHeaderMenuButton: true,
            width: "fullWidth"
        },
        {
            field: 'duration',
            suppressHeaderMenuButton: true,
            width: "100"
        },
        {
            headerName: 'Customer',
            valueGetter: params => params.data.customer,
            valueFormatter: (params => {
                if (params.data.customer !== null) {
                    return params.data.customer.firstname + ' ' + params.data.customer.lastname
                }
            }),
            suppressHeaderMenuButton: true,
            width: "150",
        },
        {
            headerName: 'Actions',
            width: "120",
            suppressHeaderMenuButton: true,
            cellRenderer: (params) => (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px'}}>
                <Button color="error" onClick={() => deleteTraining(params.data.id)}>
                  <DeleteIcon />
                </Button>
              </div>
            ),
          },
    ]);

    const gridRef = useRef();

    const pagination = true;
    const paginationPageSize = 10;
    const paginationPageSizeSelector = [5, 10, 15];

    const fetchTrainingList = () => {
        fetch('https://customerrestservice-personaltraining.rahtiapp.fi/gettrainings', {method: 'GET'})
        .then(response => response.json())
        .then(data => setTrainingList(data))
    };

    const fetchCustomerList = () => {
        fetch('https://customerrestservice-personaltraining.rahtiapp.fi/api/customers')
        .then(response => {
            if (!response.ok) {
                throw new Error("Error in retreiveing customer list " + response.statusText);
            }
            return response.json();
        })
        .then(data => setCustomerList(data._embedded.customers))
        .catch(err => console.log(err))
    };

    useEffect(() => {
        fetchTrainingList();
        fetchCustomerList();
      }, []);

    const addNewTraining = (newTraining) => {
        fetch('https://customerrestservice-personaltraining.rahtiapp.fi/api/trainings',
            {
                method: 'POST',
                headers: {
                    'Content-Type' : 'application/json'
                },
                body: JSON.stringify(newTraining)
            }
        )
        .then(response => {
            if (!response.ok) {
                throw new Error("Error in adding a new training " + response.statusText);
            }
            return response.json();
        })
        .then(() => {
            fetchTrainingList();
            showAlert();
        })
        .catch(err => console.log(err))
    };

    const deleteTraining = (id) => {
        if (window.confirm('Are you sure you want to delete this record?')) {
            fetch("https://customerrestservice-personaltraining.rahtiapp.fi/api/trainings/"+ id, {method: 'delete'})
            .then(response => {
                if (!response.ok) {
                    throw new Error("Error in deletion: " + response.statusText);
                }
                return response.json();
            })
            .then(() => {
                fetchTrainingList();
                showAlert();
            })
            .catch(err => console.log(err, id))    
        }

    }

    const onFilterTextBoxChanged = useCallback(() => {
        setQuickFilterText(document.getElementById("filter-text-box-training1").value);
      }, []);
    
      const showAlert = () => {
        setOpen(true);
    }

    const closeAlert = () => {
        setOpen(false);
    }

    return (
        <div style={{width: "100%", paddingLeft: "20%", paddingRight: "10%"}}>
            <div style={{display: "flex", justifyContent: "flex-start", paddingBottom:  10, alignItems: "center"}}>
                <div>
                    <AddTraining addNewTraining={addNewTraining} customerList={customerList}/>
                </div>
                <div style={{width: 270, display: "flex", alignItems: "left"}}>
                    <span>
                        Search
                    </span>
                    <div style={{marginLeft: 10 }}>
                        <input
                            type="text"
                            id="filter-text-box-training1"
                            placeholder="Filter..."
                            onInput={onFilterTextBoxChanged}
                        />
                    </div>
                </div>
            </div>

            <div className="ag-theme-material" style={{}}>
                <AgGridReact
                    domLayout="autoHeight"
                    ref={gridRef}
                    rowData={trainingList}
                    columnDefs={columns}
                    pagination={pagination}
                    paginationPageSize={paginationPageSize}
                    paginationPageSizeSelector={paginationPageSizeSelector}
                    rowSelection="single"
                    quickFilterText={quickFilterText}
                    onGridReady={ params => gridRef.current = params.api}
                />
            </div>
            <Snackbar autoHideDuration={2000} open = {open} onClose={closeAlert}>
                <Alert severity="success">
                    Here is a confirmation that your action was successful.
                </Alert>
            </Snackbar>
        </div>
    )
}