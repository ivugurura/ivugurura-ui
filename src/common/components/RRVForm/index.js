import React, { useEffect } from 'react';

import { Grid } from '@mui/material';

import { RRVFileUpload } from '../RRVFileUpload';

import { RRVInput } from './RRVInput';
import { RRVPassword } from './RRVPassword';
import { RRVSwitch } from './RRVSwitch';

export const RRVForm = ({
  fields = [],
  states = null,
  setStates = () => {},
}) => {
  const [localFields, setLocalFields] = React.useState(fields);
  useEffect(() => {
    if (states) {
      const newFields = fields.map((f) =>
        f.map((row) => {
          const { name } = row;
          if (states[name]) {
            return { ...row, value: states[name] };
          }
          return row;
        }),
      );
      setLocalFields(newFields);
    }
  }, [states, fields]);
  const handleChange =
    ({ name, isBool }) =>
    (ev) => {
      const { value, checked } = ev.target;
      const inputValue = isBool ? checked : value;
      const newFields = localFields.map((f) =>
        f.map((r) => {
          if (r.name === name) {
            return { ...r, value: inputValue };
          }
          return r;
        }),
      );
      setLocalFields(newFields);
      setStates((prev) => ({ ...prev, [name]: inputValue }));
    };
  const getFieldView = ({ fieldType, accept, ...vProps }, idx) => {
    switch (fieldType) {
      case 'file-field':
        return (
          <RRVFileUpload
            key={`fu-${idx}`}
            type={vProps.type}
            title={vProps.label}
            accept={accept}
          />
        );
      case 'switch-field':
        return (
          <RRVSwitch
            key={`sf-${idx}`}
            onChange={handleChange(vProps)}
            {...vProps}
          />
        );
      case 'password':
        return (
          <RRVPassword
            key={`sf-${idx}`}
            onChange={handleChange(vProps)}
            {...vProps}
          />
        );
      case 'text-field':
      default:
        return (
          <RRVInput
            key={`ft-${idx}`}
            onChange={handleChange(vProps)}
            {...vProps}
          />
        );
    }
  };
  const getSizes = (rowsLength) => {
    const sizes = {
      lg: 12,
      md: 12,
      sm: 12,
      xs: 12,
    };
    if (rowsLength === 2) {
      return { ...sizes, lg: 6, md: 6 };
    }
    if (rowsLength === 3) {
      return { ...sizes, lg: 4, md: 4 };
    }
    if (rowsLength === 4) {
      return { ...sizes, lg: 3, md: 3 };
    }
    return sizes;
  };

  return (
    <Grid container spacing={2}>
      {localFields.map((rows, fIdx) =>
        rows.map(({ hide, ...ro }, rIdx) => {
          if (hide) return null;
          return (
            <Grid
              item
              key={`field-grid-${fIdx}-${rIdx}`}
              {...getSizes(rows.length)}
            >
              {getFieldView(ro, rIdx)}
            </Grid>
          );
        }),
      )}
    </Grid>
  );
};
