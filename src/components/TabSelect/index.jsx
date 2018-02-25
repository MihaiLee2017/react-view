import React from 'react'
import './styles.scss'
class TabSelect extends React.Component {
    clickHandle(item) {
        this.props.selectTabFn && this.props.selectTabFn(item)
    }
    render() {
        const { tabLists = [], tab_key = "" } = this.props
        return (
            <div className="tab_select">
                {
                    tabLists.map((item, index) => {
                        const cssName = item.key === tab_key ? "tab_select" : ""
                        return (
                            <span className={cssName} key={index} onClick={this.clickHandle.bind(this, item)}>
                                {item.name}
                            </span>
                        )
                    })
                }
            </div>
        )
    }
}
export default TabSelect