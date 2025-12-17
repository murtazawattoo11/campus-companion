import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserPlus, Save, RotateCcw } from 'lucide-react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { createStudent, Student } from '@/services/api';
import { toast } from 'sonner';

const departments = [
  'Computer Science',
  'Mathematics',
  'Physics',
  'Engineering',
  'Biology',
  'Chemistry',
  'Economics',
  'Business Administration',
  'Psychology',
  'Literature',
];

export default function AddStudent() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<Student>({
    id: '',
    name: '',
    department: '',
    email: '',
    phone: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleReset = () => {
    setFormData({
      id: '',
      name: '',
      department: '',
      email: '',
      phone: '',
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.id || !formData.name || !formData.department || !formData.email) {
      toast.error('Please fill in all required fields');
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error('Please enter a valid email address');
      return;
    }

    setIsSubmitting(true);
    
    try {
      await createStudent(formData);
      toast.success('Student added successfully!');
      navigate('/students');
    } catch (error) {
      toast.error('Failed to add student. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <DashboardLayout 
      title="Add New Student" 
      subtitle="Enter the student's information to create a new record."
    >
      <div className="max-w-2xl animate-slide-up">
        <div className="bg-card rounded-xl shadow-card border border-border p-8">
          <div className="flex items-center gap-3 mb-6 pb-6 border-b border-border">
            <div className="p-2 rounded-lg bg-accent/10">
              <UserPlus className="h-6 w-6 text-accent" />
            </div>
            <div>
              <h2 className="font-heading text-xl font-bold text-foreground">Student Information</h2>
              <p className="text-sm text-muted-foreground">Fill in the details below</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Student ID */}
              <div>
                <label htmlFor="id" className="block text-sm font-medium text-foreground mb-2">
                  Student ID <span className="text-destructive">*</span>
                </label>
                <Input
                  id="id"
                  name="id"
                  placeholder="e.g., STU001"
                  value={formData.id}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Name */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                  Full Name <span className="text-destructive">*</span>
                </label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Enter student's full name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Department */}
              <div>
                <label htmlFor="department" className="block text-sm font-medium text-foreground mb-2">
                  Department <span className="text-destructive">*</span>
                </label>
                <select
                  id="department"
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  required
                  className="flex h-11 w-full rounded-lg border border-input bg-background px-4 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 transition-all duration-200"
                >
                  <option value="">Select department</option>
                  {departments.map(dept => (
                    <option key={dept} value={dept}>{dept}</option>
                  ))}
                </select>
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                  Email Address <span className="text-destructive">*</span>
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="student@university.edu"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Phone */}
              <div className="md:col-span-2">
                <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
                  Phone Number
                </label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="e.g., 555-0123"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-4 pt-6 border-t border-border">
              <Button
                type="submit"
                variant="accent"
                size="lg"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Saving...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Save className="h-5 w-5" />
                    Save Student
                  </span>
                )}
              </Button>
              <Button
                type="button"
                variant="outline"
                size="lg"
                onClick={handleReset}
              >
                <RotateCcw className="h-5 w-5" />
                Reset
              </Button>
            </div>
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
}
