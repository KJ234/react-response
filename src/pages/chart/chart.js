/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from "react";
import { Line } from "react-chartjs-2";

import { useNavigate, useLocation } from "react-router-dom";
import Select from "react-select";
import { ColorRing } from 'react-loader-spinner'
import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  LineController,
  BarController,
  TimeScale,

} from "chart.js";

ChartJS.register(
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  LineController,
  TimeScale,
  BarController
);

export const rules = {
  indexAxis: "x",
  elements: {
    bar: {
      borderWidth: 2,
    },
  },
  responsive: true,
};

const options = [
  { value: "ireland", label: "Ireland" },
  { value: "frankfurt", label: "Frankfurt" },
  { value: "london", label: "London" },
  { value: "wireless", label: "Wireless" },

];

function Chart() {

  const [spinner, setSpinner] = useState(false);
  const location = useLocation();
  const Navigate = useNavigate();
  const [option, setOption] = useState('environment');
  const [data, setData] = useState({

    labels: [],
    datasets: [
      {
        label: "",
      },
    ],
  });

  const fetchData = async (option) => {

    const url = `https://devops-dashboard-service.covatic.io/user-chart?environment=${option}`;
    Navigate(`${location.pathname}?${option}`);
    setSpinner(true)
    await fetch(url, {
      method: "GET",
      headers: {
        "x-access-token": sessionStorage.getItem("token"),
      },
    })
      .then((data) => {
        console.log("api data", data);
        setSpinner(false)
        if (data.status === 401) {
          Navigate("/login");
          sessionStorage.removeItem("token");
        }
        const res = data.json();
        return res;
      })
      .then((res) => {
        console.log("ressss", res);
        let results = res.label.results


        let formattedResults = results.map(function (r) { return { statusCode: r[0].value, time: r[1].value, count: r[2].value } })
        console.log(formattedResults)
        let label = {};

        for (let index in formattedResults) {
          let countData = formattedResults[index];

          if (!label[countData.statusCode]) {
            label[countData.statusCode] = Array(61).fill(0);
          }

          var today = new Date();
          var hourago = new Date(today.getTime() - (1000 * 60 * 60));

          let s = Math.floor((new Date(countData.time).getTime() - hourago) / 60000);
          label[countData.statusCode][s] = countData.count;
        }
        console.log('results', label)

        var object = label,
          result = Object
            .keys(object)
            .map(k => ({ [k]: object[k] }));

        console.log('almost done', result);
        console.log(result)

        let multiArrays = []
        for (const val of formattedResults) {
          multiArrays.push(val.statusCode)
        }
        let uniqueChars = [...new Set(multiArrays)];
        console.log(uniqueChars)

        const labels = [];

        const start = new Date(hourago);
        const end = new Date();

        const loop = start;
        while (loop <= end) {
          var loops = loop.setTime(loop.getTime() + 1000 * 60);
          var ByMinute = new Date(loops).toLocaleTimeString("en-us");
          labels.push(ByMinute);
        }

        const colors = ["rgb(0, 0, 128)", "rgb(255, 99, 132)", "rgb(124, 252, 0)", "rgb(255,140,0)", "rgb(0,128,128)", "rgb(75,0,130)", "rgb(220,20,60)", "rgb(128,0,0)", "rgb(0,0,0)", "rgb(223, 255, 0)", "rgb(0, 0, 128)", "rgb(255, 99, 132)", "rgb(124, 252, 0)",]
        const x = result.map((r, index) => {
          return {
            label: Object.keys(r)[0],
            data: Object.values(r)[0],
            backgroundColor: colors[index],
            borderColor: colors[index]
          }
        })
        console.log(x)

        setData({
          labels: labels,
          datasets: x,
        });
      })
      .catch((e) => {
        console.log("error", e);
      });
  };

  const handleSelect = (option) => {
    setOption(fetchData(option?.value || null))

  };



  return (
    <div className="chart">
      <div className="dropbox" style={{ position: "relative", marginTop: "5%", marginLeft: "10%", width: "18%" }}>
        <Select
          value={options.find((o) => o.value === option)}
          onChange={handleSelect}
          options={options}
        />
      </div>
      <div className="color-ring" style={{ position: "fixed", marginLeft: "25%", }}>
        {spinner && (
          <p>
            <ColorRing
              visible={true}
              height="600"
              width="600"
              colors={["rgb(0, 0, 128)", "rgb(255, 99, 132)", "rgb(124, 252, 0)", "rgb(255,140,0)", "rgb(0,128,128)",]}

            />

          </p>
        )}

      </div>
      <Line data={data} options={rules} />


    </div>
  );
}

export default Chart;
