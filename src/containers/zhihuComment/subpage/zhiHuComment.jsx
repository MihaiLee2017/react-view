import React from 'react'
import CommentTitle from '../../../components/CommentTitle'
import CommentItem from '../../../components/CommentItem'
import { COMMENT_TYPE } from '../../../constants/zhihu'
import './styles.scss'
class ZhiHuComment extends React.Component {
    render() {
        const { comments = [], type = "" } = this.props
        const len = comments.length
        const title = COMMENT_TYPE[type]
        const titleProps = {
            title: `${len} ${title}`
        }
        return (
            <div>
                <CommentTitle {...titleProps}></CommentTitle>
                {
                    len > 0 ?
                        comments.map((item, index) => {
                            return (
                                <CommentItem key={index} item={item}></CommentItem>
                            )
                        }) :
                        <div className="noComment">
                            {`${title}虚位以待`}
                        </div>
                }
            </div>
        )
    }
}
export default ZhiHuComment