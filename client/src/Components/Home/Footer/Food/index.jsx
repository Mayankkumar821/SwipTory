import React, {useState,useEffect} from "react";
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
    fData,
    setData,
    setIds,
    setUpvoteCount,
    setIsLiked,
    setCategory,
    setIsBook
  } = useStoryContext();

  let onClickStorySelected = async (category, story) => {
    setCategory(category);
    await axios
      .get(`${process.env.REACT_APP_HOST}/api/food-get-stories`)
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
    for (let i = 0; i < fData.length; i++) {
      if (fData[i] === story) {
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
    <div className="food-footer">
      <h1 className="food-heading">Top Stories About food</h1>
      <div className="stories-food">
        {fData[0].length === 0 ? (
          <Loader />
        ) : (
          fData.map((story) => (
            <div
              className="a-food-story"
              onClick={() => onClickStorySelected("food", story)}
            >
              <img
                src={`${story[0] ? story[0].i : ""}`}
                alt=""
                className="food-story-img"
              />
              <div className="wrapper-a-story">
                <h1 className="story-heading">{story[0] ? story[0].h : ""}</h1>
                <p className="story-desc">{story[0] ? story[0].d : ""}</p>
              </div>
            </div>
          ))
        )}
      </div>
      {innerWidth < 500 && <div className="wrapper-see-more-btn">
        <button className="see-more">See more</button>
      </div>}
    </div>
  );
}
