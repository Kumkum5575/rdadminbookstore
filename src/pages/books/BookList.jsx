import { useEffect, useState } from 'react'
import axios from 'axios'
import { Col, Container, Row, Table, Button, Form, Pagination } from 'react-bootstrap'
import { FaTrash, FaEdit, FaEye } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'

const apiUrl = import.meta.env.VITE_API_URL;

function BookList() {

    let [books, setBooks] = useState([]);
    let [isDelete, setIsDelete] = useState(false);
    let [searchBook, setSearchBook] = useState('');
    let [nop, setNop] = useState(1);
    let [booksPerPage] = useState(3);
    let [pageNo, setPageNo] = useState(1);

    let navigate = useNavigate();


    let items = [];

    for (let i = 1; i <= nop; i++) {

        items.push(
            <Pagination.Item
                key={i}
                active={pageNo === i}
                onClick={() => setPageNo(i)}
            >
                {i}
            </Pagination.Item>
        )

    }


    function goToAddBook() {

        navigate('/add/book')

    }


    function handleDelete(id) {

        axios({

            url: apiUrl + '/delete/book/' + id,

            method: 'delete'

        })
            .then(() => {

                alert('Data has been deleted successfully')

                setIsDelete(!isDelete)

            })
            .catch((err) => {

                alert(err)

            })

    }


    function handleUpdate(id) {

        navigate('/edit/book/' + id);

    }


    function handleView(id) {

        navigate('/book/' + id);

    }


    useEffect(() => {

        axios({

            url: apiUrl + '/books',

            method: 'get',

            params: {

                searchBook: searchBook,

                pageNo: pageNo,

                booksPerPage: booksPerPage

            }

        })
            .then((res) => {

                setBooks(res.data.data);

                setNop(
                    Math.ceil(res.data.totalBooks / booksPerPage)
                )

            })
            .catch((err) => {

                alert(err)

            })

    }, [isDelete, searchBook, pageNo, booksPerPage])


    return (

        <Container>

            <Row>

                <Col>

                    <Form>

                        <Form.Group>

                            <Form.Control
                                type="text"
                                placeholder="Enter book title to search...."
                                value={searchBook}
                                onChange={(e) => {
                                    setSearchBook(e.target.value)
                                    setPageNo(1)
                                }}
                            />

                        </Form.Group>

                    </Form>


                    <Button
                        className="mt-5"
                        variant="success"
                        style={{ float: 'right' }}
                        onClick={goToAddBook}
                    >
                        Add Book +
                    </Button>


                    <h3 className="text-center text-danger mt-5">
                        Book List
                    </h3>


                    <Table bordered>

                        <thead>

                            <tr>

                                <th>Book Image</th>

                                <th>Book Title</th>

                                <th>Author Name</th>

                                <th>Original Price</th>

                                <th>ISBN No</th>

                                <th>Actions</th>

                            </tr>

                        </thead>


                        <tbody>

                            {

                                books.map((book) => (

                                    <tr key={book._id}>

                                        <td>

                                            <img
                                                src={book.bookImage}
                                                width="50px"
                                                height="50px"
                                                alt={book.bookTitle}
                                            />

                                        </td>


                                        <td>
                                            {book.bookTitle}
                                        </td>


                                        <td>
                                            {book.authorName}
                                        </td>


                                        <td>
                                            {book.originalPrice}
                                        </td>


                                        <td>
                                            {book.isbnNo}
                                        </td>


                                        <td>

                                            <div className="d-flex gap-2">

                                                <Button
                                                    variant="danger"
                                                    size="sm"
                                                    onClick={() => handleDelete(book._id)}
                                                    title="Delete Book"
                                                >

                                                    <FaTrash />

                                                </Button>


                                                <Button
                                                    variant="warning"
                                                    size="sm"
                                                    onClick={() => handleUpdate(book._id)}
                                                    title="Edit Book"
                                                >

                                                    <FaEdit />

                                                </Button>


                                                <Button
                                                    variant="primary"
                                                    size="sm"
                                                    onClick={() => handleView(book._id)}
                                                    title="View Book"
                                                >

                                                    <FaEye />

                                                </Button>

                                            </div>

                                        </td>

                                    </tr>

                                ))

                            }

                        </tbody>

                    </Table>


                    <Pagination
                        size="md"
                        className="justify-content-center"
                    >
                        {items}
                    </Pagination>


                </Col>

            </Row>

        </Container>

    )

}

export default BookList;