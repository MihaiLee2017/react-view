import React from 'react'
import './styles.scss'
class Records extends React.Component {
    onClickHandle(value) {
        this.props.onClickHandle && this.props.onClickHandle(value)
    }
    onCleanHandle(index) {
        this.props.onCleanHandle && this.props.onCleanHandle(index)
    }
    render() {
        const { title = "", list = [] } = this.props
        const len = list.length;
        return (
            <div className="doubanRecords doubanSearchList">
                <h3>
                    <span>{title}</span>
                    {
                        len > 0 && <span className="icon-cancel-circle iconRight" onClick={this.onCleanHandle.bind(this, false)}></span>
                    }

                </h3>
                {
                    len <= 0 ?
                        <p className="recordItem">暂无搜索记录</p>
                        :
                        list.map((item, index) => {
                            return (
                                <p className="recordItem" key={index}>
                                    <span onClick={this.onClickHandle.bind(this, item)}>{item}</span>
                                    <span className="icon-cancel-circle" onClick={this.onCleanHandle.bind(this, index + 1)}></span>
                                </p>
                            )
                        })
                }
            </div>
        )
    }
}
export default Records