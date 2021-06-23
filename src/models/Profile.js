export default class Profile {
    constructor(firstName, lastName, picUrl, userId) {
        this.userId = userId;
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
}
