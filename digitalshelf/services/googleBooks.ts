import axios from "axios";

const GOOGLE_BOOKS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_BOOKS_API_KEY;
const GOOGLE_BOOKS_BASE_URL = "https://www.googleapis.com/books/v1";

const googleBooks = axios.create({
  baseURL: GOOGLE_BOOKS_BASE_URL,
  params: {
    key: GOOGLE_BOOKS_API_KEY,
  },
});

export default googleBooks;