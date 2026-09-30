
import { useNavigate } from 'react-router-dom'

import { Button, Row, Col, Form, Container, Table } from 'react-bootstrap'

import { useEffect, useState } from 'react'

const apiUrl = import.meta.env.VITE_API_URL

import axios from 'axios'


function DiscountList() {

    let [discounts, setDiscounts] = useState([])

    const navigate = useNavigate()

    function gotoAddDiscount() {
        navigate('/add/discount')
    }

    function goForEdit(id) {
        navigate('/edit/discount/' + id)
    }

    useEffect(() => {

        axios({
            url: apiUrl + '/discounts',
            method: 'get'
        })
            .then((res) => {
                setDiscounts(res.data.data)
            })
            .catch((err) => {
                console.log(err)
            })

    }, [])

    return (

        <Container>

            <Row>

                <Col>

                    <Form>

                        <Form.Group>

                            <Form.Control
                                type="text"
                                placeholder="type book name to search"
                            >
                            </Form.Control>

                        </Form.Group>

                    </Form>

                    <Button
                        className="mt-5"
                        variant="success"
                        style={{ float: 'right' }}
                        onClick={gotoAddDiscount}
                    >
                        Add discount+
                    </Button>

                </Col>

            </Row>


            <Row>

                <h3 className="mt-2 text-center text-danger">
                    Discounts List
                </h3>

                <Table bordered hover>

                    <thead>

                        <tr>

                            <th>Discount Name</th>

                            <th>Discount Type</th>

                            <th>Discount Value</th>

                            <th>Book Name</th>

                            <th>Valid From</th>

                            <th>Valid To</th>

                            <th>Status</th>

                            <th>Actions</th>

                        </tr>

                    </thead>


                    <tbody>

                        {
                            discounts.map((discount) =>

                                <tr key={discount._id}>

                                    <td>
                                        {discount.discountName}
                                    </td>

                                    <td>
                                        {discount.discountType}
                                    </td>

                                    <td>
                                        {discount.discountValue}
                                    </td>

                                    <td>
                                        {discount.book?.bookTitle || 'Book not found'}
                                    </td>

                                    <td>
                                        {
                                            new Date(
                                                discount.validFrom
                                            ).toLocaleDateString('en-GB')
                                        }
                                    </td>

                                    <td>
                                        {
                                            new Date(
                                                discount.validTo
                                            ).toLocaleDateString('en-GB')
                                        }
                                    </td>

                                    <td>

                                        <Button
                                            size="sm"
                                            variant={
                                                discount.status === 'active'
                                                    ? 'success'
                                                    : 'danger'
                                            }
                                        >
                                            {discount.status}
                                        </Button>

                                    </td>


                                    <td>

                                        <Button
                                            variant="warning"
                                            size="sm"
                                            onClick={() =>
                                                goForEdit(discount._id)
                                            }
                                        >
                                            Edit
                                        </Button>

                                    </td>

                                </tr>

                            )
                        }

                    </tbody>

                </Table>

            </Row>

        </Container>

    )

}

export default DiscountList

