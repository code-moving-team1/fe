import type { Meta, StoryObj } from "@storybook/react";
import ReceivedRequestCard from "@/components/common/card/ReceivedRequestCard";

const meta: Meta<typeof ReceivedRequestCard> = {
  title: "Common/Card/ReceivedRequestCard",
  component: ReceivedRequestCard,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "고객에게서 도착한 이사 요청을 보여주는 카드입니다. 출발/도착지, 이사일, 요청 시각과 함께 ‘반려하기’, ‘견적보내기’ 액션을 제공합니다.",
      },
    },
  },
  argTypes: {
    onReject: { action: "reject-clicked" },
    onSendQuote: { action: "send-quote-clicked" },
  },
};
export default meta;

type Story = StoryObj<typeof ReceivedRequestCard>;

const chips = [
  { label: "소형이사", iconSrc: "/icons/ic_box.svg" },
  { label: "지정 견적 요청", iconSrc: "/icons/ic_document.svg" },
];

/** 기본 */
export const Default: Story = {
  args: {
    customerName: "김고객",
    from: "서울 강남구",
    to: "부산 해운대구",
    movingDate: "2025년 11월 07일 (금)",
    requestTime: "1시간 전",
    requestType: "지정 견적 요청",
    chips,
  },
};
