import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Users, UserPlus, Eye, TrendingUp } from 'lucide-react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { getStudents, Student } from '@/services/api';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ElementType;
  color: 'primary' | 'accent' | 'success' | 'info';
  link?: string;
  linkText?: string;
  delay?: number;
}

function StatCard({ title, value, icon: Icon, color, link, linkText, delay = 0 }: StatCardProps) {
  const colorClasses = {
    primary: 'bg-primary text-primary-foreground',
    accent: 'bg-accent text-accent-foreground',
    success: 'bg-success text-success-foreground',
    info: 'bg-info text-info-foreground',
  };

  return (
    <div 
      className="bg-card rounded-xl shadow-card border border-border p-6 hover:shadow-lg transition-all duration-300 animate-slide-up"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="mt-2 text-3xl font-heading font-bold text-foreground">{value}</p>
          {link && (
            <Link 
              to={link} 
              className="mt-4 inline-flex items-center text-sm font-medium text-accent hover:text-accent/80 transition-colors"
            >
              {linkText}
              <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          )}
        </div>
        <div className={`p-3 rounded-lg ${colorClasses[color]}`}>
          <Icon className="h-6 w-6" />
        </div>
      </div>
    </div>
  );
}

export default function Dashboard() {
  const [students, setStudents] = useState<Student[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getStudents();
        setStudents(data);
      } catch (error) {
        console.error('Failed to fetch students:', error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  // Calculate department statistics
  const departments = [...new Set(students.map(s => s.department))];

  return (
    <DashboardLayout 
      title="Dashboard" 
      subtitle="Welcome back! Here's an overview of your student management system."
    >
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total Students"
          value={isLoading ? '...' : students.length}
          icon={Users}
          color="primary"
          link="/students"
          linkText="View all"
          delay={0}
        />
        <StatCard
          title="Departments"
          value={isLoading ? '...' : departments.length}
          icon={TrendingUp}
          color="accent"
          delay={100}
        />
        <StatCard
          title="Add Student"
          value="+"
          icon={UserPlus}
          color="success"
          link="/add-student"
          linkText="Add new"
          delay={200}
        />
        <StatCard
          title="View Records"
          value={isLoading ? '...' : students.length}
          icon={Eye}
          color="info"
          link="/students"
          linkText="Browse"
          delay={300}
        />
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Students */}
        <div className="bg-card rounded-xl shadow-card border border-border p-6 animate-slide-up" style={{ animationDelay: '400ms' }}>
          <h3 className="font-heading text-lg font-bold text-foreground mb-4">Recent Students</h3>
          {isLoading ? (
            <div className="space-y-3">
              {[1, 2, 3].map(i => (
                <div key={i} className="h-12 bg-muted animate-pulse rounded-lg" />
              ))}
            </div>
          ) : (
            <div className="space-y-3">
              {students.slice(0, 5).map((student) => (
                <div key={student.id} className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg">
                  <div>
                    <p className="font-medium text-foreground">{student.name}</p>
                    <p className="text-sm text-muted-foreground">{student.department}</p>
                  </div>
                  <span className="text-xs font-mono bg-primary/10 text-primary px-2 py-1 rounded">
                    {student.id}
                  </span>
                </div>
              ))}
            </div>
          )}
          <Link 
            to="/students" 
            className="mt-4 inline-flex items-center text-sm font-medium text-accent hover:text-accent/80 transition-colors"
          >
            View all students
            <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        {/* Department Overview */}
        <div className="bg-card rounded-xl shadow-card border border-border p-6 animate-slide-up" style={{ animationDelay: '500ms' }}>
          <h3 className="font-heading text-lg font-bold text-foreground mb-4">Department Overview</h3>
          {isLoading ? (
            <div className="space-y-3">
              {[1, 2, 3].map(i => (
                <div key={i} className="h-12 bg-muted animate-pulse rounded-lg" />
              ))}
            </div>
          ) : (
            <div className="space-y-3">
              {departments.map((dept) => {
                const count = students.filter(s => s.department === dept).length;
                const percentage = (count / students.length) * 100;
                return (
                  <div key={dept} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium text-foreground">{dept}</span>
                      <span className="text-muted-foreground">{count} students</span>
                    </div>
                    <div className="h-2 bg-secondary rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-accent rounded-full transition-all duration-500"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
