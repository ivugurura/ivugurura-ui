import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
} from '@mui/material';

export const AlertConfirm = ({
  open,
  setOpen,
  onConfirmYes = () => {},
  message = '',
  loading = false,
  title = 'Confirm action',
  hasInput,
  inputProps = {},
}) => {
  const { reply, ...restProps } = inputProps;
  return (
    <Dialog
      aria-labelledby="dialog-title"
      onClose={setOpen}
      open={open}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle id="dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{message}</DialogContentText>
        {hasInput && (
          <FormControl fullWidth variant="outlined">
            <TextField
              fullWidth
              label="Reply"
              variant="standard"
              name="content"
              value={reply.content}
              {...restProps}
            />
            <RadioGroup
              row
              aria-labelledby="form-replyType"
              name="replyType"
              value={reply.replyType}
              {...restProps}
            >
              <FormControlLabel
                value="private"
                control={<Radio />}
                label="Private"
              />
              <FormControlLabel
                value="public"
                control={<Radio />}
                label="Public"
              />
            </RadioGroup>
          </FormControl>
        )}
      </DialogContent>
      <DialogActions>
        <Button color="primary" onClick={setOpen}>
          Cancel
        </Button>
        <Button color="primary" disabled={loading} onClick={onConfirmYes}>
          {loading ? 'Loading,...' : 'Yes'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
