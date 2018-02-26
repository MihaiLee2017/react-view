import React from 'react'
import './styles.scss'
import HScroller from '../../../components/HScroller'
import FilmItem from '../../../components/FilmItem'
class PosterList extends React.Component {
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
    render() {

        // let list = { ...directors, ...casts }
        let list = this.setList()
        return (
            <div className="film">
                <h3>海报</h3>
                <div>
                    <HScroller list={list}>
                        {
                            list.map((item, index) => {
                                return (
                                    <FilmItem key={index} item={item}></FilmItem>
                                )
                            })
                        }
                    </HScroller>
                </div>
            </div>
        )
    }
}
export default PosterList