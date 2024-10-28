// import * as React from 'react';
import { useQuery } from '@tanstack/react-query';
import { BarChart } from '@mui/x-charts/BarChart';

const xLabels = [
    '12 AM',
    '1 AM',
    '2 AM',
    '3 AM',
    '4 AM',
    '5 AM',
    '6 AM',
    '7 AM',
    '8 AM',
    '9 AM',
    '10 AM',
    '11 AM',
    '12 PM',
    '1 PM',
    '2 PM',
    '3 PM',
    '4 PM',
    '5 PM',
    '6 PM',
    '7 PM',
    '8 PM',
    '9 PM',
    '10 PM',
    '11 PM',
];

export default function AnalyticsActiveHourTab({backendUrl}) {
    const { isPending, error, data } = useQuery({
        queryKey: ['activeHours'],
        queryFn: () => fetch(`${backendUrl}active-hour`).then((res) => res.json(),),
        cacheTime: 1000 * 60 * 60 // cache for 1 hour
    })

    if (isPending) return "Loading"

    if (error) return 'An error has occurred: ' + error.message;


    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
            <BarChart
                series={[
                    { data: data.cat, label: 'cat' },
                    { data: data.possum, label: 'possum' },
                    { data: data.raccoon, label: 'raccoon' },
                    { data: data.person, label: 'human' },
                ]}
                xAxis={[{ data: xLabels, scaleType: 'band' }]}
                width={680}
                height={500}
            />
        </div>
    );
}