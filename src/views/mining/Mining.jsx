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

const Mining = () => {
  const [sites, setSites] = useState([])

  const [visible, setVisible] = useState(false)

  const [siteName, setSiteName] = useState('')
  const [location, setLocation] = useState('')
  const [status, setStatus] = useState('Active')
  const [editingId, setEditingId] = useState(null)

  const fetchSites = () => {
    fetch('http://localhost:5000/api/mining')
      .then((res) => res.json())
      .then((data) => {
        setSites(Array.isArray(data) ? data : [])
      })
      .catch((err) => {
        console.error(err)
        setSites([])
      })
  }

  useEffect(() => {
    fetchSites()
  }, [])

  const addSite = async () => {
    try {
      await fetch('http://localhost:5000/api/mining', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          site_name: siteName,
          location,
          status,
        }),
      })


      setVisible(false)

      setSiteName('')
      setLocation('')
      setStatus('Active')

      fetchSites()
    } catch (error) {
      console.error(error)
    }
  }


const saveSite = async () => {
  try {
    if (editingId) {
      await fetch(
        `http://localhost:5000/api/mining/${editingId}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            site_name: siteName,
            location,
            status,
          }),
        },
      )
    } else {
      await addSite()
      return
    }

    setVisible(false)

    setEditingId(null)
    setSiteName('')
    setLocation('')
    setStatus('Active')

    fetchSites()
  } catch (error) {
    console.error(error)
  }
}






const editSite = (site) => {
  setEditingId(site.site_id)

  setSiteName(site.site_name)
  setLocation(site.location)
  setStatus(site.status)

  setVisible(true)
}






  const deleteSite = async (id) => {
    const confirmDelete = window.confirm(
      'Delete this mining site?'
    )

    if (!confirmDelete) return

    try {
      await fetch(
        `http://localhost:5000/api/mining/${id}`,
        {
          method: 'DELETE',
        },
      )

      fetchSites()
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <CRow className="mb-4">
        <CCol sm={3}>
          <CWidgetStatsA
            value={sites.length}
            title="Mining Sites"
          />
        </CCol>

        <CCol sm={3}>
          <CWidgetStatsA
            value="3"
            title="Equipment"
          />
        </CCol>

        <CCol sm={3}>
          <CWidgetStatsA
            value={
              sites.filter(
                (site) => site.status === 'Active',
              ).length
            }
            title="Active Sites"
          />
        </CCol>

        <CCol sm={3}>
          <CWidgetStatsA
            value={
              sites.filter(
                (site) =>
                  site.status === 'Maintenance',
              ).length
            }
            title="Maintenance"
          />
        </CCol>
      </CRow>

      <CCard>
        <CCardHeader className="d-flex justify-content-between align-items-center">
          Mining Operations

          <CButton
            color="success"
            onClick={() => setVisible(true)}
          >
            Add Site
          </CButton>
        </CCardHeader>

        <CCardBody>
          <CTable hover responsive>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell>ID</CTableHeaderCell>
                <CTableHeaderCell>
                  Site Name
                </CTableHeaderCell>
                <CTableHeaderCell>
                  Location
                </CTableHeaderCell>
                <CTableHeaderCell>
                  Status
                </CTableHeaderCell>
                <CTableHeaderCell>
                  Actions
                </CTableHeaderCell>
              </CTableRow>
            </CTableHead>

            <CTableBody>
              {sites.map((site) => (
                <CTableRow
                  key={site.site_id}
                >
                  <CTableDataCell>
                    {site.site_id}
                  </CTableDataCell>

                  <CTableDataCell>
                    {site.site_name}
                  </CTableDataCell>

                  <CTableDataCell>
                    {site.location}
                  </CTableDataCell>

                  <CTableDataCell>
                    {site.status}
                  </CTableDataCell>

                  <CTableDataCell>
                    <CButton
  color="primary"
  variant="outline"
  size="sm"
  className="me-2"
  onClick={() => {
    console.log('EDIT CLICKED')
    editSite(site)
  }}
>
  Edit
</CButton>

                    <CButton
                      color="danger"
                      size="sm"
                      onClick={() =>
                        deleteSite(
                          site.site_id,
                        )
                      }
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

      <CModal
        visible={visible}
        onClose={() => setVisible(false)}
      >
        <CModalHeader>
          <CModalTitle>
  {editingId
    ? 'Edit Mining Site'
    : 'Add Mining Site'}
</CModalTitle>
        </CModalHeader>

        <CModalBody>
          <CFormInput
            label="Site Name"
            value={siteName}
            onChange={(e) =>
              setSiteName(
                e.target.value,
              )
            }
            className="mb-3"
          />

          <CFormInput
            label="Location"
            value={location}
            onChange={(e) =>
              setLocation(
                e.target.value,
              )
            }
            className="mb-3"
          />

          <CFormSelect
            label="Status"
            value={status}
            onChange={(e) =>
              setStatus(
                e.target.value,
              )
            }
          >
            <option value="Active">
              Active
            </option>

            <option value="Maintenance">
              Maintenance
            </option>
          </CFormSelect>
        </CModalBody>

        <CModalFooter>
          <CButton
            color="secondary"
            onClick={() =>
              setVisible(false)
            }
          >
            Cancel
          </CButton>

          <CButton
  color="success"
  onClick={saveSite}
>
  {editingId
    ? 'Update Site'
    : 'Save Site'}
</CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}

export default Mining