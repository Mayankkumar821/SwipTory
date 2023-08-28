import React, {useState,useEffect} from "react";
import "./style.css";
import useStoryContext from "../../../../hooks/useProductContext";
import Loader from "../../../Loader";
import axios from "axios";

export default function Index() {
  let [innerWidth, setInnerWidth] = useState(window.innerWidth);

  const {
    hData,
    setIndex,
    setStoryPop,
    setCategorySelected,
    setOuterIndex,
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
      .get(`${process.env.REACT_APP_HOST}/api/health-get-stories`)
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
    for (let i = 0; i < hData.length; i++) {
      if (hData[i] === story) {
        setIndex(0);
        setOuterIndex(i);
      }
    }
    setData(hData);
    setCategorySelected(category);
    setStoryPop(true);
  };
  useEffect(() => {
    window.addEventListener("resize", () => {
      setInnerWidth(window.innerWidth);
    });
  }, []);
  return (
    <div className="health-footer">
      <h1 className="health-heading">Top Stories About Health & Fitness</h1>
      <div className="stories-health">
        {hData[0].length === 0 ? (
          <Loader />
        ) : (
          hData.map((story) => (
            <div
              className="a-health-story"
              onClick={() => onClickStorySelected("health", story)}
            >
              <img
                src={`${story[0] ? story[0].i : ""}`}
                alt=""
                className="health-story-img"
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
