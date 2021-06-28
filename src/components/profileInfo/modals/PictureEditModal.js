import React, { Component } from 'react';
import Firebase from "../../../firebase/Firebase";

export default class PictureEditModal extends Component {
    constructor(props) {
        super(props);
        this.storage = Firebase.instance().storage;
        this.db = Firebase.instance().db;

        this.state = {
            pictureUrl: this.props.profile.picture,
            file: null,
            fileData: null
        }
    }

    onImageSelected(e) {
        const file = e.target.files[0];
        this.setState({
            file: e.target.files[0]
        });

        if (file) {
            const reader = new FileReader();
            reader.readAsDataURL(file);

            reader.onload = (e) => {
                this.setState({
                    fileData: e.target.result
                });
            };
        }
    }

    uploadImage(e) {
        e.preventDefault();
        const { file } = this.state;

        if (file) {
            const uploadTask = this.storage.ref('images/' + file.name).put(file);
    
            uploadTask.on('state_changed',
            (snap) => {
                const progress = snap.bytesTransferred / snap.totalBytes * 100.0;
                console.log("Progress: ", progress, "%");
            },
            (err) => {
                console.log(err);
            },
            () => this.onFileUploaded(uploadTask)
            );
        } else {
            return;
        }
    }

    async onFileUploaded(uploadTask) {
        const imageUrl = await uploadTask.snapshot.ref.getDownloadURL();
        console.log("uploaded image url", imageUrl);
        await this.db.collection("profiles").doc(this.props.profile.userId).update({
            pictureUrl: imageUrl
        });
        this.setState({
            pictureUrl: imageUrl
        });
    }

    saveChanges() {
        const {profile} = this.props;

        profile.picture = this.state.pictureUrl;
        console.log("url", profile.picture);

        this.props.update(profile);
        this.setState({});
    }
    
    render() {
        const {profile} = this.props;

        return (
            <div>
                <div className="modal fade" id="pictureModal" aria-labelledby="pictureModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="accountModalLabel">Request Absence</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>

                            <div className="modal-body">
                                <form onSubmit={(e) => this.uploadImage(e)} className="row">
                                    <h2 className="info-header">Account Information</h2>
                                    <div className="mb-3">
                                        <label className="form-label">Select image:</label>
                                        <input type="file" onChange={(e) => this.onImageSelected(e)} className="form-control"/>
                                    </div>
                                    <button className="btn btn-primary" type="submit">Upload</button>
                                </form>
                            </div>

                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button onClick={() => this.saveChanges()} type="button" className="btn btn-primary">Save changes</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
