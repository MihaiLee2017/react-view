import React, { Component } from 'react'
import DrawerHeader from './subpage/Header'
import DrawerItem from './subpage/Item'
// import Scroller from '../../components/Scroller'
import './styles.scss'
class Drawer extends Component {
    // constructor(props) {
    //     super(props)

    // }
    selectItem(item) {
        this.props.selectItem && this.props.selectItem(item)
    }
    render() {
        const { list = [], current = {}, isShowThemes = false, maskClick = () => { } } = this.props
        return (
            <div className={`Drawer ${isShowThemes ? 'showDrawer' : ''}`}>
                <div className="mask" onClick={maskClick.bind(this)}></div>
                <div className="slider">
                    {/*<Scroller>*/}
                    <DrawerHeader></DrawerHeader>
                    {
                        list.length > 0 &&
                        list.map((item, index) => {
                            const itemProps = {
                                selectItem: this.selectItem.bind(this),
                                item: item,
                                current: current
                            }
                            return (
                                <DrawerItem key={index} {...itemProps}></DrawerItem>
                            )
                        })
                    }
                    {/*</Scroller>*/}
                </div>
            </div>
        );
    }
}

export default Drawer
