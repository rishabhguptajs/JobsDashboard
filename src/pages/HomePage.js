import React from 'react'
import './HomePage.css'
import Header from '../components/Header'
import FooterComp from '../components/FooterComp'
import { Table } from 'antd'
import data from '../data/salaries'

const HomePage = () => {
  const filteredData = data.map(item => ({
    year: item.work_year,
    salary: item.salary,
  }))

  const uniqueYears = [...new Set(filteredData.map(item => item.year))]

  console.log(filteredData)
  console.log(uniqueYears)

  return (
    <div className='layout-homepage'>
      <Header />
      <main className='homepage-main-class'>
        <h2>Main Table</h2>
      </main>
      <FooterComp />
    </div>
  )
}

export default HomePage
