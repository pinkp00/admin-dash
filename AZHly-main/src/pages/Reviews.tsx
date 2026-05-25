import React, { useState } from "react";
import { Search, Star, ThumbsUp, ThumbsDown, CheckCircle, Clock } from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const REVIEWS = [
  { id: "REV001", user: "Ali Khan", space: "Study Room A", rating: 5, comment: "Excellent space! Very clean, quiet, and well-equipped. The WiFi was lightning fast and the AC was perfectly set.", date: "May 22, 2025", status: "Published", helpful: 12 },
  { id: "REV002", user: "Sara Malik", space: "Conference Room", rating: 4, comment: "Great conference room with all the essentials. The projector setup was seamless. Would highly recommend for team meetings.", date: "May 21, 2025", status: "Published", helpful: 8 },
  { id: "REV003", user: "Zain Abbas", space: "Private Office", rating: 5, comment: "Perfect for deep work sessions. Completely private and comfortable. I booked it for a week straight!", date: "May 20, 2025", status: "Pending", helpful: 5 },
  { id: "REV004", user: "Hira Sheikh", space: "Event Hall", rating: 2, comment: "The event hall had some technical issues with the sound system. Staff was helpful but it disrupted our event.", date: "May 19, 2025", status: "Pending", helpful: 3 },
  { id: "REV005", user: "Usman Raza", space: "Study Room B", rating: 4, comment: "Good space overall. A bit smaller than expected but very cozy. Definitely coming back.", date: "May 18, 2025", status: "Published", helpful: 7 },
  { id: "REV006", user: "Ayesha Noor", space: "Meeting Room 1", rating: 5, comment: "Top-notch meeting room. The TV screen quality was amazing. Our client was very impressed.", date: "May 17, 2025", status: "Published", helpful: 15 },
];

const Reviews: React.FC = () => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [ratingFilter, setRatingFilter] = useState(0);

  const totalReviews = REVIEWS.length;
  const avgRating = (REVIEWS.reduce((a, r) => a + r.rating, 0) / totalReviews).toFixed(1);
  const published = REVIEWS.filter((r) => r.status === "Published").length;

  const filtered = REVIEWS.filter((r) => {
    const matchSearch = r.user.toLowerCase().includes(search.toLowerCase()) || r.space.toLowerCase().includes(search.toLowerCase()) || r.comment.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "All" || r.status === filter;
    const matchRating = ratingFilter === 0 || r.rating === ratingFilter;
    return matchSearch && matchFilter && matchRating;
  });

  return (
    <DashboardLayout>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
        <div>
          <h1 className="text-2xl font-bold">Reviews</h1>
          <p className="text-muted-foreground text-sm mt-0.5">Monitor and moderate user feedback</p>
        </div>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-card border border-border rounded-2xl p-5 shadow-card card-hover">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl gradient-purple-pink flex items-center justify-center shadow-brand-sm">
              <Star className="w-5 h-5 text-white fill-white" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Average Rating</p>
              <p className="text-2xl font-bold">{avgRating}<span className="text-sm text-muted-foreground font-normal"> / 5</span></p>
            </div>
          </div>
          <div className="flex gap-0.5 mt-3">
            {[1,2,3,4,5].map((s) => (
              <Star key={s} className={cn("w-4 h-4", s <= Math.round(Number(avgRating)) ? "text-amber-400 fill-amber-400" : "text-muted-foreground")} />
            ))}
          </div>
        </div>
        <div className="bg-card border border-border rounded-2xl p-5 shadow-card card-hover">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl gradient-blue-purple flex items-center justify-center shadow-brand-sm">
              <CheckCircle className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Published</p>
              <p className="text-2xl font-bold">{published}</p>
            </div>
          </div>
        </div>
        <div className="bg-card border border-border rounded-2xl p-5 shadow-card card-hover">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl gradient-pink-orange flex items-center justify-center shadow-brand-sm">
              <Clock className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Pending Review</p>
              <p className="text-2xl font-bold">{totalReviews - published}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-5">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            placeholder="Search reviews..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm bg-card border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {["All", "Published", "Pending"].map((f) => (
            <button key={f} onClick={() => setFilter(f)} className={cn("px-3 py-2 rounded-xl text-sm font-medium transition-all", filter === f ? "gradient-purple-pink text-white shadow-brand-sm" : "bg-card border border-border hover:bg-muted text-muted-foreground")}>
              {f}
            </button>
          ))}
          <div className="flex items-center gap-1 bg-card border border-border rounded-xl px-2">
            {[0,1,2,3,4,5].map((r) => (
              <button key={r} onClick={() => setRatingFilter(r)} className={cn("px-1.5 py-1.5 text-xs font-medium rounded-lg transition-colors", ratingFilter === r ? "text-amber-400" : "text-muted-foreground hover:text-amber-400")}>
                {r === 0 ? "All ★" : `${r}★`}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        {filtered.map((review) => (
          <div key={review.id} className="bg-card border border-border rounded-2xl p-5 shadow-card card-hover">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-3 flex-1 min-w-0">
                <div className="w-10 h-10 rounded-xl gradient-purple-pink flex items-center justify-center text-white font-bold text-sm shrink-0">
                  {review.user.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="font-semibold text-sm">{review.user}</p>
                    <span className="text-xs text-muted-foreground">·</span>
                    <p className="text-xs text-muted-foreground">{review.space}</p>
                    <span className="text-xs text-muted-foreground">·</span>
                    <p className="text-xs text-muted-foreground">{review.date}</p>
                  </div>
                  <div className="flex gap-0.5 my-1.5">
                    {[1,2,3,4,5].map((s) => (
                      <Star key={s} className={cn("w-3.5 h-3.5", s <= review.rating ? "text-amber-400 fill-amber-400" : "text-muted-foreground")} />
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{review.comment}</p>
                  <div className="flex items-center gap-3 mt-3">
                    <button onClick={() => toast.success("Marked as helpful!")} className="flex items-center gap-1 text-xs text-muted-foreground hover:text-emerald-500 transition-colors">
                      <ThumbsUp className="w-3.5 h-3.5" />
                      {review.helpful} helpful
                    </button>
                    <button onClick={() => toast.error("Flagged for review")} className="flex items-center gap-1 text-xs text-muted-foreground hover:text-red-500 transition-colors">
                      <ThumbsDown className="w-3.5 h-3.5" />
                      Flag
                    </button>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-end gap-2 shrink-0">
                <span className={cn("px-2.5 py-1 rounded-full text-xs font-semibold", review.status === "Published" ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400" : "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400")}>
                  {review.status}
                </span>
                {review.status === "Pending" && (
                  <div className="flex gap-1">
                    <button onClick={() => toast.success("Review approved!")} className="px-2.5 py-1 text-xs font-semibold bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors">Approve</button>
                    <button onClick={() => toast.error("Review rejected")} className="px-2.5 py-1 text-xs font-semibold bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors">Reject</button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="py-16 text-center text-muted-foreground text-sm">No reviews found.</div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Reviews;
