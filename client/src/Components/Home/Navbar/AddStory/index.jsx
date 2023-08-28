import React, { useState, useEffect } from "react";
import "./style.css";
import useStoryContext from "../../../../hooks/useProductContext";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function Index() {
  let [innerWidth, setInnerWidth] = useState(window.innerWidth);
  let navigate = useNavigate();
  const {
    addStoryIndex,
    setAddStoryIndex,
    setAddStoryPop,
    addStoryPop,
    addStoryArr,
    setAddStoryArr,
    cat1,
    setCat1,
    h_1,
    setH_1,
    h_2,
    setH_2,
    h_3,
    setH_3,
    h_4,
    setH_4,
    h_5,
    setH_5,
    h_6,
    setH_6,
    d_1,
    setD_1,
    d_2,
    setD_2,
    d_3,
    setD_3,
    d_4,
    setD_4,
    d_5,
    setD_5,
    d_6,
    setD_6,
    i_1,
    setI_1,
    i_2,
    setI_2,
    i_3,
    setI_3,
    i_4,
    setI_4,
    i_5,
    setI_5,
    i_6,
    setI_6,
  } = useStoryContext();

  let onClickClosePop = () => {
    setAddStoryPop(!addStoryPop);
    navigate(0);
  };
  let onClickSelectSlide = (index) => {
    setAddStoryIndex(index);
  };
  let onClickAddSlide = (index) => {
    if (index <= 6) {
      setAddStoryArr([...addStoryArr, index]);
      setAddStoryIndex(index);
    }
  };
  let onClickDeleteSlide = (index) => {
    setAddStoryArr((oldValues) => {
      return oldValues.filter((skill) => skill !== index);
    });
  };
  let onClickNextSlide = () => {
    if (addStoryIndex === 3 && addStoryArr.length === 0) {
      setAddStoryIndex(1);
    } else if (addStoryIndex === addStoryArr.length + 3) {
      setAddStoryIndex(1);
    } else if (addStoryIndex === 6) {
      setAddStoryIndex(1);
    } else {
      setAddStoryIndex(addStoryIndex + 1);
    }
  };
  let onClickPreviousSlide = () => {
    if (addStoryIndex === 1 && addStoryArr.length === 0) {
      setAddStoryIndex(3);
    } else if (addStoryIndex === 1 && addStoryArr.length !== 0) {
      setAddStoryIndex(addStoryArr.length + 3);
    } else {
      setAddStoryIndex(addStoryIndex - 1);
    }
  };

  let checkFilledOrNot = (category, heading, desc, image) => {
    let len = 0;
    if (
      category &&
      heading[0] &&
      heading[1] &&
      heading[2] &&
      desc[0] &&
      desc[1] &&
      desc[2] &&
      image[0] &&
      image[1] &&
      image[2]
    ) {
      len = 3;
      if (heading[3] && desc[3] && image[3]) {
        len++;
        if (heading[4] && desc[4] && image[4]) {
          len++;
          if (heading[5] && desc[5] && image[5]) {
            len++;
          }
        }
      }
    }

    return len;
  };

  let handleSubmit = async (e) => {
    e.preventDefault();
    let category = cat1;
    let heading = [h_1, h_2, h_3, h_5, h_6];
    let desc = [d_1, d_2, d_3, d_4, d_5, d_6];
    let image = [i_1, i_2, i_3, i_4, i_5, i_6];

    let len = checkFilledOrNot(category, heading, desc, image);

    if (len >= 3) {
      console.log("called");
      await axios
        .get(`${process.env.REACT_APP_HOST}/api/check`, {
          params: {
            category: cat1,
            heading: [h_1, h_2, h_3, h_4, h_5, h_6],
            desc: [d_1, d_2, d_3, d_4, d_5, d_6],
            image: [i_1, i_2, i_3, i_4, i_5, i_6],
            user: localStorage.getItem("name"),
          },
        })
        .then((res) => {
          if (innerWidth > 500) {
            toast.success("Congrats, Story Added :)", {
              position: "top-right",
              style: {
                width: "20rem",
                height: "5rem",
                fontSize: "2rem",
              },
            });
          } else {
            toast.success("Congrats, Story Added :)", {
              position: "top-center",
              style: {
                width: "25rem",
                height: "7rem",
                fontSize: "1.5rem",
              },
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      if (innerWidth > 500) {
        toast.error("Enter Valid details or Please fill atleast 3 slides!", {
          position: "top-right",
          style: {
            width: "25rem",
            height: "8rem",
            fontSize: "2rem",
          },
        });
      } else {
        toast.error("Enter Valid details or Please fill atleast 3 slides!", {
          position: "top-center",
          style: {
            width: "25rem",
            height: "7rem",
            fontSize: "1.5rem",
          },
        });
      }
    }
  };
  useEffect(() => {
    window.addEventListener("resize", () => {
      setInnerWidth(window.innerWidth);
    });
  }, []);
  return (
    <div className="add-story-pop">
      <Toaster />
      {innerWidth < 500 && (
        <h1 className="mb-heading-add-story">Add story to feed</h1>
      )}
      <div className="add-story-wrapper">
        <div className="close-caption">
          <img
            src="close.png"
            alt=""
            className="close-add-story"
            onClick={() => onClickClosePop()}
          />
          {innerWidth > 500 && (
            <p className="caption-add-story">Add upto 6 slides </p>
          )}
        </div>
        <div className="slides-view">
          <div
            className="a-slide-number"
            onClick={() => onClickSelectSlide(1)}
            style={{
              border: 1 === addStoryIndex ? ".2rem solid #73ABFF" : "none",
            }}
          >
            <p className="slide-number-add-story">Slide 1</p>
          </div>
          <div
            className="a-slide-number"
            onClick={() => onClickSelectSlide(2)}
            style={{
              border: 2 === addStoryIndex ? ".2rem solid #73ABFF" : "none",
            }}
          >
            <p className="slide-number-add-story">Slide 2</p>
          </div>
          <div
            className="a-slide-number"
            onClick={() => onClickSelectSlide(3)}
            style={{
              border: 3 === addStoryIndex ? ".2rem solid #73ABFF" : "none",
            }}
          >
            <p className="slide-number-add-story">Slide 3</p>
          </div>
          {addStoryArr.map((slide) => (
            <div
              className="a-slide-number"
              onClick={() => onClickSelectSlide(slide)}
              style={{
                border:
                  slide === addStoryIndex ? ".2rem solid #73ABFF" : "none",
              }}
            >
              <p className="slide-number-add-story">Slide {slide}</p>
              <img
                src="close.png"
                alt=""
                className="close-slide-view"
                onClick={() => onClickDeleteSlide(slide)}
              />
            </div>
          ))}
          {addStoryArr.length < 3 && (
            <div
              className="add-slide-number"
              onClick={() => onClickAddSlide(addStoryArr.length + 4)}
            >
              <p className="slide-number-add-story">Add +</p>
            </div>
          )}
        </div>
        <div className="form-add-story">
          <form
            className="mb-add-form"
            // action={`${process.env.REACT_APP_HOST}/api/add-story-category`}
            method=""
            action=""
            onSubmit={handleSubmit}
          >
            {addStoryIndex === 1 && (
              <>
                {innerWidth > 500 && (
                  <table>
                    <tbody>
                      <tr>
                        <td className="label-caption">Heading :</td>
                        <td>
                          <input
                            type="text"
                            name="s1_h"
                            className="heading"
                            placeholder="Your heading"
                            value={h_1}
                            onChange={(e) => setH_1(e.target.value)}
                            required
                          />
                        </td>
                      </tr>
                      <tr>
                        <td className="label-caption">Description :</td>
                        <td>
                          <textarea
                            name="s1_d"
                            className="desc"
                            placeholder="Story Description"
                            value={d_1}
                            onChange={(e) => setD_1(e.target.value)}
                            required
                          ></textarea>
                        </td>
                      </tr>
                      <tr>
                        <td className="label-caption">Image :</td>
                        <td>
                          <input
                            type="text"
                            name="s1_i"
                            className="image-url"
                            placeholder="Add Image url"
                            value={i_1}
                            onChange={(e) => setI_1(e.target.value)}
                            required
                          />
                        </td>
                      </tr>
                      <tr>
                        <td className="label-caption">Category :</td>
                        <td>
                          <select
                            required
                            value={cat1}
                            name="category"
                            className="category"
                            onChange={(e) => setCat1(e.target.value)}
                          >
                            <option value="" disabled selected>
                              Select category
                            </option>
                            <option value="food">Food</option>
                            <option value="health">Health & Fitness</option>
                            <option value="travel">Travel</option>
                            <option value="movie">Movie</option>
                            <option value="education">Education</option>
                          </select>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                )}
                {innerWidth < 500 && (
                  <div className="mb-form-element">
                    <h1 className="label-caption">Heading :</h1>
                    <input
                      type="text"
                      name="s1_h"
                      className="heading"
                      placeholder="Your heading"
                      value={h_1}
                      onChange={(e) => setH_1(e.target.value)}
                      required
                    />
                    <h1 className="label-caption">Description :</h1>
                    <textarea
                      name="s1_d"
                      className="desc"
                      placeholder="Story Description"
                      value={d_1}
                      onChange={(e) => setD_1(e.target.value)}
                      required
                    ></textarea>
                    <h1 className="label-caption">Image :</h1>
                    <input
                      type="text"
                      name="s1_i"
                      className="image-url"
                      placeholder="Add Image url"
                      value={i_1}
                      onChange={(e) => setI_1(e.target.value)}
                      required
                    />
                    <h1 className="label-caption">Category :</h1>
                    <select
                      required
                      value={cat1}
                      name="category"
                      className="category"
                      onChange={(e) => setCat1(e.target.value)}
                    >
                      <option value="" disabled selected>
                        Select category
                      </option>
                      <option value="food">Food</option>
                      <option value="health">Health & Fitness</option>
                      <option value="travel">Travel</option>
                      <option value="movie">Movie</option>
                      <option value="education">Education</option>
                    </select>
                  </div>
                )}
              </>
            )}
            {addStoryIndex === 2 && (
              <>
                {innerWidth > 500 && (
                  <table>
                    <tbody>
                      <tr>
                        <td className="label-caption">Heading :</td>
                        <td>
                          <input
                            type="text"
                            name="s2_h"
                            className="heading"
                            placeholder="Your heading"
                            value={h_2}
                            onChange={(e) => setH_2(e.target.value)}
                            required
                          />
                        </td>
                      </tr>
                      <tr>
                        <td className="label-caption">Description :</td>
                        <td>
                          <textarea
                            name="s2_d"
                            className="desc"
                            placeholder="Story Description"
                            value={d_2}
                            onChange={(e) => setD_2(e.target.value)}
                            required
                          ></textarea>
                        </td>
                      </tr>
                      <tr>
                        <td className="label-caption">Image :</td>
                        <td>
                          <input
                            type="text"
                            name="s2_i"
                            className="image-url"
                            placeholder="Add Image url"
                            value={i_2}
                            onChange={(e) => setI_2(e.target.value)}
                            required
                          />
                        </td>
                      </tr>
                      <tr>
                        <td className="label-caption">Category :</td>
                        <td>
                          <select
                            value={cat1}
                            name="category"
                            className="category"
                            onChange={(e) => setCat1(e.target.value)}
                          >
                            <option value="" disabled selected>
                              Select category
                            </option>
                            <option value="food">Food</option>
                            <option value="health">Health & Fitness</option>
                            <option value="travel">Travel</option>
                            <option value="movie">Health & Fitness</option>
                            <option value="education">Education</option>
                          </select>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                )}
                {innerWidth < 500 && (
                  <div className="mb-form-element">
                    <h1 className="label-caption">Heading :</h1>
                    <input
                      type="text"
                      name="s2_h"
                      className="heading"
                      placeholder="Your heading"
                      value={h_2}
                      onChange={(e) => setH_2(e.target.value)}
                      required
                    />
                    <h1 className="label-caption">Description :</h1>
                    <textarea
                      name="s2_d"
                      className="desc"
                      placeholder="Story Description"
                      value={d_2}
                      onChange={(e) => setD_2(e.target.value)}
                      required
                    ></textarea>
                    <h1 className="label-caption">Image :</h1>
                    <input
                      type="text"
                      name="s2_i"
                      className="image-url"
                      placeholder="Add Image url"
                      value={i_2}
                      onChange={(e) => setI_2(e.target.value)}
                      required
                    />
                    <h1 className="label-caption">Category :</h1>
                    <select
                      required
                      value={cat1}
                      name="category"
                      className="category"
                      onChange={(e) => setCat1(e.target.value)}
                    >
                      <option value="" disabled selected>
                        Select category
                      </option>
                      <option value="food">Food</option>
                      <option value="health">Health & Fitness</option>
                      <option value="travel">Travel</option>
                      <option value="movie">Movie</option>
                      <option value="education">Education</option>
                    </select>
                  </div>
                )}
              </>
            )}
            {addStoryIndex === 3 && (
              <>
                {innerWidth > 500 && (
                  <table>
                    <tbody>
                      <tr>
                        <td className="label-caption">Heading :</td>
                        <td>
                          <input
                            type="text"
                            name="s3_h"
                            className="heading"
                            placeholder="Your heading"
                            value={h_3}
                            onChange={(e) => setH_3(e.target.value)}
                            required
                          />
                        </td>
                      </tr>
                      <tr>
                        <td className="label-caption">Description :</td>
                        <td>
                          <textarea
                            name="s3_d"
                            className="desc"
                            placeholder="Story Description"
                            value={d_3}
                            onChange={(e) => setD_3(e.target.value)}
                            required
                          ></textarea>
                        </td>
                      </tr>
                      <tr>
                        <td className="label-caption">Image :</td>
                        <td>
                          <input
                            type="text"
                            name="s3_i"
                            className="image-url"
                            placeholder="Add Image url"
                            value={i_3}
                            onChange={(e) => setI_3(e.target.value)}
                            required
                          />
                        </td>
                      </tr>
                      <tr>
                        <td className="label-caption">Category :</td>
                        <td>
                          <select
                            name="category"
                            className="category"
                            onChange={(e) => setCat1(e.target.value)}
                            value={cat1}
                          >
                            <option value="" disabled selected>
                              Select category
                            </option>
                            <option value="food">Food</option>
                            <option value="health">Health & Fitness</option>
                            <option value="travel">Travel</option>
                            <option value="movie">Health & Fitness</option>
                            <option value="education">Education</option>
                          </select>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                )}
                {innerWidth < 500 && (
                  <div className="mb-form-element">
                    <h1 className="label-caption">Heading :</h1>
                    <input
                      type="text"
                      name="s3_h"
                      className="heading"
                      placeholder="Your heading"
                      value={h_3}
                      onChange={(e) => setH_3(e.target.value)}
                      required
                    />
                    <h1 className="label-caption">Description :</h1>
                    <textarea
                      name="s3_d"
                      className="desc"
                      placeholder="Story Description"
                      value={d_3}
                      onChange={(e) => setD_3(e.target.value)}
                      required
                    ></textarea>
                    <h1 className="label-caption">Image :</h1>
                    <input
                      type="text"
                      name="s3_i"
                      className="image-url"
                      placeholder="Add Image url"
                      value={i_3}
                      onChange={(e) => setI_3(e.target.value)}
                      required
                    />
                    <h1 className="label-caption">Category :</h1>
                    <select
                      required
                      value={cat1}
                      name="category"
                      className="category"
                      onChange={(e) => setCat1(e.target.value)}
                    >
                      <option value="" disabled selected>
                        Select category
                      </option>
                      <option value="food">Food</option>
                      <option value="health">Health & Fitness</option>
                      <option value="travel">Travel</option>
                      <option value="movie">Movie</option>
                      <option value="education">Education</option>
                    </select>
                  </div>
                )}
              </>
            )}
            {addStoryIndex === 4 && (
              <>
                {innerWidth > 500 && (
                  <table>
                    <tbody>
                      <tr>
                        <td className="label-caption">Heading :</td>
                        <td>
                          <input
                            type="text"
                            name="s4_h"
                            className="heading"
                            placeholder="Your heading"
                            value={h_4}
                            onChange={(e) => setH_4(e.target.value)}
                            required
                          />
                        </td>
                      </tr>
                      <tr>
                        <td className="label-caption">Description :</td>
                        <td>
                          <textarea
                            name="s4_d"
                            className="desc"
                            placeholder="Story Description"
                            value={d_4}
                            onChange={(e) => setD_4(e.target.value)}
                            required
                          ></textarea>
                        </td>
                      </tr>
                      <tr>
                        <td className="label-caption">Image :</td>
                        <td>
                          <input
                            type="text"
                            name="s4_i"
                            className="image-url"
                            placeholder="Add Image url"
                            value={i_4}
                            onChange={(e) => setI_4(e.target.value)}
                            required
                          />
                        </td>
                      </tr>
                      <tr>
                        <td className="label-caption">Category :</td>
                        <td>
                          <select
                            name="category"
                            className="category"
                            onChange={(e) => setCat1(e.target.value)}
                            value={cat1}
                          >
                            <option value="" disabled selected>
                              Select category
                            </option>
                            <option value="food">Food</option>
                            <option value="health">Health & Fitness</option>
                            <option value="travel">Travel</option>
                            <option value="movie">Health & Fitness</option>
                            <option value="education">Education</option>
                          </select>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                )}
                {innerWidth < 500 && (
                  <div className="mb-form-element">
                    <h1 className="label-caption">Heading :</h1>
                    <input
                      type="text"
                      name="s4_h"
                      className="heading"
                      placeholder="Your heading"
                      value={h_4}
                      onChange={(e) => setH_4(e.target.value)}
                      required
                    />
                    <h1 className="label-caption">Description :</h1>
                    <textarea
                      name="s4_d"
                      className="desc"
                      placeholder="Story Description"
                      value={d_4}
                      onChange={(e) => setD_4(e.target.value)}
                      required
                    ></textarea>
                    <h1 className="label-caption">Image :</h1>
                    <input
                      type="text"
                      name="s4_i"
                      className="image-url"
                      placeholder="Add Image url"
                      value={i_4}
                      onChange={(e) => setI_4(e.target.value)}
                      required
                    />
                    <h1 className="label-caption">Category :</h1>
                    <select
                      required
                      value={cat1}
                      name="category"
                      className="category"
                      onChange={(e) => setCat1(e.target.value)}
                    >
                      <option value="" disabled selected>
                        Select category
                      </option>
                      <option value="food">Food</option>
                      <option value="health">Health & Fitness</option>
                      <option value="travel">Travel</option>
                      <option value="movie">Movie</option>
                      <option value="education">Education</option>
                    </select>
                  </div>
                )}
              </>
            )}
            {addStoryIndex === 5 && (
              <>
                {innerWidth > 500 && (
                  <table>
                    <tbody>
                      <tr>
                        <td className="label-caption">Heading :</td>
                        <td>
                          <input
                            type="text"
                            name="s5_h"
                            className="heading"
                            placeholder="Your heading"
                            value={h_5}
                            onChange={(e) => setH_5(e.target.value)}
                            required
                          />
                        </td>
                      </tr>
                      <tr>
                        <td className="label-caption">Description :</td>
                        <td>
                          <textarea
                            name="s5_d"
                            className="desc"
                            placeholder="Story Description"
                            value={d_5}
                            onChange={(e) => setD_5(e.target.value)}
                            required
                          ></textarea>
                        </td>
                      </tr>
                      <tr>
                        <td className="label-caption">Image :</td>
                        <td>
                          <input
                            type="text"
                            name="s5_i"
                            className="image-url"
                            placeholder="Add Image url"
                            value={i_5}
                            onChange={(e) => setI_5(e.target.value)}
                            required
                          />
                        </td>
                      </tr>
                      <tr>
                        <td className="label-caption">Category :</td>
                        <td>
                          <select
                            name="category"
                            className="category"
                            onChange={(e) => setCat1(e.target.value)}
                            value={cat1}
                          >
                            <option value="" disabled selected>
                              Select category
                            </option>
                            <option value="food">Food</option>
                            <option value="health">Health & Fitness</option>
                            <option value="travel">Travel</option>
                            <option value="movie">Health & Fitness</option>
                            <option value="education">Education</option>
                          </select>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                )}
                {innerWidth < 500 && (
                  <div className="mb-form-element">
                    <h1 className="label-caption">Heading :</h1>
                    <input
                      type="text"
                      name="s5_h"
                      className="heading"
                      placeholder="Your heading"
                      value={h_5}
                      onChange={(e) => setH_5(e.target.value)}
                      required
                    />
                    <h1 className="label-caption">Description :</h1>
                    <textarea
                      name="s5_d"
                      className="desc"
                      placeholder="Story Description"
                      value={d_5}
                      onChange={(e) => setD_5(e.target.value)}
                      required
                    ></textarea>
                    <h1 className="label-caption">Image :</h1>
                    <input
                      type="text"
                      name="s5_i"
                      className="image-url"
                      placeholder="Add Image url"
                      value={i_5}
                      onChange={(e) => setI_5(e.target.value)}
                      required
                    />
                    <h1 className="label-caption">Category :</h1>
                    <select
                      required
                      value={cat1}
                      name="category"
                      className="category"
                      onChange={(e) => setCat1(e.target.value)}
                    >
                      <option value="" disabled selected>
                        Select category
                      </option>
                      <option value="food">Food</option>
                      <option value="health">Health & Fitness</option>
                      <option value="travel">Travel</option>
                      <option value="movie">Movie</option>
                      <option value="education">Education</option>
                    </select>
                  </div>
                )}
              </>
            )}
            {addStoryIndex === 6 && (
              <>
                {innerWidth > 500 && (
                  <table>
                    <tbody>
                      <tr>
                        <td className="label-caption">Heading :</td>
                        <td>
                          <input
                            type="text"
                            name="s6_h"
                            className="heading"
                            placeholder="Your heading"
                            value={h_6}
                            onChange={(e) => setH_6(e.target.value)}
                            required
                          />
                        </td>
                      </tr>
                      <tr>
                        <td className="label-caption">Description :</td>
                        <td>
                          <textarea
                            name="s6_d"
                            className="desc"
                            placeholder="Story Description"
                            value={d_6}
                            onChange={(e) => setD_6(e.target.value)}
                            required
                          ></textarea>
                        </td>
                      </tr>
                      <tr>
                        <td className="label-caption">Image :</td>
                        <td>
                          <input
                            type="text"
                            name="s6_i"
                            className="image-url"
                            placeholder="Add Image url"
                            value={i_6}
                            onChange={(e) => setI_6(e.target.value)}
                            required
                          />
                        </td>
                      </tr>
                      <tr>
                        <td className="label-caption">Category :</td>
                        <td>
                          <select
                            name="category"
                            className="category"
                            onChange={(e) => setCat1(e.target.value)}
                            value={cat1}
                          >
                            <option value="" disabled selected>
                              Select category
                            </option>
                            <option value="food">Food</option>
                            <option value="health">Health & Fitness</option>
                            <option value="travel">Travel</option>
                            <option value="movie">Health & Fitness</option>
                            <option value="education">Education</option>
                          </select>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                )}
                {innerWidth < 500 && (
                  <div className="mb-form-element">
                    <h1 className="label-caption">Heading :</h1>
                    <input
                      type="text"
                      name="s6_h"
                      className="heading"
                      placeholder="Your heading"
                      value={h_6}
                      onChange={(e) => setH_6(e.target.value)}
                      required
                    />
                    <h1 className="label-caption">Description :</h1>
                    <textarea
                      name="s6_d"
                      className="desc"
                      placeholder="Story Description"
                      value={d_6}
                      onChange={(e) => setD_6(e.target.value)}
                      required
                    ></textarea>
                    <h1 className="label-caption">Image :</h1>
                    <input
                      type="text"
                      name="s6_i"
                      className="image-url"
                      placeholder="Add Image url"
                      value={i_6}
                      onChange={(e) => setI_6(e.target.value)}
                      required
                    />
                    <h1 className="label-caption">Category :</h1>
                    <select
                      required
                      value={cat1}
                      name="category"
                      className="category"
                      onChange={(e) => setCat1(e.target.value)}
                    >
                      <option value="" disabled selected>
                        Select category
                      </option>
                      <option value="food">Food</option>
                      <option value="health">Health & Fitness</option>
                      <option value="travel">Travel</option>
                      <option value="movie">Movie</option>
                      <option value="education">Education</option>
                    </select>
                  </div>
                )}
              </>
            )}
            <div className="buttons-navigation-submit">
              <div className="navigation-btn">
                {innerWidth > 500 && (
                  <div
                    className="previous-btn"
                    onClick={() => onClickPreviousSlide()}
                  >
                    Previous
                  </div>
                )}
                {innerWidth > 500 && (
                  <div
                    className="add-next-btn"
                    onClick={() => onClickNextSlide()}
                  >
                    Next
                  </div>
                )}
              </div>
              <div className="submit-btn">
                <button type="submit" className="submit-btn">
                  Post
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
