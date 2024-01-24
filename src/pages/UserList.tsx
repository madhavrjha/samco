import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import useUsers from '../hooks/useUsers'
import { Button, IconButton, Stack } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { Delete, Edit } from '@mui/icons-material'

export default function UserList() {
	const { users, deleteUser } = useUsers()

	const navigate = useNavigate()

	return (
		<>
			<Paper sx={{ p: 2 }}>
				<Stack direction='row' justifyContent='end'>
					<Button variant='contained' size='small' onClick={() => navigate('/add')}>
						Add User
					</Button>
				</Stack>
				<TableContainer sx={{ overflowX: 'auto' }}>
					<Table sx={{ minWidth: 650 }} aria-label='simple table'>
						<TableHead>
							<TableRow>
								<TableCell>Name</TableCell>
								<TableCell>Country</TableCell>
								<TableCell>Gender</TableCell>
								<TableCell>Phone</TableCell>
								<TableCell>State</TableCell>
								<TableCell>District</TableCell>
								<TableCell>City</TableCell>
								<TableCell>Actions</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{users.map(user => (
								<TableRow key={user.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
									<TableCell component='th' scope='row'>
										{user.name.firstName} {user.name.lastName}
									</TableCell>
									<TableCell>{user.gender}</TableCell>
									<TableCell>{user.phone}</TableCell>
									<TableCell>{user.country}</TableCell>
									<TableCell>{user.state}</TableCell>
									<TableCell>{user.district}</TableCell>
									<TableCell>{user.city}</TableCell>
									<TableCell>
										<IconButton color='secondary' onClick={() => navigate(`/edit/${user.id}`)}>
											<Edit fontSize='inherit' />
										</IconButton>
										<IconButton color='error' onClick={() => deleteUser(user.id)}>
											<Delete fontSize='inherit' />
										</IconButton>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>
			</Paper>
		</>
	)
}
