import React from 'react'
// import ReactDOM from 'react-dom';
import { withRouter } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as doubanActions from '../../actions/douban'
import { getDouBanInTheaters, getDouBanComingSoon } from '../../fetch/douban'
import { DOUBAN_TAB_KEY } from '../../constants/douban'
import SearchHeader from '../../components/SearchHeader'
import Scroller from '../../components/Scroller'
import Lists from './subpage/Lists'
import TabSelect from '../../components/TabSelect'
import './styles.scss'
class DouBanHome extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            tab_key: DOUBAN_TAB_KEY[0].key
        }
    }
    componentDidMount() {
        setTimeout(() => {
            this.getDoubanDate()
        }, 20)
    }
    // 记录页面滑动高度
    setScrollDistance(distance) {
        const { doubanActions } = this.props
        doubanActions.setInTheaters({
            scrollDistance: distance,
        })
    }
    getDoubanDate() {
        this._getInTheaters()
        this._getComingSoon()
    }
    _getInTheaters() {
        const { doubanActions } = this.props
        getDouBanInTheaters().then(res => {
            return res.json()
        }).then(res => {
            const { subjects } = res
            doubanActions.setInTheaters({
                list: subjects,
                scrollDistance: 0,
            })
        })
    }
    _getComingSoon() {
        const { doubanActions, douBanComing } = this.props
        const { count } = douBanComing.page
        getDouBanComingSoon(0, count).then(res => {
            return res.json()
        }).then(res => {
            const { subjects = [], count, total } = res
            doubanActions.setComing({
                list: subjects,
                scrollDistance: 0,
                page: {
                    start: subjects.length,
                    count,
                    total,
                    len: subjects.length,
                    hasMore: total > subjects.length ? true : false
                }
            })
        })
    }
    getComingPullUpMore() {
        const { doubanActions, douBanComing } = this.props
        const { start, count } = douBanComing.page
        getDouBanComingSoon(start, count).then(res => {
            return res.json()
        }).then(res => {
            const { subjects = [], total } = res
            let { list, page } = douBanComing
            list = [...list, ...subjects]
            const newPage = {
                start: list.length,
                hasMore: total > list.length ? true : false
                // hasMore: false,
            }
            doubanActions.setComing({
                list,
                page: { ...page, ...newPage }
            })
        })
    }
    onSelectTabFn(item) {
        this.setState({
            tab_key: item.key
        })
    }
    render() {
        const { douBanTheaters, douBanComing, history } = this.props
        const headerProps = {
            title: "豆瓣电影",
            keyWord: ['搜索', '电影']
        }
        // 正在上映模块
        const scrollerProps = {
            pullDownRefresh: true,
            getPullDownRefresh: this._getInTheaters.bind(this),
            scrollDistance: douBanTheaters.scrollDistance,
            setScrollDistance: this.setScrollDistance.bind(this),
            scrollLists: douBanTheaters.list,
        }
        const theatersProps = {
            list: douBanTheaters.list,
            history: history,
        }
        // 即将上映
        const comingScrollerProps = {
            pullUpLoad: true,
            hasMore: douBanComing.page.hasMore,
            getPullUpMore: this.getComingPullUpMore.bind(this),
            pullDownRefresh: true,
            getPullDownRefresh: this._getComingSoon.bind(this),
            scrollDistance: douBanComing.scrollDistance,
            setScrollDistance: this.setScrollDistance.bind(this),
            scrollLists: douBanComing.list,
        }
        const comingProps = {
            list: douBanComing.list,
            history: history,
        }
        const tabProps = {
            tab_key: this.state.tab_key,
            tabLists: DOUBAN_TAB_KEY,
            selectTabFn: this.onSelectTabFn.bind(this)
        }
        const { tab_key } = this.state
        return (
            <div className="App_Router_Content">
                <SearchHeader {...headerProps}></SearchHeader>
                <TabSelect {...tabProps}></TabSelect>
                <div className="App_Router_Main" ref="scrollBody">
                    {/*{
                        tab_key === DOUBAN_TAB_KEY[0].key ?
                            <Scroller key={DOUBAN_TAB_KEY[0].key} {...scrollerProps}>
                                <Lists {...theatersProps}></Lists>
                            </Scroller>
                            :
                            <Scroller key={DOUBAN_TAB_KEY[1].key} {...comingScrollerProps}>
                                <Lists {...comingProps}></Lists>
                            </Scroller>
                    }*/}
                    <div className={tab_key === DOUBAN_TAB_KEY[0].key ? 'current_tab tabItem' : 'tabItem'}>
                        <Scroller key={DOUBAN_TAB_KEY[0].key} {...scrollerProps}>
                            <Lists {...theatersProps}></Lists>
                        </Scroller>
                    </div>
                    <div className={tab_key === DOUBAN_TAB_KEY[1].key ? 'current_tab tabItem' : 'tabItem'}>
                        <Scroller key={DOUBAN_TAB_KEY[1].key} {...comingScrollerProps}>
                            <Lists {...comingProps}></Lists>
                        </Scroller>
                    </div>
                </div>
                {/*
                 <Scroller {...scrollerProps}>
                                <Lists {...theatersProps}></Lists>
                            </Scroller>    
                <Scroller {...comingScrollerProps}>
                        <Lists {...comingProps}></Lists>
                    </Scroller>
                */}
            </div >
        )
    }
}
function mapStateToProps(state) {
    return {
        douBanTheaters: state.douban.theatersStates,
        douBanComing: state.douban.comingStates,
        // zhihomeState: state.zhihu.homeStates
    }
}
function mapDispatchToProps(dispatch) {
    return {
        doubanActions: bindActionCreators(doubanActions, dispatch)
    }
}
export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(DouBanHome))