import React, { useState } from "react";

const AddMember = ({ onAddMember }) => {
  const [memberDetails, setMemberDetails] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobileNumber: "",
  });

  const handleAddMember = () => {
    onAddMember(memberDetails);
    // You can also redirect to the main page or perform other actions after adding a member.
  };

  return (
    <div className="add-member-page">
      <h2>Add Member</h2>
      <div>
        <label>First Name:</label>
        <input
          type="text"
          value={memberDetails.firstName}
          onChange={(e) =>
            setMemberDetails({ ...memberDetails, firstName: e.target.value })
          }
        />
      </div>
      <div>
        <label>Last Name:</label>
        <input
          type="text"
          value={memberDetails.lastName}
          onChange={(e) =>
            setMemberDetails({ ...memberDetails, lastName: e.target.value })
          }
        />
      </div>
      <div>
        <label>Email:</label>
        <input
          type="text"
          value={memberDetails.email}
          onChange={(e) =>
            setMemberDetails({ ...memberDetails, email: e.target.value })
          }
        />
      </div>
      <div>
        <label>Mobile Number:</label>
        <input
          type="text"
          value={memberDetails.mobileNumber}
          onChange={(e) =>
            setMemberDetails({ ...memberDetails, mobileNumber: e.target.value })
          }
        />
      </div>
      <button onClick={handleAddMember}>Add Member</button>
    </div>
  );
};

export default AddMember;
