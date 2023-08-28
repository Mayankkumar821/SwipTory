import { useContext } from "react";
import StoryContext from "../context/StoryContext";

const useStoryContext = () => {
  return useContext(StoryContext);
};

export default useStoryContext;
