"use client";

import { Zestaw, Zarcie, ZestawRanks, Napoj } from "@/types/types";
import HeroZestaw from "@/components/HeroZestaw/HeroZestaw";
import { useState, useEffect, useRef } from "react";
import s from "./Carousel.module.css";
import { TbArrowBackUp, TbChevronLeft, TbChevronRight } from "react-icons/tb";
import { MdViewCarousel, MdOutlineViewCarousel } from "react-icons/md";
import { useEffectAfterMount } from "@/hooks/useEffectAfterMount";

function createInitialDivs(products, InitialIndex, LAST_ITEM, productsRank) {
  let prevProduct, nextProduct, prevProductRank, nextProductRank;

  if (InitialIndex === LAST_ITEM) {
    nextProduct = products[0];
    productsRank ? (nextProductRank = productsRank[0]) : null;
  } else {
    nextProduct = products[InitialIndex + 1];
    productsRank ? (nextProductRank = productsRank[InitialIndex + 1]) : null;
  }

  const currProduct = products[InitialIndex];
  let currProductRank;
  productsRank ? (currProductRank = productsRank[InitialIndex]) : null;

  if (InitialIndex === 0) {
    prevProduct = products.at(-1);
    productsRank ? (prevProductRank = productsRank.at(-1)) : null;
  } else {
    prevProduct = products[InitialIndex - 1];
    productsRank ? (prevProductRank = productsRank[InitialIndex - 1]) : null;
  }

  return productsRank
    ? [
        <div key={prevProduct.id} id={prevProduct.slug}>
          <HeroZestaw product={prevProduct} productRanks={prevProductRank} />
        </div>,
        <div key={"initial"} id={currProduct.slug}>
          <HeroZestaw product={currProduct} productRanks={currProductRank} />
        </div>,
        <div key={nextProduct.id} id={nextProduct.slug}>
          <HeroZestaw product={nextProduct} productRanks={nextProductRank} />
        </div>,
      ]
    : [
        <div key={prevProduct.id} id={prevProduct.slug}>
          <HeroZestaw product={prevProduct} />
        </div>,
        <div key={"initial"} id={currProduct.slug}>
          <HeroZestaw product={currProduct} />
        </div>,
        <div key={nextProduct.id} id={nextProduct.slug}>
          <HeroZestaw product={nextProduct} />
        </div>,
      ];
}

function createDiv(product, productsRank) {
  return productsRank ? (
    <div key={product.id} id={product.slug}>
      <HeroZestaw product={product} productRanks={productsRank} />
    </div>
  ) : (
    <div key={product.id} id={product.slug}>
      <HeroZestaw product={product} />
    </div>
  );
}

