import React from 'react'
import './styles.scss'
import HScroller from '../../../components/HScroller'
import WorksItem from '../../../components//WorksItem/'
class Works extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            // isShow: this.props.toggle || false
        }
    }
    setList() {
        const {
            works = [],
            name = '',
        } = this.props
        let ret = []
        works.forEach((item) => {
            const obj = {
                // role: item.roles.length > 0 ? item.roles[0] : '',
                images: item.subject.images,
                title: item.subject.title,
                rating: item.subject.rating.average,
                id: item.subject.id,
                // name,
            }
            ret.push(obj)
        })
        return ret
    }
    onClickItem(item) {
        this.props.history.replace(`/doubanDetail/${item.id}`)
    }
    render() {
        // let list = { ...directors, ...casts }
        let list = this.setList()
        console.log(list)
        return (
            <div className="douban_works">
                <h3>代表作品</h3>
                <div>
                    <HScroller list={list}>
                        {
                            list.map((item, index) => {
                                return (
                                    <WorksItem key={index} item={item} onClickItem={this.onClickItem.bind(this)}></WorksItem>
                                )
                            })
                        }
                    </HScroller>
                </div>
            </div>
        )
    }
}
export default Works