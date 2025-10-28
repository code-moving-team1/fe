import type { Meta, StoryObj } from "@storybook/react";
import WaitingRequestCard from "@/components/common/card/WaitingRequestCard";

const meta: Meta<typeof WaitingRequestCard> = {
  title: "Common/Card/WaitingRequestCard",
  component: WaitingRequestCard,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "고객 입장에서 ‘기사님 견적 대기/확정’ 상황을 보여주는 카드입니다. 기사 프로필, 평점/경력/확정건수, 좋아요, 금액, 액션 버튼(상세보기/확정하기)을 포함합니다.",
      },
    },
  },
  argTypes: {
    onConfirm: { action: "confirm-click" },
    onViewDetail: { action: "view-detail-click" },
  },
};
export default meta;

type Story = StoryObj<typeof WaitingRequestCard>;

const baseArgs = {
  driverName: "김기사",
  description: "7년 경력의 포장이사 전문가입니다.",
  avatarUrl: "/assets/profile.svg",
  rating: 4.9,
  reviewCount: 178,
  careerYears: 7,
  confirmedCount: 334,
  price: 180000,
  comment: "안전하게 모시겠습니다. 엘리베이터 유무만 확인 부탁드려요!",
  likeCount: 136,
  moveType: "소형이사",
  requestType: "지정 견적 요청",
  chips: [
    { label: "소형이사", iconSrc: "/icons/ic_box.svg" },
    { label: "지정 견적 요청", iconSrc: "/icons/ic_document.svg" },
  ],
};

export const Default: Story = {
  args: {
    ...baseArgs,
  },
};

export const LoadingConfirm: Story = {
  args: {
    ...baseArgs,
    confirmLoading: true,
  },
};

export const DisabledConfirm: Story = {
  args: {
    ...baseArgs,
    confirmDisabled: true,
  },
};

export const WithoutChips: Story = {
  args: {
    ...baseArgs,
    chips: [],
  },
};

export const LongComment: Story = {
  args: {
    ...baseArgs,
    comment:
      "짐이 조금 많아도 문제 없습니다. 사다리차 필요 여부도 현장서 빠르게 판단해 드려요.\n" +
      "포장 박스 제공 가능하고, 시간 맞춰 정확히 방문 드리겠습니다.",
  },
};
