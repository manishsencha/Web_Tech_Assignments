import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';
function NavBar() {
    const { currentUser, signout } = useAuth()

    const handleSignout = () => {
        signout()
    }
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Book Rating
                    </Typography>{
                        currentUser ?
                            <>
                                <Link to="/">
                                    <Button color="inherit">Books</Button>
                                </Link>

                                <Button color="inherit" onClick={handleSignout}>Signout</Button>

                            </>
                            :
                            <>
                                <Link to={"/signin"}>
                                    <Button color="inherit">Signin</Button>
                                </Link>
                                <Link to={"/signup"}>
                                    <Button color="inherit">Signup</Button>
                                </Link>
                            </>
                    }
                </Toolbar>
            </AppBar>
        </Box >
    );
}

export default NavBar