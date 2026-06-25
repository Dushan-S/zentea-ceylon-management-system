import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import DashboardShell from '../../components/common/DashboardShell';
import DashboardCard from '../../components/common/DashboardCard';
import SectionCard from '../../components/common/SectionCard';
import { adminListUsers, adminUpdateUser } from '../../api/authApi';
import { useAuth } from '../../context/AuthContext';
import MonthlyBarChart from '../../components/charts/MonthlyBarChart.jsx';
import {
  Users,
  UserCheck,
  Clock,
  Briefcase,
  FileText,
  Search,
  X,
  Filter,
  Download
} from 'lucide-react';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const roleOrder = ['Admin', 'Collector', 'Supplier', 'Employee', 'Customer'];
const reportRoleOrder = ['Employee', 'Collector', 'Supplier', 'Customer', 'Admin'];

const getBadge = (value) => {
  if (value === 0) return { text: 'Stable', tone: 'bg-slate-100 text-slate-500' };
  if (value > 0) return { text: `+${value} new`, tone: 'bg-emerald-100 text-emerald-600' };
  return { text: `${value} changed`, tone: 'bg-amber-100 text-amber-600' };
};

export default function AdminDashboard() {
  const menu = [
    { to: '/admin', label: 'Dashboard' },
    { to: '/admin/salary', label: 'Salary Management' },
    { to: '/admin/inventory', label: 'Inventory Management' },
    { to: '/admin/order', label: 'Order Management' },
    { to: '/admin/panel', label: 'Cultivation Management' },
  ];

  const { token } = useAuth();
  const [users, setUsers] = useState([]);
  
  // Search and Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');
  const [sortBy, setSortBy] = useState('recent');
  
  // Report Generation States
  const [generatingReport, setGeneratingReport] = useState(false);
  const [showReportGenerator, setShowReportGenerator] = useState(false);
  
  const list = Array.isArray(users) ? users : [];

  const load = async () => {
    if (!token) {
      setUsers([]);
      return;
    }
    try {
      const { data } = await adminListUsers(token);
      const list = Array.isArray(data) ? data : Array.isArray(data?.users) ? data.users : [];
      setUsers(list);
    } catch (err) {
      console.error('Failed to load users', err);
      setUsers([]);
    }
  };

  useEffect(() => {
    load();
  }, [token]);

  const update = async (u, changes) => {
    try {
      await adminUpdateUser(token, u._id, changes);
      await load();
    } catch (err) {
      console.error('Update failed', err);
    }
  };

  const stats = useMemo(() => {
    const total = list.length;
    const pending = list.filter((u) => !u.isActive).length;
    const active = total - pending;
    const employees = list.filter((u) => u.role === 'Employee').length;
    return [
      { label: 'Total Users', value: total, sub: 'All roles combined', icon: Users, accentColor: 'emerald', badge: getBadge(total - active) },
      { label: 'Active Accounts', value: active, sub: 'Approved & enabled', icon: UserCheck, accentColor: 'blue', badge: getBadge(active - employees) },
      { label: 'Pending Approval', value: pending, sub: 'Awaiting review', icon: Clock, accentColor: 'amber', badge: getBadge(pending) },
      { label: 'Employees', value: employees, sub: 'Payroll staff', icon: Briefcase, accentColor: 'purple', badge: getBadge(employees) },
    ];
  }, [list]);

  const roleBreakdown = useMemo(() => {
    const counts = roleOrder.map((role) => ({
      role,
      count: list.filter((u) => u.role === role).length,
    }));
    const total = counts.reduce((sum, item) => sum + item.count, 0) || 1;
    return counts.map((item) => ({
      ...item,
      percent: Math.round((item.count / total) * 100),
    }));
  }, [list]);

  // Filtered and sorted users list
  const filteredUsers = useMemo(() => {
    let filtered = [...list];

    // Search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(user => {
        // Only search by name (names that start with the search term)
        return user.name?.toLowerCase().startsWith(query);
      });
    }

    // Role filter
    if (roleFilter !== 'all') {
      filtered = filtered.filter(user => user.role === roleFilter);
    }

    // Status filter
    if (statusFilter !== 'all') {
      if (statusFilter === 'active') {
        filtered = filtered.filter(user => user.isActive);
      } else if (statusFilter === 'pending') {
        filtered = filtered.filter(user => !user.isActive);
      }
    }

    // Date filter
    if (dateFilter !== 'all') {
      const now = new Date();
      const filterDate = new Date();
      
      switch (dateFilter) {
        case 'week':
          filterDate.setDate(now.getDate() - 7);
          break;
        case 'month':
          filterDate.setMonth(now.getMonth() - 1);
          break;
        case 'quarter':
          filterDate.setMonth(now.getMonth() - 3);
          break;
        default:
          filterDate.setFullYear(1970);
      }
      
      filtered = filtered.filter(user => 
        new Date(user.createdAt) >= filterDate
      );
    }

    // Sort
    switch (sortBy) {
      case 'name-asc':
        filtered.sort((a, b) => (a.name || '').localeCompare(b.name || ''));
        break;
      case 'name-desc':
        filtered.sort((a, b) => (b.name || '').localeCompare(a.name || ''));
        break;
      case 'role':
        filtered.sort((a, b) => {
          const aIndex = roleOrder.indexOf(a.role);
          const bIndex = roleOrder.indexOf(b.role);
          return aIndex - bIndex;
        });
        break;
      case 'recent':
      default:
        filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
    }

    return filtered;
  }, [list, searchQuery, roleFilter, statusFilter, dateFilter, sortBy]);

  // Clear all filters function
  const clearFilters = () => {
    setSearchQuery('');
    setRoleFilter('all');
    setStatusFilter('all');
    setDateFilter('all');
    setSortBy('recent');
  };

  // PDF Report Generation Function
  const generateUserReport = async () => {
    try {
      setGeneratingReport(true);
      
      // Small delay to show loading state
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const doc = new jsPDF();
      const currentDate = new Date().toLocaleDateString();
      const currentTime = new Date().toLocaleTimeString();
      
      // Header
      doc.setFontSize(20);
      doc.setTextColor(11, 107, 60); // emerald-600
      doc.text('ZenTea User Management Report', 20, 30);
      
      doc.setFontSize(12);
      doc.setTextColor(100, 100, 100);
      doc.text(`Generated on: ${currentDate} at ${currentTime}`, 20, 40);
      
      let yPosition = 60;
      
      // Report Summary
      doc.setFontSize(14);
      doc.setTextColor(0, 0, 0);
      doc.text('Report Summary', 20, yPosition);
      yPosition += 15;
      
      doc.setFontSize(11);
      doc.text(`Total Users in Report: ${filteredUsers.length}`, 30, yPosition);
      yPosition += 7;
      doc.text(`Total Users in System: ${list.length}`, 30, yPosition);
      yPosition += 7;
      
      // Active filters summary
      const activeFilters = [];
      if (searchQuery) activeFilters.push(`Name filter: "${searchQuery}"`);
      if (roleFilter !== 'all') activeFilters.push(`Role: ${roleFilter}`);
      if (statusFilter !== 'all') activeFilters.push(`Status: ${statusFilter}`);
      if (dateFilter !== 'all') activeFilters.push(`Registration: ${dateFilter}`);
      
      if (activeFilters.length > 0) {
        doc.text('Applied Filters:', 30, yPosition);
        yPosition += 7;
        activeFilters.forEach(filter => {
          doc.text(`• ${filter}`, 40, yPosition);
          yPosition += 7;
        });
      } else {
        doc.text('No filters applied (showing all users)', 30, yPosition);
        yPosition += 7;
      }
      
      yPosition += 15;
      
      // Group users by role in the specified order
      const usersByRole = {};
      reportRoleOrder.forEach(role => {
        usersByRole[role] = filteredUsers.filter(user => user.role === role);
      });
      
      // Generate sections for each role
      reportRoleOrder.forEach(role => {
        const roleUsers = usersByRole[role];
        if (roleUsers.length === 0) return;
        
        // Check if we need a new page
        if (yPosition > 220) {
          doc.addPage();
          yPosition = 30;
        }
        
        // Role section header
        doc.setFontSize(16);
        doc.setTextColor(11, 107, 60);
        doc.text(`${role} (${roleUsers.length} users)`, 20, yPosition);
        yPosition += 15;
        
        // Create table data for this role
        const roleTableData = roleUsers.map(user => [
          user.name || 'N/A',
          user.email || 'N/A',
          user.uniqueId || 'N/A',
          user.isActive ? 'Active' : 'Pending',
          new Date(user.createdAt).toLocaleDateString()
        ]);
        
        // Generate table for this role
        autoTable(doc, {
          startY: yPosition,
          head: [['Name', 'Email', 'Unique ID', 'Status', 'Registered']],
          body: roleTableData,
          theme: 'grid',
          headStyles: { 
            fillColor: [11, 107, 60],
            textColor: [255, 255, 255],
            fontStyle: 'bold'
          },
          styles: { 
            fontSize: 9,
            cellPadding: 3
          },
          margin: { left: 20, right: 20 },
          alternateRowStyles: { fillColor: [248, 250, 252] }
        });
        
        yPosition = doc.lastAutoTable.finalY + 20;
      });
      
      // Add summary statistics page if there are multiple roles
      if (Object.keys(usersByRole).filter(role => usersByRole[role].length > 0).length > 1) {
        doc.addPage();
        yPosition = 30;
        
        doc.setFontSize(16);
        doc.setTextColor(11, 107, 60);
        doc.text('Statistics by Role', 20, yPosition);
        yPosition += 20;
        
        const statsData = reportRoleOrder
          .filter(role => usersByRole[role].length > 0)
          .map(role => {
            const roleUsers = usersByRole[role];
            const activeCount = roleUsers.filter(u => u.isActive).length;
            const pendingCount = roleUsers.length - activeCount;
            return [
              role,
              roleUsers.length.toString(),
              activeCount.toString(),
              pendingCount.toString(),
              `${((roleUsers.length / filteredUsers.length) * 100).toFixed(1)}%`
            ];
          });
        
        autoTable(doc, {
          startY: yPosition,
          head: [['Role', 'Total Users', 'Active', 'Pending', '% of Report']],
          body: statsData,
          theme: 'grid',
          headStyles: { 
            fillColor: [11, 107, 60],
            textColor: [255, 255, 255],
            fontStyle: 'bold'
          },
          styles: { 
            fontSize: 10,
            cellPadding: 4
          },
          margin: { left: 20, right: 20 }
        });
      }
      
      // Footer on all pages
      const pageCount = doc.internal.getNumberOfPages();
      for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        doc.setFontSize(10);
        doc.setTextColor(150, 150, 150);
        doc.text(`Page ${i} of ${pageCount}`, 20, 285);
        doc.text('ZenTea User Management System', 120, 285);
        doc.text(`Generated: ${currentDate}`, 170, 285);
      }
      
      // Save the PDF
      const filterSuffix = activeFilters.length > 0 ? '_filtered' : '_complete';
      const fileName = `ZenTea_User_Report_${new Date().toISOString().split('T')[0]}${filterSuffix}.pdf`;
      doc.save(fileName);
      
    } catch (error) {
      console.error('Error generating user report:', error);
      alert('Error generating user report. Please try again.');
    } finally {
      setGeneratingReport(false);
    }
  };

  const chartData = useMemo(() => (
    roleBreakdown.filter((item) => item.count > 0).map((item) => ({
      label: item.role,
      net: item.count,
    }))
  ), [roleBreakdown]);

  return (
    <DashboardShell
      menu={menu}
      title="Admin Overview"
      subtitle="Monitor account activity and manage team access"
    >
      <div className="space-y-8">
        {/* Stats Cards */}
        <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {stats.map((card) => (
            <DashboardCard
              key={card.label}
              icon={card.icon}
              title={card.label}
              value={card.value.toLocaleString()}
              subtitle={card.sub}
              accentColor={card.accentColor}
            />
          ))}
        </section>

        <section className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-100">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-wide text-slate-500">Team Composition</p>
                <p className="text-lg font-semibold text-slate-900">Accounts by role</p>
              </div>
            </div>
            {chartData.length === 0 ? (
              <p className="py-12 text-center text-sm text-slate-500">No user data available yet.</p>
            ) : (
              <MonthlyBarChart data={chartData} activeMonth={null} />
            )}
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-100">
            <p className="text-sm font-semibold text-slate-700">Role Distribution</p>
            <ul className="mt-4 space-y-4">
              {roleBreakdown.map((item) => (
                <li key={item.role} className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-800">{item.role}</p>
                    <p className="text-xs text-slate-500">{item.count} accounts</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-20 rounded-full bg-slate-100">
                      <div className="h-full rounded-full bg-emerald-500" style={{ width: `${item.percent}%` }} />
                    </div>
                    <span className="text-xs font-semibold text-slate-600">{item.percent}%</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* User Management Section */}
        <SectionCard
          title="User Management"
          subtitle="Approve, update and manage platform access"
          icon={Users}
        >
          {/* Search and Filter Controls */}
          <div className="space-y-5">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search names starting with..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition text-sm"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
                  aria-label="Clear search"
                >
                  <X className="h-5 w-5" />
                </button>
              )}
            </div>

            {/* Filter Controls */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
              {/* Role Filter */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-2">Role</label>
                <select
                  value={roleFilter}
                  onChange={(e) => setRoleFilter(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                >
                  <option value="all">All Roles</option>
                  {roleOrder.map(role => (
                    <option key={role} value={role}>{role}</option>
                  ))}
                </select>
              </div>

              {/* Status Filter */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-2">Status</label>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="pending">Pending</option>
                </select>
              </div>

              {/* Date Filter */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-2">Registered</label>
                <select
                  value={dateFilter}
                  onChange={(e) => setDateFilter(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                >
                  <option value="all">All Time</option>
                  <option value="week">This Week</option>
                  <option value="month">This Month</option>
                  <option value="quarter">Last 3 Months</option>
                </select>
              </div>

              {/* Sort Filter */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-2">Sort</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                >
                  <option value="recent">Recent First</option>
                  <option value="name-asc">Name (A-Z)</option>
                  <option value="name-desc">Name (Z-A)</option>
                  <option value="role">By Role</option>
                </select>
              </div>

              {/* Clear Filters Button */}
              <div className="flex items-end">
                <button
                  onClick={clearFilters}
                  className="w-full px-4 py-2 text-sm font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  <Filter className="h-4 w-4" />
                  Clear
                </button>
              </div>
            </div>

            {/* Results Summary */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-sm text-gray-600 bg-gray-50 px-4 py-3 rounded-lg">
              <span>
                Showing <span className="font-semibold text-gray-900">{filteredUsers.length}</span> of{' '}
                <span className="font-semibold text-gray-900">{list.length}</span> users
              </span>
              {(searchQuery || roleFilter !== 'all' || statusFilter !== 'all' || dateFilter !== 'all') && (
                <span className="inline-flex items-center gap-1 text-emerald-600 font-semibold">
                  <Filter className="h-4 w-4" />
                  Filters applied
                </span>
              )}
            </div>
          </div>
        </SectionCard>

        <SectionCard
          title="Generate User Report"
          subtitle="Create PDF reports with current filter settings"
          icon={FileText}
          action={
            <button
              onClick={() => setShowReportGenerator(!showReportGenerator)}
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-lg hover:bg-emerald-100 transition-colors"
            >
              {showReportGenerator ? 'Hide Options' : 'Show Options'}
            </button>
          }
        >
          {showReportGenerator && (
                <div className="bg-slate-50 rounded-xl p-6 space-y-6">
                  {/* Report Preview Info */}
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <div className="bg-white rounded-lg p-4 border border-slate-200">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                          <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-slate-900">Total Users</p>
                          <p className="text-2xl font-bold text-blue-600">{filteredUsers.length}</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white rounded-lg p-4 border border-slate-200">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                          <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-slate-900">Active Users</p>
                          <p className="text-2xl font-bold text-emerald-600">{filteredUsers.filter(u => u.isActive).length}</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white rounded-lg p-4 border border-slate-200">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                          <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-slate-900">Pending</p>
                          <p className="text-2xl font-bold text-amber-600">{filteredUsers.filter(u => !u.isActive).length}</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white rounded-lg p-4 border border-slate-200">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                          <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-slate-900">Roles</p>
                          <p className="text-2xl font-bold text-purple-600">{new Set(filteredUsers.map(u => u.role)).size}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Role Distribution Preview */}
                  <div className="bg-white rounded-lg p-4 border border-slate-200">
                    <h4 className="text-sm font-semibold text-slate-900 mb-3">Users by Role (Report Order)</h4>
                    <div className="space-y-2">
                      {reportRoleOrder.map(role => {
                        const roleUsers = filteredUsers.filter(u => u.role === role);
                        const percentage = filteredUsers.length > 0 ? ((roleUsers.length / filteredUsers.length) * 100).toFixed(1) : 0;
                        return roleUsers.length > 0 ? (
                          <div key={role} className="flex items-center justify-between py-2 px-3 bg-slate-50 rounded-lg">
                            <div className="flex items-center gap-3">
                              <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                              <span className="text-sm font-medium text-slate-700">{role}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-sm text-slate-600">{roleUsers.length} users</span>
                              <span className="text-xs text-slate-500">({percentage}%)</span>
                            </div>
                          </div>
                        ) : null;
                      })}
                    </div>
                  </div>

                  {/* Current Filters Display */}
                  {(searchQuery || roleFilter !== 'all' || statusFilter !== 'all' || dateFilter !== 'all') && (
                    <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
                      <h4 className="text-sm font-semibold text-emerald-800 mb-2">Current Filters (will be included in report)</h4>
                      <div className="flex flex-wrap gap-2">
                        {searchQuery && (
                          <span className="inline-flex items-center px-2 py-1 bg-emerald-100 text-emerald-800 text-xs font-medium rounded">
                            Name: "{searchQuery}"
                          </span>
                        )}
                        {roleFilter !== 'all' && (
                          <span className="inline-flex items-center px-2 py-1 bg-emerald-100 text-emerald-800 text-xs font-medium rounded">
                            Role: {roleFilter}
                          </span>
                        )}
                        {statusFilter !== 'all' && (
                          <span className="inline-flex items-center px-2 py-1 bg-emerald-100 text-emerald-800 text-xs font-medium rounded">
                            Status: {statusFilter}
                          </span>
                        )}
                        {dateFilter !== 'all' && (
                          <span className="inline-flex items-center px-2 py-1 bg-emerald-100 text-emerald-800 text-xs font-medium rounded">
                            Date: {dateFilter}
                          </span>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Generate Report Button */}
                  <div className="flex items-center justify-center pt-4">
                    <button
                      onClick={generateUserReport}
                      disabled={generatingReport || filteredUsers.length === 0}
                      className="inline-flex items-center gap-3 px-8 py-4 bg-emerald-600 text-white font-semibold rounded-xl hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-105 shadow-lg"
                    >
                      {generatingReport ? (
                        <>
                          <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Generating Report...
                        </>
                      ) : (
                        <>
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                          Generate PDF Report ({filteredUsers.length} users)
                        </>
                      )}
                    </button>
                  </div>

                  {filteredUsers.length === 0 && (
                    <div className="text-center py-6">
                      <svg className="w-12 h-12 mx-auto text-slate-400 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      <p className="text-sm text-slate-500">No users to include in report. Adjust your filters to include users.</p>
                    </div>
                  )}
                </div>
              )}
        </SectionCard>

        {/* Users Table */}
        <div className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden">
          {/* Desktop Table View */}
          <div className="hidden sm:block overflow-x-auto">
            <table className="w-full divide-y divide-gray-200 text-sm">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  {['Name', 'Email', 'Role', 'Unique ID', 'Status', 'Actions'].map((heading) => (
                    <th key={heading} className="px-4 lg:px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-700">
                      {heading}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredUsers.map((u) => (
                  <tr key={u._id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 lg:px-6 py-4 font-semibold text-gray-900">{u.name}</td>
                    <td className="px-4 lg:px-6 py-4 text-gray-600 break-all">{u.email}</td>
                    <td className="px-4 lg:px-6 py-4">
                      <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        {u.role}
                      </span>
                    </td>
                    <td className="px-4 lg:px-6 py-4 text-gray-600 font-mono">{u.uniqueId}</td>
                    <td className="px-4 lg:px-6 py-4">
                      <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${
                        u.isActive
                          ? 'bg-emerald-50 text-emerald-700'
                          : 'bg-amber-50 text-amber-700'
                      }`}>
                        <span className={`h-2 w-2 rounded-full ${u.isActive ? 'bg-emerald-600' : 'bg-amber-600'}`} />
                        {u.isActive ? 'Active' : 'Pending'}
                      </span>
                    </td>
                    <td className="px-4 lg:px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => update(u, { isActive: !u.isActive })}
                          className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                            u.isActive
                              ? 'bg-red-50 text-red-600 hover:bg-red-100'
                              : 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100'
                          }`}
                        >
                          {u.isActive ? 'Revoke' : 'Approve'}
                        </button>
                        <select
                          defaultValue={u.role}
                          onChange={(e) => update(u, { role: e.target.value })}
                          className="px-3 py-1.5 rounded-lg border border-gray-300 bg-white text-xs font-semibold text-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                        >
                          {roleOrder.map((r) => (
                            <option key={r} value={r}>{r}</option>
                          ))}
                        </select>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Card View */}
          <div className="sm:hidden divide-y divide-gray-200">
            {filteredUsers.map((u) => (
              <div key={u._id} className="p-4 space-y-3">
                <div>
                  <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide block mb-1">Name</span>
                  <span className="text-sm font-semibold text-gray-900 block">{u.name}</span>
                </div>
                <div>
                  <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide block mb-1">Email</span>
                  <span className="text-sm text-gray-600 block break-all">{u.email}</span>
                </div>
                <div>
                  <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide block mb-1">Role</span>
                  <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                    {u.role}
                  </span>
                </div>
                <div>
                  <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide block mb-1">Unique ID</span>
                  <span className="text-sm text-gray-600 font-mono block">{u.uniqueId}</span>
                </div>
                <div>
                  <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide block mb-1">Status</span>
                  <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${
                    u.isActive
                      ? 'bg-emerald-50 text-emerald-700'
                      : 'bg-amber-50 text-amber-700'
                  }`}>
                    <span className={`h-2 w-2 rounded-full ${u.isActive ? 'bg-emerald-600' : 'bg-amber-600'}`} />
                    {u.isActive ? 'Active' : 'Pending'}
                  </span>
                </div>
                <div>
                  <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide block mb-2">Actions</span>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <button
                      type="button"
                      onClick={() => update(u, { isActive: !u.isActive })}
                      className={`flex-1 px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                        u.isActive
                          ? 'bg-red-50 text-red-600 hover:bg-red-100'
                          : 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100'
                      }`}
                    >
                      {u.isActive ? 'Revoke Access' : 'Approve User'}
                    </button>
                    <select
                      defaultValue={u.role}
                      onChange={(e) => update(u, { role: e.target.value })}
                      className="flex-1 px-4 py-2 rounded-lg border border-gray-300 bg-white text-sm font-semibold text-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                    >
                      {roleOrder.map((r) => (
                        <option key={r} value={r}>{r}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {filteredUsers.length === 0 && list.length > 0 && (
            <div className="py-12 text-center px-6">
              <Search className="h-12 w-12 text-gray-300 mx-auto mb-3" />
              <p className="text-sm text-gray-500 mb-3">No users match your search criteria</p>
              <button
                onClick={clearFilters}
                className="text-sm text-emerald-600 hover:text-emerald-700 font-semibold"
              >
                Clear filters to see all users
              </button>
            </div>
          )}

          {list.length === 0 && (
            <div className="py-12 text-center px-6">
              <Users className="h-12 w-12 text-gray-300 mx-auto mb-3" />
              <p className="text-sm text-gray-500">No users onboarded yet.</p>
            </div>
          )}
        </div>

        {/* Generate Report Button */}
        <div className="flex justify-end">
          <button
            onClick={() => setShowReportGenerator(!showReportGenerator)}
            className="inline-flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-colors shadow-sm"
          >
            <Download className="h-4 w-4" />
            <span className="hidden sm:inline">Generate Report</span>
            <span className="sm:hidden">Report</span>
          </button>
        </div>
      </div>
    </DashboardShell>
  );
}





