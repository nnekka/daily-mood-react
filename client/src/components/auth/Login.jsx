import React, {useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {Button, Col, Form, Row} from 'react-bootstrap'
import AlertComponent from '../main/AlertComponent'
import {login} from '../../actions/authActions'

const Login = ({ history }) => {

    const dispatch = useDispatch()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const auth = useSelector(state => state.auth)
    const { user } = auth

    useEffect(() => {
        if (user.name){
            history.push('/dashboard')
        }
    }, [user, history])


    const submitHandler = (event) => {
        event.preventDefault()
        dispatch(login(email, password))
    }

    return (
        <div className='py-5'>
            <Row className='justify-content-md-center py-2'>
                <Col xs={12} md={6}>
                    <h3 className='text-center'>Если у вас уже есть аккаунт - авторизуйтесь</h3>
                    <AlertComponent/>
                    <Form onSubmit={submitHandler}>
                        <Form.Group controlId='email'>
                            <Form.Label>Email</Form.Label>
                            <Form.Control type='email'
                                          placeholder='Enter email'
                                          value={email}
                                          onChange={({target}) => setEmail(target.value)}>

                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId='password'>
                            <Form.Label>Password</Form.Label>
                            <Form.Control type='password'
                                          placeholder='Enter password'
                                          value={password}
                                          onChange={({target}) => setPassword(target.value)}>

                            </Form.Control>
                        </Form.Group>
                        <div className='text-center'>
                            <Button type='submit'>Войти</Button>
                        </div>
                    </Form>
                </Col>
            </Row>
        </div>
    )
}

export default Login