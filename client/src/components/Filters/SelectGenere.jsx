import { useState, useEffect } from 'react';
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { filterByGenre } from '../../redux/reducers/videoGame';
const { REACT_APP_API_BASE_URI: API } = process.env

export default function SelectGenere() {
	const dispatch = useDispatch();
	const [ options, setOptions ] = useState([])
	const { genre } = useSelector(state => state.videogames.filters)
	
	useEffect(() => {
		axios.get(API + 'genres')
		.then(response => setOptions(response.data))
	}, [])

	const handleGenere = (event) => {
		dispatch(filterByGenre(event.target.value))
	};

	return (
		<div>
			<FormControl sx={{ m: 1, minWidth: 160, backgroundColor:"secondary.main",  borderRadius:1, }}>
				<InputLabel>Genere</InputLabel>
				<Select value={genre} onChange={handleGenere} autoWidth label="Genere">
					<MenuItem value="">
						<em>None</em>
					</MenuItem>
					{
						options?.map((el, i) => (
							<MenuItem key={i} value={el.name}>{el.name}</MenuItem>
						))
					}
				</Select>
			</FormControl>
		</div>
	);
}
