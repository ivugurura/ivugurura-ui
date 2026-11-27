export type FieldType =
  | 'text-field'
  | 'password'
  | 'file-field'
  | 'switch-field'
  | 'date'
  | 'text-editor';

export interface FieldRow {
  name: string;
  label?: string;
  type?: string;
  multiline?: boolean;
  rows?: number;
  value?: unknown;
  /** Defaults to `text-field`. */
  fieldType?: FieldType;
  hide?: boolean;
  accept?: string;
  isBool?: boolean;
}

export type FormStateType = Record<string, unknown>;
