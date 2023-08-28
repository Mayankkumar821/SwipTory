import React, { useState, useEffect } from "react";
import "./style.css";
import useStoryContext from "../../../../hooks/useProductContext";
import Loader from "../../../Loader";
import axios from "axios";

export default function Index() {
  let [innerWidth, setInnerWidth] = useState(window.innerWidth);
  const {
    setIndex,
    setStoryPop,
    setCategorySelected,
    setOuterIndex,
    sData,
    setData,
    setIds,
    setUpvoteCount,
    setIsLiked,
    setCategory,
    setIsBook,
    setEditStoryId,
    setEditStoryPop,
  } = useStoryContext();

  let onClickStorySelected = async (category, story) => {
    setCategory(category);
    await axios
      .get(`${process.env.REACT_APP_HOST}/api/story-get-stories`, {
        params: {
          user: localStorage.getItem("name"),
        },
      })
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
    for (let i = 0; i < sData.length; i++) {
      if (sData[i] === story) {
        setIndex(0);
        setOuterIndex(i);
      }
    }
    setCategorySelected(category);
    setStoryPop(true);
  };

  let onClickEditStory = async (story) => {
    let index;
    console.log(story);
    for (let i = 0; i < sData.length; i++) {
      if (sData[i] === story) {
        index = i;
      }
    }
    await axios
      .get(`${process.env.REACT_APP_HOST}/api/story-get-stories`, {
        params: {
          user: localStorage.getItem("name"),
        },
      })
      .then((res) => {
        setEditStoryId(res.data.ids[index]);
      })
      .catch((err) => {
        console.log(err);
      });
    setEditStoryPop(true);
  };

  useEffect(() => {
    window.addEventListener("resize", () => {
      setInnerWidth(window.innerWidth);
    });
  }, []);

  return (
    <div className="s-footer">
      <h1 className="s-heading">Your Stories</h1>
      <div className="stories-s">
        {sData[0].length === 0 ? (
          <Loader />
        ) : (
          sData.map((story) => (
            <>
              <>
                <div className="a-s-story">
                  <img
                    src={`${story[0] ? story[0].i : ""}`}
                    alt=""
                    className="s-story-img"
                    onClick={() => onClickStorySelected("story", story)}
                  />
                  <div className="wrapper-a-story">
                    <h1
                      className="story-heading"
                      onClick={() => onClickStorySelected("story", story)}
                    >
                      {story[0] ? story[0].h : ""}
                    </h1>
                    <p
                      className="story-desc"
                      onClick={() => onClickStorySelected("story", story)}
                    >
                      {story[0] ? story[0].d : ""}
                    </p>
                  </div>
                  <div
                    className="s-edit-btn"
                    onClick={() => onClickEditStory(story)}
                  >
                    <img src="edit.png" alt="" className="edit-img" />
                    <h1 className="edit-btn">Edit</h1>
                  </div>
                </div>
              </>
            </>
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
