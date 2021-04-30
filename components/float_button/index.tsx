import { ButtonHTMLAttributes } from 'react'
import { CustomButton } from './styles'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>

const FloatButton: React.FC<ButtonProps> = ({ children, ...rest }) => {
  return (
    <CustomButton type="button" {...rest}>
      {children}
    </CustomButton>
  )
}

export default FloatButton
