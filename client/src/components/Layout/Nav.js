import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { faPaw } from "@fortawesome/free-solid-svg-icons";
import NavLink from "./NavLink";
import { useState } from "react";
import { useEffect } from "react";

const Nav = () => {
  const navigate = useNavigate();
  function isActive(path) {
    return window.location.pathname.startsWith(path);
  }

  let isOnState = localStorage.getItem("OwnerOrWalker");

  return (
    <FooterNav>
      <div>
        <NavLink
          to={isOnState === "false" ? "/ownerMain" : "/walkerMain"}
          className="home-area active"
          active={
            isOnState === "false"
              ? isActive("/ownerMain")
              : isActive("/walkerMain")
          }
        >
          <i>
            <FontAwesomeIcon icon={faHouse} />
          </i>
          <p>홈</p>
        </NavLink>
      </div>
      <div>
        <NavLink
          to="/setting"
          className="setting-area"
          active={isActive("/setting")}
        >
          <i>
            <FontAwesomeIcon icon={faBars} />
          </i>
          <p>전체</p>
        </NavLink>
      </div>

      <button
        type="button"
        className="nav-button"
        onClick={() => navigate("/wantedList")}
      >
        <FontAwesomeIcon icon={faPaw} />
      </button>
    </FooterNav>
  );
};

export default Nav;

const FooterNav = styled.div`
  position: fixed;
  display: flex;
  justify-content: space-between;
  bottom: 0;
  right: 0;
  left: 0;
  width: 100%;
  background: var(--white-000);
  z-index: 9;
  box-shadow: -7px 0 15px 0 rgba(0, 0, 0, 0.1);
  > div {
    width: 110px;
    text-align: center;
  }

  svg {
    font-size: 18px;
  }
  p {
    font-size: 12px;
    color: var(--gray-500);
    margin-top: 3px;
  }

  .nav-button {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    top: -16px;
    left: 50%;
    width: 135px;
    height: 60px;
    border: 6px solid var(--white-000);
    background: rgb(51, 134, 255);
    background: linear-gradient(
      133deg,
      rgba(51, 134, 255, 1) 0%,
      rgba(101, 75, 255, 1) 100%
    );
    border-radius: 100px;
    box-shadow: 0 0 7px 0 rgba(0, 0, 0, 0.14);
    animation-name: example;
    animation-duration: 4s;
    animation-iteration-count: 3;
    animation-timing-function: ease-in;
    transform: translate(-50%, 0);
    font-size: 22px;
    color: var(--white-000);
  }

  @keyframes example {
    0% {
      border: 6px solid var(--white-000);
    }
    25% {
      border: 8px solid var(--white-000);
    }
    50% {
      border: 5px solid var(--white-000);
    }
    75% {
      border: 7px solid var(--white-000);
    }
    100% {
      border: 6px solid var(--white-000);
    }
  }
`;
