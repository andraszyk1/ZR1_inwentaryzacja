import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient();
export async function deleteAllItems() {
  await prisma.item.deleteMany({})
}
export async function createItems() {
    await prisma.item.createMany({
      data:[
        {"lp":"1703","data":"45510","idPracownika":"7425","osobaOdpowiedzialna":"Wojtania Zaneta","nazwa":"zwojta-nbc-mag","lokalizacja":"Chełmek : Chełmek 1 : Magazyn","producent":"Lenovo","model":"T470","sn":"PF0SYAMX","typ":"Laptop","opis":"Arek Pękala się zwolnił, ostatni dzień w pracy 31.08.2023 / po tkoszut-nbc-inf / awasiel-nbp-rad","status":"Używany","nrInwentarzowyIt":"20319","os":"Windows 10","mpk":""},
        {"lp":"2604","data":"45510","idPracownika":"7425","osobaOdpowiedzialna":"Wojtania Zaneta","nazwa":"zwojta-nbc-mag","lokalizacja":"Chełmek : Chełmek 1 : Magazyn","producent":"Microsoft","model":"2013 H&B","sn":"7KNTJ-69QDF-2FCMM-QHF9T-YG7GP","typ":"Licencja Office","opis":"po awasiel-nbp-rad","status":"Używany","nrInwentarzowyIt":"","os":"","mpk":""},
      ]
    })
  }
