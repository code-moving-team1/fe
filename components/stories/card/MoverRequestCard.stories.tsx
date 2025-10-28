import type { Meta, StoryObj } from "@storybook/react";
import MoverRequestCard from "@/components/common/card/MoverRequestCard";
import { Buttons } from "@/components/common/button";

const meta: Meta<typeof MoverRequestCard> = {
  title: "Common/Card/MoverRequestCard",
  component: MoverRequestCard,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "`MoverRequestCard`는 고객의 이사 요청 정보를 기사님이 확인할 수 있는 카드입니다. " +
          "고객 이름, 요청 내용, 출발지/도착지, 이사일, 서비스 유형(칩), 상태/버튼(Action)을 표시합니다.",
      },
    },
  },
};
export default meta;

type Story = StoryObj<typeof MoverRequestCard>;

/** 기본 예시 */
export const Default: Story = {
  render: () => (
    <div className="w-[700px]">
      <MoverRequestCard
        customerName="김고객"
        description="가정이사 요청드립니다. 3톤 트럭 필요합니다."
        from="서울 강남구"
        to="부산 해운대구"
        movingDate="2025년 11월 02일 (일)"
        chips={[
          { label: "가정이사", iconSrc: "/icons/ic_home.svg" },
          { label: "지정 견적 요청", iconSrc: "/icons/ic_document.svg" },
        ]}
      />
    </div>
  ),
};

/** 견적 보낸 상태 (고객 확인 대기) */
export const Quoted: Story = {
  render: () => (
    <div className="w-[700px]">
      <MoverRequestCard
        customerName="이고객"
        description="소형이사 요청드립니다. 원룸 짐입니다."
        from="인천 남동구"
        to="서울 송파구"
        movingDate="2025년 11월 10일 (월)"
        isQuoted
        chips={[{ label: "소형이사", iconSrc: "/icons/ic_box.svg" }]}
      />
    </div>
  ),
};

/** 견적 보내기 버튼 포함 (action 예시) */
export const WithActionButton: Story = {
  render: () => (
    <div className="w-[700px]">
      <MoverRequestCard
        customerName="박고객"
        description="사무실 이전 예정입니다. 포장이사 견적 원합니다."
        from="대전 서구"
        to="대구 수성구"
        movingDate="2025년 12월 03일 (수)"
        chips={[
          { label: "사무실이사", iconSrc: "/icons/ic_company.svg" },
          { label: "지정 견적 요청", iconSrc: "/icons/ic_document.svg" },
        ]}
        action={
          <Buttons className="bg-orange-500 text-white hover:bg-orange-600">
            견적 보내기
          </Buttons>
        }
      />
    </div>
  ),
};
