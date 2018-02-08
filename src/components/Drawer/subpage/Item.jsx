import React, { Component } from 'react'
import './item.scss'
class DrawerItem extends Component {
    selectItem(item) {
        this.props.selectItem && this.props.selectItem(item)
    }
    render() {
        const { item, current } = this.props
        const cssName = item.id === current.id ? 'DrawerItem select' : 'DrawerItem'
        return (
            <div className={cssName} onClick={this.selectItem.bind(this, item)}>
                <div className="logo">
                    <img src={item.thumbnail} alt={item.name} />
                </div>
                <div className="main">
                    <p>{item.name}</p>
                </div>
            </div>
        )
    }
}

export default DrawerItem
