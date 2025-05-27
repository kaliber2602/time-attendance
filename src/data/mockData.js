export const tasks = [
  { id: 1, name: "Prepare monthly report", deadline: "2025-06-01", priority: "High", assignedTo: "John Doe", status: "Pending" },
  { id: 2, name: "Team meeting", deadline: "2025-05-30", priority: "Medium", assignedTo: "Jane Smith", status: "Completed" },
];

export const adjustmentRequests = [
  { id: 1, employee: "John Doe", type: "Late Check-in", date: "2025-05-25", reason: "Traffic jam", status: "Pending" },
  { id: 2, employee: "Jane Smith", type: "Leave Request", date: "2025-05-26", reason: "Family emergency", status: "Pending" },
];

export const employees = [
  { id: 1, name: "John Doe", position: "Developer", performance: "Excellent" },
  { id: 2, name: "Jane Smith", position: "Designer", performance: "Good" },
];

export const summary = [
  { name: "John Doe", daysWorked: 20, lateDays: 2, absentDays: 1, overtimeHours: 10 },
  { name: "Jane Smith", daysWorked: 18, lateDays: 1, absentDays: 2, overtimeHours: 8 },
];

export const setSchedule = [
  {
    name: "Jane Doe",
    employeeId: "EMP001",
    department: "Sales",
    schedule: [
      { day: "Monday", shift: "Morning", time: "08:00 - 12:00" },
      { day: "Tuesday", shift: "Afternoon", time: "13:00 - 17:00" },
      { day: "Wednesday", shift: "Off" },
      { day: "Thursday", shift: "Morning", time: "08:00 - 12:00" },
      { day: "Friday", shift: "Full Day", time: "08:00 - 17:00" },
    ]
  },
  {
    name: "John Smith",
    employeeId: "EMP002",
    department: "Engineering",
    schedule: [
      { day: "Monday", shift: "Full Day", time: "09:00 - 18:00" },
      { day: "Tuesday", shift: "Full Day", time: "09:00 - 18:00" },
      { day: "Wednesday", shift: "Morning", time: "09:00 - 12:00" },
      { day: "Thursday", shift: "Off" },
      { day: "Friday", shift: "Afternoon", time: "13:00 - 18:00" },
    ]
  }
];
