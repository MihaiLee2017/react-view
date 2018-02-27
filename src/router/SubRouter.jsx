import React from 'react'
import { Route, Switch } from 'react-router-dom'

import ReactCSSTransitionGroup from "react-addons-css-transition-group";

import ZhiHuHome from '../containers/zhihuHome'
import ZhiHuTheme from '../containers/zhihuTheme'
import ZhihuDetail from '../containers/zhihuDetail'
import ZhihuComment from '../containers/zhihuComment'
import DouBanHome from '../containers/doubanHome'
import DoubanDetail from '../containers/doubanDetail'
import DoubanCelebrity from '../containers/doubanCelebrity'

export default class SubRouter extends React.Component {
    // constructor(props) {
    //     super(props)
    // }
    render() {
        console.log(this.props)
        const { location = {}, history = {}, } = this.props
        const key = location.pathname
        const { action } = history
        let transName = action === 'POP' ? "back" : action === "PUSH" ? "go" : "example"
        let transTime = action === 'POP' ? 300 : action === "PUSH" ? 300 : 200
        return (
            <ReactCSSTransitionGroup
                transitionName={transName}
                transitionEnterTimeout={transTime}
                transitionLeaveTimeout={transTime}>
                <div key={key} style={{ position: "absolute", width: "100%", top: '0', bottom: '0' }}>
                    <Switch location={location}>
                        <Route exact path='/' component={ZhiHuHome}></Route>
                        <Route path='/zhihu' component={ZhiHuHome}></Route>
                        <Route path='/zhihuTheme/:id' component={ZhiHuTheme}></Route>
                        <Route path='/zhihuDetail/:id' component={ZhihuDetail}></Route>
                        <Route path='/zhihuComment/:id' component={ZhihuComment}></Route>
                        <Route path='/douban' component={DouBanHome}></Route>
                        <Route path='/doubanDetail/:id' component={DoubanDetail}></Route>
                        <Route path='/doubanCelebrity/:id' component={DoubanCelebrity}></Route>
                    </Switch>
                </div >
            </ReactCSSTransitionGroup>
        )
    }
}