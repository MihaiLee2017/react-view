import React, { Component } from 'react'
import BScroll from 'better-scroll'
import './styles.scss'
export default class Scroller extends Component {
    constructor(props) {
        super(props)
        this.state = {
            probeType: this.props.probeType || 1,   // 返回滚动高度的时机
            click: this.props.canClick || true, // 是否可以点击
            scroll: null,   // BScroll 实体
            pullUpLoad: this.props.pullUpLoad || false, // 上拉加载
            isPullUpLoad: false, // 正在加载
            hasMore: this.props.hasMore || false, // 是否还有更多
        }
    }
    componentDidMount() {
        setTimeout(() => {
            this._initScroll()
            this.refresh()
            const scrollDistance = this.props.scrollDistance || 0
            this.scrollTo(0, scrollDistance)
        })
    }
    componentWillReceiveProps(nextProps) {
        if (this.props.stories && this.props.stories.length !== nextProps.stories.length) {
            this.forceUpdate()
        }
    }
    componentWillUnmount() {
        const { scroll } = this.state
        this.props.setScrollDistance && this.props.setScrollDistance(scroll.y)
        scroll.destroy()
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
    // 初始化
    _initScroll() {
        const $wrapper = this.refs.wrapper
        if (!$wrapper) {
            return
        }
        const { probeType, click, pullUpLoad } = this.state
        const scroll = new BScroll($wrapper, {
            probeType,
            click,
            pullUpLoad: pullUpLoad,
        })
        this.setState({
            scroll,
        })
        if (pullUpLoad) {
            this._initpullUpLoad()
        }
        // scroll.on("scrollEnd", (obj) => {
        //     this.props.setScrollDistance && this.props.setScrollDistance(scroll.y)
        // })
    }
    // 上拉加载
    _initpullUpLoad() {
        const { scroll, hasMore } = this.state
        scroll.on('pullingUp', () => {
            const { hasMore } = this.state
            if (hasMore) {
                this.setState({
                    isPullUpLoad: true
                })
                // 加载更多
                this.props.getPullUpMore && this.props.getPullUpMore()
            }
        })
    }
    // 加载完成后涮新BScroll
    forceUpdate() {
        const { isPullUpLoad, pullUpLoad, scroll } = this.state
        if (isPullUpLoad && pullUpLoad) {
            const { hasMore } = this.props
            this.setState({
                isPullUpLoad: false,
                hasMore,
            })
            scroll.finishPullUp()
            this.refresh()
        } else {
            this.refresh()
        }
    }
    render() {
        const { pullUpLoad, isPullUpLoad, hasMore } = this.state
        return (
            <div className="wrapper" ref="wrapper">
                <div>
                    {this.props.children}
                    {
                        pullUpLoad &&
                        <div className="pullup-wrapper">
                            {
                                !isPullUpLoad ?
                                    <div className="before-trigger">
                                        {/*<span className="icon-arrow-down2"></span>*/}
                                        <span>{hasMore ? '上拉加载更多' : '没有更多内容'}</span>
                                    </div>
                                    :
                                    <div className="after-trigger">
                                        <span className="icon-spinner3 loadingIcon"></span>
                                        <span>正在加载中</span>
                                    </div>
                            }
                        </div>
                    }

                </div>
            </div>
        )
    }
}