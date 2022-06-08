import { PrismaClient } from "@prisma/client";
const client = new PrismaClient();

export default async function create(req, res) {
  try {
    if (req.method === "POST") {
      const post = await client.post.create({
        data: {
          content: req.body.content,
          image: req.body.image,
          author: {
            connect: {
              id: req.body.author,
            },
          },
        },
      });
      return res.json(post);
    }
  } catch (error) {
    console.log(error);
  }

  // ID duplicado

  return res.json({
    success: true,
  });
}
