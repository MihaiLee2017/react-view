import React from 'react'
import DoubanItem from '../../../components/DoubanItem'
import './styles.scss'
class Search extends React.Component {
    onItemClick(item) {
        const { history } = this.props
        history.push(`/doubanDetail/${item.id}`)
    }
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
    render() {
        let { title = "", list = [] } = this.props
        list = this._setList()
        // const len = list.length;
        // console.log(list)
        return (
            <div className="doubanRecords doubanSearchList">
                <h3>
                    {title}
                </h3>
                {
                    list.map((item, index) => {
                        return (
                            <DoubanItem key={index} {...item} onClickFn={this.onItemClick.bind(this, item)}></DoubanItem>
                        )
                    })
                }
                {/*{
                    len <= 0 ?
                        <p>暂无记录</p>
                        :
                        list.map((item, index) => {
                            return (
                                <p key={index}>{item}</p>
                            )
                        })
                }*/}
            </div>
        )
    }
}
export default Search