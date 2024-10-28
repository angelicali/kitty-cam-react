import Livestream from "./components/Livestream";
import VideoGallery from "./components/VideoGallery";
import { Box, AppBar, Toolbar, Typography, Button, IconButton } from "@mui/material";
// import MenuIcon from '@mui/icons-material/Menu';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LivestreamPage from "./pages/LivestreamPage";
import Layout from "./Layout";
import VideoGalleryPage from './pages/VideoGalleryPage';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient()


export default function App() {
    // Adds a context for source url?
    // const backendUrlContext = createContext("http://192.168.4.201:5000/")
    const backendUrl = "https://proud-cheerful-longhorn.ngrok-free.app/";



    return (
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Layout />}>
                        <Route index element={<LivestreamPage backendUrl={backendUrl} />} />
                        <Route path="/past-visits" element={<VideoGalleryPage backendUrl={backendUrl} />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </QueryClientProvider>
    );
}