import React from 'react'
// react-swipeable-views
import SwiperDemo from '../../../components/SwiperDemo'
import SwipterItem from '../../../components/SwiperItem'
// better-scrolle 封装的swiper
import Swiper from '../../../components/Swiper'
class ZhiHuTop extends React.Component {
    onClickItem(item) {
        this.props.history.push(`/zhihuDetail/${item.id}`)
    }
    render() {
        const { top_stories = [] } = this.props
        const len = top_stories.length
        const swiperProps = {
            len,
        }
        return (
            <div>
                {
                    len > 0
                    &&
                    <Swiper>
                        {
                            top_stories.map((item, index) => {
                                const itemProps = {
                                    item,
                                    onClickItem: this.onClickItem.bind(this)
                                }
                                return (
                                    <SwipterItem key={index} {...itemProps}></SwipterItem>
                                )
                            })
                        }
                    </Swiper>
                }
                {/*{
                    len > 0
                    &&
                    <SwiperDemo {...swiperProps}>
                        {
                            top_stories.map((item, index) => {
                                const itemProps = {
                                    item,
                                    onClickItem: this.onClickItem.bind(this)
                                }
                                return (
                                    <SwipterItem key={index} {...itemProps}></SwipterItem>
                                )
                            })
                        }
                    </SwiperDemo>
                }*/}
            </div>
        )
    }
}
export default ZhiHuTop