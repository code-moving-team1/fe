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
        component: `
어디서 사용하나
- **기사용 이사 요청 페이지 → 지정 요청 탭**에서 사용됩니다.  
  고객이 특정 기사님에게 직접 견적을 요청한 건을 보여주는 카드입니다.
- 고객의 요청 정보를 확인하고, 기사님이 ‘견적 보내기’ 또는 ‘반려하기’ 액션을 수행할 수 있습니다.

어떻게 사용하나
- customerName, from, to, movingDate, requestTime, requestType 등의 데이터를 props로 전달합니다.
- chips 배열을 통해 이사 유형(예: 소형이사, 가정이사)과 요청 유형(예: 지정 견적 요청)을 표시할 수 있습니다.
- \`onReject\` 콜백으로 ‘반려하기’, \`onSendQuote\` 콜백으로 ‘견적 보내기’ 동작을 처리합니다.

사용 예시
\`\`\`tsx
<ReceivedRequestCard
  customerName="김고객"
  from="서울 강남구"
  to="부산 해운대구"
  movingDate="2025년 11월 07일 (금)"
  requestTime="1시간 전"
  requestType="지정 견적 요청"
  chips={[
    { label: "소형이사", iconSrc: "/icons/ic_box.svg" },
    { label: "지정 견적 요청", iconSrc: "/icons/ic_document.svg" },
  ]}
  onReject={() => console.log("반려 클릭")}
  onSendQuote={() => console.log("견적 보내기 클릭")}
/>
\`\`\`

특징
- TailwindCSS 기반으로 카드 레이아웃 및 버튼 색상 등을 자유롭게 커스터마이징 가능  
- 고객 요청 정보를 명확하게 표시 (출발지, 도착지, 날짜, 요청 시간 등)  
- chips를 통해 서비스 유형 및 요청 타입을 직관적으로 시각화  
- 기사님이 요청을 빠르게 처리할 수 있도록 액션 버튼(견적보내기, 반려하기) 제공  
        `,
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

/* ------------------------------ 기본 ------------------------------ */
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
