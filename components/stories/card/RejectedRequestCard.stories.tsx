import type { Meta, StoryObj } from "@storybook/react";
import RejectedRequestCard from "@/components/common/card/RejectedRequestCard";

const meta: Meta<typeof RejectedRequestCard> = {
  title: "Common/Card/RejectedRequestCard",
  component: RejectedRequestCard,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "반려된 견적 요청을 표시하는 카드입니다. 카드 전체가 반투명 오버레이로 덮이며 ‘반려된 요청이에요’ 문구를 표시합니다.",
      },
    },
  },
};
export default meta;

type Story = StoryObj<typeof RejectedRequestCard>;

const chips = [
  { label: "소형이사", iconSrc: "/icons/ic_box.svg" },
  { label: "지정 견적 요청", iconSrc: "/icons/ic_document.svg" },
];

/** 기본 예시 */
export const Default: Story = {
  args: {
    customerName: "이름",
    from: "서울 강남구",
    to: "부산 해운대구",
    movingDate: "2025년 11월 07일 (금)",
    moveType: "소형이사",
    requestType: "지정 견적 요청",
    price: 180000,
    chips,
  },
};

/** 가정이사 예시 */
export const FamilyMove: Story = {
  args: {
    customerName: "김고객",
    from: "서울 송파구",
    to: "경기 성남시",
    movingDate: "2025년 12월 01일 (월)",
    moveType: "가정이사",
    requestType: "일반 견적",
    price: 250000,
    chips: [{ label: "가정이사", iconSrc: "/icons/ic_home.svg" }],
  },
};

/** 사무실이사 예시 */
export const OfficeMove: Story = {
  args: {
    customerName: "박고객",
    from: "서울 종로구",
    to: "인천 연수구",
    movingDate: "2025년 10월 25일 (토)",
    moveType: "사무실이사",
    requestType: "일반 견적",
    price: 400000,
    chips: [{ label: "사무실이사", iconSrc: "/icons/ic_company.svg" }],
  },
};
