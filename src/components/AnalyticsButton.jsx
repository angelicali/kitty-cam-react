import AnalyticsIcon from '@mui/icons-material/Analytics';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

export default function AnalyticsButton({ onClick }) {
    return (
        <Tooltip title="analytics" slotProps={{
            popper: {
              modifiers: [
                {
                  name: 'offset',
                  options: {
                    offset: [0, -14],
                  },
                },
              ],
            },
          }}>
        <IconButton aria-label="delete" onClick={onClick} style={{
            position: 'fixed',
            bottom: '200px',
            right: '20px',
        }}>
            <AnalyticsIcon />
        </IconButton>
        </Tooltip>
    )
}