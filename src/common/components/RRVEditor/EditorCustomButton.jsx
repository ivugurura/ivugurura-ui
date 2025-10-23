import { Button, ButtonGroup } from '@mui/material';

export const EditorCustomButton = ({ ...rest }) => {
  console.log('CustomButton');
  return (
    <ButtonGroup size="small">
      <Button {...rest} />
    </ButtonGroup>
  );
};
