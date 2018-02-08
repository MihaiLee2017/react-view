import React, { Component } from 'react'
import './styles.scss'
export default class FooterBar extends Component {
    // constructor(props) {
    //     super(props)
    // }
    onClickHandle(key) {
        this.props.onClickFn && this.props.onClickFn(key)
    }
    render() {
        const { list = [], selectKey = '' } = this.props
        return (
            <div className="footerBar">
                {
                    list.length > 0
                    &&
                    list.map((item, index) => {
                        const isSelect = selectKey === item.key
                        const url = isSelect ? item.selectedIcon.url : item.icon.url
                        const cssName = isSelect ? 'select' : ''
                        return (
                            <div className={`item ${cssName}`} key={index} onClick={this.onClickHandle.bind(this, item.key)}>
                                <img src={url} alt={item.title} />
                                <h4>{item.title}</h4>
                            </div>
                        )
                    })
                }
            </div>
        );
    }
}