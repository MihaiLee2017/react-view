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
            name = '',
            name_en = '',
            aka = [],
            gender = '',
            born_place = '',
        } = this.props
        const aLen = aka.length
        return (
            <div className="douban_celebrity">
                <div className="main">
                    <header>
                        <h3>{name}</h3>
                        <p>{name_en}</p>
                    </header>
                    <div className="main">
                        {
                            aLen > 0 &&
                            <p>
                                <span>姓名 : </span>
                                {
                                    aka.map((item, index) => {
                                        const msg = aLen - 1 === index ? item : `${item} / `
                                        return (
                                            <span key={index}>
                                                {msg}
                                            </span>
                                        )
                                    })
                                }
                            </p>
                        }
                        {
                            !!gender &&
                            <p>
                                <span>性别 : </span>
                                <span>{gender}</span>
                            </p>
                        }
                        {
                            !!born_place &&
                            <p>
                                <span>出生地 : </span>
                                <span>{born_place}</span>
                            </p>
                        }
                    </div>
                </div>
            </div>
        )
    }
}
export default Information