import React, { useEffect, useState } from "react";
import useStoryContext from "../../../../hooks/useProductContext";
import "./style.css";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Index() {
  let [innerWidth, setInnerWidth] = useState(window.innerWidth);
  let naviagte = useNavigate();
  let {
    data,
    index,
    setIndex,
    setStoryPop,
    outerIndex,
    setOuterIndex,
    clickLike,
    setClickLike,
    clickBook,
    setClickBook,
    loggedIn,
    ids,
    upvoteCount,
    isLiked,
    setSignPop,
    homeRef,
    navbarRef,
    footerRef,
    bannerRef,
    category,
    isBook,
  } = useStoryContext();

  useEffect(() => {
    let w =
      document.getElementsByClassName("indicators")[0].offsetWidth /
      data[outerIndex].length;
    w = w - 10;
    document.querySelectorAll(".bar").forEach((box) => {
      box.style.width = `${w / 10}rem`;
      box.style.height = `0.39rem`;
      box.style.background = "rgba(217, 217, 217, 0.50)";
      document.querySelectorAll(".bar")[index].style.background = "#FFF";
    });

    if (innerWidth < 500){
      const time = setInterval(() => {
        if (
          index === data[outerIndex].length - 1 &&
          outerIndex !== data.length - 1
        ) {
          setOuterIndex((outerIndex + 1) % data.length);
          setIndex(0);
          setClickLike(false);
          setClickBook(false);
        } else if (
          index === data[outerIndex].length - 1 &&
          outerIndex === data.length - 1
        ) {
          setOuterIndex(data.length - 1);
          setIndex(data[outerIndex].length - 1);
          setStoryPop(false);
          naviagte(0);
        } else {
          setIndex((index + 1) % data[outerIndex].length);
        }
      },1000);
      return () => clearInterval(time);
    }
    else{
      const time = setInterval(() => {
        if (
          index === data[outerIndex].length - 1 &&
          outerIndex !== data.length - 1
        ) {
          setOuterIndex((outerIndex + 1) % data.length);
          setIndex(0);
          setClickLike(false);
          setClickBook(false);
        } else if (
          index === data[outerIndex].length - 1 &&
          outerIndex === data.length - 1
        ) {
          setOuterIndex(data.length - 1);
          setIndex(data[outerIndex].length - 1);
          setStoryPop(false);
          naviagte(0);
        } else {
          setIndex((index + 1) % data[outerIndex].length);
        }
      },2000);
      return () => clearInterval(time);
    }
  }, [
    innerWidth,
    upvoteCount,
    outerIndex,
    data,
    index,
    setOuterIndex,
    setIndex,
    setStoryPop,
    naviagte,
    setClickLike,
    setClickBook,
  ]);

  let updateLikeAndBook = async (i, id) => {
    await axios
      .get(`${process.env.REACT_APP_HOST}/api/update-like`, {
        params: {
          id: id,
          upvote: upvoteCount[i],
          like: isLiked[i],
          category: category,
          book: isBook[i],
        },
      })
      .then(() => {
        //done-updating
      })
      .catch((err) => {
        console.log(err);
      });
  };

  let saveStory = async (story, book, like, upvote) => {
    
    book = true;
    await axios
      .get(`${process.env.REACT_APP_HOST}/api/save-bookmark`, {
        params: {
          story: story,
          book: book,
          like: like,
          upvote: upvote,
        },
      })
      .then(() => {
        //added
      })
      .catch((err) => {
        console.log(err);
      });
  };

  let deleteBookMark = async (id) => {
    await axios
      .get(`${process.env.REACT_APP_HOST}/api/delete-bookmark`, {
        params: {
          id: id
        },
      })
      .then(() => {
        //deleted
      })
      .catch((err) => {
        console.log(err);
      });
  }

  let onClickLike = async (i, id) => {
    // console.log(i, id, upvoteCount[i]);
    if (loggedIn === false) {
      setStoryPop(false);
      setSignPop(true);
      homeRef.current.style.backgroundColor = "rgba(0, 0, 0, 0.9)";
      bannerRef.current.style.zIndex = -1;
      footerRef.current.style.zIndex = -1;
      navbarRef.current.style.zIndex = -1;
    }
    if (isLiked[i] === true) {
      upvoteCount[i] = upvoteCount[i] - 1;
      setClickLike(false);
      isLiked[i] = false;
      setOuterIndex(i);
    } else if (isLiked[i] === false) {
      upvoteCount[i] = upvoteCount[i] + 1;
      setClickLike(true);
      isLiked[i] = true;
      setOuterIndex(i);
    }

    updateLikeAndBook(i, id);
  };

  let onClickBook = (i, id) => {
    if (loggedIn === false) {
      setStoryPop(false);
      setSignPop(true);
      homeRef.current.style.backgroundColor = "rgba(0, 0, 0, 0.9)";
      bannerRef.current.style.zIndex = -1;
      footerRef.current.style.zIndex = -1;
      navbarRef.current.style.zIndex = -1;
    }
    if (isBook[i] === true) {
      setClickBook(false);
      isBook[i] = false;
      setOuterIndex(i);
      if (category === "book"){
        deleteBookMark(ids[i]);
      }
    } else if (isBook[i] === false) {
      saveStory(data[i], isBook[i], isLiked[i], upvoteCount[i]);
      setClickBook(true);
      isBook[i] = true;
      setOuterIndex(i);
    }
    updateLikeAndBook(i, id);
  };

  let onClickSendCopy = async () => {
    await navigator.clipboard.writeText(window.location.href);

    toast.success("Link Copied!", {
      position: "top-right",
      style: {
        width: "20rem",
        height: "5rem",
        fontSize: "2rem",
      },
    });
  };

  let onClickCross = () => {
    setIndex(0);
    setOuterIndex(0);
    setStoryPop(false);
    naviagte(0);
  };

  useEffect(() => {
    window.addEventListener("resize", () => {
      setInnerWidth(window.innerWidth);
    });
  }, []);
  return (
    <div className="prev-story-popup">
      <img
        src="prev.png"
        alt=""
        className="prev-btn"
        onClick={() => {
          if (index === 0 && outerIndex === 0) {
            setOuterIndex(0);
            setIndex(0);
          } else if (index === 0 && outerIndex !== 0) {
            setOuterIndex(outerIndex - 1);
            setIndex(data[outerIndex].length - 1);
            setClickLike(false);
            setClickBook(false);
          } else {
            setIndex((index - 1) % data[outerIndex].length);
          }
        }}
      />
      <div className="slider">
        <div className="slider-items">
          <div className="indicators">
            {data[outerIndex] &&
              data[outerIndex].map((datum) => <div className="bar"></div>)}
          </div>
          <div className="cross-send-btn">
            <img
              src="cross.png"
              alt=""
              className="cross-prev"
              onClick={() => onClickCross()}
            />
            <img
              src="send.png"
              alt=""
              className="send-prev"
              onClick={() => onClickSendCopy()}
            />
            <Toaster />
          </div>
          <div className="image-and-heading">
            <img
              src={`${
                data[outerIndex][index] ? data[outerIndex][index].i : ""
              }`}
              alt=""
              className="prev-food-story-img"
            />
            <div className="prev-wrapper-a-story">
              <h1 className="prev-story-heading">
                {data[outerIndex][index] ? data[outerIndex][index].h : ""}
              </h1>
              <p className="prev-story-desc">
                {data[outerIndex][index] ? data[outerIndex][index].d : ""}
              </p>
            </div>
          </div>
          <div className="prev-likes-bookmark">
            {clickBook === false && isBook[outerIndex] === false && (
              <img
                src="book.png"
                alt=""
                className="book-prev"
                onClick={() => onClickBook(outerIndex, ids[outerIndex])}
              />
            )}

            {(clickBook || isBook[outerIndex] === true) && (
              <img
                src="clicked-book.png"
                alt=""
                className="book-prev clickedBook"
                onClick={() => onClickBook(outerIndex, ids[outerIndex])}
              />
            )}
            <div className="like-count">
              {clickLike === false && isLiked[outerIndex] === false && (
                <img
                  src="like.png"
                  alt=""
                  className="like-prev"
                  onClick={() => onClickLike(outerIndex, ids[outerIndex])}
                />
              )}
              {(clickLike || isLiked[outerIndex] === true) && (
                <img
                  src="clicked-like.png"
                  alt=""
                  className="like-prev"
                  onClick={() => onClickLike(outerIndex, ids[outerIndex])}
                />
              )}
              <p className="upvote-count">{upvoteCount[outerIndex]}</p>
            </div>
          </div>
        </div>
      </div>

      <img
        src="next.png"
        alt=""
        className="next-btn"
        onClick={() => {
          if (
            index === data[outerIndex].length - 1 &&
            outerIndex !== data.length - 1
          ) {
            setOuterIndex((outerIndex + 1) % data.length);
            setIndex(0);
            setClickLike(false);
            setClickBook(false);
          } else if (
            index === data[outerIndex].length - 1 &&
            outerIndex === data.length - 1
          ) {
            setOuterIndex(data.length - 1);
            setIndex(data[outerIndex].length - 1);
            setStoryPop(false);
            naviagte(0);
          } else {
            setIndex((index + 1) % data[outerIndex].length);
          }
        }}
      />
    </div>
  );
}
