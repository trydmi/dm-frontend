import { Button } from '@mui/material';
import React from 'react';

const MyButton = ({children, ...props}) => {
    return (
        <div>
            <Button sx={{ mt: 2 }} variant="contained" onClick={props.handleClick}>{children}</Button>
        </div>
    );
};

export default MyButton;