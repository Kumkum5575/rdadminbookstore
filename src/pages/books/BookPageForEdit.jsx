import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col, Form, Button } from "react-bootstrap";

const apiUrl = import.meta.env.VITE_API_URL;

function BookPageForEdit() {

    let params = useParams();
    let navigate = useNavigate();

    let id = params.id;

    let [book, setBook] = useState({
        bookTitle: '',
        authorName: '',
        imprint: '',
        publicationYear: '',
        productFrom: '',
        publisher: '',
        genre: '',
        isbnNo: '',
        bookCategory: '',
        bookSubCategory: '',
        edition: '',
        language: '',
        description: '',
        shortDescription: '',
        countryOfOrigin: '',
        nameOfManufacturer: '',
        addressOfManufacturer: '',
        nameOfPackager: '',
        addressOfPackager: '',
        rating: '',
        reviews: '',
        originalPrice: '',
        discount: '',
        discountType: '',
        finalPrice: '',
        bookImage: ''
    });


    useEffect(() => {

        axios({
            url: apiUrl + '/book/for/edit/' + id,
            method: 'get'
        })
            .then((res) => {
                setBook(res.data.data);
            })
            .catch((err) => {
                alert(err);
            });

    }, [id]);


    function manageUpdate(e) {

        let name = e.target.name;
        let value = e.target.value;

        setBook((prev) => {

            let nextBook = {
                ...prev,
                [name]: value
            };

            let originalPrice = Number(nextBook.originalPrice) || 0;
            let discount = Number(nextBook.discount) || 0;

            let finalPrice = originalPrice;

            if (nextBook.discountType === 'percentage') {

                finalPrice =
                    originalPrice -
                    (originalPrice * discount / 100);

            }
            else if (nextBook.discountType === 'flat') {

                finalPrice =
                    originalPrice - discount;

            }

            finalPrice = Math.max(0, finalPrice);

            nextBook.finalPrice = finalPrice.toFixed(2);

            return nextBook;
        });
    }


    function editBook() {

        axios({
            url: apiUrl + '/edit/book/' + id,
            method: 'put',
            data: book
        })
            .then((res) => {

                alert("Data has been updated successfully...");

                navigate('/books');

            })
            .catch((err) => {

                alert(err);

            });
    }


    return (

        <Container>

            <Row className="w-100 justify-content-center">

                <Col
                    xs={12}
                    md={8}
                    lg={8}
                    className="border p-4 rounded bg-white mt-5"
                >

                    <h3 className="text-center text-danger">
                        Edit the Book
                    </h3>


                    <Form>

                        {/* Book Title */}
                        <Form.Group className="mb-3">

                            <Form.Label>
                                Book Title
                            </Form.Label>

                            <Form.Control
                                type="text"
                                name="bookTitle"
                                value={book.bookTitle || ''}
                                onChange={manageUpdate}
                            />

                        </Form.Group>


                        {/* Author Name */}
                        <Form.Group className="mb-3">

                            <Form.Label>
                                Author Name
                            </Form.Label>

                            <Form.Control
                                type="text"
                                name="authorName"
                                value={book.authorName || ''}
                                onChange={manageUpdate}
                            />

                        </Form.Group>


                        {/* Imprint */}
                        <Form.Group className="mb-3">

                            <Form.Label>
                                Imprint
                            </Form.Label>

                            <Form.Control
                                type="text"
                                name="imprint"
                                value={book.imprint || ''}
                                onChange={manageUpdate}
                            />

                        </Form.Group>


                        {/* Publication Year */}
                        <Form.Group className="mb-3">

                            <Form.Label>
                                Publication Year
                            </Form.Label>

                            <Form.Control
                                type="text"
                                name="publicationYear"
                                value={book.publicationYear || ''}
                                onChange={manageUpdate}
                            />

                        </Form.Group>


                        {/* Product From */}
                        <Form.Group className="mb-3">

                            <Form.Label>
                                Product From
                            </Form.Label>

                            <Form.Control
                                type="text"
                                name="productFrom"
                                value={book.productFrom || ''}
                                onChange={manageUpdate}
                            />

                        </Form.Group>


                        {/* Publisher */}
                        <Form.Group className="mb-3">

                            <Form.Label>
                                Publisher
                            </Form.Label>

                            <Form.Control
                                type="text"
                                name="publisher"
                                value={book.publisher || ''}
                                onChange={manageUpdate}
                            />

                        </Form.Group>


                        {/* Genre */}
                        <Form.Group className="mb-3">

                            <Form.Label>
                                Genre
                            </Form.Label>

                            <Form.Control
                                type="text"
                                name="genre"
                                value={book.genre || ''}
                                onChange={manageUpdate}
                            />

                        </Form.Group>


                        {/* ISBN */}
                        <Form.Group className="mb-3">

                            <Form.Label>
                                ISBN No
                            </Form.Label>

                            <Form.Control
                                type="text"
                                name="isbnNo"
                                value={book.isbnNo || ''}
                                onChange={manageUpdate}
                            />

                        </Form.Group>


                        {/* Book Category */}
                        <Form.Group className="mb-3">

                            <Form.Label>
                                Book Category
                            </Form.Label>

                            <Form.Control
                                type="text"
                                name="bookCategory"
                                value={book.bookCategory || ''}
                                onChange={manageUpdate}
                            />

                        </Form.Group>


                        {/* Book Sub Category */}
                        <Form.Group className="mb-3">

                            <Form.Label>
                                Book Sub Category
                            </Form.Label>

                            <Form.Control
                                type="text"
                                name="bookSubCategory"
                                value={book.bookSubCategory || ''}
                                onChange={manageUpdate}
                            />

                        </Form.Group>


                        {/* Edition */}
                        <Form.Group className="mb-3">

                            <Form.Label>
                                Edition
                            </Form.Label>

                            <Form.Control
                                type="text"
                                name="edition"
                                value={book.edition || ''}
                                onChange={manageUpdate}
                            />

                        </Form.Group>


                        {/* Language */}
                        <Form.Group className="mb-3">

                            <Form.Label>
                                Language
                            </Form.Label>

                            <Form.Control
                                type="text"
                                name="language"
                                value={book.language || ''}
                                onChange={manageUpdate}
                            />

                        </Form.Group>


                        {/* Short Description */}
                        <Form.Group className="mb-3">

                            <Form.Label>
                                Short Description
                            </Form.Label>

                            <Form.Control
                                as="textarea"
                                rows={3}
                                name="shortDescription"
                                value={book.shortDescription || ''}
                                onChange={manageUpdate}
                            />

                        </Form.Group>


                        {/* Description */}
                        <Form.Group className="mb-3">

                            <Form.Label>
                                Description
                            </Form.Label>

                            <Form.Control
                                as="textarea"
                                rows={5}
                                name="description"
                                value={book.description || ''}
                                onChange={manageUpdate}
                            />

                        </Form.Group>


                        {/* Country Of Origin */}
                        <Form.Group className="mb-3">

                            <Form.Label>
                                Country Of Origin
                            </Form.Label>

                            <Form.Control
                                type="text"
                                name="countryOfOrigin"
                                value={book.countryOfOrigin || ''}
                                onChange={manageUpdate}
                            />

                        </Form.Group>


                        {/* Manufacturer Name */}
                        <Form.Group className="mb-3">

                            <Form.Label>
                                Name Of Manufacturer
                            </Form.Label>

                            <Form.Control
                                type="text"
                                name="nameOfManufacturer"
                                value={book.nameOfManufacturer || ''}
                                onChange={manageUpdate}
                            />

                        </Form.Group>


                        {/* Manufacturer Address */}
                        <Form.Group className="mb-3">

                            <Form.Label>
                                Address Of Manufacturer
                            </Form.Label>

                            <Form.Control
                                type="text"
                                name="addressOfManufacturer"
                                value={book.addressOfManufacturer || ''}
                                onChange={manageUpdate}
                            />

                        </Form.Group>


                        {/* Packager Name */}
                        <Form.Group className="mb-3">

                            <Form.Label>
                                Name Of Packager
                            </Form.Label>

                            <Form.Control
                                type="text"
                                name="nameOfPackager"
                                value={book.nameOfPackager || ''}
                                onChange={manageUpdate}
                            />

                        </Form.Group>


                        {/* Packager Address */}
                        <Form.Group className="mb-3">

                            <Form.Label>
                                Address Of Packager
                            </Form.Label>

                            <Form.Control
                                type="text"
                                name="addressOfPackager"
                                value={book.addressOfPackager || ''}
                                onChange={manageUpdate}
                            />

                        </Form.Group>


                        {/* Rating */}
                        <Form.Group className="mb-3">

                            <Form.Label>
                                Rating
                            </Form.Label>

                            <Form.Control
                                type="number"
                                name="rating"
                                min="0"
                                max="5"
                                step="0.1"
                                value={book.rating || ''}
                                onChange={manageUpdate}
                            />

                        </Form.Group>


                        {/* Reviews */}
                        <Form.Group className="mb-3">

                            <Form.Label>
                                Reviews
                            </Form.Label>

                            <Form.Control
                                type="number"
                                name="reviews"
                                value={book.reviews || ''}
                                onChange={manageUpdate}
                            />

                        </Form.Group>


                        {/* Original Price */}
                        <Form.Group className="mb-3">

                            <Form.Label>
                                Original Price
                            </Form.Label>

                            <Form.Control
                                type="number"
                                name="originalPrice"
                                value={book.originalPrice || ''}
                                onChange={manageUpdate}
                            />

                        </Form.Group>


                        {/* Discount */}
                        <Form.Group className="mb-3">

                            <Form.Label>
                                Discount
                            </Form.Label>

                            <Form.Control
                                type="number"
                                name="discount"
                                value={book.discount || ''}
                                onChange={manageUpdate}
                            />

                        </Form.Group>


                        {/* Discount Type */}
                        <Form.Group className="mb-3">

                            <Form.Label>
                                Discount Type
                            </Form.Label>

                            <Form.Select
                                name="discountType"
                                value={book.discountType || ''}
                                onChange={manageUpdate}
                            >
                                <option value="">
                                    Select Discount Type
                                </option>

                                <option value="percentage">
                                    Percentage
                                </option>

                                <option value="flat">
                                    Flat
                                </option>

                            </Form.Select>

                        </Form.Group>


                        {/* Final Price */}
                        <Form.Group className="mb-3">

                            <Form.Label>
                                Final Price
                            </Form.Label>

                            <Form.Control
                                type="number"
                                name="finalPrice"
                                value={book.finalPrice || ''}
                                readOnly
                            />

                        </Form.Group>


                        <Button
                            variant="danger"
                            className="mt-3"
                            onClick={editBook}
                        >
                            Edit Book
                        </Button>


                        <Button
                            variant="secondary"
                            className="mt-3 ms-2"
                            onClick={() => navigate('/books')}
                        >
                            Cancel
                        </Button>

                    </Form>

                </Col>

            </Row>

        </Container>

    );
}

export default BookPageForEdit;