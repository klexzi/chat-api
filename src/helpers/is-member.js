const isMember = (participants, organization) => {
  let allMembers = true;
  participants.forEach(participant => {
    const isMember = organization.members.find(member => {
      return String(member) === String(participant);
    });
    if (!isMember) {
      allMembers = false;
    }
  });
  return allMembers;
};

export { isMember as default };
