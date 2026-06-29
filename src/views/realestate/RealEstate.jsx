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

const RealEstate = () => {
  const [properties, setProperties] = useState([])
  const [visible, setVisible] = useState(false)
  const [editingProperty, setEditingProperty] = useState(null)
  const [loading, setLoading] = useState(true)

  const [newProperty, setNewProperty] = useState({
    property_name: '',
    location: '',
    price: '',
    property_type: '',
    status: 'Available',
  })

  // ================= FETCH PROPERTIES =================
  const fetchProperties = () => {
    setLoading(true)

    fetch('http://localhost:5000/api/properties')
      .then(res => res.json())
      .then(data => {
        setProperties(Array.isArray(data) ? data : [])
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    fetchProperties()
  }, [])

  // ================= ADD PROPERTY =================
  const addProperty = async () => {
    try {
      await fetch('http://localhost:5000/api/properties', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProperty),
      })

      fetchProperties()
      setVisible(false)

      setNewProperty({
        property_name: '',
        location: '',
        price: '',
        property_type: '',
        status: 'Available',
      })

      alert('Property added successfully')
    } catch (err) {
      console.error(err)
      alert('Failed to add property')
    }
  }

  // ================= EDIT =================
  const editProperty = (item) => {
    setEditingProperty(item)
    setNewProperty({
      property_name: item.property_name,
      location: item.location,
      price: item.price,
      property_type: item.property_type,
      status: item.status,
    })
    setVisible(true)
  }

  // ================= UPDATE =================
  const updateProperty = async () => {
    try {
      await fetch(
        `http://localhost:5000/api/properties/${editingProperty.property_id}`,
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newProperty),
        }
      )

      fetchProperties()
      setVisible(false)
      setEditingProperty(null)

      setNewProperty({
        property_name: '',
        location: '',
        price: '',
        property_type: '',
        status: 'Available',
      })

      alert('Property updated successfully')
    } catch (err) {
      console.error(err)
      alert('Failed to update property')
    }
  }

  // ================= DELETE =================
  const deleteProperty = async (id) => {
    if (!window.confirm('Delete this property?')) return

    try {
      await fetch(`http://localhost:5000/api/properties/${id}`, {
        method: 'DELETE',
      })

      fetchProperties()
      alert('Property deleted successfully')
    } catch (err) {
      console.error(err)
      alert('Failed to delete property')
    }
  }

  return (
    <>
      {/* ================= DASHBOARD CARDS ================= */}
      <CRow className="mb-4">
        <CCol sm={3}>
          <CWidgetStatsA value={properties.length} title="Properties" />
        </CCol>

        <CCol sm={3}>
          <CWidgetStatsA
            value={properties.filter(p => p.status === 'Available').length}
            title="Available"
          />
        </CCol>

        <CCol sm={3}>
          <CWidgetStatsA
            value={
              properties.filter(p => p.status === 'Under Construction').length
            }
            title="Under Construction"
          />
        </CCol>

        <CCol sm={3}>
          <CWidgetStatsA value={properties.length} title="Projects" />
        </CCol>
      </CRow>

      {/* ================= TABLE ================= */}
      <CCard>
        <CCardHeader className="d-flex justify-content-between">
          <strong>Real Estate Operations</strong>

          <CButton
            color="success"
            onClick={() => {
              setEditingProperty(null)
              setNewProperty({
                property_name: '',
                location: '',
                price: '',
                property_type: '',
                status: 'Available',
              })
              setVisible(true)
            }}
          >
            + Add Property
          </CButton>
        </CCardHeader>

        <CCardBody>
          <CTable>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell>ID</CTableHeaderCell>
                <CTableHeaderCell>Name</CTableHeaderCell>
                <CTableHeaderCell>Location</CTableHeaderCell>
                <CTableHeaderCell>Price</CTableHeaderCell>
                <CTableHeaderCell>Type</CTableHeaderCell>
                <CTableHeaderCell>Status</CTableHeaderCell>
                <CTableHeaderCell>Actions</CTableHeaderCell>
              </CTableRow>
            </CTableHead>

            <CTableBody>
              {loading ? (
                <CTableRow>
                  <CTableDataCell colSpan={7}>
                    Loading...
                  </CTableDataCell>
                </CTableRow>
              ) : (
                (Array.isArray(properties) ? properties : []).map(item => (
                  <CTableRow key={item.property_id}>
                    <CTableDataCell>{item.property_id}</CTableDataCell>
                    <CTableDataCell>{item.property_name}</CTableDataCell>
                    <CTableDataCell>{item.location}</CTableDataCell>
                    <CTableDataCell>
                      {Number(item.price).toLocaleString()}
                    </CTableDataCell>
                    <CTableDataCell>{item.property_type}</CTableDataCell>
                    <CTableDataCell>{item.status}</CTableDataCell>

                    <CTableDataCell>
                      <CButton
                        color="primary"
                        size="sm"
                        onClick={() => editProperty(item)}
                      >
                        Edit
                      </CButton>

                      <CButton
                        color="danger"
                        size="sm"
                        className="ms-2"
                        onClick={() => deleteProperty(item.property_id)}
                      >
                        Delete
                      </CButton>
                    </CTableDataCell>
                  </CTableRow>
                ))
              )}
            </CTableBody>
          </CTable>
        </CCardBody>
      </CCard>

      {/* ================= MODAL ================= */}
      <CModal visible={visible} onClose={() => setVisible(false)}>
        <CModalHeader>
          <CModalTitle>
            {editingProperty ? 'Edit Property' : 'Add Property'}
          </CModalTitle>
        </CModalHeader>

        <CModalBody>
          <CFormInput
            className="mb-2"
            placeholder="Property Name"
            value={newProperty.property_name}
            onChange={e =>
              setNewProperty({
                ...newProperty,
                property_name: e.target.value,
              })
            }
          />

          <CFormInput
            className="mb-2"
            placeholder="Location"
            value={newProperty.location}
            onChange={e =>
              setNewProperty({
                ...newProperty,
                location: e.target.value,
              })
            }
          />

          <CFormInput
            className="mb-2"
            placeholder="Price"
            value={newProperty.price}
            onChange={e =>
              setNewProperty({
                ...newProperty,
                price: e.target.value,
              })
            }
          />

          <CFormInput
            className="mb-2"
            placeholder="Property Type"
            value={newProperty.property_type}
            onChange={e =>
              setNewProperty({
                ...newProperty,
                property_type: e.target.value,
              })
            }
          />

          <CFormSelect
            value={newProperty.status}
            onChange={e =>
              setNewProperty({
                ...newProperty,
                status: e.target.value,
              })
            }
          >
            <option value="Available">Available</option>
            <option value="Under Construction">Under Construction</option>
          </CFormSelect>
        </CModalBody>

        <CModalFooter>
          <CButton color="secondary" onClick={() => setVisible(false)}>
            Cancel
          </CButton>

          <CButton
            color="success"
            onClick={editingProperty ? updateProperty : addProperty}
          >
            Save
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}

export default RealEstate