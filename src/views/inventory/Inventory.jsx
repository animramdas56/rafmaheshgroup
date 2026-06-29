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

const Inventory = () => {
  const inventory = [
    {
      id: 1,
      item: 'Cement',
      category: 'Construction Material',
      quantity: 500,
      price: 75,
      location: 'Tema Warehouse',
    },
    {
      id: 2,
      item: 'Diesel',
      category: 'Fuel',
      quantity: 12000,
      price: 15.5,
      location: 'Mining Depot',
    },
    {
      id: 3,
      item: 'Safety Helmet',
      category: 'Safety Equipment',
      quantity: 200,
      price: 45,
      location: 'Main Store',
    },
    {
      id: 4,
      item: 'Steel Rods',
      category: 'Construction Material',
      quantity: 800,
      price: 120,
      location: 'Property Yard',
    },
    {
      id: 5,
      item: 'Industrial Chemicals',
      category: 'Chemical',
      quantity: 350,
      price: 180,
      location: 'Chemical Storage',
    },
  ]

  return (
    <>
      <CRow className="mb-4">
        <CCol sm={3}>
          <CWidgetStatsA value="5" title="Inventory Items" />
        </CCol>

        <CCol sm={3}>
          <CWidgetStatsA value="4" title="Categories" />
        </CCol>

        <CCol sm={3}>
          <CWidgetStatsA value="13,850" title="Total Quantity" />
        </CCol>

        <CCol sm={3}>
          <CWidgetStatsA value="4" title="Warehouses" />
        </CCol>
      </CRow>

      <CCard>
        <CCardHeader>Industrial Materials & Inventory</CCardHeader>

        <CCardBody>
          <CTable hover responsive>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell>ID</CTableHeaderCell>
                <CTableHeaderCell>Item Name</CTableHeaderCell>
                <CTableHeaderCell>Category</CTableHeaderCell>
                <CTableHeaderCell>Quantity</CTableHeaderCell>
                <CTableHeaderCell>Unit Price</CTableHeaderCell>
                <CTableHeaderCell>Warehouse</CTableHeaderCell>
              </CTableRow>
            </CTableHead>

            <CTableBody>
              {inventory.map((item) => (
                <CTableRow key={item.id}>
                  <CTableDataCell>{item.id}</CTableDataCell>
                  <CTableDataCell>{item.item}</CTableDataCell>
                  <CTableDataCell>{item.category}</CTableDataCell>
                  <CTableDataCell>{item.quantity}</CTableDataCell>
                  <CTableDataCell>GH₵ {item.price}</CTableDataCell>
                  <CTableDataCell>{item.location}</CTableDataCell>
                </CTableRow>
              ))}
            </CTableBody>
          </CTable>
        </CCardBody>
      </CCard>
    </>
  )
}

export default Inventory