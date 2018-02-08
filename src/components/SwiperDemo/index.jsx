import React, { Component } from 'react';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import Pagination from './subpage/Pagination';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const styles = {
    root: {
        position: 'relative',
    },
};

class DemoAutoPlay extends Component {
    state = {
        index: 0,
    };

    handleChangeIndex = index => {
        this.setState({
            index,
        });
    };

    render() {
        const { index } = this.state;
        const { len = 0 } = this.props
        return (
            <div style={styles.root}>
                <AutoPlaySwipeableViews index={index} interval={5000} onChangeIndex={this.handleChangeIndex}>
                    {this.props.children}
                </AutoPlaySwipeableViews>
                <Pagination dots={len} index={index} onChangeIndex={this.handleChangeIndex} />
            </div>
        )
    }
}

export default DemoAutoPlay;
