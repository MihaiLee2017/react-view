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

import Scroller from '../../components/Scroller'

class ZhiHuHome extends React.Component {
    // constructor(props) {
    //     super(props)
    // }
    componentWillMount() {
        const { history = {}, zhihuActions } = this.props
        // console.log(history.action)
        if (history.action !== "POP") {
            zhihuActions.setHomeData({
                scrollDistance: 0
            })
        }
    }
    // 初始化数据
    componentDidMount() {
        setTimeout(() => {
            const { zhihomeState } = this.props
            if (zhihomeState.top_stories && zhihomeState.top_stories.length > 0) {
                // this.goScrollDistance()
                return false
            }
            this.getZhihuHomeData()
        }, 20);
    }
    // 记录页面滑动高度
    setScrollDistance(distance) {
        const { zhihuActions } = this.props
        zhihuActions.setHomeData({
            scrollDistance: distance,
        })
    }
    // 获取知乎日报=>redux
    getZhihuHomeData() {
        const { zhihuActions } = this.props
        getZhiHuLastDaily().then(res => {
            return res.json()
        }).then(res => {
            // console.log(res)
            setTimeout(() => {
                const { stories, top_stories, date } = res.STORIES
                zhihuActions.setHomeData({
                    stories,
                    top_stories,
                    requestDate: date,
                    scrollDistance: 0,
                })
            }, 1000)

        })
    }
    getPullUpMore() {
        const { zhihomeState, zhihuActions } = this.props
        // const { stories, top_stories } = zhihomeState
        getZhiHuLastDaily(zhihomeState.requestDate).then(res => {
            console.log(res)
            return res.json()
        }).then(res => {
            setTimeout(() => {
                let { stories, top_stories, date } = res.STORIES
                const hasMore = this._checkHasMore(date)
                stories = [...zhihomeState.stories, ...stories]
                zhihuActions.setHomeData({
                    stories,
                    // top_stories,
                    requestDate: date,
                    hasMore,
                })
            }, 1000);
        })
    }
    _checkHasMore(date) {
        const dd = `${date.slice(0, 4)}-${date.slice(4, 6)}-${date.slice(6, 8)}`
        const time = new Date(dd).getTime()
        const littleTime = new Date('2018-02-10').getTime()
        return time > littleTime
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
        const scrollerPrpos = {
            pullUpLoad: true,
            hasMore: zhihomeState.hasMore,
            getPullUpMore: this.getPullUpMore.bind(this),
            pullDownRefresh: true,
            getPullDownRefresh: this.getZhihuHomeData.bind(this),
            scrollLists: zhihomeState.stories,
            scrollDistance: zhihomeState.scrollDistance,
            setScrollDistance: this.setScrollDistance.bind(this)
        }
        const zhiHuTopProps = {
            top_stories: zhihomeState.top_stories,
            history: history
        }
        const zhiHuMainProps = {
            stories: zhihomeState.stories,
            history: history,
            // setScrollDistance: this.setScrollDistance.bind(this)
        }
        return (
            <div className="App_Router_Content">
                <NormalHeader {...headerProps}></NormalHeader>
                <div className="App_Router_Main" ref="scrollBody">
                    {/*<SwiperDemo></SwiperDemo>*/}
                    <Scroller {...scrollerPrpos}>
                        <ZhiHuTop {...zhiHuTopProps}></ZhiHuTop>
                        <ZhiHuMain {...zhiHuMainProps}></ZhiHuMain>
                    </Scroller>
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