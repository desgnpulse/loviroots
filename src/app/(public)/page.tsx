import type { Metadata } from "next";
import { EmailCapture } from "@/components/marketing/EmailCapture";
import { HeroSection } from "@/components/home/HeroSection";
import { TempRail } from "@/components/home/TempRail";
import { Ticker } from "@/components/home/Ticker";
import { StatesSection } from "@/components/home/StatesSection";
import { IngredientSection } from "@/components/home/IngredientSection";
import { OrderSection } from "@/components/home/OrderSection";
import { StorySection } from "@/components/home/StorySection";
import { JournalSection } from "@/components/home/JournalSection";
import { getAllProducts } from "@/lib/wp/products";
import { getAllPosts } from "@/lib/wp/blog";

export const metadata: Metadata = {
  title: "Natural Shea Butter Skincare | Loviroots",
  description:
    "100% natural, unrefined shea butter sourced from West Africa. Pure skincare rooted in African heritage, delivered across Kenya.",
};

const WA_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "";

export default async function HomePage() {
  const [products, posts] = await Promise.all([getAllProducts(), getAllPosts()]);
  const product = products[0];

  const heroWaUrl = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(
    "Hi Lovi! I'd like to learn more about your shea butter. Please assist."
  )}`;

  return (
    <div className="lovi-home">
      <TempRail />

      <HeroSection heroWaUrl={heroWaUrl} fromPrice={product.sizes[0].price} />

      <Ticker />

      <StatesSection />

      <IngredientSection product={product} />

      {/* Real ordering mechanism: OrderSection calls the same
          singleItemWhatsAppUrl builder used by useWhatsAppOrder / the cart
          flow, driven by the real PRODUCTS sizes (100g/200g/500g) from
          src/lib/products.ts — not the static design's placeholder
          250g/750/1300 figures. */}
      <OrderSection product={product} />

      <StorySection />

      <JournalSection posts={posts} />

      <EmailCapture />
    </div>
  );
}
