import React from 'react'
// import SwiperDemo from '../../../components/SwiperDemo'
import ScrollItem from '../../../components/ScrollItem/'
class ZhiHuMain extends React.Component {
    onClickItem(item) {
        this.props.setScrollDistance && this.props.setScrollDistance()
        this.props.history.push(`/zhihuDetail/${item.id}`)
    }
    render() {
        const { stories = [] } = this.props
        const len = stories.length
        // const swiperProps = {
        //     len,
        // }
        return (
            <div>
                {
                    len > 0
                    &&
                    stories.map((item, index) => {
                        const itemProps = {
                            item,
                            onClickItem: this.onClickItem.bind(this)
                        }
                        return (
                            <ScrollItem key={index} {...itemProps}></ScrollItem>
                        )
                    })
                }
            </div>
        )
    }
}
export default ZhiHuMain