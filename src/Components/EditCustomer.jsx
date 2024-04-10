/* eslint-disable react/prop-types */
import React from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import EditIcon from '@mui/icons-material/Edit';


export default function EditCustomer(props) {

    const [open, setOpen] = React.useState(false);

    const [customer, setCustomer] = React.useState({
        firstname: '', lastname: '', email: '', phone: '', streetaddress: '', postcode: '', city: ''
    })

    const handleClickOpen = () => {
        console.log(props.customer._links.customer.href)
        setCustomer({
            firstname: props.customer.firstname, 
            lastname: props.customer.lastname, 
            email: props.customer.email, 
            phone: props.customer.phone, 
            streetaddress: props.customer.streetaddress, 
            postcode: props.customer.postcode,
            city: props.customer.city
        })
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleInputChange = (event) => {
        setCustomer({...customer, [event.target.name]: event.target.value})
    }

    const handleSubmit = () => {
        props.editCustomer(props.customer._links.customer.href, customer);
        setOpen(false);
    }

    return (
        <div>
            <Button onClick={handleClickOpen}>
                <EditIcon sx={{color:"black"}}
                    
                />
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Edit car</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        To Edit a car please change the information below.
                    </DialogContentText>
                    <TextField
                            required
                            margin="dense"
                            value={customer.firstname}
                            onChange={event => handleInputChange(event)}
                            label="First name"
                            name="firstname"
                            fullWidth
                            variant="standard"
                        />
                    <TextField
                        required
                        margin="dense"
                        value={customer.lastname}
                        onChange={event => handleInputChange(event)}
                        name="lastname"
                        label="Last name"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        required
                        margin="dense"
                        value={customer.email}
                        onChange={event => handleInputChange(event)}
                        label="Email"
                        name="email"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        required
                        margin="dense"
                        value={customer.phone}
                        onChange={event => handleInputChange(event)}
                        label="Phone"
                        name="phone"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        required
                        margin="dense"
                        value={customer.streetaddress}
                        onChange={event => handleInputChange(event)}
                        label="Address"
                        name="streetaddress"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        required
                        margin="dense"
                        value={customer.city}
                        onChange={event => handleInputChange(event)}
                        label="City"
                        name="city"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        required
                        margin="dense"
                        value={customer.postcode}
                        onChange={event => handleInputChange(event)}
                        label="Postcode"
                        name="postcode"
                        fullWidth
                        variant="standard"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSubmit}>Save</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}