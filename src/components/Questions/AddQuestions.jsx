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
  Typography,
} from "@mui/material";
import { AiOutlineCloseCircle, AiOutlineCloudUpload } from "react-icons/ai";

import { toast } from "react-toastify";
import { Progress } from "../common/Progress";
import questionValidationSchema from "../../utils/validation/questionValidation";
import QuizService from "../../service/QuizService";
import QuestionService from "../../service/QuestionService";


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

const AddQuestions = ({ open, onClose, data, fetchData }) => {
  console.log("Question Data is : ", data);
  const handleResetAndClose = (resetForm) => {
    fetchData();
    onClose();
    resetForm();
  };
  const [isLoading, setIsLoading] = useState(false);
  const [category, setCategory] = useState();
  const [answer, setAnswer] = useState();
  const [previewImage, setPreviewImage] = useState(data ? data?.image : "");

  useEffect(() => {
    fetchQuiz();
  }, []);

  const fetchQuiz = async () => {
    const res = await QuizService.getQuiz();
    console.log("res :>> ", res);
    
    setAnswer(
      [
        {value: "option_a", label:"option_a"},
        {value: "option_b", label:"option_b"},
        {value: "option_c", label:"option_c"},
        {value: "option_d", label:"option_d"},
        {value: "option_e", label:"option_e"},
      ]
    );
    setCategory(
      res.data.map((quiz) => ({
        value: quiz.quiz_name,
        label: quiz.quiz_name,
        quizid: quiz._id.toString(),
      }))
    );
    console.log("activeCategories Data ==>", res);
  };

  console.log("Quiz is ===>", category);

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      console.log("Form Values: ", values);

      setIsLoading(true);

      const response = await QuestionService.addQuestion(values);

      console.log("Response: ", response.data);

      if (response.status === 201) {
        toast.success("Question created successfully");
        fetchData();
        onClose();
      } else {
        toast.error("Something went wrong while creating the question");
      }
    } catch (error) {
      console.log("Error while creating question: ", error);
      toast.error("Something went wrong while creating the question");
    } finally {
      setIsLoading(false);
      setSubmitting(false);
    }
  };
  const handleUpdate = async (values, { setSubmitting }) => {
    try {
      console.log("Questions Values: ", values);

      setIsLoading(true);

      const response = await QuestionService.updateQuestion(data?._id, values);

      console.log("Response: ", response);

      if (response.status === 200) {
        toast.success("Question updated successfully");
        fetchData();
        onClose();
      } else {
        toast.error("Something went wrong while updating the question");
      }
    } catch (error) {
      console.log("Error while updating question: ", error);
      toast.error("Something went wrong while updating the question");
    } finally {
      setIsLoading(false);
      setSubmitting(false);
    }
  };

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
              image: data ? data.image : "",
              quizname: data ? data?.quizname : "",
              question_name: data ? data?.question_name : "",
              options: [
                {
                  option_a: data ? data.options[0]?.option_a : "",
                  option_b: data ? data.options[0]?.option_b : "",
                  option_c: data ? data.options[0]?.option_c : "",
                  option_d: data ? data.options[0]?.option_d : "",
                  option_e: data ? data.options[0]?.option_e : "",
                },
              ],
              answer: data ? data?.answer : "",
              qus_description: data ? data?.qus_description : "",
            }}
            validationSchema={questionValidationSchema}
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
                <>{JSON.stringify(values)}</>
                <Box
                  sx={{
                    pb: 0,
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography variant="h5" component="h5">
                    {data ? "Update " : "Add "} Question
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
                  <Chip label="Image" />
                </Divider>

                <div className="space-y-6 ">
                  <div className="my-4 rounded-md">
                    <div className="grid lg:grid-cols-2 sm:grid-cols-1 w-full space-x-4">
                      {/* =============   For Quiz Name ========================= */}
                      <div>
                        <div
                          htmlFor="quizname"
                          className="block text-sm font-medium text-gray-700 "
                        >
                          QuizName
                        </div>

                        <div className="mt-5">
                          <FormControl fullWidth>
                            <InputLabel id="quizname-label">
                              Quiz Name
                            </InputLabel>
                            <Select
                              labelId="quizname-label"
                              id="quizname"
                              name="quizname"
                              value={values?.quizname}
                              onChange={handleChange}
                              label="QuizName"
                              onBlur={handleBlur}
                              error={
                                touched.quizname && Boolean(errors.quizname)
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
                    </div>
                  </div>

                  {/* Question Name ...... */}
                  <label
                    htmlFor="question_name"
                    className="block text-gray-900 font-semibold text-md  mb-2"
                  >
                    Questions :
                  </label>
                  <div>
                    {/* Question Name  */}
                    <div className="my-2 rounded-md">
                      <div className="mb-4  pt-2 items-center justify-center">
                        <label
                          htmlFor="question_name"
                          className="block text-gray-800   mb-2"
                        >
                          Question Name
                        </label>
                        <Field
                          type="text"
                          name="question_name"
                          placeholder="Enter Question Name"
                          error={touched.question_name && errors.question_name}
                          className={`appearance-none block w-full px-3 py-4 border border-gray-300 
                                    rounded-md shadow-sm placeholder-gray-400 
                                    focus:ring-green-500 focus:border-green-500 focus:ring-1 sm:text-sm ${
                                      touched.question_name &&
                                      errors.question_name
                                        ? "border-red-500"
                                        : ""
                                    }`}
                          //   className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                        {touched.question_name && errors.question_name && (
                          <p className="mt-2 text-sm text-red-600 ">
                            {errors.question_name}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Image Section  */}
                    <div className="my-4 rounded-md ">
                      <label
                        htmlFor="image"
                        className="block text-sm font-medium text-gray-700 "
                      >
                        Image
                      </label>
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
                            setFieldValue(
                              "image",
                              event.currentTarget.files[0]
                            );
                            setPreviewImage(
                              URL.createObjectURL(event.currentTarget.files[0])
                            );
                          }}
                          onBlur={handleBlur}
                          className={
                            touched.image && errors.image ? "error" : ""
                          }
                          style={{ color: "blue" }}
                        />
                      </div>

                      <ErrorMessage
                        name="image"
                        component="div"
                        className="error-message text-danger"
                        style={{ color: "red" }}
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="options"
                        className="block font-medium mb-2 "
                      >
                        Options
                      </label>
                    </div>
                    <div className="my-4 grid lg:grid-cols-3 sm:grid-cols-1 rounded-md gap-4 ">
                      <div className="">
                        <label
                          htmlFor="options[0].option_a"
                          className="block text-gray-800 mb-2"
                        >
                          Option A.
                        </label>
                        <Field
                          type="text"
                          name="options[0].option_a"
                          placeholder="Enter Option A Name"
                          className={`appearance-none block w-full px-3 py-2 border border-gray-300 
                          rounded-md shadow-sm placeholder-gray-400 
                          focus:ring-green-500 focus:border-green-500 focus:ring-1 sm:text-sm ${
                            touched.options?.[0]?.option_a &&
                            errors.options?.[0]?.option_a
                              ? "border-red-500"
                              : ""
                          }`}
                        />
                        {touched.options?.[0]?.option_a &&
                          errors.options?.[0]?.option_a && (
                            <p className="mt-2 text-sm text-red-600 ">
                              {errors.options[0].option_a}
                            </p>
                          )}
                      </div>

                      <div className="">
                        <label
                          htmlFor="options[0].option_b"
                          className="block text-gray-800 mb-2"
                        >
                          Option B.
                        </label>
                        <Field
                          type="text"
                          name="options[0].option_b"
                          placeholder="Enter Option B Name"
                                    className={`appearance-none block w-full px-3 py-2 border border-gray-300 
                          rounded-md shadow-sm placeholder-gray-400 
                          focus:ring-green-500 focus:border-green-500 focus:ring-1 sm:text-sm ${
                            touched.options?.[0]?.option_b &&
                            errors.options?.[0]?.option_b
                              ? "border-red-500"
                              : ""
                          }`}
                        />
                        {touched.options?.[0]?.option_b &&
                          errors.options?.[0]?.option_b && (
                            <p className="mt-2 text-sm text-red-600 ">
                              {errors.options[0].option_b}
                            </p>
                          )}
                      </div>

                      <div className="">
                        <label
                          htmlFor="options[0].option_c"
                          className="block text-gray-800 mb-2"
                        >
                          Option C.
                        </label>
                        <Field
                          type="text"
                          name="options[0].option_c"
                          placeholder="Enter Option C Name"
                          className={`appearance-none block w-full px-3 py-2 border border-gray-300 
                          rounded-md shadow-sm placeholder-gray-400 
                          focus:ring-green-500 focus:border-green-500 focus:ring-1 sm:text-sm ${
                            touched.options?.[0]?.option_c &&
                            errors.options?.[0]?.option_c
                              ? "border-red-500"
                              : ""
                          }`}
                        />
                        {touched.options?.[0]?.option_c &&
                          errors.options?.[0]?.option_c && (
                            <p className="mt-2 text-sm text-red-600 ">
                              {errors.options[0].option_c}
                            </p>
                          )}
                      </div>

                      <div className="">
                        <label
                          htmlFor="options[0].option_d"
                          className="block text-gray-800 mb-2"
                        >
                          Option D.
                        </label>
                        <Field
                          type="text"
                          name="options[0].option_d"
                          placeholder="Enter Option D Name"
                          className={`appearance-none block w-full px-3 py-2 border border-gray-300 
                          rounded-md shadow-sm placeholder-gray-400 
                          focus:ring-green-500 focus:border-green-500 focus:ring-1 sm:text-sm ${
                            touched.options?.[0]?.option_d &&
                            errors.options?.[0]?.option_d
                              ? "border-red-500"
                              : ""
                          }`}
                        />
                        {touched.options?.[0]?.option_d &&
                          errors.options?.[0]?.option_d && (
                            <p className="mt-2 text-sm text-red-600 ">
                              {errors.options[0].option_d}
                            </p>
                          )}
                      </div>

                      <div className="">
                        <label
                          htmlFor="options[0].option_e"
                          className="block text-gray-800 mb-2"
                        >
                          Option E.
                        </label>
                        <Field
                          type="text"
                          name="options[0].option_e"
                          placeholder="Enter Option E Name"
                          className={`appearance-none block w-full px-3 py-2 border border-gray-300 
                          rounded-md shadow-sm placeholder-gray-400 
                          focus:ring-green-500 focus:border-green-500 focus:ring-1 sm:text-sm ${
                            touched.options?.[0]?.option_e &&
                            errors.options?.[0]?.option_e
                              ? "border-red-500"
                              : ""
                          }`}
                        />
                        {touched.options?.[0]?.option_e &&
                          errors.options?.[0]?.option_e && (
                            <p className="mt-2 text-sm text-red-600 ">
                              {errors.options[0].option_e}
                            </p>
                          )}
                      </div>
                    </div>

                    {/* Answer  */}
                    <div className="mt-5">
                    <label
                        htmlFor="answer"
                        className="block text-gray-800   mb-2"
                      >
                        Select Answer
                      </label>
                          <FormControl fullWidth>
                            <InputLabel id="questionname-label">
                              Answer
                            </InputLabel>
                            <Select
                              labelId="questionname-label"
                              id="answer"
                              name="answer"
                              value={values?.answer}
                              onChange={handleChange}
                              label="Answer"
                              onBlur={handleBlur}
                              error={
                                touched.answer && Boolean(errors.answer)
                              }
                            >
                              {answer?.map((option) => (
                                <MenuItem
                                  key={option.value}
                                  value={option.value}
                                >
                                  {option?.label}
                                </MenuItem>
                              ))}
                            </Select>
                            {touched.answer && Boolean(errors.answer) && (
                              <FormHelperText error>
                                {errors.answer}
                              </FormHelperText>
                            )}
                          </FormControl>
                        </div>

                    {/* Description ...... */}
                    <div className="my-4 rounded-md">
                      <div className="mb-4   items-center justify-center">
                        <label
                          htmlFor="qus_description"
                          className="block text-gray-800   mb-2"
                        >
                          Question Description
                        </label>

                        <Field
                          component="textarea"
                          name="qus_description"
                          error={
                            touched.qus_description && errors.qus_description
                          }
                          className={`appearance-none block w-full px-3 py-3 border border-gray-300 
                                  rounded-md shadow-sm placeholder-gray-400 
                                  focus:ring-green-500 focus:border-green-500 focus:ring-1 sm:text-sm ${
                                    touched.qus_description &&
                                    errors.qus_description
                                      ? "border-red-500"
                                      : ""
                                  }`}
                          //   className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                        {touched.qus_description && errors.qus_description && (
                          <p className="mt-2 text-sm text-red-600 ">
                            {errors.qus_description}
                          </p>
                        )}
                      </div>
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

export default AddQuestions;
