import { AuthProvider } from './auth_context'
import { ToastProvider } from './toast'

export const AppProvider: React.FC = ({ children }) => (
  <AuthProvider>
    <ToastProvider>{children}</ToastProvider>
  </AuthProvider>
)
