import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import {Redirect, Route} from 'react-router-dom'

const PrivateRoute = ({component: Component, history, ...rest}) => {

    const auth = useSelector(state => state.auth)
    const { loading, user } = auth

    return (
        <Route
            {...rest}
            render={props => !user.name && !loading
                ? <Redirect to='/login'/>
                : (<Component {...props}/>)}
        />
    )
}

export default PrivateRoute