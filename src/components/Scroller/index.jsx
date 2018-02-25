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
            pullDownRefresh: this.props.pullDownRefresh || false, // 下拉加载
            isPullingDown: false, //  是否正在加载
            beforePullDown: true, //
            pullUpLoad: this.props.pullUpLoad || false, // 上拉加载
            isPullUpLoad: this.props.pullUpLoad ? true : false, // 正在加载
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
        const { isPullingDown, pullDownRefresh } = this.state
        const pLength = this.props.scrollLists && this.props.scrollLists.length ? this.props.scrollLists.length : 0
        const nLength = nextProps.scrollLists && nextProps.scrollLists.length ? nextProps.scrollLists.length : 0
        // if ((isPullingDown && pullDownRefresh) || (this.props.scrollLists && this.props.scrollLists.length !== nextProps.scrollLists.length)) {
        //     this.forceUpdate()
        // }
        // 更改hasmore的状态
        if (nextProps.hasMore !== this.props.hasMore) {
            this.setState({
                hasMore: nextProps.hasMore,
            })
        }
        // 判断是否需要刷新scroll
        setTimeout(() => {
            if ((isPullingDown && pullDownRefresh) || (pLength !== nLength)) {
                this.forceUpdate()
            }
        }, 20)
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
        const { probeType, click, pullUpLoad, pullDownRefresh } = this.state
        const scroll = new BScroll($wrapper, {
            probeType,
            click,
            pullUpLoad: pullUpLoad ? {
                threshold: 50
            } : false,
            pullDownRefresh: pullDownRefresh ? {
                threshold: 80,
                stop: 40,
            } : false,
        })
        this.setState({
            scroll,
        })
        if (pullDownRefresh) {
            this._initpullDownRefresh()
        }
        if (pullUpLoad) {
            this._initpullUpLoad()
        }
    }
    // 下拉刷新
    _initpullDownRefresh() {
        const { scroll } = this.state
        scroll.on("pullingDown", () => {
            this.setState({
                beforePullDown: false,
                isPullingDown: true,
            })
            this.props.getPullDownRefresh && this.props.getPullDownRefresh()
        })
    }
    // 上拉加载
    _initpullUpLoad() {
        const { scroll } = this.state
        scroll.on('pullingUp', () => {
            const { hasMore } = this.state
            console.log("上拉加载:", hasMore)
            if (!hasMore) {
                scroll.finishPullUp()
            } else {
                this.setState({
                    isPullUpLoad: true
                })
                // 加载更多
                this.props.getPullUpMore && this.props.getPullUpMore()
            }
        })
    }
    // _reboundPullDown
    _reboundPullDown() {
        const { scroll } = this.state
        return new Promise((resolve) => {
            setTimeout(() => {
                scroll.finishPullDown()
                resolve()
            }, 600);
        })
    }
    // 加载完成后涮新BScroll
    forceUpdate() {
        const { isPullUpLoad, pullUpLoad, scroll, pullDownRefresh, isPullingDown, hasMore } = this.state
        if (pullDownRefresh && isPullingDown) {
            this.setState({
                isPullingDown: false,
            })
            this._reboundPullDown().then(() => {
                setTimeout(() => {
                    this.setState({
                        beforePullDown: true,
                    })
                    this.refresh()
                }, scroll.options.bounceTime);
            })
        }
        else if (isPullUpLoad && pullUpLoad) {
            this.setState({
                isPullUpLoad: false,
            })
            scroll.finishPullUp()
            this.refresh()
        } else {
            this.refresh()
        }
    }
    render() {
        const { pullUpLoad, isPullUpLoad, hasMore, pullDownRefresh, isPullingDown, beforePullDown } = this.state
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
                    {
                        pullDownRefresh &&
                        <div className="pulldown-wrapper">
                            {
                                beforePullDown ?
                                    <div className="before-trigger">
                                        <span>下拉刷新</span>
                                    </div>
                                    :
                                    <div className="after-trigger">
                                        {
                                            isPullingDown ?
                                                <div>
                                                    <span className="icon-spinner3 loadingIcon"></span>
                                                    <span>正在刷新</span>
                                                </div>
                                                :
                                                <div>
                                                    <span>刷新完成</span>
                                                </div>
                                        }
                                    </div>
                            }
                        </div>
                    }
                </div>
            </div>
        )
    }
}