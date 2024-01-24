import { useContext } from 'react'
import { UserType } from '../pages/UserAdd'
import { AppContext } from '../store/Provider'
import { v4 as uuid } from 'uuid'

const useUsers = () => {
	const { users, setUsers } = useContext(AppContext)

	const addUser = (data: UserType) => {
		setUsers([
			...users,
			{
				...data,
				id: uuid(),
			},
		])
	}

	const updateUser = (id: string, data: UserType) => {
		setUsers(prev => {
			const currentUser = prev.find(u => u.id === id)
			if (!currentUser) return prev
			const otherUsers = prev.filter(u => u.id !== id)
			return [
				...otherUsers,
				{
					id,
					...data,
				},
			]
		})
	}

	const getUserById = (id: string | undefined) => {
		if (!id) return
		return users.find(u => u.id === id)
	}

	const deleteUser = (id: string) => {
		setUsers(prev => [...prev.filter(u => u.id !== id)])
	}

	return { users, addUser, updateUser, deleteUser, getUserById }
}

export default useUsers
