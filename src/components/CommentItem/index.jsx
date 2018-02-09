import React from 'react'
import './styles.scss'
class CommentItem extends React.Component {
    render() {
        const { item = {} } = this.props
        return (
            <div className="comment_item">
                <div className="logo">
                    <img src={item.avatar} alt={item.author} />
                </div>
                <div className="main">
                    <h3>{item.author}</h3>
                    <div>{item.content}</div>
                </div>
            </div>
        )
    }
}
export default CommentItem