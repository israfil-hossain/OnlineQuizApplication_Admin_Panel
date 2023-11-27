//External Import
import React, { useEffect, useState } from "react";
import { Box, Breadcrumbs, Stack } from "@mui/material";
import { Link } from "react-router-dom";
import { AiOutlineAppstore } from "react-icons/ai";
import { LoadingButton } from "@mui/lab";
import { CSVLink } from "react-csv";

import jsPDF from "jspdf";
import "jspdf-autotable";

//Internal Import
import PackageBreadcrumb from "../components/common/PackageBreadcrumb";
import CommonTable from "../components/common/CommonTable";

import PackageButton from "../components/common/PackageButton";
import { MdSaveAlt } from "react-icons/md";

import csvCategoryheaders from "../constants/categoryHeaders";
import AddPanelModal from "../components/controlpanel/AddPanel";
import controlHeader from "../constants/controlpanel";
import ControlPanelService from "../service/ControlPanelService";
import { CommonProgress } from "../components/common/CommonProgress";

const ControlPanel = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const handleClick = () => {};
  // Fetch User Data
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    const res = await ControlPanelService.getControl();
    setData(res?.data);
    setIsLoading(false);
  };

  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleDownloadPDF = () => {
    const pdf = new jsPDF();
    pdf.autoTable({ html: "#HomeSettings" });
    pdf.save("HomeSettings.pdf");
  };
  return (
    <div>
      <PackageBreadcrumb>
        <Breadcrumbs aria-label="breadcrumb">
          <Link underline="hover" color="grey" href="/">
            <Box sx={{ justifyContent: "center", display: "flex" }}>
              <AiOutlineAppstore
                size={23}
                className="min-w-max text-gray-500"
              />
              &nbsp; Control Panel
            </Box>
          </Link>
          {/* <Typography color="grey">sdfgh</Typography> */}
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
              headers={csvCategoryheaders}
              filename="Control.csv"
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
          {data?.length >= 2 ? (
            ""
          ) : (
            <Box
              sx={{
                alignContent: "right",
                textAlign: "right",
                marginBottom: "10px",
              }}
              onClick={handleOpen}
            >
              <PackageButton
                color={"green"}
                text={"+ Add"}
                variant={"contained"}
              />
            </Box>
          )}
        </Box>
      </Stack>
      {isLoading ? (
        <CommonProgress />
      ) : (
        <div className="pt-5">
          <CommonTable
            id={"control"}
            columns={controlHeader}
            data={data}
            typeData={"control"}
            fetchData={fetchData}
            haveimage={"true"}
          />
        </div>
      )}

      <AddPanelModal open={open} onClose={handleClose} fetchData={fetchData} />
    </div>
  );
};

export default ControlPanel;
