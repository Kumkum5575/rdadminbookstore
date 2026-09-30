import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect,useState } from 'react'
const apiUrl = import.meta.env.VITE_API_URL
import axios from 'axios'
import {Button,Row,Col,Form,Container} from 'react-bootstrap'

function DiscountForEdit() {
  let navigate=useNavigate()
   let[books,setBooks]=useState([])
    let params = useParams()
    let id=params.id
    let[discount,setDiscount]=useState({
      book:'',
      discountName:'',
      discountType:'',
      discountValue:0,
      validFrom:'',
      validTo:''


    })
   
    useEffect(()=>{
        axios({
            url:apiUrl+'/discount/for/edit/'+id,
            method: 'get'
        }).then((res)=>{
           console.log("FULL RESPONSE:", res.data)
    console.log("BOOKS:", res.data.books)
    console.log("BOOKS IS ARRAY:", Array.isArray(res.data.books))

          setDiscount(res.data.data)
          setBooks(res.data.books)


        }).catch((err)=>
        {
          alert(err)
        })
    },[id])
    function editDiscount(){
      axios({
        url: apiUrl+'/edit/discount/'+id,
        method:'put',
        data: discount

      }).then((res)=>{
        alert("Discount has been updated successfully")
        navigate('/discounts')


      }).catch((err)=>{
        alert(err)

      })

    }
    function manageUpdate(e){
      let name=e.target.name
      let value=e.target.value
      setDiscount((prev)=>{
          return{
            ...prev,
            [name]:value

      }

      }
    )
    }
  return (
  <Container>
    <Row>
      <Col>
        <Form>
              <h3 className='mt-5 text-center text-danger'>Edit discount on book</h3>
              </Form> 

      </Col>
    </Row>
    <Row>
          <Col>
          
            <Form.Group>
              <Form.Label>Select Book</Form.Label>
              <Form.Select name='book' value={discount.book} onChange={manageUpdate}>
                
                {
                  books.map((book)=>
                  <option value={book._id}>{book.bookTitle}</option>)
                }
              </Form.Select>
            </Form.Group>
            
            </Col>
        </Row>
        <Row className='mt-2'>
              <Form.Group>
                <Form.Label>
                  Discount Name
                </Form.Label>
                <Form.Control type="text" name='discountName' value={discount.discountName} onChange={manageUpdate}></Form.Control>
              </Form.Group>
            </Row>
             <Row className='mt-2'>
                  <Form.Group>
                    <Form.Label>
                      Discount Type
                    </Form.Label>
                    <Form.Select name='discountType' value={discount.discountType} onChange={manageUpdate}>
                      
                       <option value="Percentage">Percentage</option>
                        <option value="Fixed">Fixed</option>
                    </Form.Select>
                  </Form.Group>
                </Row>
                <Row className='mt-2'>
                      <Form.Group>
                        <Form.Label>
                          Discount value (in number only)
                        </Form.Label>
                        <Form.Control type="number" name='discountValue' value={discount.discountValue} onChange={manageUpdate}></Form.Control>
                      </Form.Group>
                    </Row>
                     <Row className='mt-2'>
                          <Form.Group>
                            <Form.Label>
                              valid From
                            </Form.Label>
                            <Form.Control type='date' name='validFrom' value={discount.validFrom.split('T')[0]} onChange={manageUpdate}></Form.Control>
                          </Form.Group>
                        </Row>
                         <Row className='mt-2'>
                          <Form.Group>
                            <Form.Label>
                              valid To
                            </Form.Label>
                            <Form.Control type='date' name='validTo' value={discount.validTo.split('T')[0]} onChange={manageUpdate}></Form.Control>
                          </Form.Group>
                        </Row>
                         <Button className='mt-2' variant="success" onClick={editDiscount} >Edit Discount</Button>
                            



  </Container>
  )
}

export default DiscountForEdit
