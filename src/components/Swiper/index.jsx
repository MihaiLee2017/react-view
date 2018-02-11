import React from 'react'
import BScroll from 'better-scroll'
import { addClass } from '../../static/js/dom'
import './styles.scss'
let timer = null
class Swiper extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            loop: true, // 循环
            autoPlay: true, // 自动轮播
            interval: 4000, // 间隔
            threshold: 0.3, // 动画时间
            dots: [],   // dots
            currentPageIndex: 0,
            slider: null,    // BScroll实例
        }
    }
    componentDidMount() {
        this.setInitSwiper()
    }
    setInitSwiper() {
        const { autoPlay } = this.state
        setTimeout(() => {
            this._setSliderWidth()
            // this._initDots()
            this._initSlider()
            if (autoPlay) {
                this._play()
            }
            window.addEventListener('resize', () => {
                const { slider } = this.state
                if (!slider) {
                    return
                }
                this._setSliderWidth(true)
                slider.refresh()
            })
        }, 20);
    }
    _setSliderWidth(isResize) {
        const children = this.refs.sliderGroup.children
        let width = 0
        let sliderWidth = this.refs.slider.clientWidth
        let dots = []
        for (let i = 0; i < children.length; i++) {
            let child = children[i]
            addClass(child, "slider-item")
            child.style.width = `${sliderWidth}px`
            width += sliderWidth
            dots.push(i)
        }
        if (!isResize) {
            this.setState({
                dots,
            })
            if (this.state.loop) {
                width += 2 * sliderWidth
            }
        }
        this.refs.sliderGroup.style.width = `${width}px`
    }
    _initSlider() {
        const { loop, threshold, autoPlay } = this.state
        const slider = new BScroll(this.refs.slider, {
            scrollX: true,
            scrollY: false,
            momentum: false,
            snap: {
                loop,
                threshold: threshold,
                easing: {
                    style: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                    fn: function (t) {
                        return t * (2 - t)
                    }
                }
            },
            click: true,
        })
        this.setState({
            slider,
        })
        slider.on("scrollEnd", () => {
            let pageIndex = slider.getCurrentPage().pageX
            this.setState({
                currentPageIndex: pageIndex
            })
            if (autoPlay) {
                clearTimeout(timer)
                this._play()
            }
        })
    }
    _play() {
        const { currentPageIndex, slider, threshold, interval } = this.state
        let pageIndex = currentPageIndex + 1
        timer = setTimeout(() => {
            // clearTimeout(timer)
            slider.goToPage(pageIndex, 0, threshold * 1000)
        }, interval)
    }
    render() {
        const { dots, currentPageIndex } = this.state
        return (
            <div className="slider" ref="slider">
                <div className="slider-group" ref="sliderGroup">
                    {this.props.children}
                </div>
                <div className="dots">
                    {
                        dots.map((item, index) => {
                            const cssName = currentPageIndex === index ? "dot active" : "dot"
                            return (
                                <span key={index} className={cssName} ></span>
                            )
                        })
                    }
                </div>
            </div>
        )
    }
}
export default Swiper