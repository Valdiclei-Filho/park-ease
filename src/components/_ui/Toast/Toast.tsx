import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import { Alert } from '@mui/material';
import { SnackbarCloseReason } from '@mui/material/Snackbar';

interface CustomSnackbarProps {
  open: boolean;
  onClose: (event: React.SyntheticEvent | Event, reason: SnackbarCloseReason) => void;
  message: string;
  severity: 'success' | 'error';
}

const Toast: React.FC<CustomSnackbarProps> = ({ open, onClose, message, severity }) => {
  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={onClose} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
      <Alert onClose={(event) => onClose(event, 'timeout')} severity={severity} sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default Toast;
