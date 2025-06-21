
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import EmployeeForm from '@/components/EmployeeForm';
import EmployeeCard from '@/components/EmployeeCard';
import EmployeeTable from '@/components/EmployeeTable';
import { Employee, NewEmployeeData } from '@/types/employee';
import { Users, Plus, DollarSign, Building } from 'lucide-react';

const Index = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [viewMode, setViewMode] = useState<'cards' | 'table'>('cards');

  const handleAddEmployee = (newEmployeeData: NewEmployeeData) => {
    const newEmployee: Employee = {
      ...newEmployeeData,
      id: Date.now().toString(),
      status: 'Active',
    };
    setEmployees(prev => [...prev, newEmployee]);
    setShowForm(false);
  };

  const totalSalaryBudget = employees.reduce((sum, emp) => sum + emp.salary, 0);
  const activeEmployees = employees.filter(emp => emp.status === 'Active').length;
  const departments = [...new Set(employees.map(emp => emp.department).filter(Boolean))].length;

  return (
    <div className="min-h-screen bg-background p-4 md:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold text-foreground">Employee Management System</h1>
          <p className="text-xl text-muted-foreground">Manage your workforce efficiently</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Employees</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{employees.length}</div>
              <p className="text-xs text-muted-foreground">
                {activeEmployees} active employees
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Salary Budget</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {new Intl.NumberFormat('en-US', {
                  style: 'currency',
                  currency: 'USD',
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                }).format(totalSalaryBudget)}
              </div>
              <p className="text-xs text-muted-foreground">
                Annual payroll
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Departments</CardTitle>
              <Building className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{departments}</div>
              <p className="text-xs text-muted-foreground">
                Active departments
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Add Employee Button */}
        <div className="flex justify-center">
          <Button 
            onClick={() => setShowForm(!showForm)}
            size="lg"
            className="gap-2"
          >
            <Plus className="h-4 w-4" />
            {showForm ? 'Cancel' : 'Add New Employee'}
          </Button>
        </div>

        {/* Employee Form */}
        {showForm && (
          <div className="flex justify-center">
            <EmployeeForm onAddEmployee={handleAddEmployee} />
          </div>
        )}

        {/* View Mode Toggle */}
        {employees.length > 0 && (
          <div className="flex justify-center gap-2">
            <Button
              variant={viewMode === 'cards' ? 'default' : 'outline'}
              onClick={() => setViewMode('cards')}
            >
              Card View
            </Button>
            <Button
              variant={viewMode === 'table' ? 'default' : 'outline'}
              onClick={() => setViewMode('table')}
            >
              Table View
            </Button>
          </div>
        )}

        {/* Employee Display */}
        {employees.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-center">
              Employee Directory ({employees.length})
            </h2>
            
            {viewMode === 'cards' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {employees.map((employee) => (
                  <EmployeeCard key={employee.id} employee={employee} />
                ))}
              </div>
            ) : (
              <EmployeeTable employees={employees} />
            )}
          </div>
        )}

        {/* Empty State */}
        {employees.length === 0 && !showForm && (
          <Card className="text-center py-12">
            <CardContent>
              <Users className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No Employees Yet</h3>
              <p className="text-muted-foreground mb-4">
                Start building your team by adding your first employee
              </p>
              <Button onClick={() => setShowForm(true)} className="gap-2">
                <Plus className="h-4 w-4" />
                Add First Employee
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Index;
