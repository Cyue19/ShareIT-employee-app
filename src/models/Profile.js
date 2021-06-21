export default class Profile {
    constructor(firstName, lastName, picUrl, id) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.picture = picUrl;
        this.civilState = "";
        this.nationality = "";
        this.personalEmail = "";
        this.collabId = "";
        this.taxId = "";
        this.ssn = "";
        this.licenseNum = "";
        this.carPlateNum = "";
        this.contact = "";
        this.courses = [];
        this.bank = "";
        this.iban = "";
        this.swift = "";
    }
}
