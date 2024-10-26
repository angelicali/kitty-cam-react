import Livestream from "./components/Livestream";
import VideoGallery from "./components/VideoGallery";
import { Box, AppBar, Toolbar, Typography, Button, IconButton } from "@mui/material";
// import MenuIcon from '@mui/icons-material/Menu';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LivestreamPage from "./pages/LivestreamPage";
import Layout from "./Layout";
import VideoGalleryPage from './pages/VideoGalleryPage';

export default function App() {
    // Adds a context for source url?
    // const backendUrlContext = createContext("http://192.168.4.201:5000/")
    const backendUrl = "http://192.168.4.201:5000/";



    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<LivestreamPage backendUrl={backendUrl} />} />
                    <Route path="/past-visits" element={<VideoGalleryPage backendUrl={backendUrl} />} />
                </Route>
            </Routes>
        </BrowserRouter>

        // <ThemeProvider theme={theme}>
        //     <Box sx={{ flexGrow: 1 }}>
        //         <AppBar position="static">
                    // <Toolbar>
                    //     <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    //         Kitty Cam
                    //     </Typography>
                    //     <Button color="inherit">View Past Visits</Button>
                    // </Toolbar>
        //         </AppBar>
        //         {/* <h1>Kitty Cam!!</h1> */}
        //         <Livestream livestreamUrl={backendUrl + 'video_feed'} />
        //         {/* <VideoGallery backendUrl={backendUrl} /> */}
        //     </Box>
        // </ThemeProvider>

    );
}