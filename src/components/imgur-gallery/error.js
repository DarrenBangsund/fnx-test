import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
// import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles(theme => ({
  close: {
    padding: theme.spacing(0.5),
  },
  error: {
    backgroundColor: theme.palette.error.dark,
  },
}));

export default function Error(props) {
  const classes = useStyles();
  const {open, message, onClose} = props;

  function handleClose(event, reason) {
    if (reason === 'clickaway') {
      return;
    }

    onClose();
  }

  return (
    <div>
      <Snackbar
        className={classes.error}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={open}
        onClose={handleClose}
        ContentProps={{
          'aria-describedby': 'message-id',
        }}
        message={<span id="message-id">{message}</span>}
        action={
          <Button key="undo" color="secondary" size="small" onClick={handleClose}>
            CLOSE
          </Button>
        //   <IconButton
        //     key="close"
        //     aria-label="Close"
        //     color="inherit"
        //     className={classes.close}
        //     onClick={handleClose}
        //   >
        //     {/* <CloseIcon /> */}
        //   </IconButton>,
        }
      />
    </div>
  );
}