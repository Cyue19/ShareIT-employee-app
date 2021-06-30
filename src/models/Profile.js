export default class Profile {
    constructor(firstName, lastName, picUrl, userId, permissions, accessEmail) {
        this.userId = userId;
        this.permissions = permissions;
        this.firstName = firstName;
        this.lastName = lastName;
        this.picture = picUrl;
        this.birthDate = "";
        this.maritalStatus = "";
        this.nationality = "";
        this.personalEmail = "";
        this.personalPhone = "";
        this.address = {line1: "", line2: "", city: "", zipCode: "", region: "", country: ""};
        this.contact = {firstName: "", lastName: "", phone: "", relationship: ""};
        this.idNum = "";
        this.taxId = "";
        this.ssn = "";
        this.licenseNum = "";
        this.carPlateNum = "";
        this.dependents = "";
        this.handicap = "";
        this.payee = "";
        this.degree = "";
        this.school = "";
        this.courses = [];
        this.bank = "";
        this.iban = "";
        this.swift = "";
        this.collabId = "";
        this.labelsAndTags= "";
        this.workPhone = "";
        this.workEmail = "";
        this.holidays = [];
        this.country = "";
        this.region = "";
        this.holidayDate = "";
        this.job = "";
        this.manager = {fullName: "", userId: ""};
        this.baseSalary = "";
        this.expenses = "";
        this.mealAllowance = "";
        this.flexibleWorkHrs = "";
        this.comments = "";
        this.contracts = [];
        this.absencesPerYr = "";
        this.absenceRequests = [];
        this.accessEmail = accessEmail;
        this.status = "";
        this.language = "";
        this.notifications = [];
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
