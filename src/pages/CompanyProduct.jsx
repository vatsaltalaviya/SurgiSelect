import React from 'react'
import CompanyProductCategory from './CompanyProductCategory'
import CompanyProductsDisplay from './CompanyProductsDisplay'

const CompanyProduct = ({categoryData,categoryloading}) => {
  return (
    <div className='w-full px-2 py-2'>
      <CompanyProductCategory categoryData={categoryData} categoryloading />
      {/* <CompanyProductsDisplay /> */}
    </div>
  )
}

export default CompanyProduct
