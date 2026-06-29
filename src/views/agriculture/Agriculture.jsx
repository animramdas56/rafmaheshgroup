import React from 'react'
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
} from '@coreui/react'

const Agriculture = () => {
  const farms = [
    {
      id: 1,
      name: 'RAF Poultry Farm',
      location: 'Volta Region, Ghana',
      acres: 120.5,
    },
    {
      id: 2,
      name: 'RAF Export Plantation',
      location: 'Greater Accra Region, Ghana',
      acres: 300,
    },
  ]

  return (
    <>
      <CRow className="mb-4">
        <CCol sm={3}>
          <CWidgetStatsA value="2" title="Farms" />
        </CCol>

        <CCol sm={3}>
          <CWidgetStatsA value="420.5" title="Total Acres" />
        </CCol>

        <CCol sm={3}>
          <CWidgetStatsA value="2" title="Locations" />
        </CCol>

        <CCol sm={3}>
          <CWidgetStatsA value="Active" title="Farm Status" />
        </CCol>
      </CRow>

      <CCard>
        <CCardHeader>Farms & Agricultural Operations</CCardHeader>

        <CCardBody>
          <CTable hover responsive>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell>ID</CTableHeaderCell>
                <CTableHeaderCell>Farm Name</CTableHeaderCell>
                <CTableHeaderCell>Location</CTableHeaderCell>
                <CTableHeaderCell>Size (Acres)</CTableHeaderCell>
              </CTableRow>
            </CTableHead>

            <CTableBody>
              {farms.map((farm) => (
                <CTableRow key={farm.id}>
                  <CTableDataCell>{farm.id}</CTableDataCell>
                  <CTableDataCell>{farm.name}</CTableDataCell>
                  <CTableDataCell>{farm.location}</CTableDataCell>
                  <CTableDataCell>{farm.acres}</CTableDataCell>
                </CTableRow>
              ))}
            </CTableBody>
          </CTable>
        </CCardBody>
      </CCard>
    </>
  )
}

export default Agriculture