import React from 'react'
import { CFooter } from '@coreui/react'

const AppFooter = () => {
  return (
    <CFooter>
      <div>
        © 2026 RAF-MAHESH GROUP LTD
      </div>

      <div className="ms-auto">
        Integrated Mining • Logistics • Real Estate • Agriculture • Finance ERP
      </div>
    </CFooter>
  )
}

export default React.memo(AppFooter)
