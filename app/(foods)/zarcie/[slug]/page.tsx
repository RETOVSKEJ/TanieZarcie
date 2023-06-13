import { getZarc, getZarcie, getZarcieSorted } from "@/utils/prisma";
import Carousel from "@/components/Carousel/Carousel";

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props) {
  const product = await getZarc(params.slug);
  if (!product) throw new Error("No such product");

  return {
    title: product.name + " | TanieZarcie",
    description: "TanieZarcie.pl - Karta Produktu, wartosci odzywcze, ceny",
  };
}

export default async function Page({ params }) {
  let currIndex: number = 1;
  let product;
  const productsArr = await getZarcieSorted(); // sposób sortowania wyznacza kolejnosc w karuzeli

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
  const zarcie = await getZarcie("price", "asc");
  if (zarcie) return zarcie.map((zarc) => ({ slug: zarc.slug }));
  else throw new Error("Zarcie not found");
}
