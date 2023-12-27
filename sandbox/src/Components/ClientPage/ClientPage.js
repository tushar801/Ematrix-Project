import React, { useState } from "react";

const AddMemberForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobileNumber: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      mobileNumber: "",
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        First Name:
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
        />
      </label>
      <label>
        Last Name:
        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
        />
      </label>
      <label>
        Email:
        <input
          type="text"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
      </label>
      <label>
        Mobile Number:
        <input
          type="text"
          name="mobileNumber"
          value={formData.mobileNumber}
          onChange={handleChange}
        />
      </label>
      <button type="submit">Add Member</button>
    </form>
  );
};

const ClientPage = () => {
  // State for managing groups and selected group
  const [groups, setGroups] = useState([
    { id: 1, name: "Group 1", members: [] },
    { id: 2, name: "Group 2", members: [] },
  ]);
  const [selectedGroup, setSelectedGroup] = useState(null);

  // State for managing members and selected member
  const [members, setMembers] = useState([]);
  const [selectedMember, setSelectedMember] = useState(null);

  // State for member details (First Name, Last Name, Email, Mobile Number)
  const [memberDetails, setMemberDetails] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobileNumber: "",
  });
  const [showMemberForm, setShowMemberForm] = useState(false);

  // Function to handle member form submission
  const handleMemberFormSubmit = (formData) => {
    const newMember = {
      id: members.length + 1,
      ...formData,
    };

    const updatedMembers = selectedGroup
      ? groups.map((group) =>
          group.id === selectedGroup.id
            ? { ...group, members: [...group.members, newMember] }
            : group,
        )
      : [...members, newMember];

    selectedGroup ? setGroups(updatedMembers) : setMembers(updatedMembers);
    setShowMemberForm(false);
  };

  const handleMemberDelete = () => {
    if (selectedMember) {
      const updatedMembers = selectedGroup
        ? groups.map((group) =>
            group.id === selectedGroup.id
              ? {
                  ...group,
                  members: group.members.filter(
                    (member) => member.id !== selectedMember.id,
                  ),
                }
              : group,
          )
        : members.filter((member) => member.id !== selectedMember.id);

      selectedGroup ? setGroups(updatedMembers) : setMembers(updatedMembers);
      setSelectedMember(null);
      setMemberDetails({
        firstName: "",
        lastName: "",
        email: "",
        mobileNumber: "",
      });
    }
  };

  // Function to handle group deletion
  const handleGroupDelete = () => {
    if (selectedGroup) {
      const updatedGroups = groups.filter(
        (group) => group.id !== selectedGroup.id,
      );
      setGroups(updatedGroups);
      setSelectedGroup(null);
    }
  };

  // Render member form
  const renderMemberForm = () => {
    return (
      <div className="member-form">
        <h2>Add Member</h2>
        <AddMemberForm onSubmit={handleMemberFormSubmit} />
      </div>
    );
  };

  // Functions for group actions (Add, Edit, Delete)
  const handleGroupAdd = () => {
    const newGroup = {
      id: groups.length + 1,
      name: `Group ${groups.length + 1}`,
      members: [],
    };
    setGroups([...groups, newGroup]);
  };

  const handleGroupEdit = () => {};

  // Functions for member actions (Add, Edit, Delete)
  const handleMemberAdd = () => {
    const newMember = {
      id: members.length + 1,
      ...memberDetails,
    };

    const updatedMembers = selectedGroup
      ? groups.map((group) =>
          group.id === selectedGroup.id
            ? { ...group, members: [...group.members, newMember] }
            : group,
        )
      : [...members, newMember];

    selectedGroup ? setGroups(updatedMembers) : setMembers(updatedMembers);
    setMemberDetails({
      firstName: "",
      lastName: "",
      email: "",
      mobileNumber: "",
    });
  };

  const handleMemberEdit = () => {
    if (selectedMember) {
      const updatedMember = {
        ...selectedMember,
        ...memberDetails,
      };

      const updatedMembers = selectedGroup
        ? groups.map((group) =>
            group.id === selectedGroup.id
              ? {
                  ...group,
                  members: group.members.map((member) =>
                    member.id === updatedMember.id ? updatedMember : member,
                  ),
                }
              : group,
          )
        : members.map((member) =>
            member.id === updatedMember.id ? updatedMember : member,
          );

      selectedGroup ? setGroups(updatedMembers) : setMembers(updatedMembers);
      setSelectedMember(null);
      setMemberDetails({
        firstName: "",
        lastName: "",
        email: "",
        mobileNumber: "",
      });
    }
  };

  // Render group management section
  const renderGroupManagement = () => {
    return (
      <div className="group-management">
        <h2>Group List</h2>
        <div className="group-actions">
          <button onClick={handleGroupAdd}>Add Group</button>
          <button onClick={handleGroupEdit} disabled={!selectedGroup}>
            Edit Group
          </button>
          <button onClick={handleGroupDelete} disabled={!selectedGroup}>
            Delete Group
          </button>
        </div>
        <ul>
          {groups.map((group) => (
            <li key={group.id} onClick={() => setSelectedGroup(group)}>
              {group.name}
            </li>
          ))}
        </ul>
      </div>
    );
  };

  // Render member management section
  const renderMemberManagement = () => {
    return (
      <div className="member-management">
        <h2>Group Members</h2>
        <div className="member-actions">
          <button onClick={() => handleMemberAdd()}>Add Member</button>
          <button onClick={() => handleMemberEdit()} disabled={!selectedMember}>
            Edit Member
          </button>
          <button onClick={handleMemberDelete} disabled={!selectedMember}>
            Delete Member
          </button>
        </div>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Mobile Number</th>
            </tr>
          </thead>
          <tbody>
            {(selectedGroup ? selectedGroup.members : members).map((member) => (
              <tr key={member.id} onClick={() => setSelectedMember(member)}>
                <td>{member.id}</td>
                <td>{member.firstName}</td>
                <td>{member.lastName}</td>
                <td>{member.email}</td>
                <td>{member.mobileNumber}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  // Render member details section
  const renderMemberDetails = () => {
    return (
      <div className="member-details">
        <h2>Member Details</h2>
        {selectedMember && (
          <div>
            <p>ID: {selectedMember.id}</p>
            <p>First Name: {selectedMember.firstName}</p>
            <p>Last Name: {selectedMember.lastName}</p>
            <p>Email: {selectedMember.email}</p>
            <p>Mobile Number: {selectedMember.mobileNumber}</p>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="client-page">
      {renderGroupManagement()}
      {renderMemberManagement()}
      {renderMemberDetails()}
    </div>
  );
};

export default ClientPage;
