import { styled } from '@mui/material/styles'
import MuiAppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import MenuIcon from '@mui/icons-material/Menu'
import { useContext } from 'react'
import { AppContext } from '../store/Provider'

const AppBar = styled(MuiAppBar)(({ theme }) => ({
	zIndex: theme.zIndex.drawer + 1,
}))

export default function Appbar() {
	const { toggleDrawer, isDrawerOpen } = useContext(AppContext)

	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar position='fixed' elevation={1} sx={{ bgcolor: '#1e2f8d' }}>
				<Toolbar>
					<IconButton
						size='large'
						edge='start'
						color='inherit'
						aria-label='open drawer'
						sx={{ mr: 2 }}
						onClick={() => toggleDrawer(!isDrawerOpen)}>
						<MenuIcon />
					</IconButton>
					<Typography variant='h6' noWrap component='div' sx={{ display: { xs: 'none', sm: 'block' } }}>
						Samco Securities
					</Typography>
				</Toolbar>
			</AppBar>
		</Box>
	)
}
