// import { Link as RouterLink, MemoryRouter } from 'react-router-dom';
import { Link } from "@mui/material";
import { AppBar } from "@mui/material";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Outlet } from 'react-router-dom';
import { Box, AppBar, Toolbar, Typography, Button, IconButton } from "@mui/material";
import { useLocation } from 'react-router-dom';
import { blueGrey, purple, pink, amber } from "@mui/material/colors";
import logo from './logo.svg';

export default function Layout() {
    const theme = createTheme({
        palette: {
            primary: blueGrey,
            secondary: amber,
        },
    });

    const location = useLocation();

    return (
        <ThemeProvider theme={theme}>
            <Toolbar sx={{
                '& > :not(style) ~ :not(style)': {
                    ml: 3,
                }
            }}>
                <div style={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
                    <img src={logo} style={{ height: '3em', width: '3em' }} />
                    <Typography variant="h5">Whisker Watch</Typography>
                </div>

                {location.pathname === '/' ? (<>
                    <Typography variant="h6">Livestream</Typography>
                    <Link href="/past-visits" underline="hover" variant="h6">Past Visits</Link>
                </>) : (<>
                    <Link href="/" underline="hover" variant="h6">Livestream</Link>
                    <Typography variant="h6">Past Visits</Typography>
                </>)}

            </Toolbar>
            <main>
                <Outlet />
            </main>
        </ThemeProvider>


    )
}