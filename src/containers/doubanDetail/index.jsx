import React from 'react'
import { withRouter } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import NormalHeader from '../../components/NormalHeader'
import Scroller from '../../components/Scroller'
import { getDouBanSubject, getDouBanPhotos } from '../../fetch/douban'
import * as doubanActions from '../../actions/douban'
import Poster from './subpage/poster'
import Information from './subpage/information'
import Introduction from './subpage/introduction'
import Film from './subpage/film'
class DoubanDetail extends React.Component {
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
            this._getDoubanDetails()
            // 海报
            // this._getDoubanComment()
        }, 20)
    }
    _getDoubanDetails() {
        const { id } = this.props.match.params
        const { doubanActions } = this.props
        getDouBanSubject(id).then(res => {
            return res.json()
        }).then(res => {
            // console.log(res)
            doubanActions.fileDetail({
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
        const { history, doubanFileDetail } = this.props
        const {
            title = "",
            images = [],
            year = '',
            rating = {},
            genres = [],
            countries = [],
            ratings_count = '',
            summary = '',
            directors = [],
            casts = [],

        } = doubanFileDetail
        const headerProps = {
            title,
            iconLeft: 'icon-arrow-left2',
            onLeftClick: this.goBack.bind(this),
        }
        // const scrollerPrpos = {
        //     scrollX: true,
        //     scrollY: false,
        // }
        const posterProps = {
            images,
        }
        const infoProps = {
            title,
            images,
            year,
            rating,
            genres,
            countries,
            ratings_count,
            directors,
            casts,
        }
        const intoProps = {
            summary,
        }
        const film = {
            directors,
            casts,
            history
        }
        return (
            <div className="App_Router_Content">
                <NormalHeader {...headerProps}></NormalHeader>
                <div className="App_Router_Main" ref="scrollBody">
                    <Scroller>
                        <Poster {...posterProps}></Poster>
                        <Information {...infoProps}></Information>
                        <Introduction {...intoProps}></Introduction>
                        <Film {...film}></Film>
                    </Scroller>
                </div>
            </div>
        )
    }
}
function mapStateToProps(state) {
    return {
        doubanFileDetail: state.douban.fileDetailStates,
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
)(DoubanDetail))