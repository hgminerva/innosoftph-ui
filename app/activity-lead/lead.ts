export class Lead {
  constructor(
    public LeadDate: Date,
    public LeadName: String,
    public Address: String,
    public ContactPerson: String,
    public ContactPosition: String,
    public ContactEmail: String,
    public ContactPhoneNo: String,
    public ReferredBy: String,
    public Remarks: String,
    public AssignedToUserId: String,
    public LeadStatus: String
  ) {  }
}