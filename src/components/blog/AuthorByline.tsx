import authorsData from "@/data/authors.json";

type AuthorEntry = {
  name: string;
  bio: string;
  avatar: string;
};

type Authors = Record<string, AuthorEntry>;

function initials(name: string): string {
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

type Props = { authorSlug: string };

export function AuthorByline({ authorSlug }: Props) {
  const author = (authorsData as Authors)[authorSlug];
  if (!author) return null;

  return (
    <div className="flex items-center gap-3 mt-4 mb-2">
      <div
        className="w-10 h-10 rounded-full bg-leaf/20 text-earth flex items-center justify-center text-sm font-semibold shrink-0"
        aria-hidden="true"
      >
        {initials(author.name)}
      </div>
      <div>
        <p className="text-sm font-semibold text-earth leading-tight">{author.name}</p>
        <p className="text-xs text-earth/50 leading-snug">{author.bio}</p>
      </div>
    </div>
  );
}
