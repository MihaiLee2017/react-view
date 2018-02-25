import React, { Component } from 'react'
import './styles.scss'
export default class SearchHeader extends Component {
    render() {
        const { title = '', keyWord = [] } = this.props
        const len = keyWord.length
        return (
            <div className="searchHeader">
                <p>{title}</p>
                <div className='searchInput'>
                    <span className="icon-spinner2"></span>
                    {
                        keyWord.map((item, index) => {
                            const msg = (index === len - 1) ? `${item}` : ` ${item} / `
                            return (
                                <span key={index}>{msg}</span>
                            )
                        })
                    }
                </div>
            </div >
        );
    }
}