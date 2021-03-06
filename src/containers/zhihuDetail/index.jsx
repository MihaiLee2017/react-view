import React from 'react'
import { withRouter } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as zhihuActions from '../../actions/zhihu'
import { getZhiHuDetail } from '../../fetch/zhihu'
import NormalHeader from '../../components/NormalHeader'
import DetailTop from './subpage/detailTop'
import DetailMain from './subpage/detailMain'
import Scroller from '../../components/Scroller'
class ZhihuDetail extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            cssUrl: 'http://news-at.zhihu.com/css/news_qa.auto.css?v=4b3e3',
            cssId: 'zhihu_css'
        }
    }
    componentWillMount() {
        this.createZhiHuCss()
        const { history = {}, zhihuActions } = this.props
        if (history.action !== "POP") {
            zhihuActions.setDetail({
                scrollDistance: 0
            })
        }
    }
    componentDidMount() {
        setTimeout(() => {
            const { zhiHuDetailState } = this.props
            const { id } = this.props.match.params
            if (Number.parseInt(zhiHuDetailState.id) === Number.parseInt(id)) {
                // this.goScrollDistance()
                return false
            }
            this.getZhiHuDetails()
        }, 20);
    }
    componentWillUnmount() {
        this.removeZhiHuCss()
    }
    // 添加知乎外部CSS
    createZhiHuCss() {
        let $head = document.getElementsByTagName('head')[0],
            $meta = document.getElementsByTagName('meta')[0],
            cssURL = this.state.cssUrl,
            linkTag = document.createElement('link');
        linkTag.id = this.state.cssId;
        linkTag.href = cssURL;
        linkTag.setAttribute('rel', 'stylesheet');
        linkTag.setAttribute('media', 'all');
        linkTag.setAttribute('type', 'text/css');
        $head.insertBefore(linkTag, $meta);
    }
    // 移除知乎外部CSS
    removeZhiHuCss() {
        let $head = document.getElementsByTagName('head')[0],
            $link = document.querySelector(`#${this.state.cssId}`)
        $head.removeChild($link);
    }
    // 记录页面滑动高度
    setScrollDistance(distance) {
        // const $dom = this.refs.scrollBody
        const { zhihuActions } = this.props
        zhihuActions.setDetail({
            scrollDistance: distance
        })
    }
    // 返回到页面滑动高度
    // goScrollDistance() {
    //     const $dom = this.refs.scrollBody
    //     const { zhiHuDetailState } = this.props
    //     $dom.scrollTo(0, zhiHuDetailState.scrollDistance)
    // }
    // 获取数据
    getZhiHuDetails() {
        const id = this.props.match.params.id
        const { zhihuActions, zhiHuDetailState } = this.props
        getZhiHuDetail(id).then(res => {
            return res.json()
        }).then(res => {
            // console.log(res)
            const { body, image, title, } = res.CONTENTS
            zhihuActions.setDetail({
                id,
                body,
                top: {
                    image,
                    title,
                },
                scrollDistance: 0,
            })
        })
    }
    goBack() {
        this.props.history.goBack()
    }
    goComment() {
        // this.setScrollDistance()
        const id = this.props.match.params.id
        this.props.history.push(`/zhihuComment/${id}`)
    }
    render() {
        const { history, zhiHuDetailState } = this.props
        const headerProps = {
            title: "",
            iconLeft: 'icon-arrow-left2',
            onLeftClick: this.goBack.bind(this),
            iconRight: 'icon-indent-increase',
            onRightClick: this.goComment.bind(this),
        }
        const scrollerPrpos = {
            scrollDistance: zhiHuDetailState.scrollDistance,
            setScrollDistance: this.setScrollDistance.bind(this)
        }
        const topProps = {
            top: zhiHuDetailState.top,
            history: history
        }
        const mainProps = {
            body: zhiHuDetailState.body
        }
        return (
            <div className="App_Router_Content">
                <NormalHeader {...headerProps}></NormalHeader>
                <div className="App_Router_Main" ref="scrollBody">
                    <Scroller {...scrollerPrpos}>
                        <DetailTop {...topProps}></DetailTop>
                        <DetailMain {...mainProps}></DetailMain>
                    </Scroller>
                </div>
            </div>
        )
    }
}
function mapStateToProps(state) {
    return {
        zhiHuDetailState: state.zhihu.detailStates,
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
)(ZhihuDetail))