import { createContext, useCallback, useState, useContext } from 'react'
import api from '../services/api'

interface ICredentials {
  email: string
  password: string
}

interface IAuthContext {
  user: any
  access_token: string
  signIn(credentials: ICredentials): Promise<void>
  signOut(): void
  setUser(user: any): void
}

interface AuthState {
  access_token: string
  user: any
}

const AuthContext = createContext<IAuthContext>({} as IAuthContext)

const ISSERVER = typeof window === 'undefined'

export const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>(() => {
    if (!ISSERVER) {
      const access_token = sessionStorage.getItem('@Portfolio:access_token')
      const user = sessionStorage.getItem('@Portfolio:user')

      if (access_token && user) {
        return { access_token, user: JSON.parse(user) }
      }
    }

    return {} as AuthState
  })

  const setUser = useCallback((user) => {
    user.password = undefined
    sessionStorage.setItem('@Portfolio:user', JSON.stringify(user))
    const access_token = sessionStorage.getItem('@Portfolio:access_token')
    console.log(user)
    setData({ user, access_token })
  }, [])

  const signIn = useCallback(async ({ email, password }) => {
    const response = await api.post('/auth', { email, password })

    const { access_token, user } = response.data

    sessionStorage.setItem('@Portfolio:access_token', access_token)
    sessionStorage.setItem('@Portfolio:user', JSON.stringify(user))

    document.cookie = `@Portfolio_access_token=${access_token};path=/`

    setData({ access_token, user })
  }, [])

  const signOut = useCallback(() => {
    sessionStorage.removeItem('@Portfolio:access_token')
    sessionStorage.removeItem('@Portfolio:user')

    const pathBits = location.pathname.split('/')
    let pathCurrent = ' path='

    // do a simple pathless delete first.
    document.cookie = '@Portfolio_access_token=; expires=Thu, 01-Jan-1970 00:00:01 GMT;'

    for (let i = 0; i < pathBits.length; i++) {
      pathCurrent += (pathCurrent.substr(-1) != '/' ? '/' : '') + pathBits[i]
      document.cookie =
        '@Portfolio_access_token=; expires=Thu, 01-Jan-1970 00:00:01 GMT;' + pathCurrent + ';'
    }

    setData({} as AuthState)
  }, [])

  return (
    <AuthContext.Provider
      value={{ access_token: data.access_token, user: data.user, signIn, signOut, setUser }}
    >
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
