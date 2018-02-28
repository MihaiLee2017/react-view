import React from 'react'
import './styles.scss'
class Records extends React.Component {
    onClickHandle(value) {
        this.props.onClickHandle && this.props.onClickHandle(value)
    }
    render() {
        const { title = "", list = [] } = this.props
        const len = list.length;
        return (
            <div className="doubanRecords doubanSearchList">
                <h3>
                    {title}
                </h3>
                {
                    len <= 0 ?
                        <p className="recordItem">暂无搜索记录</p>
                        :
                        list.map((item, index) => {
                            return (
                                <p className="recordItem" key={index} onClick={this.onClickHandle.bind(this, item)}>{item}</p>
                            )
                        })
                }
            </div>
        )
    }
}
export default Records