import React from 'react'
import { withRouter } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as zhihuActions from '../../actions/zhihu'
import { getDailyThemesItem } from '../../fetch/zhihu'
import NormalHeader from '../../components/NormalHeader'
import ThemeTop from './subpage/themeTop'
import ThemeMain from './subpage/themeMain'
class ZhiHuTheme extends React.Component {
    // constructor(props) {
    //     super(props)
    // }
    componentDidMount() {
        // console.log("this.props.match.params.id:", this.props.match.params.id)
        // this.getZhiHuThemeData()
        const { zhiHuThemeItem } = this.props
        const { id } = this.props.match.params
        if (Number.parseInt(zhiHuThemeItem.id) === Number.parseInt(id)) {
            this.goScrollDistance()
            return false
        }
        this.getZhiHuThemeData()
    }
    // 记录页面滑动高度
    setScrollDistance() {
        const $dom = this.refs.scrollBody
        const { zhihuActions } = this.props
        zhihuActions.setThemeItem({
            scrollDistance: $dom.scrollTop
        })
    }
    // 返回到页面滑动高度
    goScrollDistance() {
        // const $dom = document.querySelector('.App_Router_Main')
        // $dom.scrollTo(0, 400)
        const $dom = this.refs.scrollBody
        const { zhiHuThemeItem } = this.props
        $dom.scrollTo(0, zhiHuThemeItem.scrollDistance)
    }

    // 获取Theme具体内容
    getZhiHuThemeData() {
        const id = this.props.match.params.id
        const { zhiHuThemeItem, zhihuActions } = this.props
        // console.log(Number.parseInt(zhiHuThemeItem.id) === Number.parseInt(id))
        if (Number.parseInt(zhiHuThemeItem.id) === Number.parseInt(id)) {
            return false
        }
        getDailyThemesItem(id).then(res => {
            return res.json()
        }).then(res => {
            const { image, name, stories } = res.THEMEDES
            // console.log(res)
            zhihuActions.setThemeItem({
                id,
                top: {
                    image,
                    title: name,
                },
                stories,
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
        const { zhiHuThemeItem, history } = this.props
        const headerProps = {
            title: zhiHuThemeItem.top.title,
            iconLeft: 'icon-home',
            onLeftClick: this.toggleThemes.bind(this),
        }
        const topProps = {
            top: zhiHuThemeItem.top,
            history: history
        }
        const mainProps = {
            stories: zhiHuThemeItem.stories,
            history: history,
            setScrollDistance: this.setScrollDistance.bind(this)
        }
        return (
            <div className="App_Router_Content">
                <NormalHeader {...headerProps}></NormalHeader>
                <div className="App_Router_Main" ref="scrollBody">
                    <ThemeTop {...topProps}></ThemeTop>
                    <ThemeMain {...mainProps}></ThemeMain>
                    {/*<ZhiHuTop {...zhiHuTopProps}></ZhiHuTop>
                        <ZhiHuMain {...zhiHuMainProps}></ZhiHuMain>*/}
                </div>
            </div>
        )
    }
}
function mapStateToProps(state) {
    return {
        zhiHuThemeState: state.zhihu.themeStates,   //  日报分类列表
        zhiHuThemeItem: state.zhihu.itemStates, // 日报分类信息
        // zhihomeState: state.zhihu.homeStates
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
)(ZhiHuTheme))