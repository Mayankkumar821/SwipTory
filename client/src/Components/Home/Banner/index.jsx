import React, {useState,useEffect} from "react";
import "./style.css";
import useStoryContext from "../../../hooks/useProductContext";

export default function Index() {
  let [innerWidth, setInnerWidth] = useState(window.innerWidth);
  const {
    bannerRef,
    setAllFilter,
    setFoodFilter,
    setHealthFilter,
    setBookFilter,
    allBorderRef,
    FoodBorderRef,
    HealthBorderRef,
    bookBorderRef,
    TravelBorderRef,
    EducationBorderRef,
    MovieBorderRef,
    setTravelFilter,
    setEducationFilter,
    setMovieFilter,
    loggedIn,
    setStoryFilter,
  } = useStoryContext();

  let setFilter = (filter) => {
    switch (filter) {
      case "all":
        setBookFilter(false);
        setAllFilter(true);
        setFoodFilter(true);
        setHealthFilter(true);
        setTravelFilter(true);
        setEducationFilter(true);
        setMovieFilter(true);
        setStoryFilter(true);
        allBorderRef.current.style.border = "0.2rem solid blue";
        FoodBorderRef.current.style.border = "none";
        HealthBorderRef.current.style.border = "none";
        if (loggedIn && innerWidth > 500) bookBorderRef.current.style.border = "none";
        TravelBorderRef.current.style.border = "none";
        EducationBorderRef.current.style.border = "none";
        MovieBorderRef.current.style.border = "none";
        break;

      case "food":
        setBookFilter(false);
        setAllFilter(false);
        setFoodFilter(true);
        setHealthFilter(false);
        setTravelFilter(false);
        setEducationFilter(false);
        setMovieFilter(false);
        setStoryFilter(false);
        allBorderRef.current.style.border = "none";
        FoodBorderRef.current.style.border = "0.2rem solid blue";
        HealthBorderRef.current.style.border = "none";
        if (loggedIn && innerWidth > 500) bookBorderRef.current.style.border = "none";
        TravelBorderRef.current.style.border = "none";
        EducationBorderRef.current.style.border = "none";
        MovieBorderRef.current.style.border = "none";
        break;

      case "health":
        setBookFilter(false);
        setAllFilter(false);
        setFoodFilter(false);
        setHealthFilter(true);
        setTravelFilter(false);
        setEducationFilter(false);
        setMovieFilter(false);
        setStoryFilter(false);
        allBorderRef.current.style.border = "none";
        FoodBorderRef.current.style.border = "none";
        HealthBorderRef.current.style.border = "0.2rem solid blue";
        if (loggedIn && innerWidth > 500) bookBorderRef.current.style.border = "none";
        TravelBorderRef.current.style.border = "none";
        EducationBorderRef.current.style.border = "none";
        MovieBorderRef.current.style.border = "none";
        break;

      case "travel":
        setBookFilter(false);
        setAllFilter(false);
        setFoodFilter(false);
        setHealthFilter(false);
        setTravelFilter(true);
        setEducationFilter(false);
        setMovieFilter(false);
        setStoryFilter(false);
        allBorderRef.current.style.border = "none";
        FoodBorderRef.current.style.border = "none";
        HealthBorderRef.current.style.border = "none";
        if (loggedIn && innerWidth > 500) bookBorderRef.current.style.border = "none";
        TravelBorderRef.current.style.border = "0.2rem solid blue";
        EducationBorderRef.current.style.border = "none";
        MovieBorderRef.current.style.border = "none";
        break;

      case "movie":
        setBookFilter(false);
        setAllFilter(false);
        setFoodFilter(false);
        setHealthFilter(false);
        setTravelFilter(false);
        setEducationFilter(false);
        setMovieFilter(true);
        setStoryFilter(false);
        allBorderRef.current.style.border = "none";
        FoodBorderRef.current.style.border = "none";
        HealthBorderRef.current.style.border = "none";
        if (loggedIn && innerWidth > 500) bookBorderRef.current.style.border = "none";
        TravelBorderRef.current.style.border = "none";
        EducationBorderRef.current.style.border = "none";
        MovieBorderRef.current.style.border = "0.2rem solid blue";
        break;

      case "education":
        setBookFilter(false);
        setAllFilter(false);
        setFoodFilter(false);
        setHealthFilter(false);
        setTravelFilter(false);
        setEducationFilter(true);
        setMovieFilter(false);
        setStoryFilter(false);
        allBorderRef.current.style.border = "none";
        FoodBorderRef.current.style.border = "none";
        HealthBorderRef.current.style.border = "none";
        if (loggedIn && innerWidth > 500) bookBorderRef.current.style.border = "none";
        TravelBorderRef.current.style.border = "none";
        EducationBorderRef.current.style.border = "0.2rem solid blue";
        MovieBorderRef.current.style.border = "none";
        break;
      default:
        break;
    }
  };
  useEffect(() => {
    window.addEventListener("resize", () => {
      setInnerWidth(window.innerWidth);
    });
  }, []);
  return (
    <div className="banner" ref={bannerRef}>
      <div
        className="all-filter"
        onClick={() => setFilter("all")}
        ref={allBorderRef}
        style={{width: innerWidth < 500 ? "180rem" : ""}}
      >
        <img src="all.jpg" alt="" className="all-img" />
        <div className="wrapper-all">
          <h1 className="heading-all">ALL</h1>
        </div>
      </div>
      <div
        className="food-filter"
        onClick={() => setFilter("food")}
        ref={FoodBorderRef}
        style={{width: innerWidth < 500 ? "180rem" : ""}}
      >
        <img src="food.png" alt="" className="food-img" />
        <div className="wrapper-all">
          <h1 className="heading-food">Food</h1>
        </div>
      </div>
      <div
        className="medical-filter"
        onClick={() => setFilter("health")}
        ref={HealthBorderRef}
        style={{width: innerWidth < 500 ? "180rem" : ""}}
      >
        <img src="health.jpg" alt="" className="medical-img" />
        <div className="wrapper-all">
          <h1 className="heading-medical">Health & Fitness</h1>
        </div>
      </div>
      <div
        className="travel-filter"
        onClick={() => setFilter("travel")}
        ref={TravelBorderRef}
        style={{width: innerWidth < 500 ? "180rem" : ""}}
      >
        <img src="travel.jpg" alt="" className="travel-img" />
        <div className="wrapper-all">
          <h1 className="heading-travel">Travel</h1>
        </div>
      </div>
      <div
        className="movie-filter"
        onClick={() => setFilter("movie")}
        ref={MovieBorderRef}
        style={{width: innerWidth < 500 ? "180rem" : ""}}
      >
        <img src="movie.jpg" alt="" className="movie-img" />
        <div className="wrapper-all">
          <h1 className="heading-movie">Movie</h1>
        </div>
      </div>
      <div
        className="education-filter"
        onClick={() => setFilter("education")}
        ref={EducationBorderRef}
        style={{width: innerWidth < 500 ? "180rem" : ""}}
      >
        <img src="education.jpg" alt="" className="education-img" />
        <div className="wrapper-all">
          <h1 className="heading-education">Education</h1>
        </div>
      </div>
    </div>
  );
}
