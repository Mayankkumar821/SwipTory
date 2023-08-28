const { createContext, useState, useRef } = require("react");

const StoryContext = createContext();

const Provider = ({ children }) => {
  const homeRef = useRef();
  const navbarRef = useRef();
  const footerRef = useRef();
  const bannerRef = useRef();
  const signRef = useRef();
  const bookBorderRef = useRef();
  const allBorderRef = useRef();
  const FoodBorderRef = useRef();
  const HealthBorderRef = useRef();
  const TravelBorderRef = useRef();
  const MovieBorderRef = useRef();
  const EducationBorderRef = useRef();

  const [loggedIn, setLoggedIn] = useState(false);
  const [logoutPop, setLogoutPop] = useState(false);
  const [signinPop, setSignPop] = useState(false);
  const [registerPop, setRegisterPop] = useState(false);
  const [storyPop, setStoryPop] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [data, setData] = useState([[]]);
  const [fData, setFData] = useState([[]]);
  const [hData, setHData] = useState([[]]);
  const [tData, setTData] = useState([[]]);
  const [mData, setMData] = useState([[]]);
  const [eData, setEData] = useState([[]]);
  const [index, setIndex] = useState();
  const [outerIndex, setOuterIndex] = useState();
  const [clickLike, setClickLike] = useState(false);
  const [clickBook, setClickBook] = useState(false);
  const [copyLink, setCopyLink] = useState("");
  const [categorySelected, setCategorySelected] = useState("");
  const [name, setName] = useState("");
  const [ids, setIds] = useState([]);
  const [upvoteCount, setUpvoteCount] = useState([]);
  const [sData, setSData] = useState([[]]);
  const [isLiked, setIsLiked] = useState([]);
  const [category, setCategory] = useState("");
  const [isBook, setIsBook] = useState();
  const [bData, setBData] = useState([[]]);
  const [allFilter, setAllFilter] = useState(true);
  const [foodFilter, setFoodFilter] = useState(false);
  const [healthFilter, setHealthFilter] = useState(false);
  const [bookFilter, setBookFilter] = useState(false);
  const [travelFilter, setTravelFilter] = useState(false);
  const [educationFilter, setEducationFilter] = useState(false);
  const [movieFilter, setMovieFilter] = useState(false);
  const [addStoryPop,setAddStoryPop] = useState(false);
  const [storyFilter,setStoryFilter] = useState(false);
  const [addStoryIndex,setAddStoryIndex] = useState(1);
  const [addStoryArr,setAddStoryArr] = useState([]);
  const [editStoryId,setEditStoryId] = useState("");
  const [editStoryPop,setEditStoryPop] = useState(false);
  const [cat1, setCat1] = useState("");
  const [h_1,setH_1] = useState("");
  const [h_2,setH_2] = useState("");
  const [h_3,setH_3] = useState("");
  const [h_4,setH_4] = useState("");
  const [h_5,setH_5] = useState("");
  const [h_6,setH_6] = useState("");
  const [d_1,setD_1] = useState("");
  const [d_2,setD_2] = useState("");
  const [d_3,setD_3] = useState("");
  const [d_4,setD_4] = useState("");
  const [d_5,setD_5] = useState("");
  const [d_6,setD_6] = useState("");
  const [i_1,setI_1] = useState("");
  const [i_2,setI_2] = useState("");
  const [i_3,setI_3] = useState("");
  const [i_4,setI_4] = useState("");
  const [i_5,setI_5] = useState("");
  const [i_6,setI_6] = useState("");

  const valueToShare = {
    editStoryPop,setEditStoryPop,
    editStoryId,setEditStoryId,
    storyFilter,
    setStoryFilter,
    sData, 
    setSData,
    h_1,setH_1,
    h_2,setH_2,
    h_3,setH_3,
    h_4,setH_4,
    h_5,setH_5,
    h_6,setH_6,
    d_1,setD_1,
    d_2,setD_2,
    d_3,setD_3,
    d_4,setD_4,
    d_5,setD_5,
    d_6,setD_6,
    i_1,setI_1,
    i_2,setI_2,
    i_3,setI_3,
    i_4,setI_4,
    i_5,setI_5,
    i_6,setI_6,
    cat1, setCat1,
    addStoryArr,
    setAddStoryArr,
    addStoryIndex,
    setAddStoryIndex,
    mData,
    setMData,
    eData,
    setEData,
    TravelBorderRef,
    EducationBorderRef,
    MovieBorderRef,
    travelFilter,
    setTravelFilter,
    educationFilter,
    setEducationFilter,
    movieFilter,
    setMovieFilter,
    tData,
    setTData,
    allBorderRef,
    FoodBorderRef,
    HealthBorderRef,
    bookBorderRef,
    bookFilter,
    setBookFilter,
    allFilter,
    setAllFilter,
    foodFilter,
    setFoodFilter,
    healthFilter,
    setHealthFilter,
    loggedIn,
    setLoggedIn,
    logoutPop,
    setLogoutPop,
    signinPop,
    setSignPop,
    homeRef,
    navbarRef,
    footerRef,
    bannerRef,
    signRef,
    registerPop,
    setRegisterPop,
    errorMsg,
    setErrorMsg,
    data,
    setData,
    index,
    setIndex,
    storyPop,
    setStoryPop,
    outerIndex,
    setOuterIndex,
    clickLike,
    setClickLike,
    clickBook,
    setClickBook,
    copyLink,
    setCopyLink,
    categorySelected,
    setCategorySelected,
    name,
    setName,
    ids,
    setIds,
    upvoteCount,
    setUpvoteCount,
    isLiked,
    setIsLiked,
    fData,
    setFData,
    hData,
    setHData,
    category,
    setCategory,
    isBook,
    setIsBook,
    bData,
    setBData,
    addStoryPop,
    setAddStoryPop
  };

  return (
    <StoryContext.Provider value={valueToShare}>
      {children}
    </StoryContext.Provider>
  );
};

export { Provider };

export default StoryContext;
