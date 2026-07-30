export interface IOption {
  label: string
  value: string
}
export interface IFormField {
  name: string
  label?: string
  type:
    | 'text'
    | 'email'
    | 'password'
    | 'number'
    | 'date'
    | 'time'
    | 'datetime-local'
    | 'checkbox'
    | 'radio'
    | 'select'
    | 'hidden'
    | 'textarea'
  placeholder?: string
  disabled?: boolean
  autoFocus?: boolean
  options?: IOption
  id?: string
  defaultValue?: string
  readOnly?: boolean
  checked?: boolean
  /** Helper text under the input — used by the optional Arabic fields. */
  hint?: string
  /** Forces text direction, so Arabic inputs type right-to-left in either UI locale. */
  dir?: 'rtl' | 'ltr'
}
export interface IFormFieldsVariables {
  slug: string
}
