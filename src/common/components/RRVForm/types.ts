export type FieldType =
  | 'text-field'
  | 'password'
  | 'file-field'
  | 'switch-field'
  | 'date'
  | 'text-editor';

export interface FieldRow {
  name: string;
  value?: unknown;
  fieldType: FieldType;
  hide?: boolean;
  accept?: string;
  isBool?: boolean;
}

export type FormStateType = Record<string, unknown>;
