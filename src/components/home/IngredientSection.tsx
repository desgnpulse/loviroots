import { Reveal } from "./Reveal";
import type { Product } from "@/lib/products";

type Props = { product: Product };

export function IngredientSection({ product }: Props) {
  // Derive the display INCI name from the real product data rather than
  // hardcoding it - products.ts currently lists a single ingredient:
  // "Butyrospermum Parkii (Shea) Butter".
  const inciFull = product.ingredients[0] ?? "Shea Butter";
  const inciName = inciFull.replace(/\s*\([^)]*\)\s*/g, " ").replace(/\s+/g, " ").trim();
  const isSingleIngredient = product.ingredients.length === 1;

  return (
    <section id="ingredient" className="lv-section lv-ingredient" aria-labelledby="lv-inci-title">
      <div className="lv-shell" style={{ textAlign: "center" }}>
        <p className="lv-eyebrow" style={{ marginBottom: "1.4rem" }}>
          {isSingleIngredient ? "The full ingredient list, in its entirety" : "What's inside"}
        </p>
        <h2 className="lv-inci" id="lv-inci-title">
          {inciName}.
        </h2>
        {isSingleIngredient && <p className="lv-inci-sub">That&rsquo;s shea butter. That&rsquo;s all of it.</p>}

        <Reveal as="div" className="lv-label-card" delayMs={0}>
          <div role="group" aria-label="Product label details">
            <p className="lv-lhead">
              <b>{product.name.toUpperCase()}</b>
              <span>INCI &middot; 100%</span>
            </p>
            <dl>
              <div className="lv-row">
                <dt>Added fragrance</dt>
                <dd>
                  <b>None</b>{" "} - the scent is the shea
                </dd>
              </div>
              <div className="lv-row">
                <dt>Preservatives</dt>
                <dd>
                  <b>None</b>{" "} - naturally shelf-stable
                </dd>
              </div>
              <div className="lv-row">
                <dt>Bleaching / deodorising</dt>
                <dd>
                  <b>Never</b>{" "} - ivory colour left as pressed
                </dd>
              </div>
              <div className="lv-row">
                <dt>Origin</dt>
                <dd>West Africa &middot; cold-pressed</dd>
              </div>
              <div className="lv-row">
                <dt>Delivered</dt>
                <dd>Across Kenya</dd>
              </div>
            </dl>
            <p className="lv-lfoot">
              <span>Face &middot; Body &middot; Lips &middot; Hair ends</span>
              <span>Melts at skin temp</span>
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
