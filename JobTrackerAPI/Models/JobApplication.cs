using System;

namespace JobTrackerAPI.Models {
    public class JobApplication {
        public int Id { get; set; }
        public string CompanyName { get; set; }
        public string Position { get; set; }
        public  Status Status { get; set; }
        public DateTime DateApplied { get; set; }
    }
    public enum Status {
        Applied,
        Interview,
        Offer,
        Rejected
    }
}