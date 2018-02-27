import React from 'react'
import { withRouter } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import NormalHeader from '../../components/NormalHeader'
import Scroller from '../../components/Scroller'
import { getDouBanCelebrity } from '../../fetch/douban'
import * as doubanActions from '../../actions/douban'
import Poster from './subpage/poster'
import Information from './subpage/information'
import Works from './subpage/works'
// import Film from './subpage/film'
class DoubanCelebrity extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            // cssUrl: 'http://news-at.zhihu.com/css/news_qa.auto.css?v=4b3e3',
            // cssId: 'zhihu_css'
        }
    }
    componentDidMount() {
        setTimeout(() => {
            // 详细信息
            this._getDoubanCelebrity()
        }, 20)
    }
    _getDoubanCelebrity() {
        const { id } = this.props.match.params
        const { doubanActions } = this.props
        getDouBanCelebrity(id).then(res => {
            return res.json()
        }).then(res => {
            console.log(res)
            doubanActions.celebrityDetail({
                ...res
            })
        })
    }
    // _getDoubanComment() {
    //     const { id } = this.props.match.params
    //     const { doubanActions } = this.props
    //     getDouBanPhotos(id).then(res => {
    //         return res.json()
    //     }).then(res => {
    //         console.log(res)
    //     })
    // }
    goBack() {
        this.props.history.goBack()
    }
    render() {
        const { history, doubanCelebrityDetail } = this.props
        const {
            name = '',
            name_en = '',
            aka = [],
            gender = '',
            born_place = '',
            works = [],
            avatars = {},
            id = '',
        } = doubanCelebrityDetail
        const headerProps = {
            title: name,
            iconLeft: 'icon-arrow-left2',
            onLeftClick: this.goBack.bind(this),
        }
        // // const scrollerPrpos = {
        // //     scrollX: true,
        // //     scrollY: false,
        // // }
        const posterProps = {
            images: avatars,
        }
        const infoProps = {
            name,
            name_en,
            aka,
            gender,
            born_place,
            id,
        }
        const worksProps = {
            works,
            name,
            history,
        }
        console.log("works:", works)
        return (
            <div className="App_Router_Content">
                <NormalHeader {...headerProps}></NormalHeader>
                <div className="App_Router_Main" ref="scrollBody">
                    <Scroller>
                        <Poster {...posterProps}></Poster>
                        <Information {...infoProps}></Information>
                        <Works {...worksProps}></Works>
                    </Scroller>
                </div>
            </div>
        )
    }
}
function mapStateToProps(state) {
    return {
        doubanCelebrityDetail: state.douban.celebrityStates,
    }
}
function mapDispatchToProps(dispatch) {
    return {
        doubanActions: bindActionCreators(doubanActions, dispatch)
    }
}
export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(DoubanCelebrity))