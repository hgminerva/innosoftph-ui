"use strict";
var Lead = (function () {
    function Lead(LeadDate, LeadName, Address, ContactPerson, ContactPosition, ContactEmail, ContactPhoneNo, ReferredBy, Remarks, AssignedToUserId, LeadStatus) {
        this.LeadDate = LeadDate;
        this.LeadName = LeadName;
        this.Address = Address;
        this.ContactPerson = ContactPerson;
        this.ContactPosition = ContactPosition;
        this.ContactEmail = ContactEmail;
        this.ContactPhoneNo = ContactPhoneNo;
        this.ReferredBy = ReferredBy;
        this.Remarks = Remarks;
        this.AssignedToUserId = AssignedToUserId;
        this.LeadStatus = LeadStatus;
    }
    return Lead;
}());
exports.Lead = Lead;
//# sourceMappingURL=lead.js.map