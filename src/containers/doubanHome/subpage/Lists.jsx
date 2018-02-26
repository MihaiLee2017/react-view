import React from 'react'
import DoubanItem from '../../../components/DoubanItem'
class Lists extends React.Component {
    _getObjectItem(objs, key) {
        let ret = []
        objs.forEach(item => {
            const objKey = item[key]
            ret.push(objKey)
        })
        return ret
    }
    _setList() {
        const { list = [] } = this.props
        let ret = []
        list.forEach((item) => {
            const { id = "", casts = {}, directors = {}, images = {}, rating = {}, title = "", year = "" } = item
            let del = {
                casts: this._getObjectItem(casts, "name"),
                directors: this._getObjectItem(directors, "name"),
                images,
                rating,
                title,
                year,
                id,
            }
            ret.push(del)
        })
        return ret
    }
    onItemClick(item) {
        const { history } = this.props
        history.push(`/doubanDetail/${item.id}`)
    }
    render() {
        let list = this._setList()
        return (
            <div>
                {
                    list.map((item, index) => {
                        return (
                            <DoubanItem key={index} {...item} onClickFn={this.onItemClick.bind(this, item)}></DoubanItem>
                        )
                    })
                }
            </div>
        )
    }
}
export default Lists