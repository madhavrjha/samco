import { createContext, useState } from 'react'
import { UserType } from '../pages/UserAdd'

type AppContext = {
	isDrawerOpen: boolean
	toggleDrawer: (state: boolean) => void
	users: (UserType & { id: string })[]
	setUsers: React.Dispatch<React.SetStateAction<(UserType & { id: string })[]>>
}

export const AppContext = createContext({} as AppContext)

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
	const [isDrawerOpen, setIsDrawerOpen] = useState(true)
	const [users, setUsers] = useState<(UserType & { id: string })[]>([])

	const toggleDrawer = (state: boolean) => setIsDrawerOpen(state)

	return <AppContext.Provider value={{ isDrawerOpen, toggleDrawer, users, setUsers }}>{children}</AppContext.Provider>
}
