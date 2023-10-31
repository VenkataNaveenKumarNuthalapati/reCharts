import {BarChart, Bar, XAxis, YAxis, Legend} from 'recharts'
import './index.css'

const VaccinationCoverage = props => {
  const {last7DaysData} = props
  const DataFormatter = number => {
    if (number * 1000 > 1000) {
      return `${((number * 1000) / 1000).toString()}k`
    }
    return number.toString()
  }

  return (
    <div className="card-container">
      <h1>Vaccination Coverage</h1>

      <BarChart
        width={1000}
        height={300}
        data={last7DaysData}
        margin={{
          top: 5,
        }}
      >
        <XAxis
          dataKey="vaccineDate"
          tick={{
            stroke: 'gray',
            strokeWidth: 1,
          }}
        />
        <YAxis
          tickFormatter={DataFormatter}
          tick={{
            stroke: 'gray',
            strokeWidth: 0,
          }}
        />
        <Legend
          wrapperStyle={{
            padding: 30,
          }}
        />
        <Bar dataKey="dose1" name="dose1" fill="#1f77b4" barSize="20%" />
        <Bar dataKey="dose2" name="dose2" fill="#fd7f0e" barSize="20%" />
      </BarChart>
    </div>
  )
}

export default VaccinationCoverage
