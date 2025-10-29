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
        component: `
어디서 사용하나
- **기사용 내 견적 관리 페이지 → 보낸 견적 조회 탭**에서 사용됩니다.  
  기사님이 고객에게 보낸 견적 중 **채택되어 완료된 이사 건(확정 견적)** 을 표시하는 카드입니다.
- 고객 이름, 출발지/도착지, 이사일, 견적 금액, 서비스 타입 등의 정보를 제공합니다.

어떻게 사용하나
- props로 customerName, from, to, movingDate, moveType, requestType, price, quoteId 등의 데이터를 전달합니다.
- chips 배열을 통해 이사 유형 및 요청 타입(예: 일반요청, 지정요청)을 시각적으로 표시합니다.
- 카드 배경에는 반투명 오버레이가 적용되며, '견적 상세보기' 버튼이 나타나도록 디자인되어 있습니다.

사용 예시
\`\`\`tsx
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
/>
\`\`\`

특징
- TailwindCSS 기반으로 반투명 오버레이, 버튼 스타일 등을 손쉽게 커스터마이징 가능  
- 견적 금액, 요청 유형, 이사 유형 등 주요 정보를 명확하게 표시  
- hover 또는 focus 시 “견적 상세보기” 액션 버튼 노출  
- 완료된 견적 상태를 한눈에 구분 가능한 시각적 디자인 
        `,
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
