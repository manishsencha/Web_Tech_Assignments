import { Box, Button, Card, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

function Signin() {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const { signin } = useAuth()
    const navigate = useNavigate()
    const handleSubmit = async (event) => {
        event.preventDefault();
        // alert(email + " " + password)
        const data = await signin(email, password)
        if (data.status === 200) {
            return navigate("/")
        }
    }
    return (
        <div style={{ height: "100vh", width: "100vw", display: "flex", justifyContent: "center", alignItems: "center" }}>
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