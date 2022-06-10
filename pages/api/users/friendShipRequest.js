import { PrismaClient } from "@prisma/client";
const client = new PrismaClient();

export default async function friendshipRequest(req, res) {
  const { idUser, idFriend } = req.body;

  const friend = await client.user.update({
    where: {
      id: idFriend,
    },
    data: { friendShipRequestReceivedIds: { push: idUser } },
  });

  const user = await client.user.update({
    where: {
      id: idUser,
    },
    data: {
      friendShipRequestsSendedIds: {
        push: idFriend,
      },
    },
  });
  const users = await client.user.findMany({
    where: {
      id: {
        notIn: [
          idUser,
          ...user.myFriendsIds,
          ...user.friendShipRequestReceivedIds,
          ...user.friendShipRequestsSendedIds,
        ],
      },
    },
  });

  return res.json(users);
}
