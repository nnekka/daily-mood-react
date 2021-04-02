import React from 'react'
import { useSelector } from 'react-redux'
import { Alert } from 'react-bootstrap'

const AlertComponent = () => {


    const alerts = useSelector(state => state.alerts)

    return (
        <>
            {
                alerts !== null && alerts.length > 0 &&
                alerts.map(alert =>
                    <Alert key={alert.id} variant={`${alert.type}`}>
                        {alert.msg}
                    </Alert>
                )
            }
        </>
    )
}

export default AlertComponent