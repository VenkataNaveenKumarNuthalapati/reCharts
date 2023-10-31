import {Component} from 'react'
import Loader from 'react-loader-spinner'
import VaccinationCoverage from '../VaccinationCoverage'
import VaccinationByGender from '../VaccinationByGender'
import VaccinationByAge from '../VaccinationByAge'

import './index.css'

const status = {
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class CowinDashboard extends Component {
  state = {
    pageStatus: status.loading,
    covidData: {},
  }

  componentDidMount() {
    this.getCovidData()
  }

  onSuccessFetch = data => {
    const convertedData = {
      last7DaysData: data.last_7_days_vaccination.map(eachObj => ({
        dose1: eachObj.dose_1,
        dose2: eachObj.dose_2,
        vaccineDate: eachObj.vaccine_date,
      })),
      vaccineByAge: data.vaccination_by_age,
      vaccineByGender: data.vaccination_by_gender,
    }

    this.setState({
      pageStatus: status.success,
      covidData: convertedData,
    })
  }

  getCovidData = async () => {
    const url = 'https://apis.ccbp.in/covid-vaccination-data'
    const response = await fetch(url)

    console.log(response.ok)
    if (response.ok === true) {
      const data = await response.json()
      this.onSuccessFetch(data)
    } else {
      this.setState({pageStatus: status.failure})
    }
  }

  renderLoader = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="100" width="100" />
    </div>
  )

  renderCovidData = () => {
    const {covidData} = this.state
    return (
      <div>
        <VaccinationCoverage last7DaysData={covidData.last7DaysData} />
        <VaccinationByGender vaccineByGender={covidData.vaccineByGender} />
        <VaccinationByAge vaccineByAge={covidData.vaccineByAge} />
      </div>
    )
  }

  renderFailurView = () => (
    <div>
      <h1>Something went wrong</h1>
      <img
        className="fail-image"
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png "
        alt="failure view"
      />
    </div>
  )

  getHomePage = pageStatus => {
    console.log()

    return (
      <div className="bg-container">
        <h1>
          <img
            className="logo"
            src="https://assets.ccbp.in/frontend/react-js/cowin-logo.png"
            alt="website logo"
          />
          Co-WIN
        </h1>
        <h1>CoWIN Vaccination in India</h1>
        <div>
          {pageStatus === status.loading && this.renderLoader()}
          {pageStatus === status.success && this.renderCovidData()}
          {pageStatus === status.failure && this.renderFailurView()}
        </div>
      </div>
    )
  }

  render() {
    const {pageStatus} = this.state

    return this.getHomePage(pageStatus)
  }
}

export default CowinDashboard
