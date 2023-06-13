import { Zarcie } from "@/types/types";
import s from "../list.module.css";
import SortButtons from "@/components/SortButtons/SortButtons";
import { Sorter } from "@/components/SortButtons/SortTypes";
import { getNapoje } from "@/utils/prisma";
import { headers } from "next/headers";
import List from "@/components/List/List";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

export const metadata = {
  title: "Napoje | TanieZarcie",
  description: "TanieZarcie.pl - katalog z napojami",
};

export default async function Page({ searchParams }) {
  const initialSorterData: Omit<Sorter, "style"> = {
    sort: "PRICE",
    sortPath: "?sort=price&order=asc",
    order: "asc",
  };
  let { sort, order } = searchParams;
  sort ? sort : (sort = initialSorterData.sort); // DEFAULT QUERY (IF NO QUERY IN URL)
  order ? order : (order = initialSorterData.order);
  // const napoje = await getNapoje(sort, order)
  const products = await getNapoje(sort, order);

  return (
    <>
      <div className={s.zestawyWrapper}>
        <div className={s.header}>
          <h1 className={s.title}>Napoje</h1>
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
