const test = require('node:test');
const assert = require('node:assert/strict');

const {
  buildVisitPacket,
  formatAppointmentDate,
  normalizePatientName,
  summarizeIntakeStatus
} = require('../src/clinic-intake');

test('normalizePatientName trims and collapses whitespace', () => {
  assert.equal(normalizePatientName('  Jordan   Lee  '), 'Jordan Lee');
});

test('normalizePatientName falls back to a safe default', () => {
  assert.equal(normalizePatientName('   '), 'Unknown patient');
  assert.equal(normalizePatientName(null), 'Unknown patient');
});

test('formatAppointmentDate formats a valid date', () => {
  const formatted = formatAppointmentDate('2026-05-18T14:30:00');

  assert.match(formatted, /May|18|2026/);
});

test('buildVisitPacket reports the expected shape', () => {
  const packet = buildVisitPacket({
    patientName: '  Jordan   Lee  ',
    clinicName: ' Northside Family Clinic ',
    appointmentDate: '2026-05-18T14:30:00',
    formsSubmitted: ['insurance', 'consent']
  });

  assert.deepEqual(packet, {
    patientName: 'Jordan Lee',
    clinicName: 'Northside Family Clinic',
    appointmentTime: formatAppointmentDate('2026-05-18T14:30:00'),
    formsSubmitted: ['insurance', 'consent'],
    missingForms: ['id'],
    intakeStatus: 'needs follow-up',
    isReadyForCheckIn: false,
    nextStep: 'Collect the missing forms: id.',
    reminder: 'Jordan Lee, your visit at Northside Family Clinic is scheduled for ' + formatAppointmentDate('2026-05-18T14:30:00') + '.'
  });
});

test('summarizeIntakeStatus marks complete intake as ready', () => {
  assert.deepEqual(summarizeIntakeStatus([]), {
    intakeStatus: 'ready',
    isReadyForCheckIn: true,
    nextStep: 'All intake forms are complete.'
  });
});
