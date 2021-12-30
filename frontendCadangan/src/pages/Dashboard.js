import React from 'react'
import StatusCard from '../components/dashboard/StatusCard'
import StatusData from '../json/StatusList.json'

const Dashboard = () => {
    return (
        <div>
            <h2 className="page-header">Dashboard</h2>
            <div className="row">
                <div className="col-12">
                    <div className="row">
                        {
                            StatusData.map((item, index) => (
                                <div className="col-3" key={index}>
                                    <StatusCard
                                        icon={item.icon}
                                        count={item.count}
                                        title={item.title}
                                    />
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard
