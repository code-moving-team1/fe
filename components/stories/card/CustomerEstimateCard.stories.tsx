import type { Meta, StoryObj } from "@storybook/react";
import CustomerEstimateCard from "@/components/common/card/CustomerEstimateCard";

const meta: Meta<typeof CustomerEstimateCard> = {
  title: "Common/Card/CustomerEstimateCard",
  component: CustomerEstimateCard,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "`CustomerEstimateCard`는 고객/이동 정보와 견적 금액을 보여주는 기본 카드입니다. " +
          "상단에 서비스 칩(chips)을 표시할 수 있고, children 영역을 통해 오버레이/추가 영역도 넣을 수 있습니다.",
      },
    },
  },
};
export default meta;

type Story = StoryObj<typeof CustomerEstimateCard>;

/** 기본 예시 */
export const Default: Story = {
  render: () => (
    <div className="w-[520px]">
      <CustomerEstimateCard
        customerName="이름이름"
        from="서울특별시 강남구"
        to="부산광역시 해운대구"
        movingDate="2025년 11월 01일 (토)"
        requestType="지정 견적 요청"
        moveType="가정이사"
        price={250000}
        chips={[
          { label: "가정이사", iconSrc: "/icons/ic_home.svg" },
          { label: "지정 견적 요청", iconSrc: "/icons/ic_document.svg" },
        ]}
      />
    </div>
  ),
};

export const SmallMove: Story = {
  render: () => (
    <div className="w-[520px]">
      <CustomerEstimateCard
        customerName="이사고객"
        from="인천시 부평구"
        to="서울시 송파구"
        movingDate="2025년 12월 12일 (금)"
        requestType="일반 견적 요청"
        moveType="소형이사"
        price={180000}
        chips={[{ label: "소형이사", iconSrc: "/icons/ic_box.svg" }]}
      />
    </div>
  ),
};

/** children 영역 사용 (배너/오버레이 등 커스텀 요소 추가) */
export const WithChildren: Story = {
  render: () => (
    <div className="w-[520px]">
      <CustomerEstimateCard
        customerName="김김김"
        from="대전 서구"
        to="대구 수성구"
        movingDate="2025년 10월 22일 (수)"
        requestType="지정 견적 요청"
        moveType="사무실이사"
        price={430000}
        chips={[
          { label: "사무실이사", iconSrc: "/icons/ic_box.svg" },
          { label: "지정 견적 요청", iconSrc: "/icons/ic_document.svg" },
        ]}
      ></CustomerEstimateCard>
    </div>
  ),
};
