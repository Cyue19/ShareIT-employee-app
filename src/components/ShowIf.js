import React, { Component } from 'react'

export default class ShowIf extends Component {
    render() {
        const {isTrue, children, ...rest} = this.props;
        return (
            <div>
                { isTrue ?
                    <div {...rest}>{children}</div>
                    :
                    <div></div>
                }
            </div>
        )
    }
}
