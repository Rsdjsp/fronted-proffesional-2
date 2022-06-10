import { PrismaClient } from "@prisma/client";
const client = new PrismaClient();

export default async function getALL(req, res) {
  const { idUser } = req.query;
  const user = await client.user.findUnique({
    where: {
      id: idUser,
    },
    include: {
      friendshipRequestsReceived: true,
      friendshipRequestsSended: true,
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
  return res.json({
    people: users,
    recivedRequests: user.friendshipRequestsReceived,
    sendedRequests: user.friendshipRequestsSended,
  });
}
