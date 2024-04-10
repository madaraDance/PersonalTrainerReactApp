/* eslint-disable react/prop-types */
import React from 'react';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import Box from '@mui/material/Box';


export default function AddNewCustomer(props) {

    const [open, setOpen] = React.useState(false);

    const [isIcon, setIsIcon] = React.useState(true);

    const [newCustomer, setNewCustomer] = React.useState({
        firstname: '', lastname: '', email: '', phone: '', streetaddress: '', postcode: '', city: ''
    })

    const [isHovered, setIsHovered] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleInputChange = (event) => {
        setNewCustomer({...newCustomer, [event.target.name]: event.target.value})
    }

    const handleSubmit = () => {
        props.addNewCustomer(newCustomer);
        setOpen(false);
    }

    
    const handleMouseOn = () => {
        setIsIcon(false);
        setIsHovered(true);
    };

    const handleMouseOff = () => {
        setIsIcon(true);
        setIsHovered(false);
    };

    const buttonStyle = {
        margin: 10,
        backgroundColor: isHovered ? '#1976d2' : 'transparent'
      };

    return (
        <div>
            <IconButton 
                variant="outlined"
                style={buttonStyle}
                onClick={handleClickOpen}
                onMouseEnter={handleMouseOn}
                onMouseLeave={handleMouseOff}
                >
                {isIcon ? (
                    <PersonAddIcon />
                ) : (
                <Box
                    height={50}
                    width={50}
                    fontSize={12}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    color="white"
                >
                    Add Customer
                </Box>
                    
                )}
            </IconButton>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Add new Customer</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        To add a new customer please fill all of the information below.
                    </DialogContentText>
                        <TextField
                            required
                            margin="dense"
                            value={newCustomer.firstname}
                            onChange={event => handleInputChange(event)}
                            label="First name"
                            name="firstname"
                            fullWidth
                            variant="standard"
                        />
                        <TextField
                            required
                            margin="dense"
                            value={newCustomer.lastname}
                            onChange={event => handleInputChange(event)}
                            name="lastname"
                            label="Last name"
                            fullWidth
                            variant="standard"
                        />
                        <TextField
                            required
                            margin="dense"
                            value={newCustomer.email}
                            onChange={event => handleInputChange(event)}
                            label="Email"
                            name="email"
                            fullWidth
                            variant="standard"
                        />
                        <TextField
                            required
                            margin="dense"
                            value={newCustomer.phone}
                            onChange={event => handleInputChange(event)}
                            label="Phone"
                            name="phone"
                            fullWidth
                            variant="standard"
                        />
                        <TextField
                            required
                            margin="dense"
                            value={newCustomer.address}
                            onChange={event => handleInputChange(event)}
                            label="Address"
                            name="streetaddress"
                            fullWidth
                            variant="standard"
                        />
                        <TextField
                            required
                            margin="dense"
                            value={newCustomer.city}
                            onChange={event => handleInputChange(event)}
                            label="City"
                            name="city"
                            fullWidth
                            variant="standard"
                        />
                        <TextField
                            required
                            margin="dense"
                            value={newCustomer.postcode}
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