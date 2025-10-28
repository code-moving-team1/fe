import type { Meta, StoryObj } from "@storybook/react";
import ReviewWrittenCard from "@/components/common/card/ReviewWrittenCard";

const meta: Meta<typeof ReviewWrittenCard> = {
  title: "Common/Card/ReviewWrittenCard",
  component: ReviewWrittenCard,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "`ReviewWrittenCard`는 사용자가 작성한 리뷰 내용을 보여주는 카드입니다. 기사 정보, 별점, 코멘트, 수정/삭제 버튼 등을 포함합니다.",
      },
    },
  },
};
export default meta;

type Story = StoryObj<typeof ReviewWrittenCard>;

const baseArgs = {
  moverName: "박이사",
  moverAvatarUrl: "/assets/profile.svg",
  serviceLabel: "소형이사",
  from: "서울 강남구",
  to: "부산 해운대구",
  moveDate: "2025년 11월 07일 (금)",
  rating: 1,
  comment:
    "이사 너무 깔끔하게 해주셨어요! 시간도 정확하고 친절했습니다. 하지만 기사님이 불친절하셔서 5점 같은 1점 드립니다!",
  price: 180000,
  moverDescription: "친절한 기사님, 전국 어디든 OK!",
};

export const Default: Story = {
  args: {
    ...baseArgs,
  },
};

export const LongComment: Story = {
  args: {
    ...baseArgs,
    comment:
      "정말 최고의 이사였습니다. 포장부터 정리까지 꼼꼼하게 해주셔서 감사했어요.\n" +
      "짐이 많았는데도 빠르게 진행해주셨고, 손상 하나 없이 끝났습니다.\n" +
      "다음에 또 이용할게요 👍",
  },
};

export const LowerRating: Story = {
  args: {
    ...baseArgs,
    rating: 3,
    comment:
      "전반적으로 만족스러웠지만 약간의 지연이 있었습니다. 그래도 친절했어요!",
  },
};
