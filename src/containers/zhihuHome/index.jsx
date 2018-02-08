import React from 'react'
// import ReactDOM from 'react-dom';
import { withRouter } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
class ZhiHuHome extends React.Component {
    // constructor(props) {
    //     super(props)
    // }
    render() {
        return (
            <div>
                {/*<NormalHeader></NormalHeader>*/}
                zhihu home
            </div>
        )
    }
}
function mapStateToProps(state) {
    return {
        zhiHuThemeState: state.zhihu.themeStates
    }
}
function mapDispatchToProps(dispatch) {
    return {
        // zhihuActions: bindActionCreators(zhihuActions, dispatch)
    }
}
export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(ZhiHuHome))