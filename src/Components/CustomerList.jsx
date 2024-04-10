import { useState, useEffect, useRef, useCallback } from "react"
import { AgGridReact } from "ag-grid-react"
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import Alert from '@mui/material/Alert';
import Snackbar from "@mui/material/Snackbar";
import Button from "@mui/material/Button";
import AddNewCustomer from "./AddNewCustomer"
import EditCustomer from "./EditCustomer"
import DeleteIcon from '@mui/icons-material/Delete';
import FileUploadIcon from '@mui/icons-material/FileUpload';


export default function CustomerList() {

    const [customerList, setCustomerList] = useState();
    const [quickFilterText, setQuickFilterText] = useState("");
    const [open, setOpen] = useState(true);
    const gridRef = useRef(null);

    const pagination = true;
    const paginationPageSize = 10;
    const paginationPageSizeSelector = [5, 10, 15];

    const onExportClick = useCallback(() => {
        const params = {
            skipHeader: false,
            skipFooters: true,
            skipGroups: true,
            fileName: 'CustomerExport.csv',
            columnGroups: true,
            onlySelected: false,
            columnKeys: ['firstname', 'lastname', 'streetaddress', 'city', 'email', 'phone']
        };
        if (gridRef.current) {
            gridRef.current.exportDataAsCsv(params);
            console.log("Data exported as CSV");
        } else {
            console.log("gridRef is not available");
        }
    }, []);

    const [columns] = useState([
        {
          headerName: 'First name',
          field: 'firstname',
          exportable: true,
          suppressHeaderMenuButton: true,
          width: 120
        },
        {
          headerName: 'Last name',
          field: 'lastname',
          exportable: true,
          suppressHeaderMenuButton: true,
          width: 130
        },
        {
          headerName: 'Address',
          field: 'streetaddress',
          suppressHeaderMenuButton: true,
          width: 150
        },
        {
          headerName: 'Postcode',
          field: 'postcode',
          suppressHeaderMenuButton: true,
          width: 130
        },
        {
          headerName: 'City',
          field: 'city',
          suppressHeaderMenuButton: true,
          width: 130
        },
        {
          headerName: 'Email',
          field: 'email',
          suppressHeaderMenuButton: true,
          width: 180
        },
        {
          headerName: 'Phone',
          field: 'phone',
          suppressHeaderMenuButton: true,
          width: 130
        },
        {
          headerName: 'Actions',
          width: 160,
          suppressHeaderMenuButton: true,
          cellRenderer: (params) => (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px'}}>
              <EditCustomer editCustomer={editCustomer} customer={params.data} />
              <Button color="error" onClick={() => deleteCustomer(params.data._links.self.href)}>
                <DeleteIcon />
              </Button>
            </div>
          ),
        }
      ]);


    useEffect(() => fetchCustomerList(), []);

    const fetchCustomerList = () => {
        fetch('https://customerrestservice-personaltraining.rahtiapp.fi/api/customers')
        .then(response => {
            if (!response.ok) {
                throw new Error("Error in retreiveing car list " + response.statusText);
            }
            return response.json();
        })
        .then(data => setCustomerList(data._embedded.customers))
        .catch(err => console.log(err))
    };

    const addNewCustomer = (newCustomer) => {
        fetch('https://customerrestservice-personaltraining.rahtiapp.fi/api/customers',
            {
                method: 'POST',
                headers: {
                    'Content-Type' : 'application/json'
                },
                body: JSON.stringify(newCustomer)
            }
        )
        .then(response => {
            if (!response.ok) {
                throw new Error("Error in adding a new car " + response.statusText);
            }
            return response.json();
        })
        .then(() => {
            fetchCustomerList();
            showAlert();
        })
        .catch(err => console.log(err))
    };

    const editCustomer = (link, editedCustomer) => {
        console.log(link)
        fetch(link,
            {
                method: 'PUT',
                headers: {
                    'Content-Type' : 'application/json'
                },
                body: JSON.stringify(editedCustomer)
            }
        )
        .then(response => {
            if (!response.ok) {
                throw new Error("Error in editing customer " + response.statusText);
            }
            return response.json();
        })
        .then(() => {
            fetchCustomerList();
            showAlert();
        })
        .catch(err => console.log(err))
    };

    const deleteCustomer = (link) => {
        if (window.confirm('Are you sure you want to delete this record?')) {
            fetch(link, {method: 'delete'})
            .then(response => {
                if (!response.ok) {
                    throw new Error("Error in deletion: " + response.statusText);
                }
                return response.json();
            })
            .then(() => {
                fetchCustomerList();
                showAlert();
            })
            .catch(err => console.log(err, link))    
        }

    }

    const onFilterTextBoxChanged = useCallback(() => {
        setQuickFilterText(document.getElementById("filter-text-box").value);
      }, []);

    const showAlert = () => {
        setOpen(false);
    }

    const closeAlert = () => {
        setOpen(true);
    }

    return (
        <div style={{width: "100%"}}>
            <div style={{display: "flex", justifyContent: "flex-start", paddingBottom:  10, alignItems: "center"}}>
                <div>
                    <AddNewCustomer addNewCustomer={addNewCustomer} />
                </div>
                <div>
                    <Button variant="text" onClick={onExportClick} endIcon={<FileUploadIcon />}>Export CSV</Button>
                </div>
                <div style={{width: 270, display: "flex", alignItems: "left"}}>
                    <span>
                        Search
                    </span>
                    <div style={{marginLeft: 10 }}>
                        <input
                            type="text"
                            id="filter-text-box"
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
                    rowData={customerList}
                    columnDefs={columns}
                    pagination={pagination}
                    paginationPageSize={paginationPageSize}
                    paginationPageSizeSelector={paginationPageSizeSelector}
                    rowSelection="single"
                    quickFilterText={quickFilterText}
                    onGridReady={params => {
                        gridRef.current = params.api;
                    }}
                />
                <Snackbar autoHideDuration={2000} open = {!open} onClose={closeAlert}>
                    <Alert severity="success">
                        Here is a confirmation that your action was successful.
                    </Alert>
                </Snackbar>
            </div>
        </div>
    )

}