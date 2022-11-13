import { Button, Paper, Rating, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { useEffect, useState } from 'react'
import { useAuth } from '../../../context/AuthContext'

function Book(props) {
    //    const {} = props
    const { _id, author, imageLink, link, pages, title, year } = props.book
    const [image, setImage] = useState(null)
    const [rating, setRating] = useState(props.rating)
    const [userRating, setUserRating] = useState(props.userRating)
    const [isUserRated, setIsUserRated] = useState(props.isUserRated)
    const { currentUser, getImage, rate } = useAuth()
    useEffect(() => {
        async function fetchImage() {
            const fetchedImage = await getImage(imageLink).then(res => res.data)
            setImage(fetchedImage)
        }
        fetchImage()
    }, [imageLink, currentUser, _id, getImage])

    const onRate = async (event, value) => {
        await rate(_id, currentUser.email, value)
            .then(res => (res.data))
            .then((res) => {
                setIsUserRated(res.isUserRated)
                setRating(res.rating)
                setUserRating(res.userRating)
            })
    }
    return (
        <Paper sx={{ margin: 1, padding: 1 }} elevation={3}>
            <img src={"data:image/jpeg;base64," + image} alt={title} style={{ width: 300, height: 400 }} />
            <Typography><b>Title :  </b> {title}  </Typography>
            <Typography><b>Author : </b> {author} </Typography>
            <Typography><b>Pages :  </b> {pages}  </Typography>
            <Typography><b>Year :   </b> {year}   </Typography>
            <Button variant="contained" href={link} target="_blank"><Typography>See Wiki</Typography></Button>
            <Typography component="legend" mt={1}>Your Rating</Typography>
            <Box sx={{ display: 'flex', alignItems: "center" }}>
                <Rating name={isUserRated ? 'read-only' : 'simple-controlled'} value={userRating} onChange={onRate} readOnly={isUserRated} precision={0.1} />
                <Typography fontWeight={"bold"}>{" " + userRating + " Stars"}</Typography>
            </Box>
            <Typography component="legend" mt={1}>Overall Rating</Typography>
            <Box sx={{ display: 'flex', alignItems: "center" }}>
                <Rating name='read-only' value={rating} readOnly precision={0.1} />
                <Typography fontWeight={"bold"}>{" " + rating + " Stars"}</Typography>
            </Box>
        </Paper>
    )
}

export default Book