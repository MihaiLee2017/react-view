import React from 'react'
import { Router, Route, HashRouter } from 'react-router-dom'
import App from '../App'
import SubRouter from './SubRouter'
import createBrowserHistory from 'history/createBrowserHistory'

// const { BrowserRouter } = Router
const customHistory = createBrowserHistory()

export default class AppRouter extends React.Component {
    // constructor(props) {
    //     super(props)
    // }
    render() {
        return (
            // <Router history={customHistory}>
            <HashRouter>
                <App>
                    {/*<SubRouter></SubRouter>*/}
                    <Route path='/' component={SubRouter}></Route>
                </App>
            </HashRouter>
            // </Router>
        )
    }
}
