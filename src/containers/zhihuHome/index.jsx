import React from 'react'
// import ReactDOM from 'react-dom';
import { withRouter } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as zhihuActions from '../../actions/zhihu'
import { getZhiHuLastDaily } from '../../fetch/zhihu'
import NormalHeader from '../../components/NormalHeader'
import ZhiHuTop from './subpage/top'
import ZhiHuMain from './subpage/main'
import './styles.scss'

class ZhiHuHome extends React.Component {
    // constructor(props) {
    //     super(props)
    // }
    // 初始化数据
    componentDidMount() {
        const { zhihomeState } = this.props
        if (zhihomeState.top_stories && zhihomeState.top_stories.length > 0) {
            this.goScrollDistance()
            return false
        }
        this.getZhihuHomeData()
    }
    // 记录页面滑动高度
    setScrollDistance() {
        const $dom = this.refs.scrollBody
        const { zhihuActions } = this.props
        zhihuActions.setHomeData({
            scrollDistance: $dom.scrollTop
        })
    }
    // 返回到页面滑动高度
    goScrollDistance() {
        // const $dom = document.querySelector('.App_Router_Main')
        // $dom.scrollTo(0, 400)
        const $dom = this.refs.scrollBody
        const { zhihomeState } = this.props
        $dom.scrollTo(0, zhihomeState.scrollDistance)
    }
    // 获取知乎日报=>redux
    getZhihuHomeData() {
        const { zhihuActions } = this.props
        getZhiHuLastDaily().then(res => {
            return res.json()
        }).then(res => {
            // console.log(res)
            const { stories, top_stories } = res.STORIES
            zhihuActions.setHomeData({
                stories,
                top_stories,
                scrollDistance: 0,
            })
        })
    }
    // 切换 Themes drawer
    toggleThemes() {
        const { zhiHuThemeState, zhihuActions } = this.props
        zhihuActions.toggleThemes({
            isShowThemes: !zhiHuThemeState.isShowThemes
        })
    }
    render() {
        const { zhihomeState, history } = this.props
        const headerProps = {
            title: "首页",
            iconLeft: 'icon-home',
            onLeftClick: this.toggleThemes.bind(this),
        }
        const zhiHuTopProps = {
            top_stories: zhihomeState.top_stories,
            history: history
        }
        const zhiHuMainProps = {
            stories: zhihomeState.stories,
            history: history,
            setScrollDistance: this.setScrollDistance.bind(this)
        }
        return (
            <div className="App_Router_Content">
                <NormalHeader {...headerProps}></NormalHeader>
                <div className="App_Router_Main" ref="scrollBody">
                    {/*<SwiperDemo></SwiperDemo>*/}
                    <ZhiHuTop {...zhiHuTopProps}></ZhiHuTop>
                    <ZhiHuMain {...zhiHuMainProps}></ZhiHuMain>
                </div>
            </div>
        )
    }
}
function mapStateToProps(state) {
    return {
        zhiHuThemeState: state.zhihu.themeStates,
        zhihomeState: state.zhihu.homeStates
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
)(ZhiHuHome))