import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { Box } from '@mui/system';

const Calender = ({date, setDate}) => {
    return (
        <Box textAlign='center'>
            <Stack justifyContent="center" alignItems="center" sx={{ mt: 20 }} component="form" noValidate spacing={3}>
                <TextField
                    id="date"
                    label="Report date"
                    type="date"
                    sx={{ width: 220 }}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    value={date}
                    onChange={event => setDate(event.target.value)}
                />
            </Stack>
        </Box>
    );
};

export default Calender;