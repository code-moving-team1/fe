import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import ReviewWriteModal from "../../common/modal/ReviewWriteModal";
import { Buttons } from "../../common/button";

const meta: Meta<typeof ReviewWriteModal> = {
  title: "Common/Modal/ReviewWriteModal",
  component: ReviewWriteModal,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "리뷰 작성 모달입니다. 이사유형 칩, 이사 경로, 날짜, 평점(별점)과 리뷰 텍스트를 입력받습니다.",
      },
    },
  },
};
export default meta;

type Story = StoryObj<typeof ReviewWriteModal>;

export const Default: Story = {
  render: () => {
    const [rating, setRating] = useState(0);
    const [reviewText, setReviewText] = useState("");
    const [submitting, setSubmitting] = useState(false);

    const handleSubmit = async (value: string) => {
      setSubmitting(true);
      await new Promise((res) => setTimeout(res, 1000));
      alert(`리뷰 등록 완료!\n평점: ${rating}\n내용: ${value}`);
      setSubmitting(false);
    };

    return (
      <ReviewWriteModal
        trigger={
          <Buttons className="bg-orange-500 text-white hover:bg-orange-600">
            리뷰 쓰기 모달 열기
          </Buttons>
        }
        moverName="이삿짐 센터"
        moverAvatarSrc="/images/sample-avatar.png"
        moveTypes={["small"]}
        fromAddress="서울특별시 강남구"
        toAddress="부산광역시 해운대구"
        moveDateText="2025-11-05"
        rating={rating}
        onChangeRating={setRating}
        reviewText={reviewText}
        onChangeReviewText={setReviewText}
        onSubmit={handleSubmit}
        submitting={submitting}
      />
    );
  },
};
