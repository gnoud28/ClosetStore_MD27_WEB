// import React from "react";
// import { useFormik } from "formik";
// import { history } from "../../App";
// export default function Login() {
//   const formik = useFormik({
//     initialValues: {
//       username:"",
//       password:"",
//     },
//     onSubmit: (value) => {
//       console.log(value);
//       if(value.username==="admin" && value.password ==="1234"){
//         history.push('/chart')
//         localStorage.setItem('admin','login')
//       }else{
//         alert('Vui lòng đăng nhập với vai trò admin')
//       }
//     },
//   });
//   return (
//     <div className="container">
//       <div className="row m-5 no-gutters shadow-lg">
//         <div className="col-md-6 d-none d-md-block">
//           <img
//             src="https://images.unsplash.com/photo-1566888596782-c7f41cc184c5?ixlib=rb-1.2.1&auto=format&fit=crop&w=2134&q=80"
//             className="img-fluid"
//             style={{ minHeight: "100%" }}
//           />
//         </div>
//         <div className="col-md-6 bg-white p-5 " style={{ marginTop: "200px" }}>
//           <h3 className="pb-3">Đăng nhập</h3>
//           <div className="form-style">
//             <form onSubmit={formik.handleSubmit}>
//               <div className="form-group pb-3">
//                 <input
//                   type="text"
//                   placeholder="Username"
//                   className="form-control"
//                   id="exampleInputEmail1"
//                   aria-describedby="emailHelp"
//                   name="username"
//                   onChange={formik.handleChange}
//                 />
//               </div>
//               <div className="form-group pb-3">
//                 <input
//                   type="password"
//                   placeholder="Password"
//                   className="form-control"
//                   id="exampleInputPassword1"
//                   name="password"
//                   onChange={formik.handleChange}
//                 />
//               </div>
//               <div className="d-flex align-items-center justify-content-between">
//                 <div className="d-flex align-items-center"></div>
//                 <div>
//                   <a href="#">Quên mật khẩu?</a>
//                 </div>
//               </div>
//               <div className="pb-2">
//                 <button
//                   type="submit"
//                   className="btn btn-dark w-100 font-weight-bold mt-2"
//                 >
//                   Đăng nhập
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
import React from "react";
import { useFormik } from "formik";
import { history } from "../../App";

export default function Login() {
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    onSubmit: (values) => {
      console.log(values);
      if (values.username === "admin" && values.password === "1234") {
        history.push('/chart');
        localStorage.setItem('admin', 'login');
      } else {
        alert('Vui lòng đăng nhập với vai trò admin');
      }
    },
  });

  return (
    <div className="container-fluid vh-100 d-flex align-items-center justify-content-center">
      <div className="col-md-4">
        <div className="card shadow">
          <div className="card-body">
            <div className="text-center mb-4">
              <img
                src="/images/logo.jpg"
                alt="Your Logo"
                className="img-fluid"
                style={{ maxHeight: "250px" }}
              />
            </div>
            <h3 className="text-center pb-3">Đăng nhập</h3>
            <form onSubmit={formik.handleSubmit}>
              <div className="form-group mb-3">
                <input
                  type="text"
                  placeholder="Username"
                  className="form-control"
                  name="username"
                  onChange={formik.handleChange}
                  value={formik.values.username}
                />
              </div>
              <div className="form-group mb-4">
                <input
                  type="password"
                  placeholder="Password"
                  className="form-control"
                  name="password"
                  onChange={formik.handleChange}
                  value={formik.values.password}
                />
              </div>
              <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                  <a href="#">Quên mật khẩu?</a>
                </div>
                <button
                  type="submit"
                  className="btn btn-dark font-weight-bold"
                >
                  Đăng nhập
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
