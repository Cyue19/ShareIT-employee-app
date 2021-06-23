import React, { Component } from 'react'

export default class LoadSpinner extends Component {

    render() {
        const {loading, children, ...rest} = this.props;

        return (
            <div {...rest}>
                {loading ?
                    <div className="text-center">
                        <div className="spinner-border text-primary" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                    :
                    <div>{children}</div>
                }
            </div>
        )
    }
}
