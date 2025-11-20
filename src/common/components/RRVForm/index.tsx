import React, { useEffect } from 'react';

import { Grid } from '@mui/material';
import type { FieldValueType } from '@mui/x-date-pickers';

import { RRVSunEditor } from '../RRVEditor/SunEditor.tsx';
import { RRVFileUpload } from '../RRVFileUpload.jsx';

import { RRVDateInput } from './RRVDateInput.jsx';
import { RRVInput } from './RRVInput.jsx';
import { RRVPassword } from './RRVPassword.jsx';
import { RRVSwitch } from './RRVSwitch.jsx';

type FieldType =
  | 'text-field'
  | 'password'
  | 'file-field'
  | 'switch-field'
  | 'date'
  | 'text-editor';

interface FieldRow {
  name: string;
  value?: unknown;
  fieldType: FieldType;
  hide?: boolean;
  accept?: string;
  isBool?: boolean;
  [key: string]: unknown;
}

interface RRVFormProps {
  fields: FieldRow[][];
  states?: Record<string, unkown> | null;
  setStates?: React.Dispatch<React.SetStateAction<Record<string, unkown>>>;
}

export const RRVForm: React.FC<RRVFormProps> = ({
  fields = [],
  states = null,
  setStates = () => {
    /* empty */
  },
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
  const handleFnChange = (name) => (newValue) => {
    const newFields = localFields.map((f) =>
      f.map((r) => {
        if (r.name === name) {
          return { ...r, value: newValue };
        }
        return r;
      }),
    );
    setLocalFields(newFields);
    setStates((prev) => ({ ...prev, [name]: newValue }));
  };
  const getFieldView = ({ fieldType, accept, ...vProps }, idx) => {
    const { value: setContents } = vProps;
    switch (fieldType) {
      case 'file-field':
        return <RRVFileUpload key={`fu-${idx}`} accept={accept} {...vProps} />;
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
      case 'date':
        return (
          <RRVDateInput onChange={handleFnChange(vProps.name)} {...vProps} />
        );
      case 'text-editor':
        return (
          <RRVSunEditor
            setContents={setContents}
            onChange={handleFnChange(vProps.name)}
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
