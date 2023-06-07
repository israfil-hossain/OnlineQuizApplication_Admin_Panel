import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import {
  Backdrop,
  Box,
  Chip,
  Divider,
  Fade,
  FormControl,
  FormHelperText,
  IconButton,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  Switch,
  Typography,
} from "@mui/material";
import { AiOutlineCloseCircle, AiOutlineCloudUpload } from "react-icons/ai";
import { toast } from "react-toastify";
import { Progress } from "../common/Progress";
import CategoryService from "../../service/CategoryService";

import quizValidationSchema from "../../utils/validation/addquizValidation";
import QuizService from "../../service/QuizService";


const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%,-50%)",
  width: ["90%", "90%", "60%"],
  bgcolor: "background.paper",
  border: "2px solid #F7FDFF",
  borderRadius: "10px",
  boxShadow: `3px 2px 3px 1px rgba(0, 0, 0, 0.2)`,
  p: 4,
  maxHeight: "90vh",
  overflow: "auto",
};


const AddQuiz = ({ open, onClose, data, fetchData }) => {
  const [previewImage, setPreviewImage] = useState(data ? data.image : "");
  const handleResetAndClose = (resetForm) => {
    fetchData();
    onClose();
    resetForm();
  };
  const [isLoading, setIsLoading] = useState(false);
  const [category, setCategory] = useState();


  useEffect(() => { 
    fetchCategory();
  }, []);

  
  const fetchCategory = async () => {
    const res = await CategoryService.getCategory();
    const activeCategories = res.data.filter(
      (category) => category.cat_status === "active"
    );
    setCategory(
      activeCategories.map((category) => ({
        value: category.cat_name,
        label: category.cat_name,
      }))
    );
    console.log("activeCategories Data ==>", activeCategories);
  };

  const handleSubmit = async (values, { setSubmitting,setErrors }) => {
    console.log("Values", values);
    try {
      setIsLoading(true);
     
      const response = await QuizService.addQuiz(values);
      console.log("Quiz response = >", response);
      if (response.status === 201) {
        const responseData = response.data;
        if (responseData.error) {
          toast.error(responseData.error.message);
          const errorData = responseData.error;
          if (errorData.errors) {
            const errors = Object.keys(errorData.errors).reduce((acc, key) => {
              acc[key] = errorData.errors[key].msg;
              return acc;
            }, {});
            console.log(errors);
            setErrors(errors);
          }
        } else {
          toast.success("Successfully Add Quiz ");
          onClose(true);
          fetchData();
        }
        setSubmitting(false);
      }
    } catch (err) {
      if (err.response) {
        const errorData = err.response.data;
        toast.error(errorData.message);
        if (errorData.errors) {
          const errors = Object.keys(errorData.errors).reduce((acc, key) => {
            acc[key] = errorData.errors[key].msg;
            return acc;
          }, {});
          console.log(errors);
          setErrors(errors);
        } else {
          toast.error("Something went wrong");
        }
      } else {
        toast.error("Something went wrong");
      }
    }
    setIsLoading(false);
    setSubmitting(false);
  };


  const handleUpdate = async (values, { setSubmitting,setErrors }) => {
    console.log("Values", values);
    try {
      setIsLoading(true);
     
      const response = await QuizService.updateQuiz(data?._id, values);
      console.log("Quiz response = >", response);
      if (response.status === 200) {
        const responseData = response.data;
        if (responseData.error) {
          toast.error(responseData.error.message);
          const errorData = responseData.error;
          if (errorData.errors) {
            const errors = Object.keys(errorData.errors).reduce((acc, key) => {
              acc[key] = errorData.errors[key].msg;
              return acc;
            }, {});
            console.log(errors);
            setErrors(errors);
          }
        } else {
          toast.success("Successfully Update Quiz ");
          onClose(true);
          fetchData();
        }
        setSubmitting(false);
      }
    } catch (err) {
      if (err.response) {
        const errorData = err.response.data;
        toast.error(errorData.message);
        if (errorData.errors) {
          const errors = Object.keys(errorData.errors).reduce((acc, key) => {
            acc[key] = errorData.errors[key].msg;
            return acc;
          }, {});
          console.log(errors);
          setErrors(errors);
        } else {
          toast.error("Something went wrong");
        }
      } else {
        toast.error("Something went wrong");
      }
    }
    setIsLoading(false);
    setSubmitting(false);
  };
  // const handleUpdate = async (values, { setSubmitting, setErrors }) => {
  //   console.log("Values", values);
  //   try {
  //     setIsLoading(true);
  //     const value = {
  //       ...values,
  //       image: values.image,
  //     }

  //     const response = await QuizService.updateQuiz(data?._id, value);
  //     console.log(response);
  //     toast.success("Update Successfully");
  //     fetchData();
  //     onClose();
  //   } catch (error) {
  //     toast.error("Something went wrong uploading ");
  //     console.log(error);
  //   }
  //   setIsLoading(false);
  //   setSubmitting(false);
  // };

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      onClose={false}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={open}>
        <Box sx={style}>
          <Formik
            initialValues={{
              category: data ? data?.category : "",
              quiz_name: data ? data?.quiz_name : "",
              quiz_description: data ? data?.quiz_description : "",
              quiz_status: data ? data?.quiz_status : "active",
              image: data ? data?.image : "",
              accessibility: data ? data?.accessibility : "unpaid",

            }}
            validationSchema={quizValidationSchema}
            onSubmit={data ? handleUpdate : handleSubmit}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              isSubmitting,
              setFieldValue,
              resetForm,
            }) => (
              <Form>
                {/* <>{JSON.stringify(values)}</> */}
                <Box
                  sx={{
                    pb: 0,
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography variant="h5" component="h5">
                    {data ? "Update " : "Add "} Quiz
                  </Typography>
                  <div style={{}}>
                    <IconButton
                      aria-label="edit"
                      onClick={() => handleResetAndClose(resetForm)}
                    >
                      <AiOutlineCloseCircle
                        sx={{ color: "#ff4a68", height: "22px", width: "22px" }}
                        className="text-red-400 hover:text-600"
                      />
                    </IconButton>
                  </div>
                </Box>
                <Divider sx={{ mb: 2 }}>
                  <Chip label="Quiz" />
                </Divider>

                <div className="space-y-6 ">
                <div className="my-4 rounded-md">
                    <label htmlFor="image">Image</label>
                    <div className="mt-1 flex border flex-col justify-center items-center space-x-2 p-10 bg-white rounded-md h-100vh">
                      {previewImage ? (
                        <div className="rounded-md bg-gray-100 p-3 mb-5 flex items-center justify-center">
                          <img
                            src={previewImage}
                            alt="Preview"
                            style={{ height: "100px", marginTop: "10px" }}
                            className="w-50 h-50 rounded-md"
                          />
                        </div>
                      ) : (
                        <div>
                          <AiOutlineCloudUpload className="w-16 h-16 text-blue-300 mb-5" />
                        </div>
                      )}
                      <input
                        id="image"
                        name="image"
                        type="file"
                        onChange={(event) => {
                          setFieldValue("image", event.currentTarget.files[0]);
                          setPreviewImage(
                            URL.createObjectURL(event.currentTarget.files[0])
                          );
                        }}
                        onBlur={handleBlur}
                        className={touched.image && errors.image ? "error" : ""}
                      />
                    </div>

                    <ErrorMessage
                      name="image"
                      component="div"
                      className="error-message"
                    />
                  </div>



                  <div className="my-4 rounded-md">
                    <div className="grid lg:grid-cols-2 sm:grid-cols-1 w-full space-x-4">
                      {/* =============   For Category ========================= */}
                      <div>
                        <div
                          htmlFor="category"
                          className="block text-sm font-medium text-gray-700 "
                        >
                          Category
                        </div>

                        <div className="mt-5">
                          <FormControl fullWidth>
                            <InputLabel id="category-label">
                              Category
                            </InputLabel>
                            <Select
                              labelId="category-label"
                              id="category"
                              name="category"
                              value={values?.category}
                              onChange={handleChange}
                              label="Category"
                              onBlur={handleBlur}
                              error={
                                touched.category && Boolean(errors.category)
                              }
                            >
                              {category?.map((option) => (
                                <MenuItem
                                  key={option.value}
                                  value={option.value}
                                >
                                  {option?.label}
                                </MenuItem>
                              ))}
                            </Select>
                            {touched.category && Boolean(errors.category) && (
                              <FormHelperText error>
                                {errors.category}
                              </FormHelperText>
                            )}
                          </FormControl>
                        </div>
                      </div>
                      {/* Quiz name  */}
                      <div className="mb-4  pt-2 items-center justify-center">
                        <label
                          htmlFor="quiz_name"
                          className="block text-gray-800   mb-2"
                        >
                          Quiz Name
                        </label>
                        <Field
                          type="text"
                          name="quiz_name"
                          placeholder="Enter Quiz Name"
                          error={touched.quiz_name && errors.quiz_name}
                          className={`appearance-none block w-full px-3 py-4 border border-gray-300 
                                    rounded-md shadow-sm placeholder-gray-400 
                                    focus:ring-green-500 focus:border-green-500 focus:ring-1 sm:text-sm ${
                                      touched.quiz_name && errors.quiz_name
                                        ? "border-red-500"
                                        : ""
                                    }`}
                          //   className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                        {touched.quiz_name && errors.quiz_name && (
                          <p className="mt-2 text-sm text-red-600 ">
                            {errors.quiz_name}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                  {/* accessibility */}
                  <div className="flex items-center space-x-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Accessibility
                    </label>
                    <Field name="accessibility">
                      {({ field, form }) => (
                        <Switch
                          id="accessibility"
                          name="accessibility"
                          checked={field.value === "paid"}
                          onChange={(e) => {
                            const newStatus = e.target.checked
                              ? "paid"
                              : "unpaid";
                            form.setFieldValue("accessibility", newStatus);
                          }}
                          color="primary"
                        />
                      )}
                    </Field>
                    <label
                      htmlFor="accessibility"
                      className="text-sm font-medium text-gray-700"
                    >
                      {values.accessibility === "paid" ? "paid" : "unpaid"}
                    </label>
                  </div>
                  {/* status  */}
                  <div className="flex items-center space-x-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Status
                    </label>
                    <Field name="quiz_status">
                      {({ field, form }) => (
                        <Switch
                          id="quiz_status"
                          name="quiz_status"
                          checked={field.value === "active"}
                          onChange={(e) => {
                            const newStatus = e.target.checked
                              ? "active"
                              : "inactive";
                            form.setFieldValue("quiz_status", newStatus);
                          }}
                          color="primary"
                        />
                      )}
                    </Field>
                    <label
                      htmlFor="cat_status"
                      className="text-sm font-medium text-gray-700"
                    >
                      {values.cat_status === "active" ? "Active" : "Inactive"}
                    </label>
                  </div>

                  {/* Quiz Description ...... */}
                  <div className="my-4 rounded-md">
                    <div className="mb-4   items-center justify-center">
                      <label
                        htmlFor="quiz_description"
                        className="block text-gray-800   mb-2"
                      >
                        Description
                      </label>

                      <Field
                        component="textarea"
                        name="quiz_description"
                        error={touched.quiz_description && errors.quiz_description}
                        className={`appearance-none block w-full px-3 py-3 border border-gray-300 
                                  rounded-md shadow-sm placeholder-gray-400 
                                  focus:ring-green-500 focus:border-green-500 focus:ring-1 sm:text-sm ${
                                    touched.quiz_description && errors.quiz_description
                                      ? "border-red-500"
                                      : ""
                                  }`}
                        //   className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      />
                      {touched.quiz_description && errors.quiz_description && (
                        <p className="mt-2 text-sm text-red-600 ">
                          {errors.quiz_description}
                        </p>
                      )}
                    </div>
                  </div>


                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex items-center justify-center w-full px-4 py-2 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    {isLoading ? <Progress className="mr-2" /> : ""}
                    {data ? "Update" : "Submit"}
                  </button>
                </div>
              </Form>
            )}
          </Formik>

         
        </Box>
      </Fade>
    </Modal>
  );
};

export default AddQuiz;
