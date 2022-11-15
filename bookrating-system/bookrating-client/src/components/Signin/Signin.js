import { Alert, Box, Button, Card, Snackbar, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

function Signin() {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [notificationMessage, setNotificationMessage] = useState("")
    const [notificationSeverity, setNotificationSeverity] = useState("success")
    const [notificationOpen, setNotificationOpen] = useState(false)
    const { signin } = useAuth()
    const navigate = useNavigate()

    const handleNotificationClose = (event, reason) => {
        if (reason === 'clickaway') return
        setNotificationOpen(false)
    }
    const handleSubmit = async (event) => {
        event.preventDefault();
        // alert(email + " " + password)

        const data = await signin(email, password)

        if (data.message === "Logged in successfully") {
            setNotificationMessage("Logged in successfully")
            setNotificationSeverity("success")
            setNotificationOpen(true)
            return navigate("/")
        }
        else {
            setNotificationMessage(data.message)
            setNotificationSeverity("error")
            setNotificationOpen(true)
        }

    }
    return (
        <div style={{ height: "100vh", width: "100vw", display: "flex", justifyContent: "center", alignItems: "center" }}>
            <Snackbar open={notificationOpen} autoHideDuration={4000} anchorOrigin={{ vertical: "top", horizontal: "right" }} onClose={handleNotificationClose}>
                <Alert severity={notificationSeverity} onClose={handleNotificationClose}>{notificationMessage}</Alert>
            </Snackbar>
            <Card variant='outlined' sx={{ padding: 2 }}>
                <Box component={"form"} onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-evenly" }}>
                    <Typography component={"h4"} variant={'h4'} sx={{ mb: 2 }}>Signin</Typography>
                    <TextField id="email" label="Email" value={email} onChange={e => setEmail(e.target.value)} variant="outlined" sx={{ mb: 2 }} required />
                    <TextField id="password" label="Password" value={password} onChange={e => setPassword(e.target.value)} type="password" variant="outlined" sx={{ mb: 2 }} required />
                    <Button type="submit" variant='contained' fullWidth>Login</Button>
                </Box>
            </Card>
        </div>
    )
}

export default Signin