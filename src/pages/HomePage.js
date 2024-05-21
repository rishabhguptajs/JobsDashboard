import React from 'react'
import './HomePage.css'
import Header from '../components/Header'
import FooterComp from '../components/FooterComp'
import { Table } from 'antd'
import data from '../data/salaries'

const HomePage = () => {

  const filteredData = data.map(item => ({
    year: item.work_year,
    salary: item.salary_in_usd,
  }))

  // console.log(filteredData)

  const dataColumns = [
    {
      title: 'Year',
      dataIndex: 'year',
      key: 'year',
      sorter: (a, b) => a.year - b.year,
    },
    {
      title: 'Total Jobs',
      dataIndex: 'totalJobs',
      key: 'totalJobs',
      sorter: (a, b) => a.totalJobs - b.totalJobs,
    },
    {
      title: 'Average Salary (in USD)',
      dataIndex: 'avgSalary',
      key: 'avgSalary',
      sorter: (a, b) => a.salary - b.salary,
      render: (value) => value.toFixed(2),
    },
  ];


  const processData = (data) => {
    const yearData = {};

    data.forEach((item) => {
      const { year, salary } = item;
      if(!yearData[year]){
        yearData[year] = {
          totalJobs: 0,
          totalSalary: 0,
        } 
      }
      yearData[year].totalSalary += salary;
      yearData[year].totalJobs += 1;
    });

    const result = Object.keys(yearData).map((year) => {
      const { totalSalary, totalJobs } = yearData[year];
      const avgSalary = totalSalary / totalJobs;
      return {
        year,
        totalJobs,
        avgSalary,
      };
    });

    return result;
  }


  const dataS = processData(filteredData);
  console.log(dataS)

  return (
    <div className='layout-homepage'>
      <Header />
      <main className='homepage-main-class'>
        <h2>Main Table</h2>
        <Table
          columns={dataColumns}
          dataSource={dataS}
          rowKey="year"
         />
      </main>
      <FooterComp />
    </div>
  )
}

export default HomePage
