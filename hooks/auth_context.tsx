import { createContext, useCallback, useState, useContext } from 'react'
import api from '../services/api'

interface ICredentials {
  email: string
  password: string
}

interface IAuthContext {
  user: any
  signIn(credentials: ICredentials): Promise<void>
  signOut(): void
}

interface AuthState {
  access_token: string
  user: any
}

const AuthContext = createContext<IAuthContext>({} as IAuthContext)

export const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>(() => {
    const ISSERVER = typeof window === 'undefined'

    if (!ISSERVER) {
      const access_token = sessionStorage.getItem('@Portfolio:access_token')
      const user = sessionStorage.getItem('@Portfolio:user')

      if (access_token && user) {
        return { access_token, user: JSON.parse(user) }
      }
    }

    return {} as AuthState
  })

  const signIn = useCallback(async ({ email, password }) => {
    const response = await api.post('/auth', { email, password })

    const { access_token, user } = response.data

    sessionStorage.setItem('@Portfolio:access_token', access_token)
    sessionStorage.setItem('@Portfolio:user', JSON.stringify(user))

    setData({ access_token, user })
  }, [])

  const signOut = useCallback(() => {
    sessionStorage.removeItem('@Portfolio:access_token')
    sessionStorage.removeItem('@Portfolio:user')

    setData({} as AuthState)
  }, [])

  return (
    <AuthContext.Provider value={{ user: data.user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth(): IAuthContext {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }

  return context
}
