const { buildVisitPacket } = require('./clinic-intake');

const packet = buildVisitPacket({
  patientName: '  Jordan   Lee  ',
  clinicName: 'Northside Family Clinic',
  appointmentDate: '2026-05-18T14:30:00',
  formsSubmitted: ['insurance', 'consent']
});

console.log(JSON.stringify(packet, null, 2));
