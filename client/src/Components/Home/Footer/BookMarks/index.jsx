import React from "react";
import "./style.css";
import useStoryContext from "../../../../hooks/useProductContext";
import Loader from "../../../Loader";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Index() {
  let [innerWidth, setInnerWidth] = useState(window.innerWidth);

  const {
    setIndex,
    setStoryPop,
    setCategorySelected,
    setOuterIndex,
    bData,
    setData,
    setIds,
    setUpvoteCount,
    setIsLiked,
    setCategory,
    setIsBook,
  } = useStoryContext();

  let onClickStorySelected = async (category, story) => {
    setCategory(category);
    await axios
      .get(`${process.env.REACT_APP_HOST}/api/get-bookmarks`)
      .then((res) => {
        setData(res.data.oArr);
        setIds(res.data.ids);
        setUpvoteCount(res.data.upvotesCount);
        setIsLiked(res.data.liked);
        setIsBook(res.data.book);
      })
      .catch((err) => {
        console.log(err);
      });
    for (let i = 0; i < bData.length; i++) {
      if (bData[i] === story) {
        setIndex(0);
        setOuterIndex(i);
      }
    }
    setCategorySelected(category);
    setStoryPop(true);
  };

  useEffect(() => {
    window.addEventListener("resize", () => {
      setInnerWidth(window.innerWidth);
    });
  }, []);

  return (
    <div className="book-footer">
      <h1 className="book-heading">Your Bookmarks</h1>
      <div className="stories-book">
        {bData[0].length === 0 ? (
          <Loader />
        ) : (
          bData.map((story) => (
            <div
              className="a-book-story"
              onClick={() => onClickStorySelected("book", story)}
            >
              <img
                src={`${story[0] ? story[0].i : ""}`}
                alt=""
                className="book-story-img"
              />
              <div className="wrapper-a-story">
                <h1 className="story-heading">{story[0] ? story[0].h : ""}</h1>
                <p className="story-desc">{story[0] ? story[0].d : ""}</p>
              </div>
            </div>
          ))
        )}
      </div>
      {innerWidth > 500 && (
        <div className="wrapper-see-more-btn">
          <button className="see-more">See more</button>
        </div>
      )}
    </div>
  );
}
