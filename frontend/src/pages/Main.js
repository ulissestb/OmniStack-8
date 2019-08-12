import React, { useEffect, useState } from "react";
import api from "../services/api";

import "./Main.css";
import logo from "../assets/logo.svg";
import like from "../assets/like.svg";
import dislike from "../assets/dislike.svg";

export default function Main({ match }) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function loadUsers() {
      const response = await api.get("/devs", {
        headers: {
          user: match.params.id
        }
      });
      setUsers(response.data);
    }
    loadUsers();
  }, [match.params.id]);
  return (
    <div className="main-container">
      <img src={logo} alt="Tindev" />
      <ul>
        <li>
          <img
            src="https://avatars1.githubusercontent.com/u/30960012?v=4"
            alt="avatar"
          />
          <footer>
            <strong>Ulisses </strong>
            <p>blablablblalba</p>
          </footer>
          <div className="buttons">
            <button type="button">
              <img src={dislike} alt="Dislike" />
            </button>
            <button type="button">
              <img src={like} alt="like" />
            </button>
          </div>
        </li>
        <li>
          <img
            src="https://avatars1.githubusercontent.com/u/30960012?v=4"
            alt="avatar"
          />
          <footer>
            <strong>Ulisses </strong>
            <p>blablablblalba</p>
          </footer>
          <div className="buttons">
            <button type="button">
              <img src={dislike} alt="Dislike" />
            </button>
            <button type="button">
              <img src={like} alt="like" />
            </button>
          </div>
        </li>
        <li>
          <img
            src="https://avatars1.githubusercontent.com/u/30960012?v=4"
            alt="avatar"
          />
          <footer>
            <strong>Ulisses </strong>
            <p>blablablblalba</p>
          </footer>
          <div className="buttons">
            <button type="button">
              <img src={dislike} alt="Dislike" />
            </button>
            <button type="button">
              <img src={like} alt="like" />
            </button>
          </div>
        </li>
        <li>
          <img
            src="https://avatars1.githubusercontent.com/u/30960012?v=4"
            alt="avatar"
          />
          <footer>
            <strong>Ulisses </strong>
            <p>blablablblalba</p>
          </footer>
          <div className="buttons">
            <button type="button">
              <img src={dislike} alt="Dislike" />
            </button>
            <button type="button">
              <img src={like} alt="like" />
            </button>
          </div>
        </li>
      </ul>
    </div>
  );
}
