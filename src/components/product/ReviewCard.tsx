import { StarRating } from "./StarRating";

type ReviewCardProps = {
  name: string;
  rating: number;
  body: string;
  date?: string;
};

export function ReviewCard({ name, rating, body, date }: ReviewCardProps) {
  return (
    <article className="bg-white rounded-2xl p-6 shadow-sm border border-earth/5">
      <div className="flex items-start justify-between gap-4 mb-3">
        <div>
          <p className="font-medium text-earth text-sm">{name}</p>
          {date && <p className="text-earth/40 text-xs mt-0.5">{date}</p>}
        </div>
        <StarRating rating={rating} size="sm" />
      </div>
      <p className="text-earth/80 text-sm leading-relaxed">{body}</p>
    </article>
  );
}
