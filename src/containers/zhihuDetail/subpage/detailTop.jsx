import React from 'react'
// import SwiperDemo from '../../../components/SwiperDemo'
import SwipterItem from '../../../components/SwiperItem'
import './styles.scss'
class DetailTop extends React.Component {
    render() {
        const { top = {} } = this.props
        return (
            <div>
                {
                    top.image ?
                        <SwipterItem item={top}></SwipterItem> :
                        top.title
                        &&
                        <div className="Detail_Title">
                            <h2>{top.title}</h2>
                        </div>

                }
            </div>
        )
    }
}
export default DetailTop