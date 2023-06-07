//External Import
import React, { useEffect, useState } from "react";
import { Box, Breadcrumbs, Stack } from "@mui/material";
import { Link } from "react-router-dom";
import { LoadingButton } from "@mui/lab";
import { CSVLink } from "react-csv";
import { debounce } from "lodash";

//Internal Import
import PackageBreadcrumb from "../components/common/PackageBreadcrumb";
import CustomSearchField from "../components/common/SearchField";
import PackageButton from "../components/common/PackageButton";
import { MdSaveAlt } from "react-icons/md";

import { BsFillPatchQuestionFill, BsSliders } from "react-icons/bs";
import ImageTable from "../components/common/ImageTable";

import jsPDF from 'jspdf'
import 'jspdf-autotable';

import csvImageheaders from "../constants/imageHeaders";
import AddQuestions from "../components/Questions/AddQuestions";
import questionHeader from "../constants/questionHeader";
import QuestionService from "../service/QuestionService";

const Questions = () => {
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  
  const handleClick = () => {};
  // Fetch User Data
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const res = await QuestionService.getQuestion();
    setData(res.data);
  };
  const handleSearchQueryChange = debounce((query) => {
    setSearchQuery(query);
  }, 500);

  const filteredData = data.filter((question) =>
    question.quizname.toLowerCase().includes(searchQuery.toLowerCase()) ||
    question.question_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const [open,setOpen] = useState(false);
  const handleOpen=()=>setOpen(true);
  const handleClose = ()=>setOpen(false);

  const handleDownloadPDF = ()=>{
    const pdf = new jsPDF(); 
    pdf.autoTable({html:'#imagedata'});
    pdf.save("imageData.pdf")
  }
  return (
    <div>
      <PackageBreadcrumb>
        <Breadcrumbs aria-label="breadcrumb">
          <Link underline="hover" color="grey" href="/">
            <Box sx={{ justifyContent: "center", display: "flex" }}>
              <BsFillPatchQuestionFill size={23} className="min-w-max text-gray-500" />
              &nbsp; Questions
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
        {/* Search Box  */}
        <CustomSearchField
          name={"Search by Question Name or QuizName"}
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
         <CSVLink data={data} headers={csvImageheaders} filename="Imagedata.csv">
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
                ml: { lg: "10px", md: "6px",sm:"4px" },
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
            onClick={handleOpen}
          >
            <PackageButton
              color={"green"}
              text={"+ Add"}
              variant={"contained"}
            />
          </Box>
        </Box>
      </Stack>
      <div className="pt-5">
        {/* <CommonTable   columns={userHeader} data={filteredData} typeData={"user"} onDeleted={fetchData}/> */}
        <ImageTable
          id={"imagedata"}
          columns={questionHeader}
          data={filteredData}
          typeData={"question"}
          fetchData={fetchData}
        />
      </div>

      <AddQuestions open={open} onClose={handleClose} fetchData={fetchData}/>
    </div>
  );
};

export default Questions;
