import React from 'react'
import './styles.scss'
class CommentTitle extends React.Component {
    render() {
        const { title = "", toggleComment = () => { } } = this.props
        return (
            <div className="comment_title" onClick={toggleComment.bind(this)}>
                {title}
            </div>
        )
    }
}
export default CommentTitle