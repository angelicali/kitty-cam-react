import { Typography } from '@mui/material';
import Loading from './Loading';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { useQuery } from '@tanstack/react-query';

const fetchVideoLogs = async (videoId, backendUrl) => {
    const response = await fetch(`${backendUrl}video-log/${videoId}`);
    if (response.status === 404) {
        throw new Error('Logs not found (404)');
    }
    return response.json();

}

export default function VideoLogCard({ videoId, backendUrl }) {
    const { isLoading, error, data, isError} = useQuery({
        queryKey: ['videoLogs-' + videoId],
        queryFn: () => fetchVideoLogs(videoId, backendUrl),
        onError: (error) => {
            console.error('React Query Error:', error);
        },
        staleTime: Infinity,
        cacheTime: 1000 * 60 * 30 // cache for 30 minutes
        // cacheTime: 1000 * 60 * 60 * 24 * 10 // cache for 10 days; probably won't view video logs from 10 days ago
    });


    if (isLoading) return <Loading />

    return (
        <Card raised='true'>
            <CardContent style={{ maxHeight: '200px', maxWidth: '300px', overflowY: 'auto' }}>
                {isError ?
                    <Typography> Error loading video logs: {error.message}</Typography> :
                    <pre>{JSON.stringify(data, null, 2)}</pre>
                }
            </CardContent>
        </Card>
    )
}