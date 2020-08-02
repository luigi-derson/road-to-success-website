import { createContext } from 'react'

const initialState = {
  navigation: {
    pages: [],
  },
  footer: {
    copyright: '',
    socials: [],
    pages: [],
  },
}

const GlobalContext = createContext(initialState)

export default GlobalContext
