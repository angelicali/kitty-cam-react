import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LivestreamPage from "./pages/LivestreamPage";
import Layout from "./Layout";
import VideoGalleryPage from './pages/VideoGalleryPage';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AdminPage from './pages/AdminPage';

const queryClient = new QueryClient()


export default function App() {
    const backendUrl = process.env.REACT_APP_BACKEND_URL;
    return (
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Layout />}>
                        <Route index element={<LivestreamPage backendUrl={backendUrl} />} />
                        <Route path="/past-visits" element={<VideoGalleryPage backendUrl={backendUrl} />} />
                        <Route path="/admin" element={<AdminPage />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </QueryClientProvider>
    );
}