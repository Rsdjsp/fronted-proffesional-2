import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { sendFriendRequest } from "../features/users";

// export async function getServerSideProps(context){
//     const host = context.req.headers.host
//     const secure = context.req.connection.encrypted

//     const {data:users} = await axios.get(`${secure?"https":"http"}://${host}/api/users/all`)

//     return {
//         props:{
//             users
//         }
//     }
// }

export default function People() {
  const { people, recivedRequests, sendedRequests } = useSelector(
    (state) => state.users
  );
  const dispatch = useDispatch();

  const sendFriendshipRequest = (idFriend) => {
    dispatch(sendFriendRequest(idFriend));
  };

  return (
    <div>
      <section>
        <h2>People near</h2>
        {people.map((user) => (
          <article key={user.id}>
            <p>{user.name}</p>
            <img src={user.profilePic} alt={user.name} />
            <button onClick={() => sendFriendshipRequest(user.id)}>
              Enviar solicitud
            </button>
          </article>
        ))}
      </section>
      <section>
        <h2>Inbox request</h2>
        {recivedRequests.map((user) => (
          <article key={user.id}>
            <p>{user.name}</p>
            <img src={user.profilePic} alt={user.name} />
            <button onClick={() => sendFriendshipRequest(user.id)}>
              Enviar solicitud
            </button>
          </article>
        ))}
      </section>
      <section>
        <h2>request sended</h2>
        {sendedRequests.map((user) => (
          <article key={user.id}>
            <p>{user.name}</p>
            <img src={user.profilePic} alt={user.name} />
            <button onClick={() => sendFriendshipRequest(user.id)}>
              Enviar solicitud
            </button>
          </article>
        ))}
      </section>
    </div>
  );
}
