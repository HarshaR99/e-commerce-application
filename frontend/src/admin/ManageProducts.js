import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { getProducts, deleteProduct } from "./helper/adminapicall";
import { isAuthenticated } from "../auth/helper/index";
const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const { user, token } = isAuthenticated();

  const preload = () => {
    getProducts().then((data) => {
      if (data?.error) {
        console.log(data.error);
      } else {
        setProducts(data);
      }
    });
  };

  useEffect(() => {
    preload();
  }, []);

  const deleteThisProduct = (producId) => {
    deleteProduct(producId, user._id, token).then((data) => {
      if (data?.error) {
        console.log(data.error);
      } else {
        preload(); // once the data is deleted the react will reload the components
      }
    });
  };

  return (
    <div>
      <Base title="Welcome admin" description="Manage products here" className="signUpForm m-4">
        <h2 className="mb-4">All products:</h2>
        <Link className="btn btn-info" to={`/admin/dashboard`}>
          <span className="">Admin Home</span>
        </Link>
        <div className="row">
          <div className="col-12">
          <h2
          className={
               products.length
                    ? "text-center border border-info rounded my-4 p-2"
                    : "text-white text-center border border-white bg-danger rounded my-4 p-2"
          }
          style={{ fontSize: "2rem" }}
     >
          {products.length
               ? "Total " +
                 products.length +
                 " Products"
               : "No Products Found.!"}
     </h2>

            {products.map((product, index) => {
              return (
                <div className="row text-center mb-2 ">
                  <div className="col-4">
                    <h3 className="text-center">{product.name}</h3>
                  </div>
                  <div className="col-4">
                    <Link
                      className="btn btn-success"
                      to={`/admin/product/update/${product._id}`}
                    >
                      <span className="">Update</span>
                    </Link>
                  </div>
                  <div className="col-4">
                    <button
                      onClick={() => {
                        deleteThisProduct(product._id);
                      }}
                      className="btn btn-danger"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Base>
    </div>
  );
};

export default ManageProducts;
