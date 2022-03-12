import React, { useState } from "react";
import Base from "../core/Base";
import { isAuthenticated } from "../auth/helper";
import { Link } from "react-router-dom";
import { createCategory } from "./helper/adminapicall";
const AddCategory = () => {
     const [name, setName] = useState("");
     const [error, setError] = useState(false);
     const [success, setSuccess] = useState(false);

     const goBack = () => (
          <div>
               <Link className="btn btn-sm btn-info mb-3" to="/admin/dashboard">
                    Admin Home
               </Link>
          </div>
     );

     const handleChange = (event) => {
          setError("");
          setName(event.target.value);
     };

     const onSubmit = (event) => {
          event.preventDefault();
          setError("");
          setSuccess(false);
          const { user, token } = isAuthenticated(); //desructuring the data form isAuthenticated function

          //backend request fired
          createCategory(user._id, token, { name }).then((data) => {
               if (data?.error) {
                    setError(true);
               } else {
                    setError("");
                    setSuccess(true);
                    setName(""); //to clear the textBox
               }
          });
     };

     const mySuccessMessage = () => {
          if (success) {
               return <h4 className="text-success">Category Created</h4>;
          }
     };

     const myWarningMessage = () => {
          if (error) {
               return (
                    <h4 className="text-success">Failed to Create category</h4>
               );
          }
     };

     const myCategoryForm = () => (
          <form>
               <div className="form-group py-4">
                    <h3> Enter the Category</h3>
                    <input
                         type="text"
                         className="form-control my-3"
                         onChange={handleChange}
                         value={name}
                         autoFocus
                         required
                         placeholder="For Ex. Summer"
                    />
                    <button onClick={onSubmit} className="btn btn-outline-info">
                         Create Category
                    </button>
               </div>
          </form>
     );

     return (
          <Base
               title="Create a Category here"
               description="Add a new Category"
               className="container signUpForm p-4 mb-4 mt-4"
          >
               <div className="row">
                    <div className="col-md-8 offset-md-2">
                         {mySuccessMessage()}
                         {myWarningMessage()}
                         {myCategoryForm()}
                         {goBack()}
                    </div>
               </div>
          </Base>
     );
};

export default AddCategory;
