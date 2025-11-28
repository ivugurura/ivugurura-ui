import React, { useMemo, useState } from 'react';

import { Grid } from '@mui/material';

import { RRVSunEditor } from '../RRVEditor/SunEditor';
import { RRVFileUpload } from '../RRVFileUpload';

import { RRVDateInput } from './RRVDateInput';
import { RRVInput } from './RRVInput';
import { RRVPassword } from './RRVPassword';
import { RRVSwitch } from './RRVSwitch';

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
}

type FormStateType = Record<string, unknown>;
interface RRVFormProps {
  fields: FieldRow[][];
  states?: FormStateType | null;
  setStates?: React.Dispatch<React.SetStateAction<FormStateType>>;
}

export const RRVForm: React.FC<RRVFormProps> = ({
  fields,
  states,
  setStates,
}) => {
  const [localOverrides, setLocalOverrides] = useState<FormStateType>({});

  const localFields = useMemo(() => {
    return fields.map((f) =>
      f.map((row) => {
        const { name } = row;
        if (states?.[name] !== undefined) {
          return { ...row, value: states[name] };
        }
        if (localOverrides?.[name] !== undefined) {
          return { ...row, value: localOverrides[name] };
        }
        return row;
      }),
    );
  }, [states, fields, localOverrides]);

  const handleChange =
    ({ name, isBool }: { name: string; isBool?: boolean }) =>
    (ev: React.ChangeEvent<HTMLInputElement>) => {
      const { value, checked } = ev.target;
      const inputValue = isBool ? checked : value;
      setLocalOverrides((prev) => ({ ...prev, [name]: inputValue }));
      setStates?.((prev) => ({ ...prev, [name]: inputValue }));
    };

  const handleFnChange = (name: string) => (newValue: unknown) => {
    setLocalOverrides((prev) => ({ ...prev, [name]: newValue }));
    setStates?.((prev) => ({ ...prev, [name]: newValue }));
  };

  const getFieldView = (
    { fieldType, accept, ...vProps }: FieldRow,
    idx: number,
  ) => {
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
