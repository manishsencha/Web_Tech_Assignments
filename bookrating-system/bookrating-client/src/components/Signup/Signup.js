import { Box, Button, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useAuth } from '../../context/AuthContext'

function Signup() {
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const { signup } = useAuth()

    const handleSubmit = async (event) => {
        event.preventDefault();
        // alert(email + " " + password)
        const data = await signup(firstName, lastName, email, password)
        console.log(data)
    }
    return (
        <div style={{ minHeight: "100vh", minWidth: "100vw", display: "flex", justifyContent: "center", alignItems: "center" }}>
            <Box sx={{ padding: 2, border: "1px solid black", borderRadius: 1 }}>
                <Box component={"form"} onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-evenly" }}>
                    <Typography component={"h4"} variant={'h4'} sx={{ mb: 2 }}>Signup</Typography>
                    <TextField id="first-name" label="First Name" value={firstName} onChange={e => setFirstName(e.target.value)} variant="outlined" sx={{ mb: 2 }} required />
                    <TextField id="last-name" label="Last Name" value={lastName} onChange={e => setLastName(e.target.value)} variant="outlined" sx={{ mb: 2 }} required />
                    <TextField id="email" label="Email" value={email} onChange={e => setEmail(e.target.value)} variant="outlined" sx={{ mb: 2 }} required />
                    <TextField id="password" label="Password" value={password} onChange={e => setPassword(e.target.value)} type="password" variant="outlined" sx={{ mb: 2 }} required />
                    <TextField id="confirm-password" label="Confirm Password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} type="password" variant="outlined" sx={{ mb: 2 }} required />
                    <Button type="submit" variant='contained' fullWidth>Login</Button>
                </Box>
            </Box>
        </div>
    )
}

export default Signup