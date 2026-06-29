import React, { Suspense, useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { CSpinner, useColorModes } from '@coreui/react'


import './scss/style.scss'
import './scss/examples.scss'

// Layout
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))

// Pages
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'))
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'))

// Modules
const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const Employees = React.lazy(() => import('./views/employees/Employees'))
const Mining = React.lazy(() => import('./views/mining/mining'))
const Vehicles = React.lazy(() => import('./views/vehicles/vehicles'))
const Agriculture = React.lazy(() => import('./views/agriculture/Agriculture'))
const Finance = React.lazy(() => import('./views/finance/Finance'))
const Logistics = React.lazy(() => import('./views/logistics/logistics'))
const Inventory = React.lazy(() => import('./views/inventory/Inventory'))
const Projects = React.lazy(() => import('./views/projects/Projects'))
const RealEstate = React.lazy(() => import('./views/realestate/RealEstate'))

const App = () => {
  const { isColorModeSet, setColorMode } = useColorModes(
    'coreui-free-react-admin-template-theme'
  )

  const storedTheme = useSelector((state) => state.theme)

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.href.split('?')[1])
    const theme = urlParams.get('theme')

    if (theme) setColorMode(theme)
    if (isColorModeSet()) return

    setColorMode(storedTheme)
  }, [])

  return (
    <Suspense
      fallback={
        <div className="pt-3 text-center">
          <CSpinner color="primary" />
        </div>
      }
    >
      <Routes>

        <Route path="/404" element={<Page404 />} />
        <Route path="/500" element={<Page500 />} />

       <Route
  path="/"
  element={<DefaultLayout />}
        >
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="employees" element={<Employees />} />
          <Route path="mining" element={<Mining />} />
          <Route path="vehicles" element={<Vehicles />} />
          <Route path="agriculture" element={<Agriculture />} />
          <Route path="finance" element={<Finance />} />
          <Route path="logistics" element={<Logistics />} />
          <Route path="inventory" element={<Inventory />} />
          <Route path="projects" element={<Projects />} />
          <Route path="properties" element={<RealEstate />} />
        </Route>

      </Routes>
    </Suspense>
  )
}

export default App