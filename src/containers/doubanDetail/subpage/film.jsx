import React from 'react'
import './styles.scss'
import HScroller from '../../../components/HScroller'
import FilmItem from '../../../components/FilmItem'
class Film extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            // isShow: this.props.toggle || false
        }
    }
    setList() {
        const {
            directors = [],
            casts = []
        } = this.props
        let ret = []
        directors.forEach((item) => {
            const obj = {
                role: "导演",
                images: item.avatars || []
            }
            ret.push({ ...obj, ...item })
        })
        casts.forEach((item) => {
            const obj = {
                role: "演员",
                images: item.avatars || {}
            }
            ret.push({ ...obj, ...item })
        })
        return ret
    }
    onClickItem(item) {
        this.props.history.replace(`/doubanCelebrity/${item.id}`)
    }
    render() {
        // let list = { ...directors, ...casts }
        let list = this.setList()
        return (
            <div className="film">
                <h3>影人</h3>
                <div>
                    <HScroller list={list}>
                        {
                            list.map((item, index) => {
                                return (
                                    <FilmItem key={index} item={item} onClickItem={this.onClickItem.bind(this)}></FilmItem>
                                )
                            })
                        }
                    </HScroller>
                </div>
            </div>
        )
    }
}
export default Film