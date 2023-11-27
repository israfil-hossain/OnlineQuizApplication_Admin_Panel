//External Import
import React, { useEffect, useState } from "react";
import { Box, Breadcrumbs, Stack } from "@mui/material";
import { Link } from "react-router-dom";
import { LoadingButton } from "@mui/lab";
import { CSVLink } from "react-csv";
import { debounce } from "lodash";

//Internal Import
import PackageBreadcrumb from "../components/common/PackageBreadcrumb";
import CommonTable from "../components/common/CommonTable";
import CustomSearchField from "../components/common/SearchField";
import { MdSaveAlt } from "react-icons/md";
import UserService from "../service/UserService";
import userActivityHeader from "../constants/userActivity";
import jsPDF from "jspdf";
import "jspdf-autotable";
import csvUserActivityHeader from "../constants/csvUserActivity";
import { CommonProgress } from "../components/common/CommonProgress";
import { FiActivity } from "react-icons/fi";

const Activity = () => {
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = () => {};
  // Fetch User Data
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true)
    const res = await UserService.userActivity();
    setData(res.data.userActivity);
    setIsLoading(false);
  };
  const handleSearchQueryChange = debounce((query) => {
    setSearchQuery(query);
  }, 500);
  const filteredData = data.filter((activity) =>
    activity.username.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const handleDownloadPDF = () => {
    const pdf = new jsPDF();
    pdf.autoTable({ html: "#useractivity" });
    pdf.save("userActivity.pdf");
  };

  return (
    <div>
      <PackageBreadcrumb>
        <Breadcrumbs aria-label="breadcrumb">
          <Link underline="hover" color="grey" href="/">
            <Box sx={{ justifyContent: "center", display: "flex" }}>
              <FiActivity
                size={23}
                className="min-w-max text-gray-500"
              />
              &nbsp; User Activity
            </Box>
          </Link>
        </Breadcrumbs>
      </PackageBreadcrumb>
      <Stack
        direction={{
          lg: "row",
          xs: "column",
          sm: "column",
          md: "row",
        }}
        justifyContent={"space-between"}
      >
        {/* Search Box  */}
        <CustomSearchField
          name={"Search by Username or Email"}
          onChange={handleSearchQueryChange}
        />
        <Box
          sx={{
            display: "flex",
            width: { sm: "100%", xs: "100%" },
            justifyContent: "space-between",
          }}
        >
          <Box>
            <CSVLink
              data={data}
              headers={csvUserActivityHeader}
              filename="UserActivity.csv"
            >
              <LoadingButton
                sx={{
                  height: "30px",
                  width: "75px",
                  mt: { lg: "6px", md: "6px" },
                  ml: { lg: "10px", md: "6px" },
                  alignContent: "left",
                  textAlign: "left",
                }}
                size="small"
                color="secondary"
                onClick={handleClick}
                // loading={loading}
                loadingPosition="start"
                startIcon={<MdSaveAlt size={25} />}
                variant="contained"
                disabled={data ? false : true}
              >
                <span>csv</span>
              </LoadingButton>
            </CSVLink>
            <LoadingButton
              sx={{
                height: "30px",
                width: "75px",
                mt: { lg: "6px", md: "6px" },
                ml: { lg: "10px", md: "6px", sm: "4px" },
                alignContent: "left",
                textAlign: "left",
              }}
              size="small"
              color="primary"
              onClick={handleDownloadPDF}
              // loading={loading}
              loadingPosition="start"
              startIcon={<MdSaveAlt size={25} />}
              variant="contained"
              disabled={data ? false : true}
            >
              <span>pdf</span>
            </LoadingButton>
          </Box>
          {/* Add Button  */}
          <Box
            sx={{
              alignContent: "right",
              textAlign: "right",
              marginBottom: "10px",
            }}
          ></Box>
        </Box>
      </Stack>
      {isLoading ? (
        <CommonProgress />
      ) : (
        <div className="pt-5">
          <CommonTable
            id={"useractivity"}
            columns={userActivityHeader}
            data={filteredData}
            typeData={"activity"}
            onDeleted={fetchData}
          />
        </div>
      )}
    </div>
  );
};

export default Activity;
