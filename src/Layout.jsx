// import { Link as RouterLink, MemoryRouter } from 'react-router-dom';
import { Link } from "@mui/material";
import { AppBar } from "@mui/material";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Outlet } from 'react-router-dom';
import { Box, AppBar, Toolbar, Typography, Button, IconButton } from "@mui/material";
import { useLocation } from 'react-router-dom';
import { blueGrey, purple, pink, amber } from "@mui/material/colors";

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
                <Typography variant="h3" gutterBottom sx={{ flexGrow: 1 }}>
                    Kitty Cam
                </Typography>
                {location.pathname === '/' ? (<>
                    <Typography variant="h5">Livestream</Typography>
                    <Link href="/past-visits" underline="hover" variant="h5">Past Visits</Link>
                </>) : (<>
                    <Link href="/" underline="hover" variant="h5">Livestream</Link>
                    <Typography variant="h5">Past Visits</Typography>
                </>)}

            </Toolbar>
            <main>
                <Outlet />
            </main>
        </ThemeProvider>
    

    )
}