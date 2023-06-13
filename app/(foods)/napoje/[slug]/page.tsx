import { getNapoje, getNapoj, getNapojeSorted } from "@/utils/prisma";
import { Metadata } from "next";
import Carousel from "@/components/Carousel/Carousel";

export const fetchCache = "force-cache";

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = await getNapoj(params.slug);
  if (!product) throw new Error("No such product");
  return {
    title: product.name + " | TanieZarcie",
    description: "TanieZarcie.pl - Karta napoju, wartosci odzywcze, ceny",
  };
}

export default async function Page({ params }) {
  let currIndex: number = 1;
  let product;
  const productsArr = await getNapojeSorted(); // sposób sortowania wyznacza kolejnosc w karuzeli

  const [count, products] = productsArr;

  if (products) {
    product = products.find((elem) => elem.slug === params.slug);
  }
  if (product) {
    currIndex = products.findIndex((elem) => product.slug === elem.slug);
  } else {
    throw new Error("Ups! Niczego tu nie ma...");
  }

  return (
    <Carousel
      products={products} // sorted by Name asc
      initialIndex={currIndex}
      max={count}
    />
  );
}

export async function generateStaticParams() {
  const napoje = await getNapoje("price", "asc");
  if (napoje) return napoje.map((napoj) => ({ slug: napoj.slug }));
  else throw new Error("Napoj not found");
}
