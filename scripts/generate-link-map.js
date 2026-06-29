#!/usr/bin/env node
// Generates src/data/link-graph.json — run with: node scripts/generate-link-map.js
// Re-run any time new articles are added.
// Add to prebuild: "prebuild": "node scripts/generate-link-map.js"

const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");

const CONTENT_DIR = path.join(__dirname, "../src/content/blog");
const OUTPUT_DIR = path.join(__dirname, "../src/data");
const OUTPUT_PATH = path.join(OUTPUT_DIR, "link-graph.json");

const RELATED_COUNT = 4;

// ── Topic clusters: pillar slug → cluster slugs ──────────────────────────────
// Pillar appears in related list for every cluster article.
// Cluster articles appear in each other's related lists.

const TOPIC_CLUSTERS = {
  "castor-oil-4c-hair-complete-guide": [
    "why-4c-hair-is-always-dry",
    "natural-hair-fatigue-simplify-routine",
    "lco-method-castor-oil-4c-hair",
    "loc-method-kenyan-4c-hair",
    "castor-oil-vs-chebe-oil-4c-hair",
    "protective-styles-black-castor-oil-retention",
    "scalp-massage-routine-for-hair-growth",
    "hair-growth-oil-not-working-real-reason",
    "castor-oil-and-4c-hair-science-vs-hype",
    "how-to-use-shea-butter-on-natural-hair",
    "castor-oil-pure-black-comfort-difference",
    "is-castor-oil-anti-inflammatory-what-we-know",
  ],
  "joint-pain-traditional-african-remedies-what-science-confirms": [
    "comfort-oil-herbs-explained",
    "is-castor-oil-anti-inflammatory-what-we-know",
    "what-our-elders-knew-about-joint-pain",
    "chronic-pain-you-are-not-imagining-it",
    "castor-oil-pure-black-comfort-difference",
  ],
  // Heritage cluster: no single pillar — treat as a flat peer group
  "grandmother-pressed-castor-oil-by-hand": [
    "a-beauty-what-african-brands-get-right",
    "what-our-elders-knew-about-joint-pain",
    "what-wildcrafted-actually-means",
    "east-african-vs-west-african-shea",
  ],
  "a-beauty-what-african-brands-get-right": [
    "grandmother-pressed-castor-oil-by-hand",
    "what-our-elders-knew-about-joint-pain",
    "what-wildcrafted-actually-means",
    "east-african-vs-west-african-shea",
    "natural-skincare-minimalist-moment",
  ],
};

// ── Keyword topic groups ──────────────────────────────────────────────────────
// Articles sharing a keyword group score bonus points.

const KEYWORD_GROUPS = [
  ["4c", "hair", "scalp", "castor", "growth", "edges", "wash", "moisture", "lco", "loc", "protective", "chebe", "breakage", "shea hair"],
  ["skin", "barrier", "hyperpigmentation", "dark spots", "melanin", "spf", "sunscreen", "moisturiser", "uneven tone", "dark skin"],
  ["joint", "pain", "comfort", "inflammation", "eucalyptus", "ginger", "anti-inflammatory", "chronic", "ricinoleic"],
  ["grandmother", "traditional", "elders", "african", "heritage", "a-beauty", "wildcrafted", "ancestor"],
  ["ingredient", "label", "formulation", "refine", "unrefined", "shea butter", "east african", "west african"],
];

// ── Load all articles ─────────────────────────────────────────────────────────

function loadArticles() {
  if (!fs.existsSync(CONTENT_DIR)) {
    console.error("Content directory not found:", CONTENT_DIR);
    process.exit(1);
  }

  return fs
    .readdirSync(CONTENT_DIR)
    .filter((f) => f.endsWith(".mdx") || f.endsWith(".md"))
    .map((filename) => {
      const filePath = path.join(CONTENT_DIR, filename);
      const raw = fs.readFileSync(filePath, "utf-8");
      const { data, content } = matter(raw);
      const slug = filename.replace(/\.(mdx|md)$/, "");
      return {
        slug,
        title: data.title ?? slug,
        excerpt: data.excerpt ?? "",
        coverImage: data.coverImage ?? "/images/blog/placeholder.jpg",
        category: data.category ?? "Blog",
        bodyText: content.toLowerCase(),
        titleWords: tokenize(data.title ?? ""),
        excerptWords: tokenize(data.excerpt ?? ""),
      };
    });
}

