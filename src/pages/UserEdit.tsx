import { Box, Button, Grid, InputAdornment, MenuItem, Paper, Stack, TextField, Typography } from '@mui/material'
import { bloodGroups, genders } from '../utilities/data'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useQuery } from '@tanstack/react-query'
import axios from '../api/axios'
import {
	getCitiesFromDistrict,
	getCountriesFromData,
	getDistrictsFromState,
	getStateFromCountries,
} from '../utilities/functions'
import useUsers from '../hooks/useUsers'
import { UserSchema, UserType } from './UserAdd'
import { useNavigate, useParams } from 'react-router-dom'

const UserEdit = () => {
	const { data, isSuccess } = useQuery({
		queryKey: ['countries'],
		queryFn: async () => axios.get('/countries'),
	})

	let countries: { label: string; value: string }[] = []
	if (isSuccess) {
		countries = getCountriesFromData(data.data)
	}

	const navigate = useNavigate()
	const { id } = useParams()

	const { updateUser, getUserById } = useUsers()

	const defaultUserValues = getUserById(id)

	const {
		register,
		handleSubmit,
		formState: { errors, isDirty, isSubmitting },
		watch,
		setValue,
		reset,
	} = useForm<UserType>({
		defaultValues: {
			address: defaultUserValues?.address,
			bloodGroup: defaultUserValues?.bloodGroup,
			city: defaultUserValues?.city,
			country: defaultUserValues?.country,
			district: defaultUserValues?.district,
			email: defaultUserValues?.email,
			gender: defaultUserValues?.gender,
			height: defaultUserValues?.height,
			name: {
				firstName: defaultUserValues?.name.firstName,
				middleName: defaultUserValues?.name.middleName,
				lastName: defaultUserValues?.name.lastName,
			},
			phone: defaultUserValues?.phone,
			profession: defaultUserValues?.profession,
			state: defaultUserValues?.state,
			weight: defaultUserValues?.weight,
		},
		resolver: zodResolver(UserSchema),
	})

	if (!id || !defaultUserValues) {
		return (
			<Box>
				<Typography>User Not Found</Typography>
			</Box>
		)
	}

	const onSubmit: SubmitHandler<UserType> = data => {
		console.log(data)
		updateUser(id, data)
		reset()
		navigate('/')
	}

	return (
		<Paper sx={{ p: 3 }} component='form' noValidate onSubmit={handleSubmit(onSubmit)}>
			<Typography variant='h6' gutterBottom fontWeight={600}>
				Update User
			</Typography>
			<Grid container spacing={{ md: 3, xs: 2 }}>
				<Grid item md={4} xs={12}>
					<TextField
						label='First Name'
						required
						size='small'
						variant='filled'
						fullWidth
						{...register('name.firstName')}
						error={!!errors.name?.firstName}
						helperText={errors.name?.firstName?.message}
					/>
				</Grid>
				<Grid item md={4} xs={12}>
					<TextField
						label='Middle Name'
						size='small'
						variant='filled'
						fullWidth
						{...register('name.middleName')}
						error={!!errors.name?.middleName}
						helperText={errors.name?.middleName?.message}
					/>
				</Grid>
				<Grid item md={4} xs={12}>
					<TextField
						label='Last Name'
						required
						size='small'
						variant='filled'
						fullWidth
						{...register('name.lastName')}
						error={!!errors.name?.lastName}
						helperText={errors.name?.lastName?.message}
					/>
				</Grid>
				<Grid item md={3} xs={12}>
					<TextField
						label='Gender'
						size='small'
						variant='filled'
						fullWidth
						select
						defaultValue={defaultUserValues.gender}
						{...register('gender', { setValueAs: v => (v === '' ? undefined : v) })}
						error={!!errors.gender}
						helperText={errors.gender?.message}>
						{genders.map(option => (
							<MenuItem key={option.label} value={option.value}>
								{option.value}
							</MenuItem>
						))}
					</TextField>
				</Grid>
				<Grid item md={3} xs={12}>
					<TextField
						label='Blood Group'
						size='small'
						variant='filled'
						fullWidth
						select
						defaultValue={defaultUserValues.bloodGroup}
						{...register('bloodGroup', { setValueAs: v => (v === '' ? undefined : v) })}
						error={!!errors.bloodGroup}
						helperText={errors.bloodGroup?.message}>
						{bloodGroups.map(option => (
							<MenuItem key={option.label} value={option.value}>
								{option.value}
							</MenuItem>
						))}
					</TextField>
				</Grid>
				<Grid item md={3} xs={12}>
					<TextField
						label='Height'
						type='number'
						size='small'
						variant='filled'
						fullWidth
						InputProps={{ endAdornment: <InputAdornment position='end'>cm</InputAdornment> }}
						{...register('height', { setValueAs: v => (v === '' ? undefined : Number(v)) })}
						error={!!errors.height}
						helperText={errors.height?.message}
					/>
				</Grid>
				<Grid item md={3} xs={12}>
					<TextField
						label='Weight'
						type='number'
						size='small'
						variant='filled'
						fullWidth
						InputProps={{ endAdornment: <InputAdornment position='end'>kg</InputAdornment> }}
						{...register('weight', { setValueAs: v => (v === '' ? undefined : Number(v)) })}
						error={!!errors.weight}
						helperText={errors.weight?.message}
					/>
				</Grid>
				<Grid item md={4} xs={12}>
					<TextField
						label='Email'
						type='email'
						required
						size='small'
						variant='filled'
						fullWidth
						{...register('email')}
						error={!!errors.email}
						helperText={errors.email?.message}
					/>
				</Grid>
				<Grid item md={4} xs={12}>
					<TextField
						label='Phone'
						type='number'
						required
						size='small'
						variant='filled'
						fullWidth
						{...register('phone')}
						error={!!errors.phone}
						helperText={errors.phone?.message}
					/>
				</Grid>
				<Grid item md={4} xs={12}>
					<TextField
						label='Profession'
						required
						size='small'
						variant='filled'
						fullWidth
						{...register('profession')}
						error={!!errors.profession}
						helperText={errors.profession?.message}
					/>
				</Grid>
				<Grid item md={3} xs={12}>
					<TextField
						label='Country'
						required
						size='small'
						variant='filled'
						fullWidth
						select
						defaultValue={defaultUserValues.country}
						{...register('country', {
							setValueAs: v => (v === '' ? undefined : v),
							onChange: () => {
								setValue('state', '')
								setValue('district', '')
								setValue('city', '')
							},
						})}
						error={!!errors.country}
						helperText={errors.country?.message}>
						{countries.map(option => (
							<MenuItem key={option.label} value={option.value}>
								{option.value}
							</MenuItem>
						))}
					</TextField>
				</Grid>
				<Grid item md={3} xs={12}>
					<TextField
						label='State'
						required
						size='small'
						variant='filled'
						fullWidth
						select
						defaultValue={defaultUserValues.state}
						{...register('state', {
							setValueAs: v => (v === '' ? undefined : v),
							onChange: () => {
								setValue('district', '')
								setValue('city', '')
							},
						})}
						error={!!errors.state}
						helperText={errors.state?.message}>
						{getStateFromCountries(data?.data, watch('country')).map(option => (
							<MenuItem key={option.label} value={option.value}>
								{option.value}
							</MenuItem>
						))}
					</TextField>
				</Grid>
				<Grid item md={3} xs={12}>
					<TextField
						label='District'
						required
						size='small'
						variant='filled'
						fullWidth
						select
						defaultValue={defaultUserValues.district}
						{...register('district', {
							setValueAs: v => (v === '' ? undefined : v),
							onChange: () => {
								setValue('city', '')
							},
						})}
						error={!!errors.district}
						helperText={errors.district?.message}>
						{getDistrictsFromState(data?.data, watch('country'), watch('state')).map(option => (
							<MenuItem key={option.label} value={option.value}>
								{option.value}
							</MenuItem>
						))}
					</TextField>
				</Grid>
				<Grid item md={3} xs={12}>
					<TextField
						label='City'
						required
						size='small'
						variant='filled'
						fullWidth
						select
						defaultValue={defaultUserValues.city}
						{...register('city', {
							setValueAs: v => (v === '' ? undefined : v),
						})}
						error={!!errors.city}
						helperText={errors.city?.message}>
						{getCitiesFromDistrict(data?.data, watch('country'), watch('state'), watch('district')).map(option => (
							<MenuItem key={option.label} value={option.value}>
								{option.value}
							</MenuItem>
						))}
					</TextField>
				</Grid>
				<Grid item xs={12}>
					<TextField
						label='Address'
						required
						size='small'
						variant='filled'
						fullWidth
						{...register('address')}
						error={!!errors.address}
						helperText={errors.address?.message}
					/>
				</Grid>
			</Grid>
			<Stack direction='row' spacing={2} justifyContent='end' sx={{ mt: 2 }}>
				<Button variant='outlined' onClick={() => reset()}>
					Reset
				</Button>
				<Button type='submit' variant='contained' disabled={!isDirty || isSubmitting}>
					Submit
				</Button>
			</Stack>
		</Paper>
	)
}

export default UserEdit
