import React from 'react'
import './styles.scss'
class WorksItem extends React.Component {
    onClickItem(item) {
        this.props.onClickItem && this.props.onClickItem(item)
    }
    render() {
        const { item } = this.props
        const { images = {} } = item
        return (
            <div className="Works_item" onClick={this.onClickItem.bind(this, item)}>
                <div className="poster">
                    <img src={images.small} alt='' />
                </div>
                <div className="message">
                    <h4>{item.title}</h4>
                    <p><span>评分 : </span><span>{item.rating}</span></p>
                </div>
            </div>
        )
    }
}
export default WorksItem