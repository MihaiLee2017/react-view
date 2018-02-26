import React from 'react'
import './styles.scss'
import BScroll from 'better-scroll'
import { addClass } from '../../static/js/dom'
class HScroller extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            probeType: this.props.probeType || 1,   // 返回滚动高度的时机
            click: this.props.canClick || true, // 是否可以点击
            scroll: null,   // BScroll 实体
            scrollX: true,
            scrollY: false,
            marginR: this.props.margin || 10
        }
    }
    componentDidMount() {
        setTimeout(() => {
            this._setSlider()
            this._initScroll()
            this.refresh()
        })
    }
    componentDidUpdate() {
        setTimeout(() => {
            this._setSlider()
            // this._initScroll()
            this.refresh()
        })
    }
    componentWillUnmount() {
        const { scroll } = this.state
        scroll.destroy()
    }
    _setSlider() {
        const { marginR } = this.state
        const $HContent = this.refs.HContent
        if (!$HContent) {
            return
        }
        const children = $HContent.children
        let scrollW = 0
        const len = children.length
        for (let i = 0; i < len; i++) {
            let child = children[i]
            addClass(child, "hscroll_item")
            if (i === len - 1) {
                scrollW += child.clientWidth
            } else {
                child.style.marginRight = marginR + 'px'
                scrollW += child.clientWidth + marginR
            }
        }
        $HContent.style.width = scrollW + 'px'
    }
    _initScroll() {
        const $HScroller = this.refs.HScroller
        if (!$HScroller) {
            return
        }
        const { probeType, click, scrollX, scrollY } = this.state
        const scroll = new BScroll($HScroller, {
            probeType,
            scrollX,
            scrollY,
            click,
        })
        this.setState({
            scroll,
        })
    }
    enable() {
        const { scroll } = this.state
        scroll && scroll.enable()
    }
    disable() {
        const { scroll } = this.state
        scroll && scroll.disable()
    }
    refresh() {
        const { scroll } = this.state
        scroll && scroll.refresh()
    }
    scrollTo() {
        const { scroll } = this.state
        scroll && scroll.scrollTo.apply(scroll, arguments)
    }
    scrollToElement() {
        const { scroll } = this.state
        scroll && scroll.scrollToElement.apply(scroll, arguments)
    }
    render() {
        return (
            <div className="HScroller" ref="HScroller">
                <div className="HContent" ref="HContent">
                    {this.props.children}
                </div>
            </div>
        )
    }
}
export default HScroller