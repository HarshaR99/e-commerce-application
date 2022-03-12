import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { getCategories, deleteCategory } from "./helper/adminapicall";
import { isAuthenticated } from "../auth/helper/index";
const ManageCategories = () => {
     const [categories, setCategories] = useState([]);
     const { user, token } = isAuthenticated();

     const preload = () => {
          getCategories().then((data) => {
               if (data?.error) {
                    console.log(data.error);
               } else {
                    setCategories(data);
               }
          });
     };

     useEffect(() => {
          preload();
     }, []);

     const deleteThisCategory = (categoryId) => {
          deleteCategory(categoryId, user._id, token).then((data) => {
               if (data?.error) {
                    console.log(data.error);
               } else {
                    preload(); // once the data is deleted the react will reload the components
               }
          });
     };

     return (
          <div>
               <Base
                    title="Welcome admin"
                    description="Manage Categories here"
                    className="signUpForm m-4"
               >
                    <Link className="btn btn-info" to={`/admin/dashboard`}>
                         <span className="">Admin Home</span>
                    </Link>
                    <div className="row">
                         <div className="col-12">
                              <h2
                                   className={
                                        categories.length
                                             ? "text-center border border-info rounded my-4 p-2"
                                             : "text-white text-center border border-white bg-danger rounded my-4 p-2"
                                   }
                                   style={{ fontSize: "2rem" }}
                              >
                                   {categories.length
                                        ? "Total " +
                                          categories.length +
                                          " Categories"
                                        : "No Categories Found.!"}
                              </h2>

                              {categories.map((category, index) => {
                                   return (
                                        <div className="row text-center mb-2" key={index}>
                                             <div className="col-4">
                                                  <h3 className="text-center">
                                                       {category.name}
                                                  </h3>
                                             </div>
                                             <div className="col-4">
                                                  <Link
                                                       className="btn btn-success"
                                                       to={`/admin/category/${category._id}/${user._id}`}
                                                  >
                                                       <span className="">
                                                            Update
                                                       </span>
                                                  </Link>
                                             </div>
                                             <div className="col-4">
                                                  <button
                                                       onClick={() => {
                                                            deleteThisCategory(
                                                                 category._id
                                                            );
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

export default ManageCategories;
