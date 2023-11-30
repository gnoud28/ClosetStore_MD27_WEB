import { Fragment, useEffect, useRef, useState } from "react";
import { Route, NavLink } from "react-router-dom";
import { history } from "../../App";
import { Toast } from "primereact/toast";
import { http } from "../../utis/reponse";
export const AdminTemplate = (props) => {
  const { Component, ...restProps } = props;
  const [noti, setNoti] = useState({});
const[tb,setTB] = useState('')
  useEffect(() => {
    const fetchData = async () => {
      try {
        let result = await http.get('/cart/getlistnoti');
        if (Array.isArray(result.data.data)) {
          setNoti(result.data.data);
        } else {
          console.error("Received data is not an array:", result.data.data);
          setNoti(result.data.data);
          setTB("list")
        }
      } catch (error) {
        console.log(error.response.data.message);
       setTB(error.response.data.message)
      }
    };
  
    // Call `fetchData` initially and then every 3 seconds
    fetchData();
    const interval = setInterval(fetchData, 4000);
  
    // Clean up the interval on component unmount to avoid memory leaks
    return () => clearInterval(interval);
  }, []);
  console.log(tb)
  return (
    <Route
      {...restProps}
      render={(propsRoute) => {
        if (localStorage.getItem("admin")) {
          return (
            <div>
             {tb === "list"?
              <div style={{ position: "absolute", right: "40px", top: "60px", zIndex:999, cursor:'pointer' }}>
              <div
                style={{
                  border: "1px solid black",
                  borderRadius: "5px",
                  padding: "20px 40px",
                  backgroundColor: "#f0f0f0",
                  boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                  color: "#333",
                  fontWeight: "bold",
                  fontFamily: "Arial, sans-serif",
                }}
              >
              <NavLink to="/order"> {noti.user?.full_name} vừa đặt hàng</NavLink>
              </div>
            </div> : <div></div>}
              {/* Banner */}
              <a
                href="https://webpixels.io/components?ref=codepen"
                className="btn w-full btn-primary text-truncate rounded-0 py-2 border-0 position-relative"
                style={{ zIndex: 1000 }}
              >
                <strong>Closet Store</strong> →
              </a>
              {/* Dashboard */}
              <div className="d-flex flex-column flex-lg-row h-lg-full bg-surface-secondary">
                {/* Vertical Navbar */}
                <nav
                  className="navbar show navbar-vertical h-lg-screen navbar-expand-lg px-0 py-3 navbar-light bg-white border-bottom border-bottom-lg-0 border-end-lg"
                  id="navbarVertical"
                >
                  <div className="container-fluid">
                    {/* Toggler */}
                    <button
                      className="navbar-toggler ms-n2"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#sidebarCollapse"
                      aria-controls="sidebarCollapse"
                      aria-expanded="false"
                      aria-label="Toggle navigation"
                    >
                      <span className="navbar-toggler-icon" />
                    </button>
                    {/* Brand */}
                    <a
                      className="navbar-brand py-lg-2 mb-lg-5 px-lg-6 me-0"
                      href="#"
                    >
                      <img
                        style={{ width: "200px", height: "200px" }}
                        src="../../images/logo.jpg"
                        alt="..."
                      />
                    </a>
                    {/* User menu (mobile) */}
                    <div className="navbar-user d-lg-none">
                      {/* Dropdown */}
                      <div className="dropdown">
                        {/* Toggle */}
                        <a
                          href="#"
                          id="sidebarAvatar"
                          role="button"
                          data-bs-toggle="dropdown"
                          aria-haspopup="true"
                          aria-expanded="false"
                        >
                          <div className="avatar-parent-child">
                            <img
                              alt="Image Placeholder"
                              src="https://images.unsplash.com/photo-1548142813-c348350df52b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=256&h=256&q=80"
                              className="avatar avatar- rounded-circle"
                            />
                            <span className="avatar-child avatar-badge bg-success" />
                          </div>
                        </a>
                        {/* Menu */}
                        <div
                          className="dropdown-menu dropdown-menu-end"
                          aria-labelledby="sidebarAvatar"
                        >
                          <a href="#" className="dropdown-item">
                            Profile
                          </a>
                          <a href="#" className="dropdown-item">
                            Settings
                          </a>
                          <a href="#" className="dropdown-item">
                            Billing
                          </a>
                          <hr className="dropdown-divider" />
                          <a href="#" className="dropdown-item">
                            Logout
                          </a>
                        </div>
                      </div>
                    </div>
                    {/* Collapse */}
                    <div
                      className="collapse navbar-collapse"
                      id="sidebarCollapse"
                    >
                      {/* Navigation */}
                      <ul className="navbar-nav">
                        {/* <li className="nav-item">
                        <a className="nav-link" href="#">
                          <i className="bi bi-house" /> Dashboard
                        </a>
                      </li> */}
                        <li className="nav-item">
                          <NavLink to="/chart" className="nav-link">
                            <i className="bi bi-bar-chart" /> Thống kê
                          </NavLink>
                        </li>
                        {/* <li className="nav-item">
                        <a className="nav-link" href="#">
                          <i className="bi bi-chat" /> Messages
                          <span className="badge bg-soft-primary text-primary rounded-pill d-inline-flex align-items-center ms-auto">
                            6
                          </span>
                        </a>
                      </li> */}
                        <li className="nav-item">
                          <NavLink to="/order" className="nav-link">
                            <i className="bi bi-bookmarks" /> Đơn hàng
                          </NavLink>
                        </li>
                        <li className="nav-item">
                          <NavLink to="/product" className="nav-link">
                            <i className="bi bi-bookmarks" /> Sản phẩm
                          </NavLink>
                        </li>
                        <li className="nav-item">
                          <NavLink to="/category" className="nav-link">
                            <i className="bi bi-bookmarks" /> Loại sản phẩm
                          </NavLink>
                        </li>
                        <li className="nav-item">
                          <NavLink to="/user" className="nav-link">
                            <i className="bi bi-people" /> Người dùng
                          </NavLink>
                        </li>
                      </ul>
                      {/* Divider */}
                      <hr className="navbar-divider my-2 opacity-20" />
                      {/* Navigation */}

                      {/* Push content down */}
                      <div className="mt-10" />
                      {/* User (md) */}
                      <ul className="navbar-nav">
                        <li
                          className="nav-item"
                          onClick={() => {
                            localStorage.removeItem("admin");
                          }}
                        >
                          <NavLink to="/" className="nav-link">
                            <i className="bi bi-box-arrow-left" /> Đăng xuất
                          </NavLink>
                        </li>
                      </ul>
                    </div>
                  </div>
                </nav>
                {/* Main content */}
                <div className="h-screen flex-grow-1 overflow-y-lg-auto">
                  {/* Header */}
                  <header className="bg-surface-primary border-bottom pt-6"></header>
                  {/* Main */}
                  <main className="py-6 bg-surface-secondary">
                    <Component {...propsRoute} />
                  </main>
                </div>
              </div>
            </div>
          );
        }
        alert("Bạn không đủ quyền truy cập! Vui lòng đăng nhập vai trò admin");
        history.push("/");
      }}
    />
  );
};
