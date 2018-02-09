import React from 'react'
// import SwiperDemo from '../../../components/SwiperDemo'
import SwipterItem from '../../../components/SwiperItem'
class ThemeTop extends React.Component {
    render() {
        const { top = {} } = this.props
        return (
            <div>
                {
                    top.image
                    &&
                    <SwipterItem showTitle={false} item={top}></SwipterItem>
                }
            </div>
        )
    }
}
export default ThemeTop