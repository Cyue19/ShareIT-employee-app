export default class Profile {
    constructor(firstName, lastName, userId) {
        
        this.firstName = firstName;
        this.lastName = lastName;
        this.userId = userId;
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

    static fromFirebaseDoc(doc) {
      const profile = new Profile();
      const data = doc.data();
      profile.id = doc.id;
      profile.firstName = data.firstName;
      profile.lastName = data.lastName;
      return profile; 
    }
}