export default function Carousel({
  products, // sorted by name asc
  productsRank,
  initialIndex,
  max,
}: {
  products: Zestaw[] | Zarcie[] | Napoj[];
  productsRank?: ZestawRanks[];
  initialIndex: number;
  max: number;
}) {
  const LAST_ITEM = max - 1;
  const [currentIndex, setCurrentIndex] = useState<number>(initialIndex);
  const [lastClicked, setLastClicked] = useState<"prev" | "next" | "">("");
  const [divs, setDivs] = useState<JSX.Element[]>(() =>
    createInitialDivs(products, initialIndex, LAST_ITEM, productsRank)
  );
  const [carouselOn, setCarouselOn] = useState<boolean>(false);
  const [touchStart, setTouchStart] = useState<number>(0);
  const [touchEnd, setTouchEnd] = useState<number>(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const initialRef = useRef<HTMLDivElement>(null);
  const currentRef = useRef<HTMLDivElement>(null);
  const MEMOIZED_INDEXES = useRef<Set<number>>(
    new Set([initialIndex, initialIndex + 1, initialIndex - 1])
  ).current;

  const currentHref = products[currentIndex].slug;
  const currentProduct = products[currentIndex];

  function addMemoizedIndex(index: number) {
    if (MEMOIZED_INDEXES.size < max) {
      return MEMOIZED_INDEXES.add(index);
    }
    throw new Error("Memoized indexes reached max size");
  }

  useEffect(() => {
    document.body.style.overflowY = "hidden";
    setCarouselOn(localStorage.getItem("carouselOn") === "true" ? true : false);
    currentRef.current?.scrollIntoView({ behavior: "auto", inline: "center" });
    return () => {
      document.body.style.overflowY = "auto";
    };
  }, []);

  useEffect(() => {
    if (lastClicked === "next" && !MEMOIZED_INDEXES.has(currentIndex + 1)) {
      addMemoizedIndex(currentIndex + 1);
      const product = products[currentIndex + 1];
      const newHero = createDiv(
        product,
        productsRank ? productsRank[currentIndex + 1] : null
      );
      setDivs((prev) => [...prev, newHero]); //  tak byloby dla anchorow
    } else if (
      lastClicked === "prev" &&
      !MEMOIZED_INDEXES.has(currentIndex - 1)
    ) {
      addMemoizedIndex(currentIndex - 1);
      const product = products[currentIndex - 1];
      const newHero = createDiv(
        product,
        productsRank ? productsRank[currentIndex - 1] : null
      );
      setDivs((prev) => [newHero, ...prev]); //  tak byloby dla anchorow
    } else {
      setDivs((prev) => [...prev]);
    }
  }, [currentIndex]);

  useEffect(() => {
    /// ISTOTNY JEST TEN USEEFFECT, I CZEKANIE AZ ZAKTUALIZUJA SIE WSZYSTKIE DIVY, ZEBY NASZ SCROLLBAR NIE PRZESKIKIWAL SAM PRZY PREV
    const handleScroll = () => {
      if (lastClicked === "next") {
        if (
          !currentRef.current?.previousSibling &&
          carouselRef.current?.children.length === LAST_ITEM
        ) {
          return currentRef.current?.scrollIntoView({
            behavior: "auto",
            inline: "center",
          });
        }
        return currentRef.current?.scrollIntoView({
          behavior: "smooth",
          inline: "center",
        });
      }
      if (lastClicked === "prev") {
        if (
          !currentRef.current?.nextSibling &&
          carouselRef.current?.children.length === LAST_ITEM
        ) {
          return currentRef.current?.scrollIntoView({
            behavior: "auto",
            inline: "center",
          });
        }
        return currentRef.current?.scrollIntoView({
          behavior: "smooth",
          inline: "center",
        });
      }
    };
    handleScroll();

    history.pushState(null, currentProduct.name, `${currentHref}`);
  }, [divs]);

  useEffectAfterMount(() => {
    localStorage.setItem("carouselOn", `${carouselOn}`);
  }, [carouselOn]);

  function handleNext() {
    setLastClicked("next");
    if (currentIndex === LAST_ITEM - 1 || currentIndex === LAST_ITEM) {
      return setCurrentIndex(0);
    }
    setCurrentIndex((prev) => prev + 1);
  }

  function handlePrev() {
    setLastClicked("prev");
    if (currentIndex === 0 || currentIndex === 1) {
      return setCurrentIndex(LAST_ITEM);
    }
    setCurrentIndex((prev) => prev - 1);
  }

  function handleTouchEnd() {
    if (touchStart && touchEnd) {
      if (touchStart - touchEnd > 60) {
        setTouchStart(0);
        setTouchEnd(0);
        handleNext();
      } else if (touchStart - touchEnd < -60) {
        setTouchStart(0);
        setTouchEnd(0);
        handlePrev();
      }
    }
  }

  return (
    <div className={s.pageWrapper}>
      <div
        onTouchStart={(e) => setTouchStart(e.targetTouches[0].clientX)}
        onTouchMove={(e) => setTouchEnd(e.targetTouches[0].clientX)}
        onTouchEnd={handleTouchEnd}
        className={s.carousel}
        ref={carouselRef}
        style={{ overflow: carouselOn ? "auto" : "hidden" }}
      >
        {divs.map((div) => {
          // ISTOTNA JEST TUTAJ KOLEJNOSC IFOW:  current jest wazniejszy od initial
          // ISTOTNE SA TEZ KEY -> MUSZA BYC UNIKALNE ZAROWNO TUTAJ JAK I  INITIAL DIVS
          if (div.props.id == currentHref) {
            return (
              <div key={div.props.id} className={s.current} ref={currentRef}>
                {div}
              </div>
            );
          }
          if (div.key === "initial") {
            return (
              <div key={div.props.id} className={s.initial} ref={initialRef}>
                {div}
              </div>
            );
          }
          return (
            <div className={s.normal} key={div.props.id}>
              {div}
            </div>
          );
        })}
      </div>

      <div
        className={s.swipeButtons}
        style={{ display: carouselOn ? "flex" : "none" }}
      >
        <button
          className={`${s.swipeButton} ${s.swipeButtonLeft}`}
          onClick={handlePrev}
        >
          <TbChevronLeft />
        </button>
        <button
          onClick={() => {
            setCurrentIndex(initialIndex);
            initialRef.current?.scrollIntoView({
              behavior: "smooth",
              inline: "center",
            });
          }}
          style={{ display: "none" }}
          className={`${s.swipeButton} ${s.initialButton}`}
        >
          <TbArrowBackUp />
        </button>
        <button
          className={`${s.swipeButton} ${s.swipeButtonRight}`}
          onClick={handleNext}
        >
          <TbChevronRight />
        </button>
      </div>

      <div className={s.modeButtons}>
        <button onClick={() => setCarouselOn((prev) => !prev)}>
          {carouselOn ? <MdOutlineViewCarousel /> : <MdViewCarousel />}
        </button>
        <button
          onClick={() => {
            setCurrentIndex(initialIndex);
            initialRef.current?.scrollIntoView({
              behavior: "smooth",
              inline: "center",
            });
          }}
          style={{ display: carouselOn ? "block" : "none" }}
          className={s.initialButton}
        >
          <TbArrowBackUp />
        </button>
      </div>
    </div>
  );
}
// DOMYŚLNIE:
// {isZestaw(product) ? (
//     <HeroZestaw product={product} productRanks={productRanks} />
// ) : (
//     // <HeroFood product={product} productRanks={productRanks} />
// )}
