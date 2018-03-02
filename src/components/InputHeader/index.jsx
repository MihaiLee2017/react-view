import React from 'react'
import './styles.scss'
let inputTimeout
class InputHeader extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            value: this.props.inputValue || '',
            // isInput: null,
        }
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            value: nextProps.inputValue
        })
    }
    onCancelHandle() {
        this.props.onCancelHandle && this.props.onCancelHandle()
    }
    onSearchHandle() {
        const { value } = this.state
        this.props.onSearchHandle && this.props.onSearchHandle(value)
    }
    onChangeHandle(e) {
        const value = e.target.value
        this.setState({
            value
        })
        if (value.length === 0) {
            this.props.onSearchHandle && this.props.onSearchHandle("")
        }
        // clearTimeout(inputTimeout)
        // inputTimeout = setTimeout(() => {
        //     this.onSearchHandle()
        // }, 500)
    }
    onClearValue() {
        this.setState({
            value: ''
        })
        this.props.onSearchHandle && this.props.onSearchHandle("")
    }
    render() {
        const { value } = this.state
        const style = value.length > 0 ? { display: 'block' } : { display: 'none' }
        return (
            <div className="inputHeader">
                <div className="inputMain">
                    <span className="icon-search"></span>
                    <input type='text' value={value} onChange={this.onChangeHandle.bind(this)} />
                    <span style={style} onClick={this.onClearValue.bind(this)} className="icon-cancel-circle iconRight"></span>
                </div>
                {/*<span className="inputBtn" onClick={this.onCancelHandle.bind(this)}>取消</span>*/}
                {
                    value.length > 0 ?
                        <span className="inputBtn" onClick={this.onSearchHandle.bind(this)}>搜索</span>
                        :
                        <span className="inputBtn" onClick={this.onCancelHandle.bind(this)}>取消</span>
                }
            </div>
        )
    }
}
export default InputHeader