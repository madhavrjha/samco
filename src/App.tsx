import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import UserList from './pages/UserList'
import UserAdd from './pages/UserAdd'
import UserEdit from './pages/UserEdit'

const App = () => {
	return (
		<>
			<Routes>
				<Route path='/' element={<Layout />}>
					<Route index element={<UserList />} />
					<Route path='add' element={<UserAdd />} />
					<Route path='edit/:id' element={<UserEdit />} />
				</Route>
			</Routes>
		</>
	)
}

export default App
