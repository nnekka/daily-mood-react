import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import './App.css'
import {Container} from 'react-bootstrap'
import {Route} from 'react-router-dom'
import {getLoggedUser} from './actions/authActions'
import Header from './components/main/Header'
import Login from './components/auth/Login'
import MainPage from './components/main/MainPage'
import Register from './components/auth/Register'
import PrivateRoute from './components/main/PrivateRoute'
import Dashboard from './components/calendar/Dashboard'
import CreateCalendar from './components/calendar/CreateCalendar'
import AddLegends from './components/calendar/AddLegends'
import Calendar from './components/calendar/Calendar'
import Statistics from './components/calendar/Statistics'

const App = () => {

    const dispatch = useDispatch()
    const auth = useSelector(state => state.auth)

    useEffect(() => {
        if (auth.token){
            dispatch(getLoggedUser())
        }
    }, [dispatch])

    return (
        <>
            <Header/>
            <Route exact path='/' component={MainPage}/>
            <main>
                <Container>
                    <Route exact path='/login' component={Login}/>
                    <Route exact path='/register' component={Register}/>
                    <PrivateRoute exact path='/dashboard' component={Dashboard}/>
                    <PrivateRoute exact path='/create-calendar' component={CreateCalendar}/>
                    <PrivateRoute exact path='/calendar/:id/add-legends' component={AddLegends}/>
                    <PrivateRoute exact path='/calendar/:id' component={Calendar}/>
                    <PrivateRoute exact path='/calendar/:id/statistics' component={Statistics}/>
                </Container>
            </main>
        </>
    )
}

export default App
