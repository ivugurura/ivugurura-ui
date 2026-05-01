import { Button, ButtonGroup } from '@mui/material';

export const EditorCustomButton = ({ ...rest }) => {
  return (
    <ButtonGroup size="small">
      <Button {...rest} />
    </ButtonGroup>
  );
};
