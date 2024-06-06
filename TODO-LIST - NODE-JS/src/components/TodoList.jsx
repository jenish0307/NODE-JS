import React, { useEffect, useRef, useState } from "react";
import { styled } from "@mui/joy/styles";
import Sheet from "@mui/joy/Sheet";
import Grid from "@mui/joy/Grid";
import {
  Box,
  Button,
  CircularProgress,
  DialogContent,
  DialogTitle,
  FormControl,
  FormLabel,
  Modal,
  ModalDialog,
  Stack,
} from "@mui/joy";
import { BiPlus } from "react-icons/bi";
import { MdDelete, MdEdit } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { deleteData, postData, updateData } from "../Toolkit/Slices/todoslice";
import { TextField } from "@mui/material";

const Item = styled(Sheet)(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark" ? theme.palette.background.level1 : "#fff",
  ...theme.typography["body-sm"],
  padding: theme.spacing(1),
  textAlign: "center",
  borderRadius: 4,
  color: theme.vars.palette.text.secondary,
}));

export default function TodoList() {
  const [open, setOpen] = useState(false);
  const [CompletedTask, setCompletedTask] = useState();
  const [UnCompletedTask, setUnCompletedTask] = useState();
  const dispatch = useDispatch();
  const taskRef = useRef(null);
  const descriptionRef = useRef(null);

  // alert
  const showToast = (title, icon) => {
    const Toast = Swal.mixin({
      background: "black",
      color: "white",
      toast: true,
      width: "auto",
      position: "bottom-start",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      },
    });
    Toast.fire({ icon, title });
  };

  // getData
  const { todo, isError, isLoading } = useSelector((state) => state.todo);

  const handleSubmit = () => {
    let obj = {
      task: taskRef.current?.value || "",
      description: descriptionRef.current?.value || "",
    };
    dispatch(postData({ data: obj }));

    // clear the input fields
    taskRef.current.value = "";
    descriptionRef.current.value = "";
  };

  const handleDelete = (id) => {
    dispatch(deleteData(id));
  };

  const handleCheck = (id, checked) => {
    const task = todo.find((task) => task._id === id);
    dispatch(updateData({ id, data: { ...task, status: checked } }));
  };
  useEffect(() => {
    let taskData = todo.filter((state) => state.status == true);
    localStorage.setItem("CompletedTask", JSON.stringify(taskData));
    setCompletedTask(taskData);
  }, [todo]);

  useEffect(() => {
    let taskData = todo.filter((state) => state.status == false);
    localStorage.setItem("UnCompletedTask", JSON.stringify(taskData));
    setUnCompletedTask(taskData);
  }, [todo]);

  if (isError) {
    showToast(isError, "error");
  }

  if (isLoading) {
    return (
      <div
        className="loader"
        style={{ marginTop: "calc(50vh - 20px)", minHeight: "100vh" }}
      >
        <CircularProgress />
      </div>
    );
  }

  return (
    <>
      <Grid container columns={16} sx={{ flexGrow: 1 }} mt={5}>
        <Grid xs={8}>
          <Item>
            <Button
              variant="solid"
              color="primary"
              startDecorator={<BiPlus />}
              onClick={() => setOpen(true)}
            >
              New Task
            </Button>
            <Modal open={open} onClose={() => setOpen(false)}>
              <ModalDialog>
                <DialogTitle>Add Task</DialogTitle>
                <DialogContent>Fill in the information</DialogContent>
                <form
                  onSubmit={(event) => {
                    event.preventDefault();
                    handleSubmit();
                    setOpen(false);
                  }}
                >
                  <Stack spacing={2} sx={{ width: "450px" }}>
                    <FormControl>
                      <FormLabel>Task Title</FormLabel>
                      <TextField
                        autoFocus
                        required
                        name="task"
                        inputRef={taskRef}
                      />
                    </FormControl>
                    <FormControl>
                      <FormLabel>Description</FormLabel>
                      <TextField
                        required
                        name="description"
                        inputRef={descriptionRef}
                      />
                    </FormControl>
                    <Button type="submit">Submit</Button>
                  </Stack>
                </form>
              </ModalDialog>
            </Modal>
          </Item>
        </Grid>
        <Grid xs={8}>
          <Item>FILTER</Item>
        </Grid>
      </Grid>
      <Box
        sx={{
          maxWidth: "1000px",
          margin: "0 auto",
          marginTop: "20px",
        }}
      >
        <div style={{ textAlign: "center", margin: "50px 0" }}>
          <h1>to-do list</h1>
        </div>
        <Box
          sx={{
            backgroundColor: "#ecedf6",
            padding: "20px",
            borderRadius: "10px",
            height: "450px",
            border: "1px solid black",
            overflow: "auto",
            width: "100%",
          }}
        >
          <ul>
            {todo?.map((val, ind) => {
              return (
                <li className="todo-box" key={ind}>
                  <div className="todo-content">
                    <input
                      type="checkbox"
                      checked={val.status}
                      onChange={(e) => handleCheck(val._id, e.target.checked)}
                      style={{ scale: "1.5" }}
                    />
                    <div className="todo-text">
                      <h4>{val.task}</h4>
                      <p>{val.description}</p>
                    </div>
                  </div>
                  <div className="todo-action">
                    <MdDelete
                      onClick={() => handleDelete(val._id)}
                      size={35}
                      style={{
                        margin: "0 15px 0 0",
                        padding: "5",
                        backgroundColor: "#ebebeb",
                        borderRadius: "5px",
                        boxShadow: "rgba(100, 100, 111, 0.3) 0px 7px 29px 0px",
                      }}
                    />
                    <MdEdit
                      size={35}
                      style={{
                        padding: "5",
                        backgroundColor: "#ebebeb",
                        borderRadius: "5px",
                        boxShadow: "rgba(100, 100, 111, 0.3) 0px 7px 29px 0px",
                      }}
                    />
                  </div>
                </li>
              );
            })}
          </ul>
        </Box>
        <div style={{ textAlign: "center", margin: "50px 0" }}>
          <h1>Completed </h1>
        </div>
        <Box
          sx={{
            backgroundColor: "#ecedf6",
            padding: "20px",
            borderRadius: "10px",
            height: "450px",
            overflow: "auto",
            border: "1px solid black",
            width: "100%",
          }}
        >
          <ul>
            {CompletedTask?.map((val, ind) => {
              return (
                <li className="todo-box" key={ind}>
                  <div className="todo-content">
                    <input
                      type="checkbox"
                      checked={val.status}
                      onChange={(e) => handleCheck(val._id, e.target.checked)}
                      style={{ scale: "1.5" }}
                    />
                    <div className="todo-text">
                      <h4>{val.task}</h4>
                      <p>{val.description}</p>
                    </div>
                  </div>
                  <div className="todo-action">
                    <MdDelete
                      onClick={() => handleDelete(val._id)}
                      size={35}
                      style={{
                        margin: "0 15px 0 0",
                        padding: "5",
                        backgroundColor: "#ebebeb",
                        borderRadius: "5px",
                        boxShadow: "rgba(100, 100, 111, 0.3) 0px 7px 29px 0px",
                      }}
                    />
                    <MdEdit
                      size={35}
                      style={{
                        padding: "5",
                        backgroundColor: "#ebebeb",
                        borderRadius: "5px",
                        boxShadow: "rgba(100, 100, 111, 0.3) 0px 7px 29px 0px",
                      }}
                    />
                  </div>
                </li>
              );
            })}
          </ul>
        </Box>
        <div style={{ textAlign: "center", margin: "50px 0" }}>
          <h1>Uncompleted</h1>
        </div>
        <Box
          sx={{
            backgroundColor: "#ecedf6",
            padding: "20px",
            borderRadius: "10px",
            height: "450px",
            overflow: "auto",
            border: "1px solid black",
            width: "100%",
          }}
        >
          <ul>
            {UnCompletedTask?.map((val, ind) => {
              return (
                <li className="todo-box" key={ind}>
                  <div className="todo-content">
                    <input
                      type="checkbox"
                      checked={val.status}
                      onChange={(e) => handleCheck(val._id, e.target.checked)}
                      style={{ scale: "1.5" }}
                    />
                    <div className="todo-text">
                      <h4>{val.task}</h4>
                      <p>{val.description}</p>
                    </div>
                  </div>
                  <div className="todo-action">
                    <MdDelete
                      onClick={() => handleDelete(val._id)}
                      size={35}
                      style={{
                        margin: "0 15px 0 0",
                        padding: "5",
                        backgroundColor: "#ebebeb",
                        borderRadius: "5px",
                        boxShadow: "rgba(100, 100, 111, 0.3) 0px 7px 29px 0px",
                      }}
                    />
                    <MdEdit
                      size={35}
                      style={{
                        padding: "5",
                        backgroundColor: "#ebebeb",
                        borderRadius: "5px",
                        boxShadow: "rgba(100, 100, 111, 0.3) 0px 7px 29px 0px",
                      }}
                    />
                  </div>
                </li>
              );
            })}
          </ul>
        </Box>
      </Box>
    </>
  );
}
