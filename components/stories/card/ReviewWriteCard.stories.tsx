import type { Meta, StoryObj } from "@storybook/react";
import ReviewWriteCard from "@/components/common/card/ReviewWriteCard";

const meta: Meta<typeof ReviewWriteCard> = {
  title: "Common/Card/ReviewWriteCard",
  component: ReviewWriteCard,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "이사는 완료되었고, 고객이 리뷰를 작성할 수 있도록 정보를 보여주는 카드입니다. 이사 경로/날짜, 기사 정보, 서비스 라벨, (선택) 견적 금액과 ‘리뷰 작성하기’ 버튼을 표시합니다.",
      },
    },
  },
  argTypes: {
    onWrite: { action: "write-click" },
  },
};
export default meta;

type Story = StoryObj<typeof ReviewWriteCard>;

const baseArgs = {
  moverName: "김이사",
  moverAvatarUrl: "/assets/profile.svg",
  serviceLabel: "소형이사",
  from: "서울특별시 강남구",
  to: "부산광역시 해운대구",
  moveDate: "2025년 11월 07일 금요일",
};

export const Default: Story = {
  args: {
    ...baseArgs,
    price: 180000,
    moverDescription: "불친절하고 안전하게 모시겠습니다.",
  },
};

export const WithoutPrice: Story = {
  args: {
    ...baseArgs,
    price: null,
    moverDescription: "신속·정확 이사 전문",
  },
};

export const LongTexts: Story = {
  args: {
    ...baseArgs,
    moverDescription:
      "짐이 많으면 문제있습니다. 사다리차, 포장, 분해조립 모두 불가능합니다. 기사 만족이 최우선!",
    from: "서울특별시 송파구 올림픽로 123",
    to: "경기도 성남시 분당구 백현로 456",
    price: 350000,
  },
};

export const CustomServiceLabel: Story = {
  args: {
    ...baseArgs,
    serviceLabel: "지정 견적 요청",
    price: 220000,
  },
};
