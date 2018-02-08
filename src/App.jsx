import React, { Component } from 'react'
// import logo from './logo.svg';
import './App.scss';
import { withRouter } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import * as zhihuActions from './actions/zhihu'
import { getDailyThemes } from './fetch/zhihu'

// 知乎首页 themes
import { ZHIHU_THEME_HOME } from './constants/zhihu'
// footer bar 配置
import FooterBar from './components/FooterBar'
import { TAB_ITEM_List, TAB_KEY_EMU } from './constants/footerBar'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectKey: TAB_KEY_EMU[0]
    }
  }
  componentDidMount() {
    this.setSelectKey()
    this.setZhihuThemes()
  }
  // 获取知乎日报分类
  setZhihuThemes() {
    const { zhiHuThemeState, zhihuActions } = this.props
    if (zhiHuThemeState.themes && zhiHuThemeState.themes.length > 0) {
      return false
    }
    getDailyThemes().then(res => {
      return res.json()
    }).then(res => {
      // console.log('themes:', res)
      const { others } = res.THEMES
      const themes = [ZHIHU_THEME_HOME, ...others]
      const currentThemes = ZHIHU_THEME_HOME
      zhihuActions.setThemes({
        themes,
        currentThemes,
      })
    })
  }
  // 设置footerbar 选中
  setSelectKey() {
    const hashName = window.location.hash
    const pathName = window.location.pathname
    const len = TAB_KEY_EMU.length
    for (let i = 0; i < len; i++) {
      if (hashName.lastIndexOf(TAB_KEY_EMU[i]) > 0 || pathName.lastIndexOf(TAB_KEY_EMU[i]) > 0) {
        this.setState({
          selectKey: TAB_KEY_EMU[i]
        })
        break;
      }
    }
    // TAB_KEY_EMU
  }
  // 切换footerbar
  toggleFootBar(key) {
    const { selectKey } = this.state
    if (selectKey === key) {
      return false;
    }
    this.setState({
      selectKey: key,
    })
    this.props.history.replace(`/${key}`)
  }
  render() {
    const footerProps = {
      list: TAB_ITEM_List,
      selectKey: this.state.selectKey,
      onClickFn: this.toggleFootBar.bind(this)
    }
    return (
      <div className="App">
        <div className="App_Router">
          {this.props.children}
        </div>
        <FooterBar {...footerProps}></FooterBar>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    zhiHuThemeState: state.zhihu.themeStates
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
)(App));
