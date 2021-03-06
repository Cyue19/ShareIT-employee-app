import React, { Component } from 'react';
import Firebase from "../../../firebase/Firebase";
import ShowIf from "../../ShowIf";

export default class PictureEditModal extends Component {
    constructor(props) {
        super(props);
        this.storage = Firebase.instance().storage;
        this.db = Firebase.instance().db;

        this.state = {
            pictureUrl: this.props.profile.picture,
            file: null,
            fileData: null,
            loadStatus: "",
        }
    }

    /**Store the selected image and get an url to display in preview */
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

    /**Upload image to firebase storage */
    uploadImage(e) {
        e.preventDefault();
        const { file } = this.state;

        if (file) {
            const uploadTask = this.storage.ref('images/' + file.name).put(file);
    
            uploadTask.on('state_changed',
            (snap) => {
                const progress = snap.bytesTransferred / snap.totalBytes * 100.0;
                this.setState({
                    loadStatus: "File is uploading..."
                });
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

    /**Get the image's download url from firebase */
    async onFileUploaded(uploadTask) {
        const imageUrl = await uploadTask.snapshot.ref.getDownloadURL();
        console.log("uploaded image url", imageUrl);
        await this.db.collection("profiles").doc(this.props.profile.userId).update({
            pictureUrl: imageUrl
        });
        this.setState({
            pictureUrl: imageUrl,
            loadStatus: "File has finished uploading"
        });
    }

    saveChanges(e) {
        e.preventDefault();
        const {profile} = this.props;

        profile.picture = this.state.pictureUrl;
        console.log("url", profile.picture);

        this.props.update(profile);
        this.restoreDefault();
    }

    restoreDefault() {
        this.setState({
            file: null,
            fileData: null,
            loadStatus: ""
        });
    }
    
    render() {
        const {fileData, loadStatus} = this.state;

        return (
            <div>
                <div className="modal fade" id="pictureModal" aria-labelledby="pictureModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="accountModalLabel">Request Absence</h5>
                                <button onClick={() => this.restoreDefault()} type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>

                            <div className="modal-body">
                                <form onSubmit={(e) => this.uploadImage(e)} className="row">
                                    <h2 className="info-header">Account Information</h2>
                                    <ShowIf isTrue={loadStatus==="File is uploading..."}>
                                        <div class="alert alert-primary" role="alert">
                                            {loadStatus}
                                        </div>
                                    </ShowIf>
                                    <ShowIf isTrue={loadStatus==="File has finished uploading"}>
                                        <div class="alert alert-success" role="alert">
                                            {loadStatus}
                                        </div>
                                    </ShowIf>
                                    <div className="text-center">
                                        <img src={fileData} alt="Preview" style={{width: '150px', height: "150px", borderRadius:'100px', position: 'relative'}} className="mb-3"/>
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Select image:</label>
                                        <input type="file" onChange={(e) => this.onImageSelected(e)} className="form-control"/>
                                    </div>
                                    <button className="btn btn-primary" type="submit">Upload</button>
                                </form>
                            </div>

                            <div className="modal-footer">
                                <button onClick={() => this.restoreDefault()} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button onClick={(e) => this.saveChanges(e)} type="button" className="btn btn-primary">Save changes</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
