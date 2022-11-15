import { Alert, Snackbar } from '@mui/material'
import React, { useState } from 'react'
import { useAuth } from '../../context/AuthContext'

function Notification() {
    const { notificationMessage, notificationSeverity, isNotificationOpen } = useAuth()

    const [open, setOpen] = useState(isNotificationOpen)
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') return
        setOpen(false)
    }

    return (
        <Snackbar open={open} autoHideDuration={4000} anchorOrigin={{ vertical: "top", horizontal: "right" }} onClose={handleClose}>
            <Alert severity={notificationSeverity} onClose={handleClose}>{notificationMessage}</Alert>
        </Snackbar>
    )
}

export default Notification