import { Box, CircularProgress } from '@mui/material';

export default function Loading() {
    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', padding: '30px 0' }}>
            <CircularProgress sx={{ color: '#651FFF' }} />
        </Box>
    );
}