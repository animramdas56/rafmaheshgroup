import React, { useEffect, useState } from 'react'
import { CRow, CCol, CCard, CCardBody } from '@coreui/react'

import CountUp from 'react-countup'
import { motion } from 'framer-motion'

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts'

const Dashboard = () => {
  const [employees, setEmployees] = useState([])
  const [dashboard, setDashboard] = useState({})
  const [vehicles, setVehicles] = useState([])
  const [finance, setFinance] = useState({ balance: 0 })

  useEffect(() => {
    fetch('http://localhost:5000/api/employees')
      .then(res => res.json())
      .then(data => setEmployees(data))

    fetch('http://localhost:5000/api/vehicles')
      .then(res => res.json())
      .then(data => setVehicles(data))

      fetch('http://localhost:5000/api/dashboard')
  .then(res => res.json())
  .then(data => setDashboard(data))

    fetch('http://localhost:5000/api/accounts')
      .then(res => res.json())
      .then(data => setFinance(data))

      
  }, [])

  const revenueData = [
    { month: 'Jan', value: 12000 },
    { month: 'Feb', value: 18000 },
    { month: 'Mar', value: 14000 },
    { month: 'Apr', value: 22000 },
    { month: 'May', value: 30000 },
    { month: 'Jun', value: 26000 },
  ]

  const departmentData = [
    { name: 'Mining', value: 35 },
    { name: 'Logistics', value: 20 },
    { name: 'IT', value: 15 },
    { name: 'Finance', value: 30 },
  ]

  const COLORS = ['#6366F1', '#10B981', '#F59E0B', '#EF4444']
console.log(dashboard)
  return (
    <div>

      {/* ================= KPI CARDS ================= */}
      <CRow>

        {[
  {
    title: 'Employees',
    value: dashboard.employees || 0,
    color: '#4F46E5',
  },
  {
    title: 'Finance (GHS)',
    value: Number(dashboard.balance) || 0,
    color: '#10B981',
  },
  {
    title: 'Projects',
    value: dashboard.projects || 0,
    color: '#F59E0B',
  },
  {
    title: 'Vehicles',
    value: dashboard.vehicles || 0,
    color: '#EF4444',
  },
]
        
        
        .map((item, index) => (
          <CCol sm={6} lg={3} key={index}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <CCard
                style={{
                  background: `linear-gradient(135deg, ${item.color}, #111827)`,
                  color: 'white',
                  borderRadius: '16px'
                }}
              >
                <CCardBody>
                  <h6>{item.title}</h6>
                  <h2>
  {item.title === 'Finance (GHS)' ? (
    Number(item.value).toLocaleString()
  ) : (
    <CountUp end={item.value} duration={2} />
  )}
</h2>
                </CCardBody>
              </CCard>
            </motion.div>
          </CCol>
        ))}

      </CRow>

      {/* ================= CHARTS ================= */}

<CRow className="mt-4">

  {[
    {
      title: 'Farms',
      value: dashboard.farms || 0,
      color: '#16A34A',
    },
    {
      title: 'Properties',
      value: dashboard.properties || 0,
      color: '#2563EB',
    },
    {
      title: 'Mining Sites',
      value: dashboard.miningSites || 0,
      color: '#CA8A04',
    },
    {
      title: 'Trucks',
      value: dashboard.trucks || 0,
      color: '#DC2626',
    },
  ].map((item, index) => (
    <CCol sm={6} lg={3} key={index}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <CCard
          style={{
            background: `linear-gradient(135deg, ${item.color}, #111827)`,
            color: 'white',
            borderRadius: '16px',
          }}
        >
          <CCardBody>
            <h6>{item.title}</h6>
            <h2>
              <CountUp end={item.value} duration={2} />
            </h2>
          </CCardBody>
        </CCard>
      </motion.div>
    </CCol>
  ))}

</CRow>

      <CRow className="mt-4">

        <CCol md={8}>
          <CCard>
            <CCardBody>
              <h5>Revenue Performance</h5>

              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={revenueData}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="value" stroke="#6366F1" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>

            </CCardBody>
          </CCard>
        </CCol>

        <CCol md={4}>
          <CCard>
            <CCardBody>
              <h5>Department Mix</h5>

              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie data={departmentData} dataKey="value" nameKey="name" outerRadius={100} label>
                    {departmentData.map((_, index) => (
                      <Cell key={index} fill={COLORS[index]} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>

            </CCardBody>
          </CCard>
        </CCol>

      </CRow>

      {/* ================= LIVE STATUS ================= */}
      <CRow className="mt-4">
        <CCol md={12}>
          <CCard>
            <CCardBody>
              <h5>Live Operations Feed</h5>

              <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
                <li>🟢 Employees API connected</li>
                <li>🟢 Vehicles API connected</li>
                <li>🟢 Finance API connected</li>
                <li>🟡 Mining module syncing</li>
                <li>🔴 AI analytics (next phase)</li>
              </ul>

            </CCardBody>
          </CCard>
        </CCol>
      </CRow>

    </div>
  )
}

export default Dashboard;