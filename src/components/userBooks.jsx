import { useState, useRef, useEffect } from "react";
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
import ReactLoading from "react-loading";
// import { Button, Box } from "@material-ui/core";
// import { db } from "./firebase";
import { collection, query, orderBy, getDocs } from "firebase/firestore";
import { Link } from "react-router-dom";
import EastIcon from "@mui/icons-material/East";

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

const UserBooks = () => {
  const [booksData, setBooksData] = useState([]);
  const [openForm, setOpenForm] = useState(false);
  const [formType, setFormType] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  let tempData = [...booksData];

  const [currentPage, setCurrentPage] = useState(1);
  const resultsPerPage = 10;

  const indexOfLastResult = currentPage * resultsPerPage;
  const indexOfFirstResult = indexOfLastResult - resultsPerPage;
  const currentResults = filteredBooks.slice(
    indexOfFirstResult,
    indexOfLastResult
  );

  const totalPages = Math.ceil(filteredBooks.length / resultsPerPage);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  useEffect(() => {
    setIsLoading(true);
    async function firestoreData() {
      let tempBooks = [];
      try {
        const q2 = query(collection(db, "books"), orderBy("bookId"));
        const querySnapshot2 = await getDocs(q2);
        querySnapshot2.forEach((doc) => {
          tempBooks.push(doc.data());
        });
      } catch (err) {
        console.log(err);
      }
      setIsLoading(false);
      setBooksData(tempBooks);
      setFilteredBooks(tempBooks);
    }
    firestoreData();
  }, []);
  function addFormSubmit(e) {
    e.preventDefault();
    tempData.push({
      //   bookId: e.target.bookId.value,
      title: e.target.title.value,
      author: e.target.author.value,
      issued: e.target.issued.value === "issued",
    });
    setBooksData([...tempData]);
    setOpenForm(false);
  }
  function editFormSubmit(e) {
    e.preventDefault();
    tempData[editIndex].title = e.target.title.value;
    tempData[editIndex].author = e.target.author.value;
    tempData[editIndex].issued = e.target.issued.value === "issued";
    setBooksData([...tempData]);
    setOpenForm(false);
  }
  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };
  const filterBooks = (query) => {
    const filtered = booksData.filter((book) => {
      const { title, author, pubDate, subject } = book;

      // Check if any of the book properties match the search query
      return (
        title.toLowerCase().includes(query.toLowerCase()) ||
        author.toLowerCase().includes(query.toLowerCase()) ||
        pubDate.toLowerCase().includes(query.toLowerCase()) ||
        subject.toLowerCase().includes(query.toLowerCase())
      );
    });

    setFilteredBooks(filtered);
  };

  useEffect(() => {
    // Filter books when searchQuery changes
    filterBooks(searchQuery);
  }, [searchQuery]);

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
                // value={formType === "edit" ? booksData[editIndex].bookId : +booksData[booksData.length - 1].bookId + 1}
              />
              <TextField
                required
                variant="outlined"
                id="title"
                label="Title"
                defaultValue={
                  formType === "edit" ? booksData[editIndex].title : ""
                }
              />
              <TextField
                required
                variant="outlined"
                id="author"
                label="Author"
                defaultValue={
                  formType === "edit" ? booksData[editIndex].author : ""
                }
              />
              <TextField
                required
                variant="outlined"
                id="pubDate"
                label="date"
                defaultValue={
                  formType === "edit" ? booksData[editIndex].pubDate : ""
                }
              />
              <TextField
                required
                variant="outlined"
                id="subject"
                label="sub"
                defaultValue={
                  formType === "edit" ? booksData[editIndex].subject : ""
                }
              />
            </Stack>
          </form>
        </Box>
      </Modal>
    );
  };

  return (
    <Box p={2} ml={2}>
      <Stack
        direction="row"
        spacing={4}
        mb={3}
        alignItems="center"
        justifyContent="space-between"
      >
        <Stack direction="row" alignItems="center">
          <Typography variant="h4">Books</Typography>
          <TextField
            label="Search"
            variant="outlined"
            size="small"
            value={searchQuery}
            onChange={handleSearch}
          />
          {searchQuery && (
            <Typography variant="body2">
              Search Results: {filteredBooks.length}
            </Typography>
          )}
        </Stack>
        <Stack direction="row" alignItems="center">
          <Typography
            variant="outlined"
            component={Link}
            to="/home"
            sx={{ textDecoration: "none" }}
          >
            Back to Home
            <EastIcon sx={{ verticalAlign: "middle", marginLeft: "5px" }} />
          </Typography>
        </Stack>
      </Stack>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead sx={{ background: "#ddd" }}>
            <TableRow>
              <TableCell sx={{ fontSize: "1.1em" }}>Book ID</TableCell>
              <TableCell sx={{ fontSize: "1.1em" }}>Title</TableCell>
              <TableCell sx={{ fontSize: "1.1em" }}>Author</TableCell>
              <TableCell sx={{ fontSize: "1.1em" }}>Published Date</TableCell>
              <TableCell sx={{ fontSize: "1.1em" }}>Subject</TableCell>
            </TableRow>
          </TableHead>
          {filteredBooks.length > 0 && (
            <TableBody>
              {currentResults.map((book, index) => (
                <TableRow
                  key={book.bookId}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {book.bookId}
                  </TableCell>
                  <TableCell>{book.title}</TableCell>
                  <TableCell>{book.author}</TableCell>
                  <TableCell>{book.pubDate}</TableCell>
                  <TableCell>{book.subject}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          )}
        </Table>
      </TableContainer>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {isLoading && (
          <ReactLoading
            type={"bars"}
            color={"#0090da"}
            height={150}
            width={150}
          />
        )}
      </div>
      <Box display="flex" justifyContent="center" mt={2}>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <Button
            key={page}
            onClick={() => handlePageChange(page)}
            variant="contained"
            color="primary"
            style={{ margin: "0.5rem" }}
          >
            {page}
          </Button>
        ))}
      </Box>

      <BookForm />
    </Box>
  );
};

export default UserBooks;
