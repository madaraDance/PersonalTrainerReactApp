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
import Box from '@mui/material/Box';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import FormHelperText from '@mui/material/FormHelperText';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';


export default function AddTraining(props) {

    const [open, setOpen] = React.useState(false);

    const [isIcon, setIsIcon] = React.useState(true);

    const [newTraining, setNewTraining] = React.useState({
        activity: '', date: '', duration: '', customer: ''
    })

    const [isHovered, setIsHovered] = React.useState(false);
    
    const [selectedPerson, setSelectedPerson] = React.useState('');

    const handleClickOpen = () => {
        console.log(props.customerList)
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleInputChange = (event) => {
        setNewTraining({...newTraining, [event.target.name]: event.target.value})
    }

    const handleSubmit = () => {
        if (!selectedPerson) {
            setSelectError(true); // Set error if Select component is not filled out
            return;
            }
        console.log(newTraining.date)
        setSelectError(false);
        props.addNewTraining(newTraining);
        setNewTraining({
            activity: '', 
            date: '', 
            duration: '', 
            customer: ''
        });
        setSelectedPerson("");  
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

      const ITEM_HEIGHT = 48;
      const ITEM_PADDING_TOP = 8;
      const MenuProps = {
        PaperProps: {
          style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
          },
        },
      };

    const [selectError, setSelectError] = React.useState(false);


      const handleChange = (event) => {
        setSelectedPerson(event.target.value);
        setNewTraining({...newTraining, customer: event.target.value})
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
                    <PlaylistAddIcon />
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
                    Add Training
                </Box>
                    
                )}
            </IconButton>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Add new Training</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        To add a new training please fill all of the information below.
                    </DialogContentText>
                    <TextField
                        required
                        margin="dense"
                        value={newTraining.activity}
                        onChange={event => handleInputChange(event)}
                        label="Training name"
                        name="activity"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        required
                        margin="dense"
                        value={newTraining.duration}
                        onChange={event => handleInputChange(event)}
                        label="Training Duration"
                        name="duration"
                        fullWidth
                        variant="standard"
                    /> 
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DateTimePicker 
                            onChange={(newValue) => {setNewTraining({...newTraining, date: newValue.$d.toISOString()});}}
                            label="Training Date and Time"
                            sx={{width: "100%", marginTop: "15px"}}
                        />
                    </LocalizationProvider>
                    <FormControl sx={{ width: "100%", marginTop: "15px"}}>
                        <InputLabel id="demo-multiple-name-label">Customer Name</InputLabel>
                        <Select
                            error={selectError}
                            value={selectedPerson}
                            onChange={handleChange}
                            input={<OutlinedInput label="Customer Name" />}
                            MenuProps={MenuProps}
                            required={true}
                        >
                            {Array.isArray(props.customerList) && props.customerList.map((customer) => (
                            <MenuItem
                                key={customer._links.customer.href}
                                value={customer._links.customer.href}
                            >
                                {customer.firstname + ' ' + customer.lastname}
                            </MenuItem>
                            ))}
                        </Select>
                        {selectError && <FormHelperText>This field is required</FormHelperText>} {/* Error message */}
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSubmit}>Save</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}