import React from 'react'
import './styles.scss'
class ScrollItem extends React.Component {
    onClickItem(item) {
        this.props.onClickItem && this.props.onClickItem(item)
    }
    render() {
        const { item } = this.props
        return (
            <div className="scroll_item" onClick={this.onClickItem.bind(this, item)}>
                <div className="main">
                    <p>{item.title}</p>
                </div>
                {
                    item.images.length > 0
                    &&
                    <div className="logo">
                        <img src={item.images[0]} alt={item.title} />
                    </div>
                }
            </div>
        )
    }
}
export default ScrollItem