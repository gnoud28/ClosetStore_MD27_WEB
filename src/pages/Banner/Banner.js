import React, { useState, useEffect, useRef } from "react";
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
import { CreateBannerAction, DeleteBannerAction, GetListBannerAction, UpdateBannerAction } from "../../redux/action/BannerAction";

export default function Banner() {
  const dispatch = useDispatch();
  const { arrBanner } = useSelector((root) => root.BannerReducer);
  console.log(arrBanner);
  let emptyProduct = {
    banner_id: "0",
  };
  const [selectedValue, setSelectedValue] = useState("");

  useEffect(() => {
    const action1 = GetListBannerAction();
    dispatch(action1);
  }, []);

  useEffect(() => {
    console.log("Dữ liệu arrBanner khi nhận được từ Redux:", arrBanner);
    setProducts(arrBanner);
  }, [arrBanner]);

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
          const updatedProduct = { ...product, ImagesUrl: url };
          setProduct(updatedProduct); // Cập nhật đường dẫn hình ảnh vào product
        });
      }
    );
  };

  const [inputValue, setInputValue] = useState("");
  const [text, setText] = useState("Thêm mới banner");
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

  // useEffect(() => {
  //   const action1 = GetListBannerAction();
  //   dispatch(action1);
  // }, []);
  // useEffect(() => {
  //   setProducts(arrBanner);
  // }, [arrBanner]);

  const openNew = () => {
    setProduct(emptyProduct);
    setSubmitted(false);
    setProductDialog(true);
  };

  const hideDialog = () => {
    setSubmitted(false);
    setProductDialog(false);
    setProduct(emptyProduct); // Reset form khi đóng dialog
  };
  const hideDeleteProductDialog = () => {
    setDeleteProductDialog(false);
  };

  const hideDeleteProductsDialog = () => {
    setDeleteProductsDialog(false);
  };

  const saveProduct = async () => {
    setSubmitted(true);

    if (product.title && product.ImagesUrl) { // Kiểm tra các trường dữ liệu cần thiết
      const _product = { ...product }; // Tạo bản sao của sản phẩm

      if (product.banner_id !== "0") {
        const index = findIndexById(product.banner_id);
        const updatedProducts = [...products]; // Tạo bản sao của danh sách sản phẩm

        updatedProducts[index] = _product; // Cập nhật sản phẩm trong danh sách

        const action = await UpdateBannerAction(_product);
        await dispatch(action);

        setProducts(updatedProducts); // Cập nhật danh sách sản phẩm
        setProductDialog(false);

        toast.current.show({
          severity: "success",
          summary: "Thành công",
          detail: `Cập nhật banner ${_product.title} thành công`,
          life: 3000,
        });

        setText("Chỉnh sửa banner");
      } else {
        const action = await CreateBannerAction(_product);
        await dispatch(action);

        const updatedProducts = [...products, _product]; // Thêm sản phẩm mới vào danh sách

        setProducts(updatedProducts); // Cập nhật danh sách sản phẩm
        setProductDialog(false);

        toast.current.show({
          severity: "success",
          summary: "Thành công",
          detail: "Tạo mới banner thành công",
          life: 3000,
        });
      }

      setProduct(emptyProduct); // Đặt sản phẩm về trạng thái rỗng sau khi thêm hoặc cập nhật thành công
    }
  };



  const editProduct = (product) => {
    setText("Chỉnh sửa banner");
    setProduct({ ...product }); // Đảm bảo rằng dữ liệu sản phẩm được cập nhật khi chỉnh sửa
    setTempProduct({ ...product });
    setProductDialog(true);
  };

  const confirmDeleteProduct = (product) => {
    setProduct(product);
    setDeleteProductDialog(true);
  };

  const deleteProduct = async () => {
    const action = DeleteBannerAction(product.banner_id);
    dispatch(action);
    setDeleteProductDialog(false);
    setProduct(emptyProduct);

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
            setText("Thêm mới banner");
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
        src={`${rowData.ImagesUrl}`}
        alt={rowData.image}
        className="shadow-2 border-round"
        style={{ width: "64px" }}
      />
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
      <h4 className="m-0 mb-4">Quản lý Banner</h4>
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
            currentPageReportTemplate="Đang hiển thị {first} đến {last} trong tổng số {totalRecords} loại loại sản phẩm"
            globalFilter={globalFilter}
            header={header}
          >
            {/* <Column selectionMode="multiple" exportable={false}></Column> */}
            <Column
              field="banner_id"
              header="Mã"
              sortable

              style={{ minWidth: "12rem" }}
            ></Column>
            <Column
              field="title"
              header="Tên"

              sortable
              style={{ minWidth: "11rem" }}
            ></Column>
            <Column
              style={{ minWidth: "12rem" }}
              field="ImagesUrl"
              body={imageBodyTemplate}
              header="Hình ảnh"
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
              Tên Banner
            </label>
            <br />
            <InputText
              id="title"
              value={product.title}
              onChange={(e) => onInputChange(e, "title")}
              required
              autoFocus
            />
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
              <img src={product.ImagesUrl} />
            </div>
            <input type="file" className="ImagesUrl" onChange={uploadFile} />
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
                Bạn có chắc chắn muốn xóa loại sản phẩm{" "}
                <b>{product.title}</b>?
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
