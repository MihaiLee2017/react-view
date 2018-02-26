import React from 'react'
import './styles.scss'
class FilmItem extends React.Component {
    onClickItem(item) {
        this.props.onClickItem && this.props.onClickItem(item)
    }
    render() {
        const { item } = this.props
        const { images = {} } = item
        return (
            <div className="Film_item" onClick={this.onClickItem.bind(this, item)}>
                <div className="poster">
                    <img src={images.small} alt='' />
                </div>
                <div className="message">
                    <h4>{item.name}</h4>
                    <p>{item.role}</p>
                </div>
            </div>
        )
    }
}
export default FilmItem