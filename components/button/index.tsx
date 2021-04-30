import { ButtonHTMLAttributes } from 'react'
import { CustomButton } from './styles'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  colorButton?: string
}

const Button: React.FC<ButtonProps> = ({ children, colorButton, ...rest }) => {
  return (
    <CustomButton type="button" {...rest} colorButton={colorButton}>
      {children}
    </CustomButton>
  )
}

export default Button
