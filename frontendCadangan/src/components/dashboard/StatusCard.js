import React from 'react'
import 'boxicons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const StatusCard = (props) => {
    return (
        <div className='status-card'>
            <div className="status-card__icon">
                <FontAwesomeIcon icon={props.icon} />
            </div>
            <div className="status-card__info">
                <h4>{props.count}</h4>
                <span>{props.title}</span>
            </div>
        </div>
    )
}

export default StatusCard
