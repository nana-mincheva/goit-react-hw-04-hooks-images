import React, { useEffect, useState } from "react";
import "./App.css";
import { ToastContainer } from "react-toastify";

import Modal from "./components/Modal";
import Searchbar from "./components/Searchbar";
import ImageGallery from "./components/ImageGallery";
import Button from "./components/Button";
import { fetchImages, PER_PAGE } from "./services/fetchApi";
import Spinner from "./components/Loader";

export default function App() {
  const [status, setStatus] = useState("idle");
  const [output, setOutput] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [error, setError] = useState(false);
  const [hideLoadMoreBtn, setHideLoadMoreBtn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!searchQuery) {
      return;
    }

    getImages();
  }, [searchQuery, page]);

  const getImages = () => {
    setIsLoading(true);
    fetchImages(searchQuery, page)
      .then(({ hits }) => {
        if (hits.length === 0) {
          setStatus("rejected");
          return;
        }
        if (hits.length < PER_PAGE) {
          toggleLoadMoreBtn();
        }
        setOutput([...output, ...hits]);
        handleScroll();
        setStatus("resolved");
      })
      .catch((error) => setError(error))
      .finally(() => setIsLoading(false));
  };

  const handleScroll = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  };

  const showBtn =
    output.length > 0 && status !== "rejected" && !hideLoadMoreBtn;

  const toggleLoadMoreBtn = () => {
    setHideLoadMoreBtn(!hideLoadMoreBtn);
  };

  const handleFormSubmit = (searchQuery) => {
    setSearchQuery(searchQuery);
    setPage(1);
    setOutput([]);
    setHideLoadMoreBtn(false);
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const modalContentShow = (itemId) => {
    const element = output.find(({ id }) => id === itemId);
    setModalContent(element.largeImageURL);
  };

  const handleLoadMoreBtnClick = () => {
    setPage((prev) => prev + 1);
  };

  let result = null;
  if (status === "idle") {
    result = (
      <div className="TextBlock">
        <h2>Enter search query</h2>
      </div>
    );
  }

  if (status === "pending") {
    result = (
      <div className="Wrapper">
        <Spinner />
      </div>
    );
  }

  if (status === "rejected") {
    result = (
      <div className="TextBlock">
        <h2>Nothing was found on your query. Please try again</h2>
      </div>
    );
  }

  if (status === "resolved") {
    result = (
      <ImageGallery
        images={output}
        onClick={toggleModal}
        onItemClick={modalContentShow}
      />
    );
  }

  return (
    <div className="App">
      <Searchbar onSubmit={handleFormSubmit} />
      {result}
      {isLoading && (
        <div className="Wrapper">
          <Spinner />
        </div>
      )}
      {showBtn && (
        <div className="Wrapper">
          <Button onLoadMoreClick={handleLoadMoreBtnClick} />
        </div>
      )}
      {showModal && <Modal content={modalContent} onClose={toggleModal} />}
      <ToastContainer autoClose={5000} position="top-center" />
    </div>
  );
}