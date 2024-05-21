import React, { useState } from "react"
import "./HomePage.css"
import Header from "../components/Header"
import FooterComp from "../components/FooterComp"
import { Table } from "antd"
import data from "../data/salaries"

const HomePage = () => {
  const [selectedYear, setSelectedYear] = useState(null)

  const filteredData = data.map((item) => ({
    year: item.work_year,
    salary: item.salary_in_usd,
    title: item.job_title,
  }))

  console.log(filteredData)

  const processData = (data) => {
    const yearData = {}

    data.forEach((item) => {
      const { year, salary } = item
      if (!yearData[year]) {
        yearData[year] = {
          totalJobs: 0,
          totalSalary: 0,
        }
      }
      yearData[year].totalSalary += salary
      yearData[year].totalJobs += 1
    })

    const result = Object.keys(yearData).map((year) => {
      const { totalSalary, totalJobs } = yearData[year]
      const avgSalary = totalSalary / totalJobs
      return {
        year,
        totalJobs,
        avgSalary,
      }
    })

    return result
  }

  const handleYearClick = (year) => {
    setSelectedYear(year)
  }

  const renderYearColumn = (text, record) => {
    return <a onClick={() => handleYearClick(record.year)}>{text}</a>
  }

  const processJobData = (data, year) => {
    const jobData = data.filter((item) => item.year == year)
    console.log(jobData)
    const jobResult = {}

    jobData.forEach((item) => {
      const { title } = item
      if (!jobResult[title]) {
        jobResult[title] = 0
      }
      jobResult[title] += 1
    })

    const result = Object.keys(jobResult).map((jobTitle) => {
      console.log(jobTitle)
      return {
        jobTitle,
        count: jobResult[jobTitle],
      }
    })

    console.log(result)

    return result
  }

  const jobData = selectedYear ? processJobData(filteredData, selectedYear) : []

  console.log(jobData)

  const dataColumns = [
    {
      title: "Year",
      dataIndex: "year",
      key: "year",
      sorter: (a, b) => a.year - b.year,
      render: renderYearColumn,
    },
    {
      title: "Total Jobs",
      dataIndex: "totalJobs",
      key: "totalJobs",
      sorter: (a, b) => a.totalJobs - b.totalJobs,
    },
    {
      title: "Average Salary (in USD)",
      dataIndex: "avgSalary",
      key: "avgSalary",
      sorter: (a, b) => a.avgSalary - b.avgSalary,
      render: (value) => value.toFixed(2),
    },
  ]

  const jobColumns = [
    {
      title: "Job Title",
      dataIndex: "jobTitle",
      key: "jobTitle",
    },
    {
      title: "Count",
      dataIndex: "count",
      key: "count",
      sorter: (a, b) => a.count - b.count,
    },
  ]

  const dataS = processData(filteredData)

  return (
    <div className="layout-homepage">
      <Header />
      <main className="homepage-main-class">
        <div className="main-table-container">
          <div className="main-table-container-table">
            <h2>Main Table</h2>
            <Table
              columns={dataColumns}
              dataSource={dataS}
              rowKey="year"
              bordered
            />
          </div>
          <div>
            <h2>Line Graph</h2>
          </div>
        </div>

        {selectedYear && (
          <div>
            <h2>Job Titles for {selectedYear}</h2>
            <Table
              columns={jobColumns}
              dataSource={jobData}
              rowKey="jobTitle"
              bordered
            />
          </div>
        )}
      </main>
      <FooterComp />
    </div>
  )
}

export default HomePage
