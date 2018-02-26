import React from 'react'
import './styles.scss'
class Poster extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isShow: false,
        }
    }
    render() {
        const { images } = this.props
        const { large = '', medium = '', small = '' } = images
        const mockStyle = {
            height: document.body.clientHeight,
            width: document.body.clientWidth,
        }
        const imgW = document.body.clientWidth / 2
        return (
            <div className="douban_poster">
                <div className="content">
                    <img src={small} alt='' width={imgW} />
                </div>
            </div>
        )
    }
}
export default Poster