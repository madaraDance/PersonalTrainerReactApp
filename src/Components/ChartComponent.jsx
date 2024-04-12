import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'
import { _ } from 'lodash'
import { useState, useEffect } from 'react'

export default function ChartComponent() {
    const [chart, setChart] = useState([])

    useEffect(() => {
        fetch('https://customerrestservice-personaltraining.rahtiapp.fi/gettrainings', {method: 'GET'})
        .then(response => {
            if (!response.ok) {
                throw new Error("Error in retreiveing training list " + response.statusText);
            }
            return response.json();
        })
        .then(data => setChart(prepareChartData(data)))
        .catch(err => console.log(err))
      }, [])

    const prepareChartData = (trainings) => {
        const groupedData = _.groupBy(trainings, 'activity')
        const preparedData = Object.keys(groupedData).map((activity) => ({
            activity,
            'Duration': _.sumBy(groupedData[activity], 'duration'),
          }))
          return preparedData
    }

    return (
        <>
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '90vh'}}>
            <BarChart width={1000} height={450} data={chart}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="activity" />
                <YAxis label={{ value: 'Duration (min)', angle: -90, position: 'insideLeft' }} />
                <Tooltip />
                <Legend />
                <Bar dataKey="Duration" fill="#8884d8"/>
            </BarChart>
            </div>
        </>
      )
}