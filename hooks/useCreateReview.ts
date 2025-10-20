// hooks/useCreateReview.ts
import { useMutation } from "@tanstack/react-query";
import { createReview } from "@/lib/api/review";

export function useCreateReview() {
  return useMutation({
    mutationFn: ({
      bookingId,
      rating,
      content,
    }: {
      bookingId: string;
      rating: number;
      content: string;
    }) => createReview(bookingId, { rating, content }),
  });
}
