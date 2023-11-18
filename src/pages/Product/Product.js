import React, { useState, useEffect, useRef } from "react";
import { classNames } from "primereact/utils";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import { Toolbar } from "primereact/toolbar";
import { InputTextarea } from "primereact/inputtextarea";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { useDispatch, useSelector } from "react-redux";
import { storage_bucket } from "./../../firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { CreateProductAction, DeleteProductAction, GetListProductAction, UpdateProductAction } from "../../redux/action/ProductAction";
import moment from "moment";
import { GetListCategotyAction } from "../../redux/action/CategoryAction";

export default function Product() {
  const dispatch = useDispatch();
  const { arrProduct } = useSelector((root) => root.ProductReducer);
  const { arrCategory } = useSelector((root) => root.CategoryReducer);
  console.log(arrCategory);
  let emptyProduct = {
    product_id: "0",
  };
  const [selectedValue, setSelectedValue] = useState("");

  const handleSelectChange = (event) => {
    const value = event.target.value;
    setProduct((prevProduct) => ({
      ...prevProduct,
      category_id: value,
    }));
    setSelectedValue(event.target.value);
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
  const [text, setText] = useState("Thêm mới sản phẩm");
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
    const action = GetListProductAction();
    dispatch(action);
    const action1 = GetListCategotyAction();
    dispatch(action1);
  }, []);
  useEffect(() => {
    setProducts(arrProduct);
  }, [arrProduct]);

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

    if (product.description) {
      let _products = [...products];
      let _product = { ...product };
      console.log(_product);
      if (product.product_id !== "0") {
        const index = findIndexById(product.id);

        _products[index] = _product;
        const action = await UpdateProductAction(product);
        await dispatch(action);
        setProductDialog(false);
        toast.current.show({
          severity: "success",
          summary: "Thành công",
          detail: `Cập nhật sản phẩm ${product.product_name} thành công`,
          life: 3000,
        });
        setText("Chỉnh sửa sản phẩm");
      } else {
        const action = await CreateProductAction(_product);
        await dispatch(action);
        toast.current.show({
          severity: "success",
          summary: "Thành công",
          detail: "Tạo  mới sản phẩm thành công",
          life: 3000,
        });
         setProductDialog(false);
      }

      // setProducts(_products);
      // setProductDialog(false);
      // setProduct(emptyProduct);
    }
  };

  const editProduct = (product) => {
    setText("Chỉnh sửa sản phẩm");
    setProduct({ ...product });
    setProductDialog(true);
    setTempProduct({ ...product });
  };

  const confirmDeleteProduct = (product) => {
    setProduct(product);
    setDeleteProductDialog(true);
  };

  const deleteProduct = async () => {
    const action = await DeleteProductAction(product.product_id);
    await dispatch(action);
    setDeleteProductDialog(false);
    setProduct(emptyProduct);
    toast.current.show({
      severity: "error",
      summary: "Thành công",
      detail: `Xóa sản phẩm ${product.product_name} thành công`,
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
        <Button
          label="Thêm mới"
          icon="pi pi-plus"
          severity="success"
          onClick={() => {
            openNew();
            setText("Thêm mới sản phẩm");
          }}
        />
        {/* <Button label="Delete" icon="pi pi-trash" severity="danger" onClick={confirmDeleteSelected} disabled={!selectedProducts || !selectedProducts.length} /> */}
      </div>
    );
  };

  const rightToolbarTemplate = () => {
    return (
      <Button
        label="Tải xuống"
        icon="pi pi-upload"
        style={{ marginRight: "50px" }}
        className="p-button-help"
        onClick={exportCSV}
      />
    );
  };

  const imageBodyTemplate = (rowData) => {
    return (
      <img
        src={`${rowData.image_url}`}
        alt={rowData.image}
        className="shadow-2 border-round"
        style={{ width: "64px" }}
      />
    );
  };
  const formatCurrency = (value) => {
    return value.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
  };
  const priceBodyTemplate = (rowData) => {
    return formatCurrency(rowData.price);
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
        <Button
          icon="pi pi-trash"
          rounded
          outlined
          severity="danger"
          onClick={() => confirmDeleteProduct(rowData)}
        />
      </React.Fragment>
    );
  };

  const header = (
    <div className="flex flex-wrap gap-2 align-items-center justify-content-between">
      <h4 className="m-0 mb-4">Quản lý sản phẩm</h4>
      <span className="p-input-icon-left">
        <i className="pi pi-search" />
        <InputText
          type="search"
          onInput={(e) => setGlobalFilter(e.target.value)}
          placeholder="Tìm kiếm..."
        />
      </span>
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
  const deleteProductsDialogFooter = (
    <React.Fragment>
      <Button
        label="No"
        icon="pi pi-times"
        outlined
        onClick={hideDeleteProductsDialog}
      />
      <Button
        label="Yes"
        icon="pi pi-check"
        severity="danger"
        onClick={deleteSelectedProducts}
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
            value={products}
            selection={selectedProducts}
            onSelectionChange={(e) => setSelectedProducts(e.value)}
            dataKey="id"
            paginator
            rows={10}
            rowsPerPageOptions={[5, 10, 25]}
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            currentPageReportTemplate="Đang hiển thị {first} đến {last} trong tổng số {totalRecords} sản phẩm"
            globalFilter={globalFilter}
            header={header}
          >
            {/* <Column selectionMode="multiple" exportable={false}></Column> */}
            <Column
              field="product_id"
              header="Mã"
              sortable
              style={{ minWidth: "11rem" }}
            ></Column>

            <Column
              field="product_name"
              header="Tên sản phẩm"
              sortable
              style={{ minWidth: "12rem" }}
            ></Column>

            <Column
              field="description"
              header="Miêu tả"
              sortable
              style={{ minWidth: "12rem" }}
            ></Column>
            <Column
              field="price"
              header="Giá tiền"
              body={priceBodyTemplate}
              sortable
              style={{ minWidth: "8rem" }}
            ></Column>
            <Column
              field={(createAt) =>
                moment(createAt.creation_date).format("DD-MM-YYYY")
              }
              header="Ngày tạo"
              sortable
              style={{ minWidth: "12rem" }}
            ></Column>
            <Column
              field={(createAt) => createAt?.category?.category_name}
              header="Loại"
              sortable
              style={{ minWidth: "12rem" }}
            ></Column>
            <Column
            style={{ minWidth: "12rem" }}
              field="image_url"
              header="Hình ảnh"
              body={imageBodyTemplate}
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
              Tên sản phẩm
            </label>
            <br />
            <InputText
              id="product_name"
              value={product.product_name}
              onChange={(e) => onInputChange(e, "product_name")}
              required
              autoFocus
            />
          </div>
          <div className="field mt-5">
            <label
              htmlFor="processTypeName"
              className="font-bold"
              style={{ fontWeight: "bold" }}
            >
              Giá tiền
            </label>
            <br />
            <InputText
              type="number"
              id="price"
              value={product.price}
              onChange={(e) => onInputChange(e, "price")}
              required
              autoFocus
            />
          </div>
          <div className="field mt-5">
            <label
              htmlFor="processTypeName"
              className="font-bold"
              style={{ fontWeight: "bold" }}
            >
              Ngày tạo
            </label>
            <br />
            <InputText
              type="date"
              id="price"
              value={moment(product.creation_date).format("YYYY-MM-DD")}
              onChange={(e) => onInputChange(e, "creation_date")}
              required
              autoFocus
            />
          </div>
          <div className="field mt-5">
            <label
              htmlFor="processTypeName"
              className="font-bold"
              style={{ fontWeight: "bold" }}
            >
              Loại sản phẩm
            </label>
            <br />
            <select
              style={{
                padding: "13px 0",
                width: "100%",
              }}
              value={selectedValue}
              onChange={handleSelectChange}
            >
              <option value={product.category?.category_id}>
                {product.category?.category_name}
              </option>
              {arrCategory.map((item, index) => {
                return (
                  <option value={item.category_id}>{item.category_name}</option>
                );
              })}
            </select>
          </div>
          <div className="field mt-5">
            <label
              htmlFor="description"
              className="font-bold"
              style={{ fontWeight: "bold" }}
            >
              Miêu tả
            </label>
            <InputTextarea
              id="description"
              value={product.description}
              onChange={(e) => onInputChange(e, "description")}
              required
              rows={3}
              cols={20}
            />
            {submitted && !product.description && (
              <small className="p-error">Miêu tả không được để trống.</small>
            )}
          </div>
          <div
            className="field mt-5"
            style={{ display: "flex", flexDirection: "column" }}
          >
            <label
              htmlFor="description"
              className="font-bold"
              style={{ fontWeight: "bold" }}
            >
              Hình ảnh
            </label>
            <div style={{ height: "240px", marginTop: "20px" }}>
              <img src={product.image_url} />
            </div>
            <input type="file" className="image_url" onChange={uploadFile} />
          </div>
        </Dialog>

        <Dialog
          visible={deleteProductDialog}
          style={{ width: "32rem" }}
          breakpoints={{ "960px": "75vw", "641px": "90vw" }}
          header="Thông Báo"
          modal
          footer={deleteProductDialogFooter}
          onHide={hideDeleteProductDialog}
        >
          <div className="confirmation-content">
            <i
              className="pi pi-exclamation-triangle mr-3"
              style={{ fontSize: "2rem" }}
            />
            {product && (
              <span>
                Bạn có chắc chắn muốn xóa sản phẩm{" "}
                <b>{product.product_name}</b>?
              </span>
            )}
          </div>
        </Dialog>

        <Dialog
          visible={deleteProductsDialog}
          style={{ width: "32rem" }}
          breakpoints={{ "960px": "75vw", "641px": "90vw" }}
          header="Confirm"
          modal
          footer={deleteProductsDialogFooter}
          onHide={hideDeleteProductsDialog}
        >
          <div className="confirmation-content">
            <i
              className="pi pi-exclamation-triangle mr-3"
              style={{ fontSize: "2rem" }}
            />
            {product && (
              <span>
                Are you sure you want to delete the selected products?
              </span>
            )}
          </div>
        </Dialog>
      </div>
    </div>
  );
}
