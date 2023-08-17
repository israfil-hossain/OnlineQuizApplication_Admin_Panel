import React, { useRef, useState, useEffect } from "react";
import PackageBreadcrumb from "../components/common/PackageBreadcrumb";
import { Box, Breadcrumbs } from "@mui/material";
import { Link } from "react-router-dom";
import { BsSliders } from "react-icons/bs";
import { Formik, Form, Field } from "formik";
import { Editor } from "@tinymce/tinymce-react";
import { CommonProgress } from "../components/common/CommonProgress";
import SubscriptionService from "../service/SubscriptionService";
import { toast } from "react-toastify";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  subscription: Yup.string().required("Subscription content is required"),
});
const Subscription = () => {
  const editorRef = useRef(null);
  const [isloading, setIsLoading] = useState(false);
  const [id, setId] = useState(null);
  const [data, setData] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const res = await SubscriptionService.getSubscription();
    setData(res?.data[0]?.subscription);
    setId(res?.data[0]?._id);
  };

  console.log("data===>", data);
  console.log("id", id);

  const handleUpdate = async (values, { setSubmitting }) => {
    try {
      setIsLoading(true);

      const response = await SubscriptionService.updateSubscription(id, values);

      if (response.status === 200) {
        toast.success("Subscription Saved successfully");
        fetchData()
      } else {
        toast.error("Something went wrong while Saving the Subscription");
      }
    } catch (error) {
      console.log("Error while updating question: ", error);
      toast.error("Something went wrong while updating the question");
    } finally {
      setIsLoading(false);
      setSubmitting(false);
    }
  };

  // console.log("Data ===>", SubscriptionData[0].subscription );

  if (isloading === true) {
    return (
      <div>
        <CommonProgress />
      </div>
    );
  }
  return (
    <div>
      <PackageBreadcrumb>
        <Breadcrumbs aria-label="breadcrumb">
          <Link underline="hover" color="grey" href="/">
            <Box sx={{ justifyContent: "center", display: "flex" }}>
              <BsSliders size={23} className="min-w-max text-gray-500" />
              &nbsp; Subscription
            </Box>
          </Link>
        </Breadcrumbs>
      </PackageBreadcrumb>

      <div className="my-4 rounded-md">
        <div className="mb-4 items-center justify-center  px-4 py-2">
          <Formik
            initialValues={{
              subscription: data ? data : "",
            }}
            validationSchema={validationSchema}
            onSubmit={handleUpdate}
          >
            {({ values, errors, touched, isSubmitting, setFieldValue }) => (
              <Form>
                <Field name="subscription">
                  {({ field }) => (
                    <Editor
                      initialValue={data ? data : <p>This sample text for subscription</p>}
                      onInit={(evt, editor) => (editorRef.current = editor)}
                     
                      init={{
                        height: 500,
                        menubar: true,
                        plugins: [
                          "advlist autolink lists link image charmap print preview anchor",
                          "searchreplace visualblocks code fullscreen",
                          "insertdatetime media table paste code help wordcount",
                          "heading", // Added 'heading' plugin for headings
                          "fontsize", // Added 'fontsize' plugin for font size options
                        ],
                        toolbar:
                          "undo redo | formatselect | " +
                          "bold italic backcolor | alignleft aligncenter " +
                          "alignright alignjustify | bullist numlist outdent indent | " +
                          "removeformat | help | heading | fontsizeselect", // Added 'heading' and 'fontsizeselect' to the toolbar
                        content_style:
                          "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }", // Updated font family and size
                      }}
                      onEditorChange={(content, editor) => {
                        // Update the form's field value
                        field.onChange(field.name)(content);
                      }}
                    />
                  )}
                </Field>
                <div className="w-full flex justify-center">
                  <button
                    type="submit"
                    disabled={null}
                    className="mt-3 md:mt-4 inline-flex items-center justify-center w-80 px-4 py-4 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Save
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default Subscription;
