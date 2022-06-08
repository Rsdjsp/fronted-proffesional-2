/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import Link from "next/link";
import { useSelector } from "react-redux";
import { signOut } from "firebase/auth";
import { auth as authInstance } from "../config/firebase";
import { useRouter } from "next/router";
import styled from "styled-components";
import { BsSearch } from "react-icons/bs";
import { FaUser } from "react-icons/fa";
import { IoChatbubbles } from "react-icons/io5";

const Nav = styled.nav`
  height: 50px;
  width: 100%;
  background-color: #555975;
  color: white;
  display: flex;
  align-items: center;
  position: fixed;
  top: 0px;
  & > .logo {
    width: 10%;
    height: 50px;
    text-align: center;
  }
  & > .search {
    height: 50px;
    text-align: center;
    width: 40%;
    line-height: 3;
    display: inline-block;

    & > input {
      padding: 10px;
      border: none;
      background-color: #797d9681;
      color: white;
      width: 70%;
      outline: none;
    }

    & > input::placeholder {
      color: white;
    }

    & > button {
      padding: 10px;
      border: none;
      background-color: #797d9681;
      color: white;
      cursor: pointer;
    }

    & > button:hover {
      background-color: #303347;
    }
  }

  & > .icons {
    height: 100%;
    text-align: center;
    width: 22%;
    display: inline-block;

    & > ul {
      height: 100%;
      margin-top: 0;

      & > li {
        height: 49px;
        display: inline-block;
        padding-left: 15px;
        padding-right: 15px;
        font-size: 19px;
        line-height: 2.5;
        cursor: pointer;
      }

      & > li:hover {
        background-color: #303347;
      }
    }
  }
`;

const FormatLink = styled.a`
  & > img {
    height: 100%;
  }
`;

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const auth = useSelector((state) => state.auth);
  const router = useRouter();

  const logOut = () => {
    signOut(authInstance);
    setOpen(false);
    router.push("/");
  };
  return (
    <Nav>
      <div className="logo">
        <Link href={"/"} passHref>
          <FormatLink>
            <img src="https://i.imgur.com/XsRvFXf.png" alt="socialMedia" />
          </FormatLink>
        </Link>
      </div>
      <div className="search">
        <input
          type="text"
          name="search"
          id="search"
          placeholder="Search in feed"
        />
        <button>
          <BsSearch />
        </button>
      </div>
      <div className="icons">
        <ul>
          <li>
            <FaUser />
          </li>
          <li>
            <IoChatbubbles />
          </li>
        </ul>
      </div>

      {/* <ul>
        <li>
          <Link href="/">Home</Link>
        </li>
        {!auth.logged && (
          <li>
            <Link href="/login">Login</Link>
          </li>
        )}
        {auth.logged && (
          <li className="ml-auto">
            <div
              onClick={() => {
                setOpen(!open);
              }}
              className="flex gap-3 items-center"
            >
              <img
                className="w-8 h-8 rounded-full"
                src={auth.user.profilePic}
                alt=""
              />
              {auth.user.name}
            </div>
          </li>
        )}
      </ul>
      {open && (
        <div>
          <button onClick={logOut}>Cerrar sesión</button>
        </div>
      )} */}
    </Nav>
  );
}
