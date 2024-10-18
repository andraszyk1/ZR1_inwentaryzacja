import { PrismaClient } from "@prisma/client";
import express, { Request, Response } from "express";
import { createItems } from "./helpers";
import bodyParser from "body-parser";
import cors from "cors";
import { ad } from "./adConfg";
const prisma = new PrismaClient(); //{ log: ["query"] }
const app = express();
async function main() {
  app.use(cors());
  app.use(bodyParser.json())
  app.get("/", async (req: Request, res: Response) => {
    res.json({ message: "Server is working..." });
  });

  app.delete("/items", async (req: Request, res: Response) => {
    console.log(req.query.id);
    const item = await prisma.item.delete({
      where: { id: Number(req.query.id) },
    });
    res.json(item);
  });
  app.put("/items", async (req: Request, res: Response) => {
    const item = await prisma.item.create({
      data:{...req.body,data:new Date().toDateString()}
    });
    res.json(item);
  });
  app.post("/items", async (req: Request, res: Response) => {
    console.log(req.body);
    const item = await prisma.item.update({
      where: { id: Number(req.body.id) },
      data:req.body
    });
    res.json(item);
  });

  app.get("/items", async (req: Request, res: Response) => {
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
    const [countItems,items]=await prisma.$transaction([
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
        take:Number(limit),
        skip:Number(currentPage)===1 ? 0 : (Number(currentPage)-1) * Number(limit)
      })
    ])
    res.json({
      data: items,
      countData: countItems,
      pages: Math.ceil(Number(countItems) / Number(limit)),
    });
  });
  app.get("/items/users" , async (req: Request, res: Response) => {
    ad.findUsers(function(err, users) {
      if (err) {
        console.log('ERROR: ' +JSON.stringify(err));
        return;
      }
    
     
        console.log('findUsers: '+JSON.stringify(users));
        res.json(JSON.stringify(users))
        return JSON.stringify(users);
     
    })
    
    // const { search } = req.query;
    // const searchParam = { contains: String(search).trim().toLowerCase() };
    // const users=await prisma.item.findMany({select:{osobaOdpowiedzialna:true},where:{osobaOdpowiedzialna:searchParam},take:10})
    // console.log(users);
    
  
})
  app.all("*", (req: Request, res: Response) => {
    res.status(404).json({ error: `Route ${req.originalUrl} not found` });
  });
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
const server = app.listen(5001);
