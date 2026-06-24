import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getPendingReviews, updateReview } from "@/lib/admin-store";
import { StarRating } from "@/components/product/StarRating";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Reviews | Lovi Admin" };

async function approveReview(id: string) {
  "use server";
  updateReview(id, "approved");
  redirect("/admin/reviews");
}

async function rejectReview(id: string) {
  "use server";
  updateReview(id, "rejected");
  redirect("/admin/reviews");
}

export default function ReviewsPage() {
  const reviews = getPendingReviews();

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-earth mb-6">
        Review queue
        {reviews.length > 0 && (
          <span className="ml-2 text-sm font-normal text-earth/40">
            {reviews.length} pending
          </span>
        )}
      </h1>

      {reviews.length === 0 ? (
        <div className="bg-white rounded-2xl border border-earth/10 p-12 text-center">
          <p className="text-earth/40 text-sm">No reviews awaiting approval.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {reviews.map((review) => {
            const boundApprove = approveReview.bind(null, review.id);
            const boundReject = rejectReview.bind(null, review.id);
            return (
              <div
                key={review.id}
                className="bg-white rounded-2xl border border-earth/10 p-6"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-earth text-sm">{review.reviewerName}</span>
                      <StarRating rating={review.rating} size="sm" />
                    </div>
                    <p className="text-xs text-earth/40 mb-2">
                      {review.productName} ·{" "}
                      {new Date(review.createdAt).toLocaleDateString("en-GB")}
                    </p>
                    <p className="text-sm text-earth/70 leading-relaxed">{review.body}</p>
                  </div>
                  <div className="flex gap-2 shrink-0">
                    <form action={boundApprove}>
                      <button
                        type="submit"
                        className="px-4 py-1.5 bg-leaf/10 text-leaf text-xs font-medium rounded-full hover:bg-leaf/20 transition-colors"
                      >
                        Approve
                      </button>
                    </form>
                    <form action={boundReject}>
                      <button
                        type="submit"
                        className="px-4 py-1.5 bg-red-50 text-red-500 text-xs font-medium rounded-full hover:bg-red-100 transition-colors"
                      >
                        Reject
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
