import React from 'react'
import { withRouter } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as doubanActions from '../../actions/douban'
import { getDouBanSearch, getDouBanTop } from '../../fetch/douban'
import InputHeader from '../../components/InputHeader'
import Scroller from '../../components/Scroller'
import Records from './subpage/records'
import SearchList from './subpage/search'
import './styles.scss'
class DoubanSearch extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            hasValue: false,
            value: '',
        }
    }
    componentWillMount() {
        const { history = {}, doubanActions } = this.props
        if (history.action !== "POP") {
            doubanActions.searchList({
                scrollDistance: 0
            })
        }
        this._setInitRecords()
    }
    componentDidMount() {
        let { value = '' } = this.props.match.params
        value = decodeURIComponent(value)
        this._setState(value)
        setTimeout(() => {
            const { doubanActions, doubanSearchList, doubanTopList } = this.props
            if (doubanTopList.list.length === 0) {
                this._getDouBanTop()
            }
            if (value === doubanSearchList.value) {
                return false
            }
            this._searchCookie()
            this._getDouBanSearch()
        }, 20)
    }
    _setState(value) {
        this.setState({
            hasValue: value.length > 0,
            value,
        })
    }
    _setInitRecords() {
        const recordStr = sessionStorage.getItem("records")
        if (!!recordStr) {
            const records = recordStr.split(',')
            const { doubanActions } = this.props
            doubanActions.searchCookie({
                records
            })
        }

    }
    clertCookie(index) {
        const { doubanActions, doubanRecords } = this.props
        let { records } = doubanRecords
        if (!!index) {
            records.splice((index - 1), 1)
        } else {
            records = []
        }
        doubanActions.searchCookie({
            records
        })
        sessionStorage.setItem("records", records)
    }
    _searchCookie() {
        const { value } = this.state
        const { doubanActions, doubanRecords } = this.props
        let { records } = doubanRecords
        if (records.indexOf(value) < 0 && value.length > 0) {
            records.push(value)
            if (records.length > 5) {
                records.shift()
            }
            doubanActions.searchCookie({
                records
            })
            sessionStorage.setItem("records", records)
        }
    }
    _getDouBanTop() {
        const { doubanActions } = this.props
        getDouBanTop().then(res => {
            return res.json()
        }).then(res => {
            console.log(res)
            const { subjects = [], count, total } = res
            doubanActions.search250({
                list: subjects,
                // scrollDistance: 0,
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
    _getDouBanSearch() {
        const { value } = this.state
        const { doubanActions, doubanSearchList } = this.props
        const { count } = doubanSearchList.page
        getDouBanSearch(value, 0, count).then(res => {
            return res.json()
        }).then(res => {
            const { subjects = [], count, total } = res
            doubanActions.searchList({
                value,
                list: subjects,
                // scrollDistance: 0,
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
    onSearchHandle(value) {
        let paramValu = this.props.match.params.value
        paramValu = decodeURIComponent(paramValu)
        if (value.length > 0 && value !== paramValu) {
            this.props.history.replace(`/doubanSearch/${encodeURIComponent(value)}`)
        } else {
            this._setState(value)
        }
    }
    getComingPullUpMore() {
        const { doubanActions, doubanSearchList } = this.props
        const { start, count } = doubanSearchList.page
        getDouBanSearch(start, count).then(res => {
            return res.json()
        }).then(res => {
            const { subjects = [], total } = res
            let { list, page } = doubanSearchList
            list = [...list, ...subjects]
            const newPage = {
                start: list.length,
                hasMore: total > list.length ? true : false
                // hasMore: false,
            }
            doubanActions.searchList({
                list,
                page: { ...page, ...newPage }
            })
        })
    }
    // 记录页面滑动高度
    setScrollDistance(distance) {
        const { doubanActions } = this.props
        doubanActions.searchList({
            scrollDistance: distance
        })
    }
    onCancelHandle() {
        this.props.history.goBack()
    }
    render() {
        const { hasValue, value } = this.state
        const { doubanRecords, doubanSearchList, doubanTopList, history } = this.props
        const headerProps = {
            onSearchHandle: this.onSearchHandle.bind(this),
            onCancelHandle: this.onCancelHandle.bind(this),
            inputValue: value,
        }
        const rScrollProps = {

        }
        const recordProps = {
            title: '搜索记录',
            list: doubanRecords.records,
            onClickHandle: this.onSearchHandle.bind(this),
            onCleanHandle: this.clertCookie.bind(this),
        }
        const topProps = {
            title: 'top 250',
            list: doubanTopList.list || [],
            history,
        }
        const sScrollProps = {
            pullUpLoad: true,
            hasMore: doubanSearchList.page.hasMore,
            getPullUpMore: this.getComingPullUpMore.bind(this),
            scrollDistance: doubanSearchList.scrollDistance,
            setScrollDistance: this.setScrollDistance.bind(this),
            scrollLists: doubanSearchList.list,
            restDistance: true,
        }
        const searchProps = {
            title: '搜索结果',
            list: doubanSearchList.list || [],
            history,
        }
        return (
            <div className="App_Router_Content">
                <InputHeader {...headerProps}></InputHeader>
                <div className="App_Router_Main" ref="scrollBody">
                    <div className={!hasValue ? 'current_Content searchContent' : 'searchContent'}>
                        <Scroller key={"record"} {...rScrollProps}>
                            <Records {...recordProps}></Records>
                            <SearchList key="topProps" {...topProps}></SearchList>
                        </Scroller>
                    </div>
                    <div className={hasValue ? 'current_Content searchContent' : 'searchContent'}>
                        <Scroller key={"search"} {...sScrollProps}>
                            <SearchList key="searchProps" {...searchProps}></SearchList>
                        </Scroller>
                    </div>
                </div>
            </div>
        )
    }
}
function mapStateToProps(state) {
    return {
        doubanRecords: state.douban.searchCookieStates,
        doubanSearchList: state.douban.searchListStates,
        doubanTopList: state.douban.topListStates,
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
)(DoubanSearch))