import React, { useEffect, useState } from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CRow,
  CCol,
  CWidgetStatsA,
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
  CFormSelect,
} from '@coreui/react'

const Logistics = () => {
  // ================= VEHICLES =================
  const [vehicles, setVehicles] = useState([])
  const [vehicleModal, setVehicleModal] = useState(false)
  const [editingVehicle, setEditingVehicle] = useState(null)

  const [newVehicle, setNewVehicle] = useState({
    plate_number: '',
    vehicle_type: '',
    status: 'Active',
    assigned_driver: '',
  })

  // ================= DELIVERIES =================
  const [deliveries, setDeliveries] = useState([])
  const [deliveryModal, setDeliveryModal] = useState(false)
  const [editingDelivery, setEditingDelivery] = useState(null)

  const [newDelivery, setNewDelivery] = useState({
    customer_name: '',
    origin_location: '',
    destination_location: '',
    status: 'Pending',
    assigned_vehicle: '',
  })

  // ================= FETCH DATA =================
  useEffect(() => {
    fetchVehicles()
    fetchDeliveries()
  }, [])

  const fetchVehicles = () => {
    fetch('http://localhost:5000/api/vehicles')
      .then((res) => res.json())
      .then((data) => setVehicles(Array.isArray(data) ? data : []))
      .catch(console.error)
  }

  const fetchDeliveries = () => {
    fetch('http://localhost:5000/api/deliveries')
      .then((res) => res.json())
      .then((data) => setDeliveries(Array.isArray(data) ? data : []))
      .catch(console.error)
  }

  // ================= VEHICLE CRUD =================
  const addVehicle = async () => {
    await fetch('http://localhost:5000/api/vehicles', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newVehicle),
    })

    fetchVehicles()
    setVehicleModal(false)

    setNewVehicle({
      plate_number: '',
      vehicle_type: '',
      status: 'Active',
      assigned_driver: '',
    })

    alert('Vehicle saved')
  }

  const updateVehicle = async () => {
    await fetch(
      `http://localhost:5000/api/vehicles/${editingVehicle.vehicle_id}`,
      {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newVehicle),
      }
    )

    fetchVehicles()
    setVehicleModal(false)
    setEditingVehicle(null)

    alert('Vehicle updated')
  }

  const deleteVehicle = async (id) => {
    if (!window.confirm('Delete vehicle?')) return

    await fetch(`http://localhost:5000/api/vehicles/${id}`, {
      method: 'DELETE',
    })

    fetchVehicles()
    alert('Vehicle deleted')
  }

  const editVehicle = (v) => {
    setEditingVehicle(v)
    setNewVehicle(v)
    setVehicleModal(true)
  }

  // ================= DELIVERY CRUD =================
  const addDelivery = async () => {
    await fetch('http://localhost:5000/api/deliveries', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newDelivery),
    })

    fetchDeliveries()
    setDeliveryModal(false)

    setNewDelivery({
      customer_name: '',
      origin_location: '',
      destination_location: '',
      status: 'Pending',
      assigned_vehicle: '',
    })

    alert('Delivery saved')
  }

  const updateDelivery = async () => {
    await fetch(
      `http://localhost:5000/api/deliveries/${editingDelivery.delivery_id}`,
      {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newDelivery),
      }
    )

    fetchDeliveries()
    setDeliveryModal(false)
    setEditingDelivery(null)

    alert('Delivery updated')
  }

  const deleteDelivery = async (id) => {
    if (!window.confirm('Delete delivery?')) return

    await fetch(`http://localhost:5000/api/deliveries/${id}`, {
      method: 'DELETE',
    })

    fetchDeliveries()
    alert('Delivery deleted')
  }

  const editDelivery = (d) => {
    setEditingDelivery(d)
    setNewDelivery(d)
    setDeliveryModal(true)
  }

  // ================= UI =================
  return (
    <>
      {/* ================= STATS ================= */}
      <CRow className="mb-4">
        <CCol sm={3}>
          <CWidgetStatsA value={vehicles.length} title="Total Vehicles" />
        </CCol>

        <CCol sm={3}>
          <CWidgetStatsA
            value={vehicles.filter((v) => v.status === 'Active').length}
            title="Active Vehicles"
          />
        </CCol>

        <CCol sm={3}>
          <CWidgetStatsA
            value={deliveries.filter((d) => d.status === 'Pending').length}
            title="Pending Deliveries"
          />
        </CCol>

        <CCol sm={3}>
          <CWidgetStatsA value={deliveries.length} title="Total Deliveries" />
        </CCol>
      </CRow>

      {/* ================= VEHICLES ================= */}
      <CCard>
        <CCardHeader className="d-flex justify-content-between">
          <strong>Vehicles</strong>
          <CButton
            color="success"
            onClick={() => {
              setEditingVehicle(null)
              setNewVehicle({
                plate_number: '',
                vehicle_type: '',
                status: 'Active',
                assigned_driver: '',
              })
              setVehicleModal(true)
            }}
          >
            + Add Vehicle
          </CButton>
        </CCardHeader>

        <CCardBody>
          <CTable hover>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell>ID</CTableHeaderCell>
                <CTableHeaderCell>Plate</CTableHeaderCell>
                <CTableHeaderCell>Type</CTableHeaderCell>
                <CTableHeaderCell>Status</CTableHeaderCell>
                <CTableHeaderCell>Driver</CTableHeaderCell>
                <CTableHeaderCell>Actions</CTableHeaderCell>
              </CTableRow>
            </CTableHead>

            <CTableBody>
              {vehicles.map((v) => (
                <CTableRow key={v.vehicle_id}>
                  <CTableDataCell>{v.vehicle_id}</CTableDataCell>
                  <CTableDataCell>{v.plate_number}</CTableDataCell>
                  <CTableDataCell>{v.vehicle_type}</CTableDataCell>
                  <CTableDataCell>{v.status}</CTableDataCell>
                  <CTableDataCell>{v.assigned_driver}</CTableDataCell>
                  <CTableDataCell>
                    <CButton
                      color="info"
                      size="sm"
                      className="me-2"
                      onClick={() => editVehicle(v)}
                    >
                      Edit
                    </CButton>

                    <CButton
                      color="danger"
                      size="sm"
                      onClick={() => deleteVehicle(v.vehicle_id)}
                    >
                      Delete
                    </CButton>
                  </CTableDataCell>
                </CTableRow>
              ))}
            </CTableBody>
          </CTable>
        </CCardBody>
      </CCard>

      {/* ================= DELIVERIES ================= */}
      <CCard className="mt-4">
        <CCardHeader className="d-flex justify-content-between">
          <strong>Deliveries</strong>

          <CButton
            color="success"
            onClick={() => {
              setEditingDelivery(null)
              setNewDelivery({
                customer_name: '',
                origin_location: '',
                destination_location: '',
                status: 'Pending',
                assigned_vehicle: '',
              })
              setDeliveryModal(true)
            }}
          >
            + Add Delivery
          </CButton>
        </CCardHeader>

        <CCardBody>
          <CTable hover>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell>ID</CTableHeaderCell>
                <CTableHeaderCell>Customer</CTableHeaderCell>
                <CTableHeaderCell>Origin</CTableHeaderCell>
                <CTableHeaderCell>Destination</CTableHeaderCell>
                <CTableHeaderCell>Status</CTableHeaderCell>
                <CTableHeaderCell>Vehicle</CTableHeaderCell>
                <CTableHeaderCell>Actions</CTableHeaderCell>
              </CTableRow>
            </CTableHead>

            <CTableBody>
              {deliveries.map((d) => (
                <CTableRow key={d.delivery_id}>
                  <CTableDataCell>{d.delivery_id}</CTableDataCell>
                  <CTableDataCell>{d.customer_name}</CTableDataCell>
                  <CTableDataCell>{d.origin_location}</CTableDataCell>
                  <CTableDataCell>{d.destination_location}</CTableDataCell>
                  <CTableDataCell>{d.status}</CTableDataCell>
                  <CTableDataCell>{d.assigned_vehicle}</CTableDataCell>
                  <CTableDataCell>
                    <CButton
                      color="info"
                      size="sm"
                      className="me-2"
                      onClick={() => editDelivery(d)}
                    >
                      Edit
                    </CButton>

                    <CButton
                      color="danger"
                      size="sm"
                      onClick={() => deleteDelivery(d.delivery_id)}
                    >
                      Delete
                    </CButton>
                  </CTableDataCell>
                </CTableRow>
              ))}
            </CTableBody>
          </CTable>
        </CCardBody>
      </CCard>

      {/* ================= VEHICLE MODAL ================= */}
      <CModal visible={vehicleModal} onClose={() => setVehicleModal(false)}>
        <CModalHeader>
          <CModalTitle>
            {editingVehicle ? 'Edit Vehicle' : 'Add Vehicle'}
          </CModalTitle>
        </CModalHeader>

        <CModalBody>
          <CFormInput
            className="mb-2"
            placeholder="Plate Number"
            value={newVehicle.plate_number}
            onChange={(e) =>
              setNewVehicle({ ...newVehicle, plate_number: e.target.value })
            }
          />

          <CFormInput
            className="mb-2"
            placeholder="Vehicle Type"
            value={newVehicle.vehicle_type}
            onChange={(e) =>
              setNewVehicle({ ...newVehicle, vehicle_type: e.target.value })
            }
          />

          <CFormInput
            className="mb-2"
            placeholder="Driver"
            value={newVehicle.assigned_driver}
            onChange={(e) =>
              setNewVehicle({
                ...newVehicle,
                assigned_driver: e.target.value,
              })
            }
          />

          <CFormSelect
            value={newVehicle.status}
            onChange={(e) =>
              setNewVehicle({ ...newVehicle, status: e.target.value })
            }
          >
            <option>Active</option>
            <option>Maintenance</option>
          </CFormSelect>
        </CModalBody>

        <CModalFooter>
          <CButton color="secondary" onClick={() => setVehicleModal(false)}>
            Cancel
          </CButton>

          <CButton
            color="success"
            onClick={editingVehicle ? updateVehicle : addVehicle}
          >
            Save
          </CButton>
        </CModalFooter>
      </CModal>

      {/* ================= DELIVERY MODAL ================= */}
      <CModal visible={deliveryModal} onClose={() => setDeliveryModal(false)}>
        <CModalHeader>
          <CModalTitle>
            {editingDelivery ? 'Edit Delivery' : 'Add Delivery'}
          </CModalTitle>
        </CModalHeader>

        <CModalBody>
          <CFormInput
            className="mb-2"
            placeholder="Customer"
            value={newDelivery.customer_name}
            onChange={(e) =>
              setNewDelivery({
                ...newDelivery,
                customer_name: e.target.value,
              })
            }
          />

          <CFormInput
            className="mb-2"
            placeholder="Origin"
            value={newDelivery.origin_location}
            onChange={(e) =>
              setNewDelivery({
                ...newDelivery,
                origin_location: e.target.value,
              })
            }
          />

          <CFormInput
            className="mb-2"
            placeholder="Destination"
            value={newDelivery.destination_location}
            onChange={(e) =>
              setNewDelivery({
                ...newDelivery,
                destination_location: e.target.value,
              })
            }
          />

          <CFormSelect
            className="mb-2"
            value={newDelivery.status}
            onChange={(e) =>
              setNewDelivery({ ...newDelivery, status: e.target.value })
            }
          >
            <option>Pending</option>
            <option>In Transit</option>
            <option>Delivered</option>
          </CFormSelect>

          <CFormSelect
            value={newDelivery.assigned_vehicle}
            onChange={(e) =>
              setNewDelivery({
                ...newDelivery,
                assigned_vehicle: e.target.value,
              })
            }
          >
            <option value="">Select Vehicle</option>
            {vehicles.map((v) => (
              <option key={v.vehicle_id} value={v.plate_number}>
                {v.plate_number}
              </option>
            ))}
          </CFormSelect>
        </CModalBody>

        <CModalFooter>
          <CButton color="secondary" onClick={() => setDeliveryModal(false)}>
            Cancel
          </CButton>

          <CButton
            color="success"
            onClick={editingDelivery ? updateDelivery : addDelivery}
          >
            Save
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}

export default Logistics