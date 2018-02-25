import React from 'react'
import './styles.scss'
class DoubanItem extends React.Component {
    render() {
        const { casts = [], directors = [], images = {}, rating = {}, title = "", year = "" } = this.props
        const dLen = directors.length
        const cLen = casts.length
        return (
            <div className="douban_item">
                <div className="logo">
                    <img src={images.small} alt='' />
                </div>
                <div className="message">
                    <h3>{title}</h3>
                    {/*<p><span>评分 : </span><span>{rating.average}</span></p>*/}
                    <p>
                        <span>导演 : </span>
                        {
                            directors.map((item, index) => {
                                const msg = (dLen - 1 === index) ? `${item}` : `${item} / `
                                return (
                                    <span key={index}>{msg}</span>
                                )
                            })
                        }
                    </p>
                    <p>
                        <span>主演 : </span>
                        {
                            casts.map((item, index) => {
                                const msg = (cLen - 1 === index) ? `${item}` : `${item} / `
                                return (
                                    <span key={index}>{msg}</span>
                                )
                            })
                        }
                    </p>
                    <p><span>年份 : </span><span>{year}</span></p>
                    <p><span>评分 : </span><span>{rating.average}</span></p>
                </div>
            </div>
        )
    }
}
export default DoubanItem