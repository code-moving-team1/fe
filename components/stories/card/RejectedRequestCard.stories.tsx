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
        component: `
어디서 사용하나
- **기사용 내 견적 관리 페이지 → 반려 요청 탭**에서 사용됩니다.  
  고객이 보낸 견적 요청이 반려(거절)된 상태를 시각적으로 보여주는 카드입니다.  
- 일반 요청/지정 요청 등 다양한 유형의 반려 견적에 공통으로 사용됩니다.

어떻게 사용하나
- 고객 이름, 출발지/도착지, 이사 날짜, 금액, 요청 유형 등의 데이터를 props로 전달합니다.
- chips 배열을 통해 이사 유형(예: 소형이사, 가정이사)과 요청 유형(예: 지정 견적 요청)을 표시합니다.
- 반려 상태는 카드 전체에 반투명 오버레이가 적용되고, “반려된 요청이에요” 문구로 시각적으로 표시됩니다.

사용 예시
\`\`\`tsx
<RejectedRequestCard
  customerName="이름"
  from="서울 강남구"
  to="부산 해운대구"
  movingDate="2025년 11월 07일 (금)"
  moveType="소형이사"
  requestType="지정 견적 요청"
  price={180000}
  chips={[
    { label: "소형이사", iconSrc: "/icons/ic_box.svg" },
    { label: "지정 견적 요청", iconSrc: "/icons/ic_document.svg" },
  ]}
/>
\`\`\`

특징
- 반려 상태를 직관적으로 표현하는 반투명 오버레이 처리  
- TailwindCSS 기반으로 카드 스타일 및 텍스트 색상, 불투명도 등을 커스터마이징 가능  
- chips를 통해 서비스 유형과 요청 타입을 시각적으로 구분  
- 기사 입장에서 “더 이상 진행 불가능한 요청”임을 명확히 표시  
        `,
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

/* ------------------------------ 기본 ------------------------------ */
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

/* ------------------------------ 가정이사 예시 ------------------------------ */
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

/* ------------------------------ 사무실이사 예시 ------------------------------ */
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
