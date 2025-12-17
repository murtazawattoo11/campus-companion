// API Service for Student Management System
// These are placeholder endpoints - connect to your actual backend

const API_BASE_URL = '/api';

export interface Student {
  id: string;
  name: string;
  department: string;
  email: string;
  phone: string;
}

// Simulated data for demo purposes
let mockStudents: Student[] = [
  { id: 'STU001', name: 'John Anderson', department: 'Computer Science', email: 'john.anderson@university.edu', phone: '555-0101' },
  { id: 'STU002', name: 'Sarah Mitchell', department: 'Mathematics', email: 'sarah.mitchell@university.edu', phone: '555-0102' },
  { id: 'STU003', name: 'Michael Chen', department: 'Physics', email: 'michael.chen@university.edu', phone: '555-0103' },
  { id: 'STU004', name: 'Emily Rodriguez', department: 'Engineering', email: 'emily.rodriguez@university.edu', phone: '555-0104' },
  { id: 'STU005', name: 'David Kim', department: 'Biology', email: 'david.kim@university.edu', phone: '555-0105' },
];

// Simulate network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * GET /students - Fetch all students
 */
export async function getStudents(): Promise<Student[]> {
  await delay(500); // Simulate network delay
  
  // In production, use:
  // const response = await fetch(`${API_BASE_URL}/students`);
  // if (!response.ok) throw new Error('Failed to fetch students');
  // return response.json();
  
  return [...mockStudents];
}

/**
 * GET /students/:id - Fetch single student by ID
 */
export async function getStudentById(id: string): Promise<Student | null> {
  await delay(300);
  
  // In production, use:
  // const response = await fetch(`${API_BASE_URL}/students/${id}`);
  // if (!response.ok) throw new Error('Student not found');
  // return response.json();
  
  return mockStudents.find(s => s.id === id) || null;
}

/**
 * POST /students - Create new student
 */
export async function createStudent(student: Student): Promise<Student> {
  await delay(500);
  
  // In production, use:
  // const response = await fetch(`${API_BASE_URL}/students`, {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify(student),
  // });
  // if (!response.ok) throw new Error('Failed to create student');
  // return response.json();
  
  mockStudents.push(student);
  return student;
}

/**
 * PUT /students/:id - Update existing student
 */
export async function updateStudent(id: string, student: Partial<Student>): Promise<Student> {
  await delay(500);
  
  // In production, use:
  // const response = await fetch(`${API_BASE_URL}/students/${id}`, {
  //   method: 'PUT',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify(student),
  // });
  // if (!response.ok) throw new Error('Failed to update student');
  // return response.json();
  
  const index = mockStudents.findIndex(s => s.id === id);
  if (index === -1) throw new Error('Student not found');
  
  mockStudents[index] = { ...mockStudents[index], ...student };
  return mockStudents[index];
}

/**
 * DELETE /students/:id - Delete student
 */
export async function deleteStudent(id: string): Promise<void> {
  await delay(500);
  
  // In production, use:
  // const response = await fetch(`${API_BASE_URL}/students/${id}`, {
  //   method: 'DELETE',
  // });
  // if (!response.ok) throw new Error('Failed to delete student');
  
  mockStudents = mockStudents.filter(s => s.id !== id);
}

/**
 * Search students by ID or Name
 */
export async function searchStudents(query: string): Promise<Student[]> {
  await delay(300);
  
  const lowerQuery = query.toLowerCase();
  return mockStudents.filter(
    s => s.id.toLowerCase().includes(lowerQuery) || 
         s.name.toLowerCase().includes(lowerQuery)
  );
}
