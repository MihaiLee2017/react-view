import React from 'react'
import { withRouter } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as zhihuActions from '../../actions/zhihu'
import { getLongCommont, getShortCommont } from '../../fetch/zhihu'
import NormalHeader from '../../components/NormalHeader'
import ZhiHuComment from './subpage/zhiHuComment'
import Scroller from '../../components/Scroller'
class zhihuComment extends React.Component {
    componentDidMount() {
        this.getComments()
    }
    getComments() {
        const id = this.props.match.params.id
        const { zhihuActions } = this.props
        getLongCommont(id).then(res => {
            return res.json()
        }).then(res => {
            const { comments } = res.COMMENTS
            zhihuActions.setComment({
                longComment: comments
            })
        })
        getShortCommont(id).then(res => {
            return res.json()
        }).then(res => {
            const { comments } = res.COMMENTS
            zhihuActions.setComment({
                shortComment: comments
            })
        })
    }
    goBack() {
        this.props.history.goBack()
    }
    render() {
        const { history, zhiHuCommentState } = this.props
        const headerProps = {
            title: "精彩评论",
            iconLeft: 'icon-arrow-left2',
            onLeftClick: this.goBack.bind(this),
        }
        const longProps = {
            comments: zhiHuCommentState.longComment,
            type: 'long',
        }
        const shortProps = {
            comments: zhiHuCommentState.shortComment,
            type: 'short',
            toggle: true,
        }
        return (
            <div className="App_Router_Content">
                <NormalHeader {...headerProps}></NormalHeader>
                <div className="App_Router_Main">
                    <Scroller>
                        <ZhiHuComment {...longProps}></ZhiHuComment>
                        <ZhiHuComment {...shortProps}></ZhiHuComment>
                    </Scroller>
                </div>
            </div>
        )
    }
}
function mapStateToProps(state) {
    return {
        // zhiHuDetailState: state.zhihu.detailStates,
        zhiHuCommentState: state.zhihu.commentStates
    }
}
function mapDispatchToProps(dispatch) {
    return {
        zhihuActions: bindActionCreators(zhihuActions, dispatch)
    }
}
export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(zhihuComment))