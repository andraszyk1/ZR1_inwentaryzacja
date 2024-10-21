import { PrismaClient } from "@prisma/client";
import express, { Request, Response,Router } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { log } from "console";
import serverless from "serverless-http";
const prisma = new PrismaClient(); //{ log: ["query"] }
const app = express();
async function main() {
  app.use(cors());
  app.use(bodyParser.json());
  const router = Router();
  router.get("/", async (req: Request, res: Response) => {
    res.json({ message: "Server is working..." });
  });

  router.delete("/items", async (req: Request, res: Response) => {
    console.log(req.query.id);
    const item = await prisma.item.delete({
      where: { id: Number(req.query.id) },
    });
    res.json(item);
  });
  router.put("/items", async (req: Request, res: Response) => {
    const item = await prisma.item.create({
      data: { ...req.body, data: new Date().toDateString() },
    });
    res.json(item);
  });
  router.post("/items", async (req: Request, res: Response) => {
    console.log(req.body);
    const item = await prisma.item.update({
      where: { id: Number(req.body.id) },
      data: req.body,
    });
    res.json(item);
  });

  router.get("/items", async (req: Request, res: Response) => {
    const { search, currentPage, limit } = req.query;
    const searchParam = { contains: String(search).trim().toLowerCase() };
    const whereOrTable = [
      { model: searchParam },
      { nazwa: searchParam },
      { osobaOdpowiedzialna: searchParam },
      { lokalizacja: searchParam },
      { producent: searchParam },
      { sn: searchParam },
    ];
    const [countItems, items] = await prisma.$transaction([
      prisma.item.count({
        where: {
          OR: whereOrTable,
        },
      }),
      prisma.item.findMany({
        where: {
          OR: whereOrTable,
        },
        orderBy: {
          id: "asc",
        },
        take: Number(limit),
        skip:
          Number(currentPage) === 1
            ? 0
            : (Number(currentPage) - 1) * Number(limit),
      }),
    ]);
    res.json({
      data: items,
      countData: countItems,
      pages: Math.ceil(Number(countItems) / Number(limit)),
    });
  });
 
  router.get("/items/users", async (req: Request, res: Response) => {
    const { search } = req.query;
    const users = await prisma.user.findMany({where:{cn:{contains:String(search)}},take:10});
    console.log(users,search);
    
    res.json(users);
  });
  router.all("*", (req: Request, res: Response) => {
    res.status(404).json({ error: `Route ${req.originalUrl} not found` });
  });
  app.use("/api/",router)
}

main()
  .then(async () => {
    await prisma.$connect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
// const server = app.listen(5001);
export const handler = serverless(app);
