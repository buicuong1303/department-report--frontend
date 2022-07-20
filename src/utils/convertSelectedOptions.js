const convertSelectedOptions = (str) => {
  if (str === 'n/a') return 'N/A';
  if (str === 'completed') return 'Completed';
  if (str === 'noNeed') return 'No Need';
  if (str === 'notRequested') return 'Not Requested';
  if (str === 'approved') return 'Approved';
  if (str === 'declined') return 'Declined';
  if (str === 'inforce') return 'Inforce';
  if (str === 'withdrawn') return 'Withdrawn';
  if (str === 'nonTaken') return 'Non-taken';
  if (str === 'notSchedule') return 'Not Schedule';
  if (str === 'inProgress') return 'In Progress';
};

export {
  convertSelectedOptions
};

