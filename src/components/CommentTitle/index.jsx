import React from 'react'
import './styles.scss'
class CommentTitle extends React.Component {
    render() {
        const { title = "" } = this.props
        return (
            <div className="comment_title">
                {title}
            </div>
        )
    }
}
export default CommentTitle