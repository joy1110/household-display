import { Chip, Divider } from "@mui/material";

export default function CustomDivider() {
    return (
        <Divider
            sx={{
                '&::before, &::after': {
                    borderColor: '#C29FFF',
                }
            }}>
            <Chip variant="outlined" label="搜尋結果" sx={{
                color: '#C29FFF',
                borderColor: '#C29FFF',
            }} />
        </Divider>
    );
}