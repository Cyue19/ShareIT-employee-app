import React, { Component } from 'react'

export default class ProfileEditModal extends Component {
    render() {
        return (
            <div>
                <button type="button" class="btn btn-primary">
                Launch demo modal
                </button>

                <div class="edit-modal">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLabel">Edit Profile</h5>
                                <button type="button" class="btn-close"></button>
                            </div>
                            <div class="modal-body">
                                Text
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary">Close</button>
                                <button type="button" class="btn btn-primary">Save changes</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
