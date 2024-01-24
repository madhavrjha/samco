import { Box } from '@mui/material'
import Appbar from './Appbar'
import Sidebar, { DrawerHeader } from './Sidebar'
import { Outlet } from 'react-router-dom'

const Layout = () => {
	return (
		<>
			<Appbar />
			<Box sx={{ display: 'flex' }}>
				<Sidebar />
				<Box component='main' sx={{ flexGrow: 1, p: 2, bgcolor: '#f4f4f4' }}>
					<DrawerHeader />
					<Outlet />
				</Box>
			</Box>
		</>
	)
}

export default Layout
