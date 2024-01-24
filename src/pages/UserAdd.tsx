import { Button, Grid, InputAdornment, MenuItem, Paper, Stack, TextField, Typography } from '@mui/material'
import { bloodGroups, genders } from '../utilities/data'
import { z } from 'zod'
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
import { useNavigate } from 'react-router-dom'

export const UserSchema = z.object({
	name: z.object({
		firstName: z.string().min(3, 'Too short').max(20, 'Too long'),
		middleName: z.string().min(3, 'Too short').max(20, 'Too long').optional(),
		lastName: z.string().min(3, 'Too short').max(20, 'Too long'),
	}),
	gender: z.enum(['', 'male', 'female', 'others']).optional(),
	bloodGroup: z.enum(['', 'A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-']).optional(),
	height: z.number().gt(25, 'Humanly impossible').lte(300, 'Humanly impossible').optional(),
	weight: z.number().gt(0, 'Humanly impossible').lte(300, 'Humanly impossible').optional(),
	email: z.string().email('Not a valid email'),
	phone: z.string().length(10, 'Invalid phone'),
	profession: z.string().min(1, 'Too short'),
	country: z.string().min(1, 'This is Required'),
	state: z.string().min(1, 'This is Required'),
	district: z.string().min(1, 'This is Required'),
	city: z.string().min(1, 'This is Required'),
	address: z.string().min(5, 'Too short'),
})

export type UserType = z.infer<typeof UserSchema>

const UserAdd = () => {
	const { data, isSuccess } = useQuery({
		queryKey: ['countries'],
		queryFn: async () => axios.get('/countries'),
	})

	let countries: { label: string; value: string }[] = []
	if (isSuccess) {
		countries = getCountriesFromData(data.data)
	}

	const navigate = useNavigate()

	const {
		register,
		handleSubmit,
		formState: { errors, isDirty, isSubmitting },
		watch,
		setValue,
		reset,
	} = useForm<UserType>({
		defaultValues: {
			address: '',
			bloodGroup: undefined,
			city: undefined,
			country: undefined,
			district: undefined,
			email: '',
			gender: undefined,
			height: undefined,
			name: { firstName: '', middleName: '', lastName: '' },
			phone: '',
			profession: '',
			state: undefined,
			weight: undefined,
		},
		resolver: zodResolver(UserSchema),
	})

	const { addUser } = useUsers()

	const onSubmit: SubmitHandler<UserType> = data => {
		console.log(data)
		addUser(data)
		reset()
		navigate('/')
	}

	return (
		<Paper sx={{ p: 3 }} component='form' noValidate onSubmit={handleSubmit(onSubmit)}>
			<Typography variant='h6' gutterBottom fontWeight={600}>
				Add New User
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
						defaultValue=''
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
						defaultValue=''
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
						defaultValue=''
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
						defaultValue=''
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
						defaultValue=''
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
						defaultValue=''
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

export default UserAdd
