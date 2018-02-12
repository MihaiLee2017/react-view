import React from 'react'
import CommentTitle from '../../../components/CommentTitle'
import CommentItem from '../../../components/CommentItem'
import { COMMENT_TYPE } from '../../../constants/zhihu'
import './styles.scss'
class ZhiHuComment extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isShow: this.props.toggle || false
        }
    }
    toggleComment() {
        const { toggle } = this.props
        const { cState } = this.state
        if (toggle) {
            this.setState((prevState) => ({
                isShow: !prevState.isShow
            }))
            // this.scrollToTop()
        }
    }
    scrollToTop() {
        const $dom = document.querySelector('.App_Router_Main')
        const target = document.querySelector('.zhihu_toggle').offsetTop
        const order = document.querySelector('.normalHeader').clientHeight
        const top = target - order
        // let cScroll = $dom.scrollTop
        setTimeout(() => {
            $dom.scrollTo(0, top)
        }, 20);
    }
    render() {
        const { comments = [], type = "", toggle = false } = this.props
        const { isShow } = this.state
        const len = comments.length
        const title = COMMENT_TYPE[type]
        const titleProps = {
            title: `${len} ${title}`,
            toggleComment: this.toggleComment.bind(this)
        }
        return (
            <div className={toggle ? "zhihu_toggle zhiHu_comment" : "zhiHu_comment"}>
                <CommentTitle {...titleProps}></CommentTitle>
                <div className={isShow ? 'comment_hidden' : ''}>
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
            </div>
        )
    }
}
export default ZhiHuComment