import React, { useEffect, useState } from 'react'
import axios from 'axios'

import {
  CRow,
  CCol,
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
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CFormInput,
} from '@coreui/react'

const Vehicles = () => {
  const [vehicles, setVehicles] = useState([])
  const [visible, setVisible] = useState(false)
  const [editingVehicle, setEditingVehicle] = useState(null)
 

  const [newVehicle, setNewVehicle] = useState({
    plate_number: '',
    vehicle_type: '',
    status: '',
    assigned_driver: '',
  })

  const [editVehicleData, setEditVehicleData] = useState({
    plate_number: '',
    vehicle_type: '',
    status: '',
    assigned_driver: '',
  })

const [search, setSearch] = useState('')
const [statusFilter, setStatusFilter] = useState('All')




  useEffect(() => {
    axios
      .get('http://localhost:5000/api/vehicles')
      .then((res) => setVehicles(res.data))
      .catch((err) => console.log(err))
  }, [])

  const activeVehicles = vehicles.filter(v => v.status === 'Active').length
  const maintenanceVehicles = vehicles.filter(v => v.status === 'Maintenance').length

const filteredVehicles = vehicles
  .filter((v) => {
    const term = search.toLowerCase()





    
    return (
      v.plate_number?.toLowerCase().includes(term) ||
      v.vehicle_type?.toLowerCase().includes(term) ||
      v.assigned_driver?.toString().includes(term)
    )
  })
  .filter((v) => {
    if (statusFilter === 'All') return true
    return v.status === statusFilter
  })

  // ADD VEHICLE
  const addVehicle = async () => {
    try {
      const res = await axios.post(
        'http://localhost:5000/api/vehicles',
        newVehicle
      )

      const vehicle = {
        vehicle_id: res.data.id,
        ...newVehicle,
      }

      setVehicles([...vehicles, vehicle])

      setNewVehicle({
        plate_number: '',
        vehicle_type: '',
        status: '',
        assigned_driver: '',
      })

      setVisible(false)
      alert('Vehicle added successfully')
    } catch (error) {
      console.error(error)
      alert('Failed to add vehicle')
    }
  }

  // DELETE VEHICLE
  const deleteVehicle = async (id) => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this vehicle?'
    )

    if (!confirmDelete) return

    try {
      await axios.delete(`http://localhost:5000/api/vehicles/${id}`)

      setVehicles(vehicles.filter(v => v.vehicle_id !== id))

      alert('Vehicle deleted successfully')
    } catch (error) {
      console.error(error)
      alert(error.response?.data?.message || 'Failed to delete vehicle')
    }
  }

  // OPEN EDIT MODAL
  const openEditModal = (vehicle) => {
    setEditingVehicle(vehicle)

    setEditVehicleData({
      plate_number: vehicle.plate_number,
      vehicle_type: vehicle.vehicle_type,
      status: vehicle.status,
      assigned_driver: vehicle.assigned_driver,
    })

    setVisible(true)
  }

  // UPDATE VEHICLE
  const updateVehicle = async () => {
  try {
    const id = editingVehicle?.vehicle_id

    if (!id) {
      alert('No vehicle selected for update')
      return
    }

    console.log('Updating vehicle ID:', id)
    console.log('Payload:', editVehicleData)

    await axios.put(
      `http://localhost:5000/api/vehicles/${id}`,
      editVehicleData
    )

    setVehicles(prev =>
      prev.map(v =>
        v.vehicle_id === id
          ? { ...v, ...editVehicleData }
          : v
      )
    )

    setVisible(false)
    setEditingVehicle(null)

    alert('Vehicle updated successfully')
  } catch (error) {
    console.error('UPDATE ERROR:', error)
    console.error('RESPONSE:', error.response?.data)
    alert(error.response?.data?.message || 'Failed to update vehicle')
  }
}

  return (
    <>
      {/* DASHBOARD CARDS */}
      <CRow className="mb-4">

        <CCol md={4}>
          <CCard className="text-white bg-primary">
            <CCardBody>
              <h6>Total Vehicles</h6>
              <h2>{vehicles.length}</h2>
            </CCardBody>
          </CCard>
        </CCol>

        <CCol md={4}>
          <CCard className="text-white bg-success">
            <CCardBody>
              <h6>Active Vehicles</h6>
              <h2>{activeVehicles}</h2>
            </CCardBody>
          </CCard>
        </CCol>

        <CCol md={4}>
          <CCard className="text-white bg-warning">
            <CCardBody>
              <h6>Maintenance</h6>
              <h2>{maintenanceVehicles}</h2>
            </CCardBody>
          </CCard>
        </CCol>

      </CRow>

<CRow className="mb-3">

  <CCol md={6}>
    <CFormInput
      placeholder="Search by plate number, vehicle type, or driver ID..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
    />
  </CCol>

  <CCol md={3}>
    <select
      className="form-select"
      value={statusFilter}
      onChange={(e) => setStatusFilter(e.target.value)}
    >
      <option value="All">All Status</option>
      <option value="Active">Active</option>
      <option value="Maintenance">Maintenance</option>
    </select>
  </CCol>

</CRow>


      {/* TABLE */}
      <CCard>
        <CCardHeader className="d-flex justify-content-between">
          <strong>Fleet Registry</strong>

          <CButton
            color="primary"
            onClick={() => {
              setEditingVehicle(null)
              setNewVehicle({
                plate_number: '',
                vehicle_type: '',
                status: '',
                assigned_driver: '',
              })
              setVisible(true)
            }}
          >
            + Add Vehicle
          </CButton>
        </CCardHeader>

        <CCardBody>
          <CTable hover responsive>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell>ID</CTableHeaderCell>
                <CTableHeaderCell>Plate Number</CTableHeaderCell>
                <CTableHeaderCell>Vehicle Type</CTableHeaderCell>
                <CTableHeaderCell>Status</CTableHeaderCell>
                <CTableHeaderCell>Driver ID</CTableHeaderCell>
                <CTableHeaderCell>Actions</CTableHeaderCell>
              </CTableRow>
            </CTableHead>

            <CTableBody>
              {filteredVehicles.map((vehicle) => (
                <CTableRow key={vehicle.vehicle_id}>

                  <CTableDataCell>{vehicle.vehicle_id}</CTableDataCell>
                  <CTableDataCell>{vehicle.plate_number}</CTableDataCell>
                  <CTableDataCell>{vehicle.vehicle_type}</CTableDataCell>
                  <CTableDataCell>
  <span
    className={`badge ${
      vehicle.status === 'Active'
        ? 'bg-success'
        : 'bg-warning'
    }`}
  >
    {vehicle.status}
  </span>
</CTableDataCell>
                  <CTableDataCell>{vehicle.assigned_driver}</CTableDataCell>

                  <CTableDataCell>
                    <CButton
                      color="info"
                      size="sm"
                      className="me-2"
                      onClick={() => openEditModal(vehicle)}
                    >
                      Edit
                    </CButton>

                    <CButton
                      color="danger"
                      size="sm"
                      onClick={() => deleteVehicle(vehicle.vehicle_id)}
                    >
                      Delete
                    </CButton>
                  </CTableDataCell>

                </CTableRow>
              ))}
              {filteredVehicles.length === 0 && (
  <CTableRow>
    <CTableDataCell colSpan={6} className="text-center">
      No vehicles found
    </CTableDataCell>
  </CTableRow>
)}
            </CTableBody>
          </CTable>
      
        </CCardBody>
      </CCard>

      {/* MODAL */}
      <CModal visible={visible} onClose={() => setVisible(false)}>
        <CModalHeader>
          <CModalTitle>
            {editingVehicle ? 'Edit Vehicle' : 'Add Vehicle'}
          </CModalTitle>
        </CModalHeader>

        <CModalBody>

          <CFormInput
            className="mb-3"
            placeholder="Plate Number"
            value={
              editingVehicle
                ? editVehicleData.plate_number
                : newVehicle.plate_number
            }
            onChange={(e) =>
              editingVehicle
                ? setEditVehicleData({
                    ...editVehicleData,
                    plate_number: e.target.value,
                  })
                : setNewVehicle({
                    ...newVehicle,
                    plate_number: e.target.value,
                  })
            }
          />

          <CFormInput
            className="mb-3"
            placeholder="Vehicle Type"
            value={
              editingVehicle
                ? editVehicleData.vehicle_type
                : newVehicle.vehicle_type
            }
            onChange={(e) =>
              editingVehicle
                ? setEditVehicleData({
                    ...editVehicleData,
                    vehicle_type: e.target.value,
                  })
                : setNewVehicle({
                    ...newVehicle,
                    vehicle_type: e.target.value,
                  })
            }
          />

          <CFormInput
            className="mb-3"
            placeholder="Status"
            value={
              editingVehicle
                ? editVehicleData.status
                : newVehicle.status
            }
            onChange={(e) =>
              editingVehicle
                ? setEditVehicleData({
                    ...editVehicleData,
                    status: e.target.value,
                  })
                : setNewVehicle({
                    ...newVehicle,
                    status: e.target.value,
                  })
            }
          />

          <CFormInput
            placeholder="Assigned Driver"
            value={
              editingVehicle
                ? editVehicleData.assigned_driver
                : newVehicle.assigned_driver
            }
            onChange={(e) =>
              editingVehicle
                ? setEditVehicleData({
                    ...editVehicleData,
                    assigned_driver: e.target.value,
                  })
                : setNewVehicle({
                    ...newVehicle,
                    assigned_driver: e.target.value,
                  })
            }
          />

        </CModalBody>

        <CModalFooter>
          <CButton
            color="success"
            onClick={editingVehicle ? updateVehicle : addVehicle}
          >
            {editingVehicle ? 'Update Vehicle' : 'Save Vehicle'}
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}

export default Vehicles