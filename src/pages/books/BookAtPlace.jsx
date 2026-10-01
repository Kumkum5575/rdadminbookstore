import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import {
    Container,
    Row,
    Col,
    Form,
    Button,
    Table
} from 'react-bootstrap';
import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL;

function BookAtPlace() {

    const [books, setBooks] = useState([]);
    const [availabilityList, setAvailabilityList] = useState([]);

    const [book, setBook] = useState('');
    const [pinCode, setPinCode] = useState('');
    const [isAvailable, setIsAvailable] = useState(false);

    const [editId, setEditId] = useState(null);


    // =========================
    // GET ALL BOOKS
    // =========================

    const getBooks = async () => {
        try {

            const response = await axios.get(`${apiUrl}/books`);

            console.log("Book API Response:", response.data);

            setBooks(response.data.data || []);

        } catch (error) {

            console.log("Error fetching books:", error);

        }
    };


    // =========================
    // GET BOOK AVAILABILITY
    // =========================

    const getAvailability = async () => {
        try {

            const response = await axios.get(
                `${apiUrl}/book-at-place`
            );

            console.log(
                "Book Availability Response:",
                response.data
            );

            setAvailabilityList(
                response.data.bookAtPlace || []
            );

        } catch (error) {

            console.log(
                "Error fetching availability:",
                error
            );

        }
    };


    // =========================
    // LOAD DATA
    // =========================

    useEffect(() => {

        getBooks();
        getAvailability();

    }, []);


    // =========================
    // ADD / UPDATE
    // =========================

    const handleSubmit = async (e) => {

        e.preventDefault();


        // Book validation
        if (!book) {

            alert("Please select a book");

            return;
        }


        // Pincode validation
        if (!pinCode) {

            alert("Please enter pin code");

            return;
        }


        const data = {

            book: book,
            pinCode: pinCode,
            isAvailable: isAvailable

        };


        try {

            // UPDATE
            if (editId) {

                await axios.put(
                    `${apiUrl}/book-at-place/${editId}`,
                    data
                );

                alert(
                    "Book availability updated successfully"
                );

            }

            // ADD
            else {

                await axios.post(
                    `${apiUrl}/book-at-place`,
                    data
                );

                alert(
                    "Book availability added successfully"
                );

            }


            // Reset form

            setBook('');
            setPinCode('');
            setIsAvailable(false);
            setEditId(null);


            // Refresh list

            getAvailability();


        } catch (error) {

            console.log(error);

            alert(
                error.response?.data?.message ||
                "Something went wrong"
            );

        }

    };


    // =========================
    // EDIT
    // =========================

    const handleEdit = (item) => {

        setEditId(item._id);

        setBook(
            item.book?._id || item.book || ''
        );

        setPinCode(
            item.pinCode || ''
        );

        setIsAvailable(
            item.isAvailable || false
        );

        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });

    };


    // =========================
    // DELETE
    // =========================

    const handleDelete = async (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this record?"
        );


        if (!confirmDelete) {

            return;
        }


        try {

            await axios.delete(
                `${apiUrl}/book-at-place/${id}`
            );

            alert(
                "Record deleted successfully"
            );

            getAvailability();


        } catch (error) {

            console.log(error);

            alert(
                error.response?.data?.message ||
                "Something went wrong"
            );

        }

    };


    // =========================
    // CANCEL EDIT
    // =========================

    const handleCancel = () => {

        setEditId(null);

        setBook('');

        setPinCode('');

        setIsAvailable(false);

    };


    // =========================
    // UI
    // =========================

    return (

        <Container className="mt-4">

            <h2 className="mb-4">
                Manage Book Availability
            </h2>


            {/* ================= FORM ================= */}

            <Form onSubmit={handleSubmit}>

                <Row>

                    {/* SELECT BOOK */}

                    <Col md={6}>

                        <Form.Group className="mb-3">

                            <Form.Label>
                                Select Book
                            </Form.Label>


                            <Form.Select
                                value={book}
                                onChange={(e) =>
                                    setBook(e.target.value)
                                }
                            >

                                <option value="">
                                    Select Book
                                </option>


                                {books.map((item) => (

                                    <option
                                        key={item._id}
                                        value={item._id}
                                    >
                                        {item.bookTitle}
                                    </option>

                                ))}

                            </Form.Select>

                        </Form.Group>

                    </Col>


                    {/* PIN CODE */}

                    <Col md={6}>

                        <Form.Group className="mb-3">

                            <Form.Label>
                                Pin Code
                            </Form.Label>


                            <Form.Control
                                type="text"
                                placeholder="Enter Pin Code"
                                value={pinCode}
                                onChange={(e) =>
                                    setPinCode(e.target.value)
                                }
                            />

                        </Form.Group>

                    </Col>

                </Row>


                {/* AVAILABILITY */}

                <Form.Group className="mb-3">

                    <Form.Check
                        type="checkbox"
                        label="Book is Available"
                        checked={isAvailable}
                        onChange={(e) =>
                            setIsAvailable(
                                e.target.checked
                            )
                        }
                    />

                </Form.Group>


                {/* BUTTON */}

                <Button
                    type="submit"
                    variant="dark"
                >

                    {editId
                        ? "Update Availability"
                        : "Save Availability"
                    }

                </Button>


                {/* CANCEL */}

                {editId && (

                    <Button
                        type="button"
                        variant="secondary"
                        className="ms-2"
                        onClick={handleCancel}
                    >
                        Cancel
                    </Button>

                )}

            </Form>


            {/* ================= LIST ================= */}

            <h4 className="mt-5 mb-3">
                Book Availability List
            </h4>


            <Table
                bordered
                hover
                responsive
            >

                <thead>

                    <tr>

                        <th>#</th>

                        <th>
                            Book
                        </th>

                        <th>
                            Pin Code
                        </th>

                        <th>
                            Availability
                        </th>

                        <th>
                            Action
                        </th>

                    </tr>

                </thead>


                <tbody>

                    {availabilityList.length > 0 ? (

                        availabilityList.map(
                            (item, index) => (

                                <tr key={item._id}>

                                    <td>
                                        {index + 1}
                                    </td>


                                    <td>

                                        {item.book?.bookTitle ||
                                            item.book?.title ||
                                            "N/A"
                                        }

                                    </td>


                                    <td>
                                        {item.pinCode}
                                    </td>


                                    <td>

                                        {item.isAvailable ? (

                                            <span className="text-success">
                                                Available
                                            </span>

                                        ) : (

                                            <span className="text-danger">
                                                Not Available
                                            </span>

                                        )}

                                    </td>


                                    <td>

                                        <Button
                                            size="sm"
                                            variant="warning"
                                            className="me-2"
                                            onClick={() =>
                                                handleEdit(item)
                                            }
                                        >
                                            Edit
                                        </Button>


                                        <Button
                                            size="sm"
                                            variant="danger"
                                            onClick={() =>
                                                handleDelete(
                                                    item._id
                                                )
                                            }
                                        >
                                            Delete
                                        </Button>

                                    </td>

                                </tr>

                            )

                        )

                    ) : (

                        <tr>

                            <td
                                colSpan="5"
                                className="text-center"
                            >
                                No availability records found
                            </td>

                        </tr>

                    )}

                </tbody>

            </Table>

        </Container>

    );

}


export default BookAtPlace;