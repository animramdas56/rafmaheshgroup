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

const Projects = () => {
  const projects = [
    {
      id: 1,
      name: 'Enterprise Network Deployment',
      client: 'Golden Star Mining',
      start: '2026-01-10',
      end: '2026-07-15',
      status: 'Ongoing',
    },
    {
      id: 2,
      name: 'Cloud Migration Project',
      client: 'Accra Holdings Ltd',
      start: '2026-03-01',
      end: '2026-08-30',
      status: 'Ongoing',
    },
    {
      id: 3,
      name: 'Database Security Upgrade',
      client: 'Tema Logistics Group',
      start: '2026-04-05',
      end: '2026-06-25',
      status: 'Testing',
    },
  ]

  return (
    <>
      <CRow className="mb-4">
        <CCol sm={3}>
          <CWidgetStatsA value="3" title="Projects" />
        </CCol>

        <CCol sm={3}>
          <CWidgetStatsA value="2" title="Ongoing" />
        </CCol>

        <CCol sm={3}>
          <CWidgetStatsA value="1" title="Testing" />
        </CCol>

        <CCol sm={3}>
          <CWidgetStatsA value="3" title="Clients" />
        </CCol>
      </CRow>

      <CCard>
        <CCardHeader>IT Consulting Projects</CCardHeader>

        <CCardBody>
          <CTable hover responsive>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell>ID</CTableHeaderCell>
                <CTableHeaderCell>Project Name</CTableHeaderCell>
                <CTableHeaderCell>Client</CTableHeaderCell>
                <CTableHeaderCell>Start Date</CTableHeaderCell>
                <CTableHeaderCell>End Date</CTableHeaderCell>
                <CTableHeaderCell>Status</CTableHeaderCell>
              </CTableRow>
            </CTableHead>

            <CTableBody>
              {projects.map((project) => (
                <CTableRow key={project.id}>
                  <CTableDataCell>{project.id}</CTableDataCell>
                  <CTableDataCell>{project.name}</CTableDataCell>
                  <CTableDataCell>{project.client}</CTableDataCell>
                  <CTableDataCell>{project.start}</CTableDataCell>
                  <CTableDataCell>{project.end}</CTableDataCell>
                  <CTableDataCell>{project.status}</CTableDataCell>
                </CTableRow>
              ))}
            </CTableBody>
          </CTable>
        </CCardBody>
      </CCard>
    </>
  )
}

export default Projects