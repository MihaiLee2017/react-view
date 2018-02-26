import React from 'react'
// import './styles.scss'
class Information extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            // isShow: this.props.toggle || false
        }
    }
    render() {
        const {
            title = "",
            year = '',
            rating = {},
            genres = [],
            countries = [],
            ratings_count = ''
        } = this.props
        const gLen = genres.length
        const cLen = countries.length
        return (
            <div className="douban_info">
                <div className="left">
                    <h3>{title}</h3>
                    <p>
                        <span>分类 : </span>
                        {
                            genres.map((item, index) => {
                                const msg = (gLen - 1 === index) ? item : `${item} / `
                                return (
                                    <span key={index}>{msg}</span>
                                )
                            })
                        }
                    </p>
                    <p>
                        <span>地区 : </span>
                        <span>
                            {
                                countries.map((item, index) => {
                                    const msg = (cLen - 1 === index) ? item : `${item} / `
                                    return (
                                        <span key={index}>{msg}</span>
                                    )
                                })
                            }
                        </span>
                    </p>
                    <p>
                        <span>上映时间 : </span>
                        <span>{year}</span>
                    </p>
                </div>
                <div className="right">
                    <h3 className="title">
                        豆瓣评分
                    </h3>
                    <p className="average">
                        <span>{rating.average}</span>
                    </p>
                    <p className="count">
                        <span>{ratings_count}</span>
                    </p>
                </div>
            </div>
        )
    }
}
export default Information