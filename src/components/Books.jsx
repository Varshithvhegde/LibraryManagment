import { useState } from "react";
import {
  Button,
  FormControlLabel,
  FormLabel,
  IconButton,
  Modal,
  Radio,
  RadioGroup,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { Box, Stack } from "@mui/system";
import AddIcon from "@mui/icons-material/Add";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import "../index.css";
const formStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  height: 600,
  bgcolor: "white",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const Books = ({ booksData, setBooksData }) => {
  const [openForm, setOpenForm] = useState(false);
  const [formType, setFormType] = useState(null);
  const [editIndex, setEditIndex] = useState(null);

  const [bookId, setBookId] = useState(0);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [pubDate, setPubDate] = useState("");
  const [subject, setSubject] = useState("");
  const [issued, setIssued] = useState("issued");

  let tempData = [...booksData];

  const addFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const bookRef = collection(db, "books");
      await addDoc(bookId, title, author, pubDate, subject, issued);
      console.log("Book added successfully!");
    } catch (error) {
      console.error("Error adding book:", error);
    }
    setOpenForm(false);
  };
  function editFormSubmit(e) {
    e.preventDefault();
    tempData[editIndex].title = e.target.title.value;
    tempData[editIndex].author = e.target.author.value;
    tempData[editIndex].issued = e.target.issued.value === "issued";
    // setBooksData([...tempData]);

    setOpenForm(false);
  }

  const editBtnHandler = (index) => {
    setFormType("edit");
    setEditIndex(index);
    setOpenForm(true);
  };
  const addBtntHandler = () => {
    setFormType("add");
    setOpenForm(true);
  };

  const deleteHandler = (index) => {
    let confirmBool = window.confirm(
      `Are you sure you want to delete "${booksData[index].title}"?`
    );
    if (confirmBool) {
      tempData.splice(index, 1);
      setBooksData([...tempData]);
    }
  };
  const handleRadioChange = (event) => {
    setIssued(event.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const bookRef = collection(db, "books");
      await addDoc(bookRef, {
        bookId,
        title,
        author,
        pubDate,
        subject,
        issued
      });

      // Clear the form after successful submission
      setBookId(0);
      setTitle("");
      setAuthor("");
      setPubDate("");
      setSubject("");

      console.log("Book added successfully!");
    } catch (error) {
      console.error("Error adding book:", error);
    }
  };
  const BookForm = () => {
    return (
      <Modal
        open={openForm}
        onClose={() => {
          setOpenForm(false);
        }}
      >
        <Box sx={formStyle}>
          <Typography variant="h4" textAlign="center">
            {formType === "edit" ? "Edit" : "Add"} Book
          </Typography>
          <form
            onSubmit={formType === "edit" ? editFormSubmit : addFormSubmit}
            style={{ height: "100%" }}
            autoComplete="off"
          >
            <Stack
              height={"100%"}
              p={3}
              alignItems="space-center"
              justifyContent="space-around"
            >
              <TextField
                disabled
                variant="outlined"
                label="Book ID"
                id="bookId"
                onChange={setBookId(booksData[booksData.length - 1].bookId + 1)}
                value={
                  formType === "edit"
                    ? booksData[editIndex].bookId
                    : +booksData[booksData.length - 1].bookId + 1
                }
              />
              <TextField
                required
                variant="outlined"
                id="title"
                label="Title"
                onChange={(e) => setTitle(e.target.value)}
                defaultValue={
                  formType === "edit" ? booksData[editIndex].title : ""
                }
                value={title}
              />
              <TextField
                required
                variant="outlined"
                id="author"
                label="Author"
                onChange={(e) => setAuthor(e.target.value)}
                value={author}
                defaultValue={
                  formType === "edit" ? booksData[editIndex].author : ""
                }
              />
              <TextField
                required
                variant="outlined"
                id="PublishedDate"
                label="Published Date"
                onChange={(e) => setPubDate(e.target.value)}
                value={pubDate}
                defaultValue={
                  formType === "edit" ? booksData[editIndex].pubDate : ""
                }
              />
              <TextField
                required
                variant="outlined"
                id="Subject"
                label="Subject"
                onChange={(e) => setSubject(e.target.value)}
                value={subject}
                defaultValue={
                  formType === "edit" ? booksData[editIndex].subject : ""
                }
              />
              <Stack direction="row" alignItems="center" gap={2}>
                <FormLabel>Status:</FormLabel>
                <RadioGroup
                  row
                  defaultValue={issued}
                  name="issued"
                  onChange={handleRadioChange}
                >
                  <FormControlLabel
                    value="available"
                    control={<Radio />}
                    label="Available"
                  />
                  <FormControlLabel
                    value="issued"
                    control={<Radio />}
                    label="Issued"
                  />
                </RadioGroup>
              </Stack>
              <Button variant="contained" color="success" type="submit">
                {formType === "edit" ? "Update Book" : "Add Book"}
              </Button>
              <Button variant="outlined" onClick={() => setOpenForm(false)}>
                Cancel
              </Button>
            </Stack>
          </form>
        </Box>
        {/* <form onSubmit={handleSubmit} className="modal-form">
          <label>
            Book ID:
            <input
              type="text"
              value={bookId}
              onChange={(e) => setBookId(e.target.value)}
            />
          </label>
          <br />
          <label>
            Title:
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </label>
          <br />
          <label>
            Author:
            <input
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
            />
          </label>
          <br />
          <label>
            Publication Date:
            <input
              type="text"
              value={pubDate}
              onChange={(e) => setPubDate(e.target.value)}
            />
          </label>
          <br />
          <label>
            Subject:
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
          </label>
          <br />
          <button type="submit">Add Book</button>
        </form> */}
      </Modal>
    );
  };

  return (
    <Box p={2} ml={2}>
      <Stack direction="row" spacing={4} mb={3}>
        <Typography variant="h4">Books</Typography>
        <Button
          variant="contained"
          color="success"
          startIcon={<AddIcon />}
          onClick={addBtntHandler}
        >
          Add new book
        </Button>
      </Stack>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead sx={{ background: "#ddd" }}>
            <TableRow>
              <TableCell sx={{ fontSize: "1.1em" }}>Book ID</TableCell>
              <TableCell sx={{ fontSize: "1.1em" }}>Title</TableCell>
              <TableCell sx={{ fontSize: "1.1em" }}>Author</TableCell>
              <TableCell sx={{ fontSize: "1.1em" }}>Status</TableCell>
              <TableCell sx={{ fontSize: "1.1em" }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          {booksData.length > 0 && (
            <TableBody>
              {booksData.map((book, index) => (
                <TableRow
                  key={book.bookId}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {book.bookId}
                  </TableCell>
                  <TableCell>{book.title}</TableCell>
                  <TableCell>{book.author}</TableCell>
                  <TableCell
                    sx={book.issued ? { color: "red" } : { color: "green" }}
                  >
                    {book.issued ? "Issued" : "Available"}
                  </TableCell>
                  <TableCell>
                    <Tooltip title="Edit">
                      <IconButton
                        aria-label="Edit"
                        color="warning"
                        onClick={() => editBtnHandler(index)}
                      >
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <IconButton
                        aria-label="Delete"
                        color="error"
                        onClick={() => deleteHandler(index)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          )}
        </Table>
      </TableContainer>

      <BookForm />
    </Box>
  );
};

export default Books;
