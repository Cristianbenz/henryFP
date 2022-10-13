import { Box, Button } from '@mui/material';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeToWishes } from '../../redux/reducers/videoGame';
import Card from '../Cards/Card';



const Wishes = () => {
    const wishes = useSelector((state) => state.videogames.wishes);
    const dispatch = useDispatch()
    
    return(
        <div>
            {
            wishes.map((e, index) => {
                return(
                    <Box key={index}>
                        <ul style={{  display: "flex", flexWrap: "wrap", justifyContent:"center", listStyle: "none"}} >
                            <li >{<Card name={e.name} description={e.description} background_image={e.background_image} price={e.price} />}
                            <Button size="small" onClick={() => {dispatch(removeToWishes(e.name))}}>delete from favorites</Button>
                            </li>
                        </ul>
                    </Box>
                    )
            })
            }
        </div>
    )
}


export default Wishes;