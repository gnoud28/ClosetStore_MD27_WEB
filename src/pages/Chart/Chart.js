import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { Chart } from "primereact/chart";
import { NavLink } from "react-router-dom";
import { GetStatisticalAction } from "../../redux/action/ChartAction";
const AdminChart = (props) => {
  const dispatch = useDispatch();
  const { arrStatical } = useSelector((root) => root.ChartReducer);
  console.log(arrStatical);
  useEffect(() => {
    const action = GetStatisticalAction(year);
    dispatch(action);
  }, []);
  const [year, setYear] = useState("2023");
  const [arr, setArr] = useState([]);
  const [arr1, setArr1] = useState([]);
  useEffect(() => {
    setArr(
      arrStatical?.map((item, index) => {
        return item[0].orderCount
      })
    );
    setArr1(
      arrStatical?.map((item, index) => {
        return item[0].totalAmount
      })
    );
  }, [arrStatical]);
  useEffect(() => {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue("--text-color");
    const textColorSecondary = documentStyle.getPropertyValue(
      "--text-color-secondary"
    );
    const surfaceBorder = documentStyle.getPropertyValue("--surface-border");
    const data = {
      labels: [
        "Tháng 1",
        "Tháng 2",
        "Tháng 3",
        "Tháng 4",
        "Tháng 5 ",
        "Tháng 6",
        "Tháng 7",
        "Tháng 8",
        "Tháng 9",
        "Tháng 10",
        "Tháng 11",
        "Tháng 12",
      ],
      datasets: [
        {
          label: "Số lượng order",
          data: arr,
          fill: false,
          borderColor: documentStyle.getPropertyValue("--blue-400"),
          tension: 0.4,
        },
      ],
    };
    const options = {
      maintainAspectRatio: false,
      aspectRatio: 0.6,
      plugins: {
        legend: {
          labels: {
            color: textColor,
          },
        },
      },
      scales: {
        x: {
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            color: surfaceBorder,
          },
        },
        y: {
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            color: surfaceBorder,
          },
        },
      },
    };

    setChartData(data);
    setChartOptions(options);

    const documentStyle1 = getComputedStyle(document.documentElement);
    const textColor1 = documentStyle.getPropertyValue("--text-color");
    const textColorSecondary1 = documentStyle.getPropertyValue(
      "--text-color-secondary"
    );
    const surfaceBorder1 = documentStyle.getPropertyValue("--surface-border");
    const data1 = {
      labels: [
        "Tháng 1",
        "Tháng 2",
        "Tháng 3",
        "Tháng 4",
        "Tháng 5 ",
        "Tháng 6",
        "Tháng 7",
        "Tháng 8",
        "Tháng 9",
        "Tháng 10",
        "Tháng 11",
        "Tháng 12",
      ],
      datasets: [
        {
          label: "Tổng tiền theo tháng",
          data: arr1,
          fill: false,
          borderColor: documentStyle1.getPropertyValue("--blue-400"),
          tension: 0.4,
        },
      ],
    };
    const options1 = {
      maintainAspectRatio: false,
      aspectRatio: 0.6,
      plugins: {
        legend: {
          labels: {
            color: textColor1,
          },
        },
      },
      scales: {
        x: {
          ticks: {
            color: textColorSecondary1,
          },
          grid: {
            color: surfaceBorder1,
          },
        },
        y: {
          ticks: {
            color: textColorSecondary1,
          },
          grid: {
            color: surfaceBorder1,
          },
        },
      },
    };

    setChartData1(data1);
    setChartOptions1(options1);



  }, [arr, arr1]);
  const [chartData, setChartData] = useState({});
  const [chartOptions, setChartOptions] = useState({});
  const [chartData1, setChartData1] = useState({});
  const [chartOptions1, setChartOptions1] = useState({});
  return (
    <div>
      <div className="mb-9">
        <section>
          <div className="top-area bluesh high-opacity">
            <div
              className="bg-image"
              style={{ backgroundImage: "url(images/resources/top-bg.jpg)" }}
            />
            <div className="container mb-9">
              <div className="row">
                <div className="col-lg-12">
                  <div className="post-subject">
                    <div className="university-tag">
                      <div className="Search-result">
                        <h2 style={{ lineHeight: '20px' }}>

                          <strong>Thống kê số lượng order trong năm 2023</strong>
                        </h2>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section>
          <div className="gap" style={{ padding: 0 }}>
            <div className="container">
              <div className="row">
                <div className="col-lg-12">
                  <div id="page-contents" className="row merged20">
                    <div className="col-lg-12">
                      <div className="tab-content">
                        <div
                          className="tab-pane fade active show"
                          id="allposts"
                        >
                          <div className="main-wraper">
                            <div style={{ display: "flex" }}>
                              <div className="main-title">

                              </div>

                            </div>
                            <div className="card" style={{ marginTop: '50px' }}>
                              <Chart
                                type="line"
                                data={chartData}
                                options={chartOptions}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <div style={{ marginTop: '100px' }}>
        <section>
          <div className="top-area bluesh high-opacity">
            <div
              className="bg-image"
              style={{ backgroundImage: "url(images/resources/top-bg.jpg)" }}
            />
            <div className="container mb-9">
              <div className="row">
                <div className="col-lg-12">
                  <div className="post-subject">
                    <div className="university-tag">
                      <div className="Search-result">
                        <h2 style={{ lineHeight: '20px' }}>

                          <strong>Thống kê tổng tiền theo từng tháng trong năm 2023</strong>
                        </h2>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section>
          <div className="gap" style={{ padding: 0 }}>
            <div className="container">
              <div className="row">
                <div className="col-lg-12">
                  <div id="page-contents" className="row merged20">
                    <div className="col-lg-12">
                      <div className="tab-content">
                        <div
                          className="tab-pane fade active show"
                          id="allposts"
                        >
                          <div className="main-wraper">
                            <div style={{ display: "flex" }}>
                              <div className="main-title">

                              </div>

                            </div>
                            <div className="card" style={{ marginTop: '50px' }}>
                              <Chart
                                type="line"
                                data={chartData1}
                                options={chartOptions1}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AdminChart;
