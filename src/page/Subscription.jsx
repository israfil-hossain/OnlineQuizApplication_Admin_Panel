import React, { useRef } from "react";
import PackageBreadcrumb from "../components/common/PackageBreadcrumb";
import { Box, Breadcrumbs } from "@mui/material";
import { Link } from "react-router-dom";
import { BsSliders } from "react-icons/bs";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Editor } from "@tinymce/tinymce-react";

const Subscription = ({ open, onClose, data, fetchData }) => {
  const editorRef = useRef(null);

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
          {/* <Typography color="grey">sdfgh</Typography> */}
        </Breadcrumbs>
      </PackageBreadcrumb>

      <div className="my-4 rounded-md">
        <div className="mb-4 items-center justify-center border px-4 py-2">
          <Formik
           initialValues={{
      
              text: data ? data?.text : "",
        
            }}>

            <Form>
              <Field name="text">
                {({ field }) => (
                  <Editor
                    onInit={(evt, editor) => (editorRef.current = editor)}
                    value={
                      field.value ? field.value : "Please enter your text here"
                    }
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
              <button
                    type="Update"
                    disabled={null}
                    className="mt-3 md:mt-4 inline-flex items-center justify-center w-full px-4 py-2 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    {data ? "Update" : "Submit"}
                  </button>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default Subscription
