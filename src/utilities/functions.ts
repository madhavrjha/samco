type District = {
	name: string
	cities: string[]
}

type State = {
	name: string
	districts: District[]
}

type Country = {
	name: string
	states: State[]
}

export type Data = Country[]

export const getCountriesFromData = (data: Data) => {
	return data.map(country => ({ label: country.name, value: country.name }))
}

export const getStateFromCountries = (data: Data | null, country: string) => {
	if (!data || !country) return []

	const countryObj = data.find(c => c.name === country)
	if (!countryObj) return []
	return countryObj.states.map(state => ({ label: state.name, value: state.name }))
}

export const getDistrictsFromState = (data: Data | null, country: string, state: string) => {
	if (!data || !country || !state) return []

	const countryObj = data.find(c => c.name === country)
	if (!countryObj) return []

	const stateObj = countryObj.states.find(s => s.name === state)
	if (!stateObj) return []

	return stateObj.districts.map(district => ({ label: district.name, value: district.name }))
}

export const getCitiesFromDistrict = (data: Data | null, country: string, state: string, district: string) => {
	if (!data || !country || !state || !district) return []

	const countryObj = data.find(c => c.name === country)
	if (!countryObj) return []

	const stateObj = countryObj.states.find(s => s.name === state)
	if (!stateObj) return []

	const districtObj = stateObj.districts.find(d => d.name === district)
	if (!districtObj) return []

	return districtObj.cities.map(city => ({ label: city, value: city }))
}
