// import { Link as RouterLink, MemoryRouter } from 'react-router-dom';
import { Link } from "@mui/material";
import { AppBar } from "@mui/material";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Outlet } from 'react-router-dom';
import { Box, AppBar, Toolbar, Typography, Button, IconButton } from "@mui/material";
import { useLocation } from 'react-router-dom';

export default function Layout() {
    // const theme = createTheme({
    //     palette: {
    //         primary: {
    //             // main: '#FF5733'
    //             main: '#f8bbd0'
    //         }
    //     },
    // });

    const location = useLocation();


    return (
        <>
            <Toolbar sx={{
                '& > :not(style) ~ :not(style)': {
                    ml: 3,
                }
            }}>
                <Typography variant="h3" gutterBottom sx={{ flexGrow: 1 }}>
                    Kitty Cam
                </Typography>
                {location.pathname === '/' ? (<>
                    <Typography variant="h6">Livestream</Typography>
                    <Link href="/past-visits" underline="hover" variant="h6">View Past Visits</Link>
                </>) : (<>
                    <Link href="/" underline="hover" variant="h6">Livestream</Link>
                    <Typography variant="h6">View Past Visits</Typography>
                </>)}

            </Toolbar>
            <main>
                <Outlet />
            </main>
        </>

    )
}