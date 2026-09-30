import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button, Badge } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL;

function BookDetail() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [book, setBook] = useState({});

    useEffect(() => {

        axios({
            url: apiUrl + '/book/' + id,
            method: 'get'
        })
            .then((res) => {
                setBook(res.data.data);
            })
            .catch((err) => {
                alert(err);
            });

    }, [id]);


    return (

        <Container className="py-4">

            {/* Back Button */}
            <Button
                variant="outline-secondary"
                className="mb-4"
                onClick={() => navigate('/books')}
            >
                ← Back to Books
            </Button>


            {/* Main Book Card */}
            <Card className="border-0 shadow-sm">

                <Card.Body className="p-4">

                    <Row>

                        {/* Book Image */}
                        <Col
                            md={5}
                            className="text-center border-end"
                        >

                            <div
                                className="d-flex justify-content-center align-items-center"
                                style={{
                                    minHeight: '500px',
                                    backgroundColor: '#f8f9fa',
                                    borderRadius: '10px'
                                }}
                            >

                                <img
                                    src={book.bookImage}
                                    alt={book.bookTitle}
                                    style={{
                                        width: '80%',
                                        maxWidth: '350px',
                                        height: '450px',
                                        objectFit: 'contain'
                                    }}
                                />

                            </div>

                        </Col>


                        {/* Book Main Information */}
                        <Col md={7} className="ps-md-5 mt-4 mt-md-0">

                            <h1 className="fw-bold mb-2">
                                {book.bookTitle || '-'}
                            </h1>

                            <p className="text-muted fs-5 mb-3">
                                by <strong>{book.authorName || '-'}</strong>
                            </p>


                            {/* Rating */}
                            <div className="mb-3">

                                <Badge
                                    bg="success"
                                    className="px-3 py-2"
                                >
                                    ★ {book.rating || '0'}
                                </Badge>

                                <span className="ms-3 text-muted">
                                    {book.reviews || '0'} Reviews
                                </span>

                            </div>


                            <hr />


                            {/* Price */}
                            <div className="mt-4 mb-4">

                                <div className="d-flex align-items-center gap-3 flex-wrap">

                                    <span className="display-5 fw-bold text-dark">
                                        ₹{book.finalPrice || '0'}
                                    </span>

                                    {book.originalPrice && (
                                        <span className="text-muted text-decoration-line-through fs-5">
                                            ₹{book.originalPrice}
                                        </span>
                                    )}

                                    {book.discount && (
                                        <Badge bg="success">
                                            {book.discount}
                                            {book.discountType === 'percentage'
                                                ? '% OFF'
                                                : ' OFF'}
                                        </Badge>
                                    )}

                                </div>

                            </div>


                            {/* Short Description */}
                            {book.shortDescription && (

                                <div className="mb-4">

                                    <h5 className="fw-bold">
                                        About this Book
                                    </h5>

                                    <p className="text-muted">
                                        {book.shortDescription}
                                    </p>

                                </div>

                            )}


                            {/* Quick Information */}
                            <Card className="border-0 bg-light">

                                <Card.Body>

                                    <h5 className="fw-bold mb-3">
                                        Quick Information
                                    </h5>

                                    <BookDetailLocal
                                        label="ISBN No"
                                        value={book.isbnNo}
                                    />

                                    <BookDetailLocal
                                        label="Publisher"
                                        value={book.publisher}
                                    />

                                    <BookDetailLocal
                                        label="Publication Year"
                                        value={book.publicationYear}
                                    />

                                    <BookDetailLocal
                                        label="Language"
                                        value={book.language}
                                    />

                                </Card.Body>

                            </Card>

                        </Col>

                    </Row>

                </Card.Body>

            </Card>


            {/* Book Details */}
            <Card className="border-0 shadow-sm mt-4">

                <Card.Body className="p-4">

                    <h3 className="fw-bold mb-4">
                        📚 Book Details
                    </h3>

                    <Row>

                        <Col md={6}>

                            <BookDetailLocal
                                label="Book Title"
                                value={book.bookTitle}
                            />

                            <BookDetailLocal
                                label="Author Name"
                                value={book.authorName}
                            />

                            <BookDetailLocal
                                label="Imprint"
                                value={book.imprint}
                            />

                            <BookDetailLocal
                                label="Publication Year"
                                value={book.publicationYear}
                            />

                            <BookDetailLocal
                                label="Product From"
                                value={book.productFrom}
                            />

                            <BookDetailLocal
                                label="Publisher"
                                value={book.publisher}
                            />

                            <BookDetailLocal
                                label="Genre"
                                value={book.genre}
                            />

                        </Col>


                        <Col md={6}>

                            <BookDetailLocal
                                label="ISBN No"
                                value={book.isbnNo}
                            />

                            <BookDetailLocal
                                label="Book Category"
                                value={book.bookCategory}
                            />

                            <BookDetailLocal
                                label="Book Sub Category"
                                value={book.bookSubCategory}
                            />

                            <BookDetailLocal
                                label="Edition"
                                value={book.edition}
                            />

                            <BookDetailLocal
                                label="Language"
                                value={book.language}
                            />

                            <BookDetailLocal
                                label="Rating"
                                value={book.rating}
                            />

                            <BookDetailLocal
                                label="Reviews"
                                value={book.reviews}
                            />

                        </Col>

                    </Row>

                </Card.Body>

            </Card>


            {/* Price Information */}
            <Card className="border-0 shadow-sm mt-4">

                <Card.Body className="p-4">

                    <h3 className="fw-bold mb-4">
                        💰 Price Information
                    </h3>

                    <Row>

                        <Col md={6}>

                            <BookDetailLocal
                                label="Original Price"
                                value={
                                    book.originalPrice
                                        ? '₹' + book.originalPrice
                                        : '-'
                                }
                            />

                            <BookDetailLocal
                                label="Discount"
                                value={book.discount}
                            />

                        </Col>


                        <Col md={6}>

                            <BookDetailLocal
                                label="Discount Type"
                                value={book.discountType}
                            />

                            <BookDetailLocal
                                label="Final Price"
                                value={
                                    book.finalPrice
                                        ? '₹' + book.finalPrice
                                        : '-'
                                }
                            />

                        </Col>

                    </Row>

                </Card.Body>

            </Card>


            {/* Description */}
            <Card className="border-0 shadow-sm mt-4">

                <Card.Body className="p-4">

                    <h3 className="fw-bold mb-3">
                        📝 Description
                    </h3>

                    <p className="text-muted mb-0">
                        {book.description || '-'}
                    </p>

                </Card.Body>

            </Card>


            {/* Product Information */}
            <Card className="border-0 shadow-sm mt-4">

                <Card.Body className="p-4">

                    <h3 className="fw-bold mb-4">
                        📦 Product Information
                    </h3>

                    <Row>

                        <Col md={6}>

                            <BookDetailLocal
                                label="Country of Origin"
                                value={book.countryOfOrigin}
                            />

                            <BookDetailLocal
                                label="Name of Manufacturer"
                                value={book.nameOfManufacturer}
                            />

                            <BookDetailLocal
                                label="Manufacturer Address"
                                value={book.addressOfManufacturer}
                            />

                        </Col>


                        <Col md={6}>

                            <BookDetailLocal
                                label="Name of Packager"
                                value={book.nameOfPackager}
                            />

                            <BookDetailLocal
                                label="Packager Address"
                                value={book.addressOfPackager}
                            />

                        </Col>

                    </Row>

                </Card.Body>

            </Card>


            {/* Bottom Back Button */}
            <div className="text-center my-4">

                <Button
                    variant="dark"
                    onClick={() => navigate('/books')}
                >
                    ← Back to Book List
                </Button>

            </div>

        </Container>
    );
}


function BookDetailLocal({ label, value }) {

    return (

        <Row className="border-bottom py-3">

            <Col
                xs={5}
                className="text-muted"
            >
                {label}
            </Col>

            <Col
                xs={7}
                className="fw-semibold"
            >
                {value || '-'}
            </Col>

        </Row>

    );
}


export default BookDetail;