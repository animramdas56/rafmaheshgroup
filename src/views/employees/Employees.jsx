import React, { useEffect, useState } from 'react'
import axios from 'axios'

import {
  CCard,
  CCardBody,
  CCardHeader,
  CTable,
  CTableHead,
  CTableBody,
  CTableRow,
  CTableHeaderCell,
  CTableDataCell,
  CButton,
  CModal,
  CRow,
CCol,
CModalHeader,
CModalTitle,
CModalBody,
CModalFooter,
CFormInput,


} from '@coreui/react'

const Employees = () => {
  const [employees, setEmployees] = useState([])
  const [visible, setVisible] = useState(false)
  const [editingEmployee, setEditingEmployee] = useState(null)
  const [search, setSearch] = useState('')
const [loading, setLoading] = useState(false)
const [newEmployee, setNewEmployee] = useState({
  first_name: '',
  last_name: '',
  email: '',
  phone_number: '',
  department: '',
})

  const deleteEmployee = async (id) => {
  const confirmDelete = window.confirm(
    'Are you sure you want to delete this employee?'
  )

  if (!confirmDelete) return

  try {
    await axios.delete(`http://localhost:5000/api/employees/${id}`)

    setEmployees(
      employees.filter(emp => emp.employe_id !== id)
    )

    alert('Employee deleted successfully')
  } catch (error) {
    console.error(error)
    alert('Failed to delete employee')
  }
}

const addEmployee = async () => {
  try {
    const res = await axios.post(
      'http://localhost:5000/api/employees',
      newEmployee
    )

    const employee = {
      employe_id: res.data.employeeId,
      ...newEmployee,
    }

    setEmployees([...employees, employee])

    setNewEmployee({
      first_name: '',
      last_name: '',
      email: '',
      phone_number: '',
      department: '',
    })

    setVisible(false)

    alert('Employee added successfully')
  } catch (error) {
    console.error(error)
    alert('Failed to add employee')
  }
}


const editEmployee = (employee) => {
  setEditingEmployee(employee)
setNewEmployee({
    first_name: employee.first_name || '',
    last_name: employee.last_name || '',
    email: employee.email || '',
    phone_number: employee.phone_number || '',
    department: employee.department || '',
  })

  setVisible(true)
}

const updateEmployee = async () => {
  try {
    await axios.put(
      `http://localhost:5000/api/employees/${editingEmployee.employe_id}`,
      newEmployee
    )

    setEmployees(
      employees.map((emp) =>
        emp.employe_id === editingEmployee.employe_id
          ? {
              ...emp,
              ...newEmployee,
            }
          : emp
      )
    )

    setVisible(false)
    setEditingEmployee(null)

    alert('Employee updated successfully')
  } catch (error) {
    console.error(error)
    alert('Failed to update employee')
  }
}


useEffect(() => {
  const fetchData = async () => {
    setLoading(true)

    try {
      const res = await axios.get('http://localhost:5000/api/employees')
      setEmployees(res.data)
    } catch (err) {
      console.log(err)
    }

    try {
      const res2 = await axios.get('http://localhost:5000/api/dashboard')
      setDashboard(res2.data)
    } catch (err) {
      console.log(err)
    }

    setLoading(false)
  }

  fetchData()
}, [])

const totalEmployees = employees.length

const [dashboard, setDashboard] = useState({})

const employeesWithEmail = employees.filter(
  emp => emp.email
).length

const employeesWithPhone = employees.filter(
  emp => emp.phone_number
).length

  return (
    <CCard>
      <CCardHeader className="d-flex justify-content-between">
  <strong>Employees (Live Data)</strong>

  <CButton
    color="primary"
    onClick={() => {
  setEditingEmployee(null)

  setNewEmployee({
    first_name: '',
    last_name: '',
    email: '',
    phone_number: '',
    department: '',
  })

  setVisible(true)
}}
  >
    + Add Employee
  </CButton>
</CCardHeader>

      <CCardBody>

<CRow className="mb-4">

  <CCol md={3}>
    <CCard className="text-white bg-primary">
      <CCardBody>
        <h6>Total Employees</h6>
        <h2>{totalEmployees}</h2>
      </CCardBody>
    </CCard>
  </CCol>

  <CCol md={3}>
    <CCard className="text-white bg-success">
      <CCardBody>
        <h6>Departments</h6>
        <h2>{dashboard.departments || 0}</h2>
      </CCardBody>
    </CCard>
  </CCol>

  <CCol md={3}>
    <CCard className="text-white bg-warning">
      <CCardBody>
        <h6>Email Records</h6>
        <h2>{employeesWithEmail}</h2>
      </CCardBody>
    </CCard>
  </CCol>

  <CCol md={3}>
    <CCard className="text-white bg-danger">
      <CCardBody>
        <h6>Phone Records</h6>
        <h2>{employeesWithPhone}</h2>
      </CCardBody>
    </CCard>
  </CCol>

</CRow>

        <CFormInput
  className="mb-3"
  placeholder="Search employee by name, email, or department..."
  value={search}
  onChange={(e) => setSearch(e.target.value)}
/>
        {loading ? (
  <p>Loading employees...</p>
) : (
  <CTable hover responsive>
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell>ID</CTableHeaderCell>
              <CTableHeaderCell>First Name</CTableHeaderCell>
              <CTableHeaderCell>Last Name</CTableHeaderCell>
              <CTableHeaderCell>Email</CTableHeaderCell>
              <CTableHeaderCell>Phone</CTableHeaderCell>
              <CTableHeaderCell>Actions</CTableHeaderCell>
            </CTableRow>
          </CTableHead>

          <CTableBody>
            {employees
  .filter((emp) => {
    const term = search.toLowerCase()


    return (
      emp.first_name?.toLowerCase().includes(term) ||
      emp.last_name?.toLowerCase().includes(term) ||
      emp.email?.toLowerCase().includes(term) ||
      emp.department?.toLowerCase().includes(term)
    )
  })
  .map((emp) => (
              <CTableRow key={emp.employe_id}>
                <CTableDataCell>{emp.employe_id}</CTableDataCell>
                <CTableDataCell>{emp.first_name}</CTableDataCell>
                <CTableDataCell>{emp.last_name}</CTableDataCell>
                <CTableDataCell>{emp.email}</CTableDataCell>
                <CTableDataCell>{emp.phone_number}</CTableDataCell>
                <CTableDataCell>
 <CButton
  color="info"
  size="sm"
  className="me-2"
  onClick={() => editEmployee(emp)}
>
  Edit
</CButton>

  <CButton
  color="danger"
  size="sm"
  onClick={() => deleteEmployee(emp.employe_id)}
>
  Delete
</CButton>
</CTableDataCell>
              </CTableRow>
            ))}
          </CTableBody>
        </CTable>
)}
      </CCardBody>

<CModal
  visible={visible}
  onClose={() => setVisible(false)}
>
  <CModalHeader>
   <CModalTitle>
  {editingEmployee ? 'Edit Employee' : 'Add Employee'}
</CModalTitle>
  </CModalHeader>

  <CModalBody>

    <CFormInput
      className="mb-3"
      placeholder="First Name"
      value={newEmployee.first_name}
      onChange={(e) =>
        setNewEmployee({
          ...newEmployee,
          first_name: e.target.value,
        })
      }
    />

    <CFormInput
      className="mb-3"
      placeholder="Last Name"
      value={newEmployee.last_name}
      onChange={(e) =>
        setNewEmployee({
          ...newEmployee,
          last_name: e.target.value,
        })
      }
    />

    <CFormInput
      className="mb-3"
      placeholder="Email"
      value={newEmployee.email}
      onChange={(e) =>
        setNewEmployee({
          ...newEmployee,
          email: e.target.value,
        })
      }
    />

    <CFormInput
      className="mb-3"
      placeholder="Phone Number"
      value={newEmployee.phone_number}
      onChange={(e) =>
        setNewEmployee({
          ...newEmployee,
          phone_number: e.target.value,
        })
      }
    />

    <CFormInput
      placeholder="Department"
      value={newEmployee.department}
      onChange={(e) =>
        setNewEmployee({
          ...newEmployee,
          department: e.target.value,
        })
      }
    />

  </CModalBody>

  <CModalFooter>

    <CButton
      color="secondary"
      onClick={() => setVisible(false)}
    >
      Cancel
    </CButton>

   <CButton
  color="success"
  onClick={
    editingEmployee
      ? updateEmployee
      : addEmployee
  }
>
  {editingEmployee
    ? 'Update Employee'
    : 'Save Employee'}
</CButton>

  </CModalFooter>
</CModal>

    </CCard>
  )
}

export default Employees