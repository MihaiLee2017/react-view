import React from 'react'
// import './styles.scss'
class Introduction extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isShow: false
        }
    }
    onToggleShow() {
        this.setState(prevState => ({
            isShow: !prevState.isShow
        }))
    }
    render() {
        const { summary } = this.props
        const { isShow } = this.state
        const cssName = isShow ? 'show_all' : ''
        return (
            <div className="douban_into">
                <h3>简介</h3>
                <p className={cssName}>
                    {summary}
                </p>
                <div className="toggle_btn">
                    <span onClick={this.onToggleShow.bind(this)}>
                        {
                            isShow ? "收起" : "展示全部"
                        }
                    </span>
                </div>
            </div>
        )
    }
}
export default Introduction