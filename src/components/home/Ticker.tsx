const FACTS = [
  "100% unrefined",
  "One ingredient",
  "Cold-pressed",
  "No added fragrance",
  "No preservatives",
  "Melts at skin temperature",
  "Delivered across Kenya",
];

export function Ticker() {
  return (
    <div className="lv-ticker" aria-hidden="true">
      <div className="lv-lane">
        {[...FACTS, ...FACTS].map((fact, i) => (
          <span key={i}>{fact}</span>
        ))}
      </div>
    </div>
  );
}
