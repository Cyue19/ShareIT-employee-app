export default class Profile {
    constructor(firstName, lastName, picUrl, userId, permissions) {
        this.userId = userId;
        this.permissions = permissions;
        this.firstName = firstName;
        this.lastName = lastName;
        this.picture = picUrl;
        this.maritalStatus = "";
        this.nationality = "";
        this.personalEmail = "";
        this.personalPhone = "";
        this.address = "";
        this.contact = {firstName: "", lastName: "", phone: "", relationship: ""};
        this.idNum = "";
        this.taxId = "";
        this.ssn = "";
        this.licenseNum = "";
        this.carPlateNum = "";
        this.dependents = "";
        this.handicap = "";
        this.payee = "";
        this.bank = "";
        this.iban = "";
        this.swift = "";
        this.courses = [];
        this.collabId = "";
        this.labelsAndTags="";
        this.workPhone = "";
        this.workEmail = "";
        this.holidays = [];
        this.job = "";
        this.manager = "";
        this.baseSalary = "";
        this.expenses = "";
        this.mealAllowance = "";
        this.flexibleWorkHrs = "";
        this.comments = "";


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
