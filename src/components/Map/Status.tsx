import React, {useState} from "react";
import {IconButton, Snackbar} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const MapStatus = (props : React.ComponentProps<any>) => {
    const statusMessage : string = props.message;
    const [open, setOpen] = useState(true);

    const handleClose = () => {
        setOpen(false);
    }
    const action = (
        <React.Fragment>
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleClose}
            >
                <CloseIcon fontSize="small" />
            </IconButton>
        </React.Fragment>
    );

    return (
        <Snackbar
            open={open}
            autoHideDuration={2500}
            message={statusMessage}
            action={action}
        />
    )
}

export default MapStatus;