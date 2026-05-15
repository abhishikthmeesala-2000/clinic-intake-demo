function normalizePatientName(name) {
  if (typeof name !== 'string') {
    return 'Unknown patient';
  }

  const cleaned = name.trim().replace(/\s+/g, ' ');
  return cleaned.length > 0 ? cleaned : 'Unknown patient';
}

function formatAppointmentDate(appointmentDate) {
  const date = new Date(appointmentDate);

  if (Number.isNaN(date.getTime())) {
    return 'TBD';
  }

  return date.toLocaleString('en-US', {
    dateStyle: 'medium',
    timeStyle: 'short'
  });
}

function buildVisitPacket({
  patientName,
  clinicName,
  appointmentDate,
  formsSubmitted = []
}) {
  const normalizedPatientName = normalizePatientName(patientName);
  const normalizedClinicName = typeof clinicName === 'string' && clinicName.trim()
    ? clinicName.trim().replace(/\s+/g, ' ')
    : 'Clinic';
  const submittedForms = Array.isArray(formsSubmitted) ? formsSubmitted : [];
  const missingForms = ['insurance', 'consent', 'id'].filter((form) => !submittedForms.includes(form));

  return {
    patientName: normalizedPatientName,
    clinicName: normalizedClinicName,
    appointmentTime: formatAppointmentDate(appointmentDate),
    formsSubmitted: [...submittedForms],
    missingForms,
    reminder: `${normalizedPatientName}, your visit at ${normalizedClinicName} is scheduled for ${formatAppointmentDate(appointmentDate)}.`
  };
}

module.exports = {
  buildVisitPacket,
  formatAppointmentDate,
  normalizePatientName
};
