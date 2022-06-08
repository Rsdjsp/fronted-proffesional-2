/* eslint-disable @next/next/no-img-element */
import axios from "axios";
import React from "react";

export async function getServerSideProps(context) {
  const host = context.req.headers.host;
  const secure = context.req.connection.encrypted;
  const { data: users } = await axios.get(
    `${secure ? "https" : "http"}//${host}/api/users/all`
  );

  return {
    props: {
      users,
    },
  };
}

export default function People({ users }) {
  return (
    <div>
      <section>
        {users.map((user) => {
          return (
            <article key={user.id}>
              <p>user.name</p>
              <img src={user.image} alt="profilepic" />
            </article>
          );
        })}
      </section>
    </div>
  );
}
