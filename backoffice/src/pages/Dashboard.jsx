import React from 'react'
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend

} from "chart.js/auto";
  import { Pie } from "react-chartjs-2";
import { Bar } from "react-chartjs-2";


function Dashboard() {
  const labels =['mon','tue','wed','thu'];
  const data = {
    labels: labels,
    datasets: [
      {
        label: "My First Dataset",
        data: [65, 59, 80, 81, 56, 55, 40],
        backgroundColor: [
          "#004c6d",
          "#346888",
          "#5886a5",
          "#7aa6c2",
          "#9dc6e0",
          "#c1e7ff",
          "#ffeaa0",
        ],
        borderColor: [
          "rgb(255, 99, 132)",
          "rgb(255, 159, 64)",
          "rgb(255, 205, 86)",
          "rgb(75, 192, 192)",
          "rgb(54, 162, 235)",
          "rgb(153, 102, 255)",
          "rgb(201, 203, 207)",
        ],
        borderWidth: 1,
      },
    ],
  };
  const options = {
    
  }

    return (
      <div style={{ zIndex: 10, position: "fixed" }}>
        <h3
          className="p-3"
          style={{
            fontFamily: "Segoe UI",
            color: "#11354D",
            textDecoration: "underline",
          }}
        >
          Dashboard
        </h3>
        <div className='d-flex gap-5 align-items-center'>
          <div>

          <Bar
            style={{ padding: "5px", width: "30rem" }}
            options={options}
            data={data}
          />
          </div>
          <div>

          <Pie
            style={{ padding: "5px", width: "30rem" }}
            options={options}
            data={data}
          />
          </div>
        </div>
      </div>
    );}
        

export default Dashboard;
