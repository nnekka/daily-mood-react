import React, { useEffect } from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {Button, Col, Row} from 'react-bootstrap'
import { Link } from 'react-router-dom'

const MainPage = ({ history }) => {

    const dispatch = useDispatch()

    const auth = useSelector(state => state.auth)
    const { user } = auth

    useEffect(() => {
        if (user.name){
            history.push('/dashboard')
        }
    }, [user, history])

    return (
        <div className='main-page'>
            <div className='dark-overlay'>
                <h1 className='h1-bottom'>Регистрируйся и создавай свои календари!</h1>
                <Row>
                    <Col><Link to='/register'><Button>Регистрация</Button></Link></Col>
                    <Col><Link to='/login'><Button>Авторизация</Button></Link></Col>
                </Row>
            </div>

        </div>
    )
}

export default MainPage