import React, {useEffect, useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {Button, Col, Form, Image, Row} from 'react-bootstrap'
import Loader from '../main/Loader'
import axios from 'axios/index'
import {getLoggedUser, updateUserProfile} from '../../actions/authActions'

const UserProfile = ({match}) => {

    const dispatch = useDispatch()
    const userID = match.params.id
    const auth = useSelector(state => state.auth)
    const {loading, user, success} = auth
    const [image, setImage] = useState('')
    const [name, setName] = useState(user.name)
    const [uploading, setUploading] = useState(false)

    useEffect(() => {
        setName(user.name)

    }, [user.name, success])

    const uploadFile = async (event) => {
        const file = event.target.files[0]
        const formData = new FormData()
        formData.append('image', file)
        setUploading(true)
        try {
            const config = {
                headers: {
                    'Content-type': 'multipart/form-data'
                }
            }
            const {data} = await axios.post('/api/upload', formData, config)
            setImage(data)
            setUploading(false)
        }
        catch (e) {
            console.error(e)
            setUploading(false)
        }
    }

    const submitHandler = (event) => {
        event.preventDefault()
        dispatch(updateUserProfile(name, image, userID))
        setImage('')
    }

    return (
        <div className='py-5'>
            {loading ? <Loader/> :
                <>
                    <h1 className='text-center'>{user.name}</h1>
                    <Row>
                        <Col>
                            <h3 className='text-center'>Обновить данные профиля</h3>
                            <Form onSubmit={submitHandler}>
                                <Form.Group className='text-center'>
                                    <Image
                                        src={`http://localhost:3333/${user.avatar}`}
                                        alt='avatar'
                                        width='200px'
                                        height='150px'
                                    />
                                </Form.Group>
                                <Form.Group controlId='name'>
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control type='name'
                                                  placeholder='Enter name'
                                                  value={name}
                                                  onChange={({target}) => setName(target.value)}>

                                    </Form.Control>
                                </Form.Group>
                                <Form.Group controlId='image'>
                                    <Form.Control type='text'
                                                  placeholder='avatar'
                                                  value={image}
                                                  onChange={({target}) => setImage(target.value)}
                                    >

                                    </Form.Control>
                                    <Form.File id='image-file'
                                               label='choose file'
                                               custom onChange={uploadFile}
                                    ></Form.File>
                                </Form.Group>
                                <Form.Group className='text-center'>
                                    <Button type='submit'>
                                        Do it!
                                    </Button>
                                </Form.Group>
                            </Form>
                        </Col>
                        <Col>
                        </Col>
                        <Col>
                        </Col>
                    </Row>
                </>
            }
        </div>
    )
}

export default UserProfile