const isParticipant = (newParticipants, group) => {
  let aParticipant = false;
  newParticipants.forEach(newParticipant => {
    const isParticipant = group.participants.find(participant => {
      return String(participant) === String(newParticipant);
    });
    if (isParticipant) {
      aParticipant = true;
    }
  });
  return aParticipant;
};

export { isParticipant as default };
