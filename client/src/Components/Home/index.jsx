import React, { useEffect } from "react";
import Navbar from "./Navbar";
import Banner from "./Banner";
import Footer from "./Footer";
import "./style.css";
import useStoryContext from "../../hooks/useProductContext";
import SignIn from "./Navbar/SignIn";
import Register from "./Navbar/Register";
import axios from "axios";
import StoryPop from "./Footer/StoryPop";
import AddStory from './Navbar/AddStory';
import EditStory from './Navbar/EditStory';

export default function Index() {
  const {
    setLoggedIn,
    homeRef,
    signinPop,
    registerPop,
    storyPop,
    setFData,
    setHData,
    setTData,
    setMData,
    setEData,
    addStoryPop,
    editStoryPop,
  } = useStoryContext();

  let getData = async () => {
    await axios
      .get(`${process.env.REACT_APP_HOST}/api/food-get-stories`)
      .then((res) => {
        setFData(res.data.oArr);
      })
      .catch((err) => {
        console.log(err);
      });

      await axios
      .get(`${process.env.REACT_APP_HOST}/api/health-get-stories`)
      .then((res) => {
        setHData(res.data.oArr);
      })
      .catch((err) => {
        console.log(err);
      });

      await axios
      .get(`${process.env.REACT_APP_HOST}/api/travel-get-stories`)
      .then((res) => {
        setTData(res.data.oArr);
      })
      .catch((err) => {
        console.log(err);
      });

      await axios
      .get(`${process.env.REACT_APP_HOST}/api/movie-get-stories`)
      .then((res) => {
        setMData(res.data.oArr);
      })
      .catch((err) => {
        console.log(err);
      });

      await axios
      .get(`${process.env.REACT_APP_HOST}/api/education-get-stories`)
      .then((res) => {
        setEData(res.data.oArr);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setLoggedIn(true);
    }
  }, [setLoggedIn]);

  return (
    <>
      <div className="home-container" ref={homeRef}>
        <Navbar />
        <Banner />
        <Footer />
      </div>
      {signinPop && <SignIn />}
      {registerPop && <Register />}
      {storyPop && <StoryPop />}
      {addStoryPop && <AddStory />}
      {editStoryPop && <EditStory />}
    </>
  );
}
