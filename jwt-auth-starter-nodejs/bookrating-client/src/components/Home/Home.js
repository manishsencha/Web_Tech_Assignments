import { Box, Pagination } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import Book from './Book/Book'

function Home() {
    const [books, setBooks] = useState([])
    const [page, setPage] = useState(1)
    const { currentUser, getBooks } = useAuth()


    function handlePageChange(event, value) {
        setPage(value)
    }
    useEffect(() => {
        async function fetchBooks() {
            const fetchedBooks = await getBooks(page).then(res => (res.data))
            setBooks(fetchedBooks)
            console.log(fetchedBooks)
        }
        fetchBooks()
    }, [currentUser, getBooks, page])

    return (
        <div>
            <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center", my: 2 }}>
                <Pagination count={10} color="primary" page={page} onChange={handlePageChange} />
            </Box>
            <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
                {
                    books.length > 0 && books.map(
                        (book) => <Book
                            key={book.book._id}
                            book={book.book}
                            rating={book.rating}
                            userRating={book.userRating}
                            isUserRated={book.isUserRated}
                        />)}
            </Box>
        </div>
    )
}

export default Home