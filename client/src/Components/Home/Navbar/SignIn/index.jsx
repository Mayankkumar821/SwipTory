import React from "react";
import "./style.css";
import useStoryContext from "../../../../hooks/useProductContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Index() {
  let naviagte = useNavigate();
  const { setSignPop, 
    signRef, 
    homeRef, 
    navbarRef, 
    footerRef, 
    bannerRef,
    setName
  } =
    useStoryContext();

  let onClickClose = () => {
    homeRef.current.style.backgroundColor = "white";
    bannerRef.current.style.zIndex = 1;
    footerRef.current.style.zIndex = 1;
    navbarRef.current.style.zIndex = 1;

    setSignPop(false);
    naviagte(0);
    
  };
  let onSubmitForm = async () => {
    await axios
      .get(`${process.env.REACT_APP_HOST}/api/get-token`)
      .then((res) => {
        if (res.data.status === 200){
          let token = res.data.token;
          let name = res.data.name;
          localStorage.setItem("token",token);
          localStorage.setItem("name",name);
          setName(name);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="overlay-sign-in-pop" ref={signRef}>
      <h1 className="heading-sign-in">Login to SwipTory</h1>
      <form
        action={`${process.env.REACT_APP_HOST}/api/login`}
        method="post"
        onSubmit={() => onSubmitForm()}
      >
        <table>
          <tbody>
            <tr>
              <td>
                <h1 className="username-heading">Username</h1>
              </td>
              <td>
                <input
                  type="text"
                  name="user"
                  className="user"
                  placeholder="Enter username"
                  required
                />
              </td>
            </tr>
            <tr>
              <td>
                <h1 className="password-heading">Password</h1>
              </td>
              <td>
                <div className="wrapper-password">
                  <input
                    type="password"
                    name="password"
                    className="password"
                    placeholder="Enter password"
                    required
                  />
                  <img src="eye.png" alt="" className="eye-img" />
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <div className="wrapper-login-btn">
          <button className="register-btn">Login</button>
        </div>
      </form>
      <img
        src="close.png"
        alt=""
        className="close-icon"
        onClick={() => onClickClose()}
      />
    </div>
  );
}
