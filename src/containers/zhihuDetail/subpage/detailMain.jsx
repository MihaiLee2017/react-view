import React from 'react'
class DetailMain extends React.Component {
    componentDidMount() {
        this.removeDom()
    }
    componentDidUpdate() {
        this.removeDom()
    }
    removeDom() {
        const $headline = document.querySelector('.headline')
        if ($headline) {
            $headline.parentNode.removeChild($headline)
            const $more = document.querySelector('.view-more')
            if ($more) {
                $more.parentNode.removeChild($more)
            }
        }
    }
    render() {
        const { body = "" } = this.props
        return (
            <div dangerouslySetInnerHTML={{ __html: body }}></div>
        )
    }
}
export default DetailMain