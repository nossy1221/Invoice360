import React, { useState } from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  BsBuilding,
  BsPeople,
  BsCurrencyDollar,
  BsPersonPlus,
  BsCalendar2,
} from "react-icons/bs";
import "./Dashboardd.css";

const Dashboardd = () => {
  // Static dashboard data instead of API response
  const staticDashboardData = {
    total_companies: 150,
    total_requests: 320,
    total_revenue: 45250.75,
    new_signups: 12,
    growth: [
      { month: 1, count: 10 },
      { month: 2, count: 20 },
      { month: 3, count: 15 },
      { month: 4, count: 25 },
      { month: 5, count: 30 },
      { month: 6, count: 35 },
      { month: 7, count: 40 },
      { month: 8, count: 45 },
      { month: 9, count: 50 },
      { month: 10, count: 55 },
      { month: 11, count: 60 },
      { month: 12, count: 65 },
    ],
    signupCompanies: [
      { month: 1, count: 5 },
      { month: 2, count: 10 },
      { month: 3, count: 8 },
      { month: 4, count: 12 },
      { month: 5, count: 15 },
      { month: 6, count: 18 },
      { month: 7, count: 20 },
      { month: 8, count: 22 },
      { month: 9, count: 25 },
      { month: 10, count: 28 },
      { month: 11, count: 30 },
      { month: 12, count: 32 },
    ],
    revenueTrends: [
      { month: 1, revenue: "1000.00" },
      { month: 2, revenue: "1500.00" },
      { month: 3, revenue: "1200.00" },
      { month: 4, revenue: "1800.00" },
      { month: 5, revenue: "2000.00" },
      { month: 6, revenue: "2500.00" },
      { month: 7, revenue: "3000.00" },
      { month: 8, revenue: "3500.00" },
      { month: 9, revenue: "4000.00" },
      { month: 10, revenue: "4500.00" },
      { month: 11, revenue: "5000.00" },
      { month: 12, revenue: "5500.00" },
    ]
  };

  const [dashboardData] = useState(staticDashboardData);

  // Process chart data from static data
  const getChartData = () => {
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", 
                       "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    
    // Create a map for all months (initialize with zeros)
    const monthlyMap = {};
    for (let i = 1; i <= 12; i++) {
      monthlyMap[i] = {
        name: monthNames[i - 1],
        Growth: 0,
        users: 0,
        revenue: 0,
      };
    }
    
    // Update with actual data from static data
    dashboardData.growth.forEach(item => {
      if (monthlyMap[item.month]) {
        monthlyMap[item.month].Growth = item.count;
      }
    });
    
    dashboardData.signupCompanies.forEach(item => {
      if (monthlyMap[item.month]) {
        monthlyMap[item.month].users = item.count;
      }
    });
    
    dashboardData.revenueTrends.forEach(item => {
      if (monthlyMap[item.month]) {
        monthlyMap[item.month].revenue = parseFloat(item.revenue) || 0;
      }
    });
    
    // Convert map to array and sort by month
    return Object.values(monthlyMap);
  };

  const chartData = getChartData();

  return (
    <div className="dashboard container-fluid py-4 px-3">
      {/* Cards Section */}
      <div className="row g-4 mb-4">
        {[
          {
            icon: <BsBuilding />,
            value: dashboardData.total_companies.toString(),
            label: "Total Company",
            growth: "+12.5%",
            bg: "success",
          },
          {
            icon: <BsPeople />,
            value: dashboardData.total_requests.toString(),
            label: "Total Request",
            growth: "+8.2%",
            bg: "success",
          },
          {
            icon: <BsCurrencyDollar />,
            value: `$${parseFloat(dashboardData.total_revenue).toFixed(2)}`,
            label: "Total Revenue",
            growth: "+15.3%",
            bg: "success",
          },
          {
            icon: <BsPersonPlus />,
            value: dashboardData.new_signups.toString(),
            label: "New Signups Company",
            growth: "Today",
            bg: "primary text-white",
          },
        ].map((card, index) => (
          <div className="col-12 col-sm-6 col-lg-3" key={index}>
            <div className="card h-100 shadow-sm stat-card">
              <div className="card-body d-flex justify-content-between align-items-start">
                <div className="icon-box fs-4 text-dark">{card.icon}</div>
                <div
                  className={`badge bg-${card.bg} rounded-pill px-3 py-1 fw-semibold`}
                >
                  {card.growth}
                </div>
              </div>
              <div className="card-body pt-0">
                <h4 className="fw-bold mb-1">{card.value}</h4>
                <p className="text-muted mb-0">{card.label}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="row g-4">
        {/* Line Chart - Growth */}
        <div className="col-12 col-md-6">
          <div className="card shadow-sm h-100">
            <div className="card-header">
              <h6 className="m-0 fw-bold">Total Growth</h6>
            </div>
            <div className="card-body">
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="Growth"
                    stroke="#3b82f6"
                    strokeWidth={2}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Bar Chart - Signup */}
        <div className="col-12 col-md-6">
          <div className="card shadow-sm h-100">
            <div className="card-header">
              <h6 className="m-0 fw-bold">Signup Company</h6>
            </div>
            <div className="card-body">
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="users" fill="#53b2a5" name="Signup Company" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Area Chart - Revenue */}
        <div className="col-12">
          <div className="card shadow-sm">
            <div className="card-header d-flex justify-content-between align-items-center">
              <h6 className="m-0 fw-bold">Revenue Trends</h6>
              <button className="btn btn-outline-secondary btn-sm d-flex align-items-center gap-2">
                <BsCalendar2 /> 2025
              </button>
            </div>
            <div className="card-body">
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Area
                    type="monotone"
                    dataKey="revenue"
                    stroke="#8b5cf6"
                    fill="#8b5cf6"
                    fillOpacity={0.2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboardd;