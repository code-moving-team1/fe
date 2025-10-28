import type { Meta, StoryObj } from "@storybook/react";
import CompletedMoveCard from "@/components/common/card/CompletedMoveCard";

const meta: Meta<typeof CompletedMoveCard> = {
  title: "Common/Card/CompletedMoveCard",
  component: CompletedMoveCard,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "`CompletedMoveCard`는 채택된 견적(완료된 이사 요청)을 표시하는 카드 컴포넌트입니다. " +
          "배경에 반투명 오버레이와 함께 '견적 상세보기' 버튼이 나타납니다.",
      },
    },
  },
};
export default meta;

type Story = StoryObj<typeof CompletedMoveCard>;

/** 기본 예시 */
export const Default: Story = {
  render: () => (
    <CompletedMoveCard
      customerName="이사이사"
      from="서울특별시 강남구"
      to="부산광역시 해운대구"
      movingDate="2025년 11월 01일 (토)"
      moveType="가정이사"
      requestType="지정 견적 요청"
      price={250000}
      quoteId={123}
      chips={[
        { label: "가정이사", iconSrc: "/icons/ic_home.svg" },
        { label: "지정 견적 요청", iconSrc: "/icons/ic_document.svg" },
      ]}
      className="w-[500px]"
    />
  ),
};

/** 다른 견적 타입 예시 */
export const SmallMove: Story = {
  render: () => (
    <CompletedMoveCard
      customerName="이사"
      from="인천시 부평구"
      to="서울시 송파구"
      movingDate="2025년 12월 12일 (금)"
      moveType="소형이사"
      requestType="일반 견적 요청"
      price={180000}
      quoteId={456}
      chips={[
        { label: "소형이사", iconSrc: "/icons/ic_box.svg" },
        { label: "일반요청", iconSrc: "/icons/ic_document.svg" },
      ]}
      className="w-[500px]"
    />
  ),
};
