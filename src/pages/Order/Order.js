import React, { useState, useEffect, useRef } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import { Toolbar } from "primereact/toolbar";
import axios from 'axios';
import { InputTextarea } from "primereact/inputtextarea";
import { Dialog } from "primereact/dialog";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { useDispatch, useSelector } from "react-redux";
import { storage_bucket } from "./../../firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import {
  CreateCategotyAction,
  GetListCategotyAction,
  UpdateCategotyAction,
} from "../../redux/action/CategoryAction";
import { GetListOrderAction, UpdateOrder } from "../../redux/action/OrderAction";

export default function Order() {

  const [filteredStatus, setFilteredStatus] = useState(""); // State để lưu trạng thái đơn hàng được lọc
  const [filteredOrders, setFilteredOrders] = useState([]); // State để lưu danh sách đơn hàng được lọc
  const clearFilters = () => {
    setFilteredStatus(""); // Xóa trạng thái đã lọc
    setFilteredOrders([]); // Đặt danh sách đơn hàng lọc về rỗng để hiển thị danh sách đơn hàng ban đầu
  };

  const filterOrdersByStatus = async () => {
    if (filteredStatus) {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/v1/order/getOrdersByStatus/${filteredStatus}`
        );
        setFilteredOrders(response.data.data);
      } catch (error) {
        console.error('Lỗi khi lọc đơn hàng:', error);
      }
    }
  };




  const dispatch = useDispatch();
  const { arrOrder } = useSelector((root) => root.OrderReducer);
  console.log(arrOrder);
  let emptyProduct = {
    category_id: "0",
  };

  const uploadFile = (e) => {
    let file = e.target.files[0];
    let fileRef = ref(storage_bucket, file.name);

    const uploadTask = uploadBytesResumable(fileRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
      },
      (err) => console.log(err),
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          console.log(url);
          const updatedProduct = { ...product, image_url: url }; // Update achivementLogo property in product object
          setProduct(updatedProduct);
        });
      }
    );
  };

  const [inputValue, setInputValue] = useState("");
  const [text, setText] = useState("Thêm mới đơn hàng");
  const [products, setProducts] = useState([]);
  const [productDialog, setProductDialog] = useState(false);
  const [deleteProductDialog, setDeleteProductDialog] = useState(false);
  const [deleteProductsDialog, setDeleteProductsDialog] = useState(false);
  const [product, setProduct] = useState(emptyProduct);
  const [tempProduct, setTempProduct] = useState({ ...emptyProduct });
  const [selectedProducts, setSelectedProducts] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [globalFilter, setGlobalFilter] = useState(null);
  const toast = useRef(null);
  const dt = useRef(null);
  useEffect(() => {
    setProducts(arrOrder);
  }, [arrOrder, products]);
  useEffect(() => {
    const action1 = GetListOrderAction();
    dispatch(action1);
  }, []);
  useEffect(() => {
    setProducts(arrOrder);
  }, [arrOrder]);


  const openNew = () => {
    setProduct(emptyProduct);
    setSubmitted(false);
    setProductDialog(true);
  };

  const hideDialog = () => {
    setSubmitted(false);
    setProductDialog(false);
  };

  const hideDeleteProductDialog = () => {
    setDeleteProductDialog(false);
  };

  const hideDeleteProductsDialog = () => {
    setDeleteProductsDialog(false);
  };
  const saveProduct = async () => {
    setSubmitted(true);

    if (product.status) {
      let _products = [...products];
      let _product = { ...product };
      console.log(_product);
      if (product.category_id !== "0") {
        const index = findIndexById(product.id);

        _products[index] = _product;
        const action = await UpdateOrder(product);
        await dispatch(action);
        setProductDialog(false);
        toast.current.show({
          severity: "success",
          summary: "Thành công",
          detail: `Cập trạng thái đơn hàng ${product.product_name} thành công`,
          life: 3000,
        });
        setText("Thông tin đơn hàng");
      } else {
        const action = await CreateCategotyAction(_product);
        await dispatch(action);
        toast.current.show({
          severity: "success",
          summary: "Thành công",
          detail: "Tạo  mới đơn hàng thành công",
          life: 3000,
        });
        setProductDialog(false);
      }
    }
  };


  const editProduct = (product) => {
    setText("Thông tin đơn hàng");
    setProduct({ ...product });
    setProductDialog(true);
    setTempProduct({ ...product });
  };

  const deleteProduct = async () => {
    // const action = await DeleteProductAction(product.category_id);
    // await dispatch(action);
    setDeleteProductDialog(false);
    setProduct(emptyProduct);
    toast.current.show({
      severity: "error",
      summary: "Thành công",
      detail: `Xóa đơn hàng ${product.product_name} thành công`,
      life: 3000,
      options: {
        style: {
          zIndex: 100,
        },
      },
    });
  };

  const findIndexById = (id) => {
    let index = -1;

    for (let i = 0; i < products.length; i++) {
      if (products[i].id === id) {
        index = i;
        break;
      }
    }

    return index;
  };



  const statuses = [
    { label: 'Chờ xác nhận', value: 'Chờ xác nhận' },
    { label: 'Đã Xác Nhận', value: 'Đã Xác Nhận' },
    { label: 'Giao Hàng Thành Công', value: 'Giao Hàng Thành Công' }
  ];

  const exportCSV = () => {
    dt.current.exportCSV();
  };

  const deleteSelectedProducts = () => {
    let _products = products.filter((val) => !selectedProducts.includes(val));

    setProducts(_products);
    setDeleteProductsDialog(false);
    setSelectedProducts(null);
    toast.current.show({
      severity: "success",
      summary: "Successful",
      detail: "Deleted  Achivement",
      life: 3000,
    });
  };

  const onInputChange = (e, name) => {
    if (name === "achivementLogo") {
      uploadFile(e); // Call uploadFile function when achivementLogo value changes
    }

    const val = (e.target && e.target.value) || "";
    let _product = { ...product };

    _product[`${name}`] = val;

    setProduct(_product);

    const newValue = e.target.value;

    // Kiểm tra xem newValue có chứa các ký tự đặc biệt không mong muốn
    const forbiddenCharacters = /[@!#$%^&*]/g;

    if (!forbiddenCharacters.test(newValue)) {
      setInputValue(newValue);
      // Thực hiện các xử lý khác tại đây
    }
  };

  const leftToolbarTemplate = () => {
    return (
      <div className="flex flex-wrap gap-2">
        {/* <Button
          label="Thêm mới"
          icon="pi pi-plus"
          severity="success"
          onClick={() => {
            openNew();
            setText("Thêm mới đơn hàng");
          }}
        /> */}
        {/* <Button label="Delete" icon="pi pi-trash" severity="danger" onClick={confirmDeleteSelected} disabled={!selectedProducts || !selectedProducts.length} /> */}
      </div>
    );
  };

  const rightToolbarTemplate = () => {
    return (
      <div className="flex gap-2">
        <Button
          label="Tải xuống"
          icon="pi pi-upload"
          className="p-button-help"
          onClick={exportCSV}
        />
      </div>
    );
  };


  const actionBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <Button
          icon="pi pi-pencil"
          rounded
          outlined
          className="mr-2"
          onClick={() => editProduct(rowData)}
        />
        {/* <Button
          icon="pi pi-trash"
          rounded
          outlined
          severity="danger"
          onClick={() => confirmDeleteProduct(rowData)}
        /> */}
      </React.Fragment>
    );
  };

  const header = (
    <div className="flex flex-wrap gap-2 align-items-center justify-content-between">
      <h4 className="m-0 mb-4">Quản lý đơn hàng</h4>
      <span className="p-input-icon-left">
        <i className="pi pi-search" />
        <InputText
          type="search"
          onInput={(e) => setGlobalFilter(e.target.value)}
          placeholder="Tìm kiếm..."
        />
      </span>

      {/* Thêm Dropdown và Button lọc ở đây */}
      <Dropdown
        value={filteredStatus}
        options={statuses}
        onChange={(e) => setFilteredStatus(e.value)}
        optionLabel="label"
        placeholder="Chọn trạng thái"
      />
      <Button
        label="Lọc"
        icon="pi pi-filter"
        className="p-button-help"
        onClick={filterOrdersByStatus}
      />
      <Button
        label="Clear"
        icon="pi pi-times"
        className="p-button-danger"
        onClick={clearFilters}
      />


    </div>
  );
  const productDialogFooter = (
    <React.Fragment>
      <Button label="Hủy bỏ" icon="pi pi-times" outlined onClick={hideDialog} />
      <Button label="Hoàn thành" icon="pi pi-check" onClick={saveProduct} />
    </React.Fragment>
  );
  const deleteProductDialogFooter = (
    <React.Fragment>
      <Button
        label="Đồng ý"
        icon="pi pi-check"
        severity="danger"
        onClick={deleteProduct}
      />
      <Button
        label="Hủy bỏ"
        icon="pi pi-times"
        outlined
        onClick={hideDeleteProductDialog}
      />
    </React.Fragment>
  );

  return (
    <div className="app-main__outer" style={{ margin: "20px 30px" }}>
      <div>
        <Toast ref={toast} />
        <div className="card">
          <Toolbar
            className="mb-4"
            left={leftToolbarTemplate}
            right={rightToolbarTemplate}
          ></Toolbar>





          <DataTable
            ref={dt}

            value={filteredOrders.length > 0 ? filteredOrders : products}
            selection={selectedProducts}
            onSelectionChange={(e) => setSelectedProducts(e.value)}
            dataKey="id"
            paginator
            rows={10}
            rowsPerPageOptions={[5, 10, 25]}
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            currentPageReportTemplate="Đang hiển thị {first} đến {last} trong tổng số {totalRecords} đơn hàng"
            globalFilter={globalFilter}
            header={header}
          >
            {/* <Column selectionMode="multiple" exportable={false}></Column> */}
            <Column
              field="order_id"
              header="Mã"
              sortable
              style={{ minWidth: "11rem" }}
            ></Column>

            <Column
              field="total_amount"
              header="Tổng tiền"
              sortable
              style={{ minWidth: "12rem" }}
            ></Column>

            <Column
              field={(item) => item.user?.full_name}
              header="Người mua"
              sortable
              style={{ minWidth: "12rem" }}
            ></Column>

            <Column
              style={{ minWidth: "12rem" }}
              field="order_date"
              header="Ngày thanh toán"
              sortable

            ></Column>
            <Column
              style={{ minWidth: "12rem" }}
              field="status"
              header="Trạng thái đơn hàng"
              sortable

            ></Column>


            <Column
              body={actionBodyTemplate}
              exportable={false}
              style={{ minWidth: "12rem", marginRight: "100px" }}
            ></Column>
          </DataTable>
        </div>

        <Dialog
          visible={productDialog}
          style={{ width: "32rem" }}
          breakpoints={{ "960px": "75vw", "641px": "90vw" }}
          header={text}
          modal
          className="p-fluid"
          footer={productDialogFooter}
          onHide={hideDialog}
        >
          <div className="field">
            <label
              htmlFor="processTypeName"
              className="font-bold"
              style={{ fontWeight: "bold" }}
            >
              Tên đơn hàng
            </label>
            <br />
            <InputText
              id="Người mua"
              value={product.user?.full_name}
              required
              autoFocus
            />
          </div>

          <div className="field">
            <label
              htmlFor="processTypeName"
              className="font-bold"
              style={{ fontWeight: "bold" }}
            >
              Tổng tiền
            </label>
            <br />
            <InputText
              id="Người mua"
              value={product.total_amount}
              required
              autoFocus
            />
          </div>

          <div className="field">
            <label
              htmlFor="processTypeName"
              className="font-bold"
              style={{ fontWeight: "bold" }}
            >
              Trạng thái đơn hàng
            </label>
            <br />
            {/* Sử dụng Dropdown để hiển thị danh sách trạng thái */}
            <Dropdown
              value={product.status} // Giá trị hiện tại của trạng thái
              options={statuses} // Danh sách các trạng thái
              onChange={(e) => onInputChange(e, "status")} // Sự kiện khi giá trị thay đổi
              optionLabel="label" // Thuộc tính để hiển thị nhãn của mỗi trạng thái
              placeholder="Chọn trạng thái" // Placeholder khi không có trạng thái nào được chọn
            />
          </div>

          <div className="field">
            <label
              htmlFor="processTypeName"
              className="font-bold"
              style={{ fontWeight: "bold" }}
            >
              Số điện thoại
            </label>
            <br />
            <InputText
              id="Người mua"
              value={product.user?.phone_number}
              required
              autoFocus
            />
          </div>

          <div className="field">
            <label
              htmlFor="processTypeName"
              className="font-bold"
              style={{ fontWeight: "bold" }}
            >
              Địa chỉ
            </label>
            <br />
            <InputText
              id="Người mua"
              value={product.user?.address}
              required
              autoFocus
            />
          </div>
          <div className="field">
            <label
              htmlFor="processTypeName"
              className="font-bold"
              style={{ fontWeight: "bold" }}
            >
              Email
            </label>
            <br />
            <InputText
              id="Người mua"
              value={product.user?.email}
              required
              autoFocus
            />
          </div>
          <br />
          <br />
          <div className="field">
            <label
              htmlFor="processTypeName"
              className="font-bold"
              style={{ fontWeight: "bold", marginBottom: '10px' }}
            >
              Danh sách sản phẩm
            </label>
            <br />
            <br />
            {product.OrderDetails?.map((item, index) => {
              return (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                  <div style={{ padding: '10px', border: '1px solid black' }}>
                    <div><img src={item.product?.image_url} /> </div>
                    <div style={{ fontWeight: 800 }}> {item.product?.product_name}</div>
                    <div>Số lượng: {item.quantity}</div>
                    <div>Size: {item.product?.sizes}</div>
                    <div>Giá tiền : {item.product?.price}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </Dialog>


      </div>
    </div>
  );
}
