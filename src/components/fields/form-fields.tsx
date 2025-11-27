import { InputTypes } from '@/constants/enums'
import { IFormField } from '@/types/app'
import { ValidationErrors } from '@/validations/auth'
import Password from './password'
import Checkbox from './checkbox'
import Text from './text'

interface Props extends IFormField {
  error: ValidationErrors
}

const FormFields = (props: Props) => {
  const { type } = props
  const renderField = (): React.ReactNode => {
    if (type === InputTypes.EMAIL || type === InputTypes.TEXT) {
      return <Text {...props} />
    }

    if (type === InputTypes.PASSWORD) {
      return <Password {...props} />
    }

    if (type === InputTypes.CHECKBOX) {
      return <Checkbox {...(props as any)} />
    }

    return <Text {...props} />
  }

  return <>{renderField()}</>
}

export default FormFields