// ── Tokenizer ─────────────────────────────────────────────────────────────────

function tokenize(text) {
  return (text ?? "")
    .toLowerCase()
    .replace(/[^a-z0-9 ]/g, " ")
    .split(/\s+/)
    .filter((w) => w.length > 3);
}

// ── Scoring ───────────────────────────────────────────────────────────────────

function buildClusterIndex(articles) {
  const slugSet = new Set(articles.map((a) => a.slug));
  const index = {}; // slug -> Set of cluster-related slugs, with pillar boost

  for (const [pillar, members] of Object.entries(TOPIC_CLUSTERS)) {
    if (!slugSet.has(pillar)) continue;

    // Pillar links to every cluster member
    if (!index[pillar]) index[pillar] = {};
    for (const m of members) {
      if (slugSet.has(m)) index[pillar][m] = (index[pillar][m] || 0) + 8;
    }

    // Each cluster member links back to the pillar and to siblings
    for (const member of members) {
      if (!slugSet.has(member)) continue;
      if (!index[member]) index[member] = {};

      // Link back to pillar (high weight — this is the key SEO mechanic)
      index[member][pillar] = (index[member][pillar] || 0) + 10;

      // Link to cluster siblings (lower weight)
      for (const sibling of members) {
        if (sibling !== member && slugSet.has(sibling)) {
          index[member][sibling] = (index[member][sibling] || 0) + 4;
        }
      }
    }
  }

  return index;
}

function keywordGroupScore(a, b) {
  let score = 0;
  const aText = `${a.titleWords.join(" ")} ${a.excerptWords.join(" ")} ${a.bodyText}`;
  const bText = `${b.titleWords.join(" ")} ${b.excerptWords.join(" ")} ${b.bodyText}`;

  for (const group of KEYWORD_GROUPS) {
    const aHits = group.filter((kw) => aText.includes(kw)).length;
    const bHits = group.filter((kw) => bText.includes(kw)).length;
    if (aHits > 0 && bHits > 0) score += 3;
  }

  return score;
}

function titleOverlapScore(a, b) {
  const bWords = new Set(b.titleWords);
  return a.titleWords.filter((w) => bWords.has(w)).length * 2;
}

function excerptOverlapScore(a, b) {
  const bWords = new Set(b.excerptWords);
  return a.excerptWords.filter((w) => bWords.has(w)).length;
}

function categoryScore(a, b) {
  return a.category === b.category ? 5 : 0;
}

// ── Main ──────────────────────────────────────────────────────────────────────

function main() {
  const articles = loadArticles();
  console.log(`Loaded ${articles.length} articles`);

  const clusterIndex = buildClusterIndex(articles);
  const graph = {};

  for (const article of articles) {
    const scores = {};

    for (const other of articles) {
      if (other.slug === article.slug) continue;

      let score = 0;
      score += categoryScore(article, other);
      score += titleOverlapScore(article, other);
      score += excerptOverlapScore(article, other);
      score += keywordGroupScore(article, other);

      // Apply cluster bonuses
      const clusterBonus = clusterIndex[article.slug]?.[other.slug] ?? 0;
      score += clusterBonus;

      if (score > 0) scores[other.slug] = score;
    }

    // Sort by score, take top N
    const topSlugs = Object.entries(scores)
      .sort((a, b) => b[1] - a[1])
      .slice(0, RELATED_COUNT)
      .map(([slug]) => slug);

    const topArticles = topSlugs.map((slug) => {
      const a = articles.find((x) => x.slug === slug);
      return {
        slug: a.slug,
        title: a.title,
        excerpt: a.excerpt,
        coverImage: a.coverImage,
        category: a.category,
      };
    });

    graph[article.slug] = topArticles;
  }

  if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  fs.writeFileSync(OUTPUT_PATH, JSON.stringify(graph, null, 2));
  console.log(`Link graph written to ${OUTPUT_PATH}`);
  console.log(`${articles.length} articles × ${RELATED_COUNT} related = ${Object.keys(graph).length} entries`);
}

main();
