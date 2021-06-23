import React, { Component } from 'react'

export default class LoadButton extends Component {
    render() {
        const { btnLoading, children, ...rest } = this.props;

        return (
            <div className="text-center">
                <button {...rest} style={{position: "relative"}}>
                    {children}
                    { btnLoading ?
                        <div style={{position: "absolute", left: "30%", top: "5%"}} class="spinner-border text-light" role="status">
                            <span class="visually-hidden">Loading...</span>
                        </div>
                        :
                        <div></div>
                    }
                </button>
            </div>
        )
    }
}
