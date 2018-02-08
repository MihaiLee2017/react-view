import React, { Component } from 'react'
import './styles.scss'
export default class NormalHeader extends Component {
    // constructor(props) {
    //     super(props)
    // }
    // onClickHandle(key) {
    //     this.props.onClickFn && this.props.onClickFn(key)
    // }
    render() {
        const { title = '', iconLeft = "", iconRight = "" } = this.props
        return (
            <div className="normalHeader">
            </div>
        );
    }
}