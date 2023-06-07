import { MdEdit, MdVisibility, MdDelete } from "react-icons/md";
import { useContext } from "react";

import {
  Box,
  IconButton,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

import { toast } from "react-toastify";
// import PackageService from "../../service/PackageService";
import UserService from "../../service/UserService";
import CategoryService from "../../service/CategoryService";
import AddCategoryModal from "../Category/AddCategory";
import ViewCategoryModal from "../Category/ViewCategory";
import AddUser from "../Users/AddUser";
import ViewUser from "../Users/ViewUser";
import QuizService from "../../service/QuizService";
import AddQuiz from "../Quizes/AddQuiz";
import ViewQuiz from "../Quizes/ViewQuiz";
import StudyService from "../../service/StudyService";
import AddStudy from "../Study/AddStudy";
import ViewStudy from "../Study/ViewStudy";

const CommonTable = ({ columns, data, typeData, fetchData, id, haveimage }) => {
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectedData, setSelectedData] = useState(null);
  const [dataType, setDataType] = useState(null);
  // For View  Function ....
  const navigate = useNavigate();

  const handleClick = (item) => {
    switch (typeData) {
      case "user":
        setDataType("user_view");
        setOpen(true);
        setSelectedData(item);
        // return navigate(`/package/edit/${item}`);
        break;
      case "activity":
        setDataType("act_view");
        setOpen(true);
        setSelectedData(item);
        break;

      case "category":
        setDataType("cat_view");
        setOpen(true);
        setSelectedData(item);
        break;

      case "quiz":
        setDataType("quiz_view");
        setOpen(true);
        setSelectedData(item);
        break;
      case "study":
        setDataType("study_view");
        setOpen(true);
        setSelectedData(item);
        break;
      case "result":
        navigate(`/results/viewresult/${item?._id}`);
        break;
      default:
        return "Not Found !";
    }
  };

  // For Category Deleted Function Call.....
  const handleCategoryDelete = async (id) => {
    try {
      const response = await CategoryService.deleteCategory(id);

      if (response.status === 200) {
        toast.success("Category Deleted Successfully !");
        fetchData();
      }
    } catch (err) {
      toast.error("Something went wrong !");
      console.log(err);
    }
  };

  // For User Delete
  const handleUserDelete = async (id) => {
    try {
      const response = await UserService.deleteUser(id);

      if (response.status === 200) {
        toast.success("User Deleted Successfully !");
        fetchData();
      }
    } catch (err) {
      toast.error("Something went wrong !");
      console.log(err);
    }
  };

  // For Activity Delete
  const handleActivityDelete = async (id) => {
    try {
      const response = await UserService.deleteActivity(id);

      if (response.status === 200) {
        toast.success("User Activity Deleted Successfully !");
        fetchData();
      }
    } catch (err) {
      toast.error("Something went wrong !");
      console.log(err);
    }
  };

  // Quiz Delete
  const handleQuizDelete = async (id) => {
    try {
      const response = await QuizService.deleteQuiz(id);

      if (response.status === 200) {
        toast.success("Quiz Deleted Successfully !");
        fetchData();
      }
    } catch (err) {}
  };

  // Study Delete
  const handleStudyDelete = async (id) => {
    try {
      const response = await StudyService.deleteStudy(id);

      if (response.status === 200) {
        toast.success("Study  Deleted Successfully !");
        fetchData();
      }
    } catch (err) {}
  };

  // Global HandleDelete For Any Tables
  const handleDelete = async (id) => {
    switch (typeData) {
      case "user":
        handleUserDelete(id);
        break;
      case "activity":
        handleActivityDelete(id);
        break;
      case "category":
        handleCategoryDelete(id);
        break;
      case "quiz":
        handleQuizDelete(id);
        break;
      case "study":
        handleStudyDelete(id);
        break;

      default:
        return "Not Found !";
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleEdit = (item) => {
    switch (typeData) {
      case "user":
        setDataType("user_edit");
        setOpen(true);
        setSelectedData(item);
        // return navigate(`/package/edit/${item}`);
        break;
      case "activity":
        setDataType("act_edit");
        setOpen(true);
        setSelectedData(item);
        break;

      case "category":
        setDataType("cat_edit");
        setOpen(true);
        setSelectedData(item);
        break;
      case "quiz":
        setDataType("quiz_edit");
        setOpen(true);
        setSelectedData(item);
        break;
      case "study":
        setDataType("study_edit");
        setOpen(true);
        setSelectedData(item);
        break;

      default:
        return "Not Found !";
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  return (
    <>
      <TableContainer component={Paper}>
        <Table
          id={id}
          sx={{ minWidth: 650, marginBottom: "30px" }}
          aria-label="dynamic table"
        >
          <TableHead sx={{ bgcolor: "#F7F4FC" }}>
            <TableRow>
              <TableCell
                sx={{
                  textAlign: "center",
                  color: "#000000",
                  fontSize: "15px",
                  fontWeight: "600",
                }}
              >
                {"ID"}
              </TableCell>
              {haveimage === "true" ? (
                <TableCell
                  sx={{
                    textAlign: "left",

                    fontSize: "16px",
                    fontWeight: "600",
                  }}
                >
                  {"Image"}
                </TableCell>
              ) : (
                ""
              )}

              {columns?.map((column) => (
                <TableCell
                  key={column?.id}
                  sx={{
                    textAlign: "left",

                    fontSize: "16px",
                    fontWeight: "600",
                    color: column?.color,
                  }}
                >
                  <Typography sx={{ color: "black" }}>
                    {column?.label}
                  </Typography>
                </TableCell>
              ))}
              {typeData === "activity" ? (
                ""
              ) : (
                <TableCell
                  sx={{
                    textAlign: "center",
                    color: "#000000",
                    fontSize: "15px",
                    fontWeight: "600",

                    flexDirection: "row",
                  }}
                >
                  {"Actions"}
                </TableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {data
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((item, index) => (
                <TableRow key={item.id}>
                  <TableCell sx={{ textAlign: "center" }}>
                    <Typography sx={{ fontWeight: "500", color: "black" }}>
                      {index + 1}{" "}
                    </Typography>
                  </TableCell>
                  {haveimage === "true" ? (
                    <TableCell sx={{}}>
                      <Box
                        sx={{
                          width: "80px",
                          height: "80px",
                          overflow: "hidden",
                          padding: "3px",
                          background: "#f2f2f2",
                          borderRadius: "10px",
                        }}
                      >
                        <img
                          src={item?.image ? item?.image : item?.profile} // Assuming image URL is stored in the "image" property of the data object
                          alt=""
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "contain",
                          }} // Adjust styles as needed
                        />
                      </Box>
                    </TableCell>
                  ) : (
                    ""
                  )}

                  {columns?.map((column) => (
                    <TableCell
                      key={column?.id}
                      sx={{
                        textAlign: "left",
                      }}
                    >
                      <Typography
                        sx={
                          column.id === "quiz_status" ||
                          column.id === "cat_status" ||
                          column.id === "status" ||
                          column.id === "usertype" ||
                          column.id === "accessibility"
                            ? {
                                fontSize: "13px",
                                backgroundColor:
                                  item[column.id] === "active" ||
                                  item[column.id] === "paid"
                                    ? "green"
                                    : "red",
                                color: "white",
                                borderRadius: "16px",
                                textAlign: "center",
                                justifyContent: "left",
                                alignItems: "left",
                                paddingX: "2px",
                                paddingY: "2px",
                                width: "100px",
                                boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.16)",
                              }
                            : {
                                fontWeight: "500",
                                fontSize: "13px",
                                backgroundColor: "white",
                                color: column.color,
                              }
                        }
                      >
                        {item[column?.id]}
                      </Typography>
                    </TableCell>
                  ))}
                  {typeData === "activity" ? (
                    ""
                  ) : (
                    <TableCell sx={{ width: "200px" }}>
                      <Stack
                        direction="row"
                        spacing={0}
                        sx={{
                          textAlign: "center",
                          justifyContent: "center",
                          width: "200px",
                        }}
                      >
                        <div sx={{ ml: 10 }}>
                          <IconButton
                            aria-label="view"
                            onClick={() => handleClick(item)}
                          >
                            <MdVisibility style={{ color: "green" }} />
                          </IconButton>
                          {typeData === "result" ? (
                            ""
                          ) : (
                            <>
                              {" "}
                              <IconButton
                                aria-label="edit"
                                onClick={() => handleEdit(item)}
                              >
                                <MdEdit style={{ color: "blue" }} />
                              </IconButton>
                              <IconButton
                                aria-label="delete"
                                onClick={() => handleDelete(item?._id)}
                              >
                                <MdDelete style={{ color: "red" }} />
                              </IconButton>
                            </>
                          )}
                        </div>
                      </Stack>
                    </TableCell>
                  )}
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={data?.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          sx={{ backgroundColor: "#F7F4FC" }}
        />
      </TableContainer>

      {(() => {
        switch (typeData) {
          case "category":
            if (dataType === "cat_edit") {
              return (
                <AddCategoryModal
                  data={selectedData}
                  fetchData={fetchData}
                  open={open}
                  onClose={handleClose}
                />
              );
            }
            if (dataType === "cat_view") {
              return (
                <ViewCategoryModal
                  data={selectedData}
                  fetchData={fetchData}
                  open={open}
                  onClose={handleClose}
                />
              );
            }
            break;

          case "user":
            if (dataType === "user_edit") {
              return (
                <AddUser
                  data={selectedData}
                  fetchData={fetchData}
                  open={open}
                  onClose={handleClose}
                />
              );
            }
            if (dataType === "user_view") {
              return (
                <ViewUser
                  data={selectedData}
                  fetchData={fetchData}
                  open={open}
                  onClose={handleClose}
                />
              );
            }
            break;
          // return <UserModal selectedData={selectedData} onClose={onClose} />;
          case "quiz":
            if (dataType === "quiz_edit") {
              return (
                <AddQuiz
                  data={selectedData}
                  fetchData={fetchData}
                  open={open}
                  onClose={handleClose}
                />
              );
            }
            if (dataType === "quiz_view") {
              return (
                <ViewQuiz
                  data={selectedData}
                  fetchData={fetchData}
                  open={open}
                  onClose={handleClose}
                />
              );
            }
            break;
          case "study":
            if (dataType === "study_edit") {
              return (
                <AddStudy
                  data={selectedData}
                  fetchData={fetchData}
                  open={open}
                  onClose={handleClose}
                />
              );
            }
            if (dataType === "study_view") {
              return (
                <ViewStudy
                  data={selectedData}
                  fetchData={fetchData}
                  open={open}
                  onClose={handleClose}
                />
              );
            }
            break;
          default:
            return "";
        }
      })()}
    </>
  );
};

export default CommonTable;
