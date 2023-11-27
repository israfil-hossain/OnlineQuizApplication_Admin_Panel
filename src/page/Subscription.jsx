import React, { useState, useEffect } from "react";
import PackageBreadcrumb from "../components/common/PackageBreadcrumb";
import { Box, Breadcrumbs } from "@mui/material";
import { Link } from "react-router-dom";
import { CommonProgress } from "../components/common/CommonProgress";
import SubscriptionService from "../service/SubscriptionService";
import { toast } from "react-toastify";

import CommonEditor from "../components/common/CommonEditor";
import { MdSubscriptions } from "react-icons/md";

const Subscription = () => {
  const [isloading, setIsLoading] = useState(false);
  const [id,setId] = useState("64dce54a9c9342d3d64d0ef4");

  const [editorContent, setEditorContent] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    const res = await SubscriptionService.getSubscription();
    setEditorContent(res ? res?.data?.subscription.toString() : "");
    setId(res?.data?._id);
    setIsLoading(false);
  };

  const handleUpdate = async () => {
    
    try {
      setIsLoading(true);
      // Check if editorContent is not null before accessing its properties
      if (editorContent !== null) {
        const response = await SubscriptionService.updateSubscription(id,{
          subscription: editorContent,
        });

        if (response.status === 200) {
          toast.success("Subscription Saved successfully");
          fetchData();
        } else {
          toast.error("Something went wrong while Saving the Subscription");
        }
      } else {
        // Handle the case where editorContent is null
        toast.error("Editor content is null. Cannot save subscription.");
      }
    } catch (error) {
      console.log("Error while updating question: ", error);
      toast.error("Something went wrong while updating the question");
    } finally {
      setIsLoading(false);
      
    }
  };

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
              <MdSubscriptions size={23} className="min-w-max text-gray-500" />
              &nbsp; Subscription
            </Box>
          </Link>
        </Breadcrumbs>
      </PackageBreadcrumb>

      <div className="my-4 rounded-md">
        <div className="mb-4 items-center justify-center  px-4 py-2">
          <form onSubmit={handleUpdate}>
            <CommonEditor
              editorData={editorContent}
              setEditorData={setEditorContent}
            />

            <div className="w-full flex justify-center">
              <button
                type="submit"
                className="mt-3 md:mt-4 inline-flex items-center justify-center w-80 px-4 py-4 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Subscription;
