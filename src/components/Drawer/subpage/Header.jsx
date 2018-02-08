import React, { Component } from 'react'
import './header.scss'
class DrawerHeader extends Component {
    render() {
        return (
            <div className="DrawerHeader">
                <dl>
                    <dt>作者：</dt>
                    <dd>MihaiLee</dd>
                </dl>
                <dl>
                    <dt>简介：</dt>
                    <dd>前端工程师</dd>
                </dl>
            </div>
        )
    }
}

export default DrawerHeader
