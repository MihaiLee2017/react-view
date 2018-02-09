import React from 'react'
import './styles.scss'
class SwipterItem extends React.Component {
    onClickItem(item) {
        this.props.onClickItem && this.props.onClickItem(item)
    }
    render() {
        const { item, showTitle = true } = this.props
        return (
            <div className="swiper_item" onClick={this.onClickItem.bind(this, item)}>
                <div className="logo" style={{ backgroundImage: `url(${item.image})` }}>
                    {/*<img src={item.image} alt={item.title} />*/}
                </div>

                <div className="main">
                    {
                        showTitle
                        &&
                        <p>{item.title}</p>
                    }
                </div>
            </div>
        )
    }
}
export default SwipterItem