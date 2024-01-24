import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { styled, Theme, CSSObject } from '@mui/material/styles'
import { Drawer as MuiDrawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import { AppContext } from '../store/Provider'
import { Person } from '@mui/icons-material'

const drawerWidth = 240

const openedMixin = (theme: Theme): CSSObject => ({
	width: drawerWidth,
	transition: theme.transitions.create('width', {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.enteringScreen,
	}),
	overflowX: 'hidden',
})

const closedMixin = (theme: Theme): CSSObject => ({
	transition: theme.transitions.create('width', {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	overflowX: 'hidden',
	width: `calc(${theme.spacing(7)} + 1px)`,
	[theme.breakpoints.up('sm')]: {
		width: `calc(${theme.spacing(8)} + 1px)`,
	},
})

export const DrawerHeader = styled('div')(({ theme }) => ({
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'flex-end',
	padding: theme.spacing(0, 1),
	// necessary for content to be below app bar
	...theme.mixins.toolbar,
}))

const Drawer = styled(MuiDrawer, { shouldForwardProp: prop => prop !== 'open' })(({ theme, open }) => ({
	width: drawerWidth,
	flexShrink: 0,
	whiteSpace: 'nowrap',
	boxSizing: 'border-box',
	...(open && {
		...openedMixin(theme),
		'& .MuiDrawer-paper': openedMixin(theme),
	}),
	...(!open && {
		...closedMixin(theme),
		'& .MuiDrawer-paper': closedMixin(theme),
	}),
}))

export default function Sidebar() {
	const [selectedListItemIndex, setSelectedListItemIndex] = useState(0)
	const navigate = useNavigate()

	const { isDrawerOpen: open } = useContext(AppContext)

	return (
		<Drawer variant='permanent' open={open}>
			<DrawerHeader />
			<List>
				<ListItem disablePadding sx={{ display: 'block' }} onClick={() => navigate('/')}>
					<ListItemButton
						sx={{ minHeight: 48, justifyContent: open ? 'initial' : 'center', px: 2.5 }}
						selected={selectedListItemIndex === 0}
						onClick={() => setSelectedListItemIndex(0)}>
						<ListItemIcon sx={{ minWidth: 0, mr: open ? 3 : 'auto', justifyContent: 'center' }}>
							<Person />
						</ListItemIcon>
						<ListItemText primary={'Users'} sx={{ opacity: open ? 1 : 0 }} />
					</ListItemButton>
				</ListItem>
			</List>
		</Drawer>
	)
}
