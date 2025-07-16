import React from 'react'
import CompanyProductCategory from './CompanyProductCategory'
import CompanyProductsDisplay from './CompanyProductsDisplay'

const CompanyProduct = ({categoryData,categoryloading,setId,showproducts,getId,getProductDisplay}) => {
  return (
    <div className='w-full px-2 py-2'>
      {getId != null && getProductDisplay ? <CompanyProductsDisplay getId={getId} getProductDisplay={getProductDisplay} setId={setId} showproducts={showproducts} categoryData={categoryData} categoryloading={categoryloading}/>:<CompanyProductCategory setId={setId} showproducts={showproducts} categoryData={categoryData} categoryloading={categoryloading} />}
    </div>
  )
}

export default CompanyProduct
