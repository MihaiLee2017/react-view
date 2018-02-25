import React, { Component } from 'react'
import './styles.scss'
export default class NormalHeader extends Component {
    // constructor(props) {
    //     super(props)
    // }
    // onClickHandle(key) {
    //     this.props.onClickFn && this.props.onClickFn(key)
    // }
    onLeftClick() {
        this.props.onLeftClick && this.props.onLeftClick()
    }
    onRightClick() {
        this.props.onRightClick && this.props.onRightClick()
    }
    render() {
        const { title = '', iconLeft = "", iconRight = "" } = this.props
        return (
            <div className="normalHeader">
                <span className={iconLeft} onClick={this.onLeftClick.bind(this)}></span>
                <p>{title}</p>
                {this.props.children}
                <span className={iconRight} onClick={this.onRightClick.bind(this)}></span>
            </div >
        );
    }
}