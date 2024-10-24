import ContentWrapper from "@/components/common/content-wrapper/ContentWrapper";
import { Certified, GoodPrice, HighQuality } from "@/components/common/icons/icons";
import CallToAction from "@/components/custom/CallToAction/CallToAction";
import Categories from "@/components/custom/Category/Categories";
import FeaturedProducts from "@/components/custom/FeaturedProducts/FeaturedProducts";
import Hero from "@/components/custom/Hero/Hero";
import ValuesCard from "@/components/custom/ValuesCard/ValuesCard";
import { StaticProductList } from "@/constants/sampleProducts";
import heroImg from "~/public/assets/images/hero/Hero.jpg";
import heroBG from "~/public/assets/images/hero/heroBG.png";

export default function Home() {
  return (
    <>
      <Hero
        backgroundPath={heroBG.src}
        heroImage={heroImg.src}
        title="Delicious cakes and desserts for you!"
        subtile="We have a large selection of delicious cakes, desserts and pastries. Suitable for both holidays and regular days. Delicious!"
      />
      <Categories />
      <ContentWrapper className="flex md:flex-row gap-10 mb-24 mt-0 md:gap-5 max-w-[1440px]">
        <ValuesCard
          title="Good price"
          img={<GoodPrice />}
          description="We create affordable prices due to well-established processes, modern energy-efficient production, and direct wholesale purchases of ingredients."
        />
        <ValuesCard
          title="A high quality"
          img={<HighQuality />}
          description={[
            "Modern production",
            "Own production of blanks for desserts",
            "The best suppliers of raw materials",
            "Own logistics",
            "Own wide network of stores",
          ]}
        />
        <ValuesCard
          title="All products are certified"
          img={<Certified />}
          description="Our products pass all modern quality checks. Every ingredient, every product is checked by state quality guarantors and our long-standing reputation."
        />
      </ContentWrapper>
	  <CallToAction/>
	  
	  <FeaturedProducts products={StaticProductList}/>
    </>
  );
}
