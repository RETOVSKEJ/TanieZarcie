import s from "../list.module.css";
import SortButtons from "@/components/SortButtons/SortButtons";
import { Sorter } from "@/components/SortButtons/SortTypes";
import { getZestawy } from "@/utils/prisma";
import List from "@/components/List/List";
import { headers } from "next/headers";

export const metadata = {
  title: "Zestawy | TanieZarcie",
  description: "TanieZarcie.pl - katalog z Zestawami",
};

// function sortZestawy(sort, order): Zestaw[] {
//     switch (sort) {
//         case "price":
//             return order === "asc"
//                 ? zestawyObj["priceasc"]
//                 : zestawyObj["pricedesc"]
//         case "kcalPorcja":
//             return order === "asc"
//                 ? zestawyObj["kcalPorcjaasc"]
//                 : zestawyObj["kcalPorcjadesc"]
//         case "bialkoPorcja":
//             return order === "asc"
//                 ? zestawyObj["bialkoPorcjaasc"]
//                 : zestawyObj["bialkoPorcjadesc"]
//         default:
//             return zestawyObj["kcalPorcjadesc"]
//     }
// }

export default async function Page({ searchParams }) {
  const headersList = headers(); // bug next.js    ONLY FOR SSR
  const initialSorterData: Omit<Sorter, "style"> | any = {
    sort: "kcalPorcja",
    sortPath: "?sort=kcalPorcja&order=desc",
    order: "desc",
  };

  let { sort, order } = searchParams;
  sort ? sort : (sort = initialSorterData.sort); // DEFAULT QUERY (IF NO QUERY IN URL)
  order ? order : (order = initialSorterData.order);
  const products = await getZestawy(sort, order);
  return (
    <>
      <div className={s.zestawyWrapper}>
        <div className={s.header}>
          <h1 className={s.title}>Zestawy</h1>
          <div>
            <strong className={s.sorting}>Sortowanie:</strong>
            <SortButtons initialData={initialSorterData} />
          </div>
        </div>
        <div className={s.list}>
          <List products={products} />
        </div>
      </div>
    </>
  );
}
