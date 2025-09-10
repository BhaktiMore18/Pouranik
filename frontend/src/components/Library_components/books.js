import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const useLibraryBooks = (trigger) => {
  const [currentlyReading, setCurrentlyReading] = useState([]);
  const [nextUp, setNextUp] = useState([]);
  const [finished, setFinished] = useState([]);

  useEffect(() => {
    const fetchLibrary = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/library`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();

        // Categorize books based on `category`
        const current = [];
        const upcoming = [];
        const done = [];

        data.books.forEach((book) => {
          if (book.category === "currently-reading") current.push(book);
          else if (book.category === "next-up") upcoming.push(book);
          else if (book.category === "finished") done.push(book);
        });

        setCurrentlyReading(current);
        setNextUp(upcoming);
        setFinished(done);
      // eslint-disable-next-line no-unused-vars
      } catch (error) {
        // console.error("Error fetching books:", error.message);
        toast.error("Failed to fetch books");
      }
    };

    fetchLibrary();
  }, [trigger]);

  return { currentlyReading, nextUp, finished };
};

export default useLibraryBooks;