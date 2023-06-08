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
import { Select, MenuItem } from "@mui/material";
import TableSortLabel from "@mui/material/TableSortLabel";
import { Card, CardContent, CardMedia, Dialog, DialogContent, Grid } from "@mui/material";
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
  const [sortCriteria, setSortCriteria] = useState("title");
  const [sortDirection, setSortDirection] = useState("asc");

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
  const [selectedBook, setSelectedBook] = useState(null);

const handleCardClick = (book) => {
  setSelectedBook(book);
};

const handleCloseDialog = () => {
  setSelectedBook(null);
};
  // useEffect(() => {
  //   // Filter books when searchQuery changes
  //   filterBooks(searchQuery);
  // }, [searchQuery]);
  useEffect(() => {
    const filterBooks = () => {
      const filtered = booksData.filter((book) => {
        const { title, author, pubDate, subject } = book;

        // Check if any of the book properties match the search query
        return (
          title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          author.toLowerCase().includes(searchQuery.toLowerCase()) ||
          pubDate.toLowerCase().includes(searchQuery.toLowerCase()) ||
          subject.toLowerCase().includes(searchQuery.toLowerCase())
        );
      });

      setFilteredBooks(filtered);
    };

    filterBooks();
  }, [booksData, searchQuery]);

  const handleSortCriteriaChange = (event) => {
    setSortCriteria(event.target.value);
  };

  const handleSortDirectionChange = (event) => {
    setSortDirection(event.target.value);
  };

  const sortBooks = () => {
    const sorted = [...filteredBooks].sort((a, b) => {
      const fieldA = a[sortCriteria];
      const fieldB = b[sortCriteria];

      if (fieldA < fieldB) {
        return sortDirection === "asc" ? -1 : 1;
      }
      if (fieldA > fieldB) {
        return sortDirection === "asc" ? 1 : -1;
      }
      return 0;
    });

    setFilteredBooks(sorted);
  };

  useEffect(() => {
    sortBooks();
  }, [sortCriteria, sortDirection]);

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
          <Select
            value={sortCriteria}
            onChange={handleSortCriteriaChange}
            variant="outlined"
            sx={{ marginRight: "8px" }}
          >
            <MenuItem value="title">Title</MenuItem>
            <MenuItem value="author">Author</MenuItem>
            <MenuItem value="pubDate">Publish Date</MenuItem>
            <MenuItem value="subject">Subject</MenuItem>
          </Select>
          <Select
            value={sortDirection}
            onChange={handleSortDirectionChange}
            variant="outlined"
          >
            <MenuItem value="asc">Ascending</MenuItem>
            <MenuItem value="desc">Descending</MenuItem>
          </Select>
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

      {filteredBooks.length > 0 && (
  <Grid container spacing={2} justifyContent="center">
    {currentResults.map((book, index) => (
      <Grid item xs={12} sm={6} md={4} key={book.bookId}>
        <Card sx={{ maxWidth: 345 }} onClick={() => handleCardClick(book)}>
          <CardMedia
            component="img"
            height="140"
            image={book.imgpath} // Replace with your actual image URL or import the image file
            alt="Dummy Image"
             sx={{ objectFit: 'contain' }}
          />
          <CardContent sx={{ textAlign: 'center' }}>
            {/* <Typography variant="h6" component="div">
              Book ID: {book.bookId}
            </Typography> */}
            <Typography variant="h6" color="text.secondary">
              Title: {book.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Author: {book.author}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Published Date: {book.pubDate}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Subject: {book.subject}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    ))}
  </Grid>
)}

<Dialog open={selectedBook !== null} onClose={handleCloseDialog}>
  <DialogContent>
    {selectedBook && (
      <div>
        <Typography variant="h6" component="div">
          Book ID: {selectedBook.bookId}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Description: {selectedBook.description}
        </Typography>
      </div>
    )}
  </DialogContent>
</Dialog>
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

      {/* <BookForm /> */}
    </Box>
  );
};

export default UserBooks;
