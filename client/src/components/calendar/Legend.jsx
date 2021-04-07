import React from 'react'
import { useDispatch } from 'react-redux'
import {Col, Image, Row} from 'react-bootstrap'
import $ from 'jquery'
import {setLegend} from '../../actions/colorImageActions'

const Legend = ({ calendar }) => {

    const dispatch = useDispatch()

    const selectColor = (e) => {
        const element = $(`#${e.target.id}`)
        const color = element[0].style.backgroundColor
        const id = color
            ? calendar.legends.find(x => x.color === color)._id
            : e.target.id
        dispatch(setLegend(id))
    }

    return (
        <div className='py-lg-3'>
            <h2>Легенда</h2>
            {calendar.legends.map((legend, index) =>
                <Row className='py-1' key={legend._id} onClick={(e) => selectColor(e)}>
                    <Col md={-1}>
                        {calendar.legendType === 'цветная'
                            ? <button
                                id={`btn-${index}`}
                                style={{width: '50px', height: '50px', backgroundColor: `${legend.color}`}}>
                            </button>
                            : <button>
                                <Image
                                    id={`${legend._id}`}
                                    src={`http://localhost:3333/${legend.imageSrc}`}
                                    width='60px'
                                    height='60px'
                                />
                            </button>
                        }

                    </Col>
                    <Col md={1}>
                        {legend.text}
                    </Col>
                </Row>
            )}
            <Row>
                <Col md={-1}>
                    <button>
                        <Image
                            onClick={(e) => selectColor(e)}
                            id={`btn-${calendar.legends.length}`}
                            src={`http://localhost:3333/uploads/delete.jpg`}
                            width='60px'
                            height='60px'
                        />
                    </button>
                </Col>
                <Col md={1}>
                    Clear
                </Col>
            </Row>
        </div>
    )
}

export default Legend