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
        component: `
어디서 사용하나
- **기사님용 내 견적 관리 페이지 → 보낸 견적 조회 탭**에서 사용됩니다.  
  기사님이 고객에게 보낸 견적 내역(금액, 요청 유형, 이사 정보 등)을 확인하는 카드입니다.
- 견적의 핵심 요약 정보(이사일, 출발/도착지, 서비스 타입, 견적금액 등)를 한눈에 보여줍니다.

어떻게 사용하나
- customerName, from, to, movingDate, moveType, requestType, price 등의 props를 전달하여 렌더링합니다.
- chips 배열로 이사 유형, 요청 타입 등의 정보를 시각적으로 표시합니다.
- children 영역을 사용하면 오버레이, 배너, 버튼 등을 추가할 수 있습니다.

사용 예시
\`\`\`tsx
<CustomerEstimateCard
  customerName="이사고객"
  from="서울특별시 강남구"
  to="부산광역시 해운대구"
  movingDate="2025년 11월 01일 (토)"
  moveType="가정이사"
  requestType="지정 견적 요청"
  price={250000}
  chips={[
    { label: "가정이사", iconSrc: "/icons/ic_home.svg" },
    { label: "지정 견적 요청", iconSrc: "/icons/ic_document.svg" },
  ]}
/>
\`\`\`

특징
- TailwindCSS 기반으로 카드 내 정보 정렬 및 색상 커스터마이징 가능  
- chips, children 등 확장성 높은 구조로 다양한 형태의 카드 커스터마이징 가능  
- 견적 금액, 요청 타입 등 주요 정보를 명확히 시각화  
        `,
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

/** 소형이사 예시 */
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

/** children 영역 사용 예시 */
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
      >
        <div className="absolute inset-0 flex items-center justify-center bg-black/40 text-sm text-white">
          예시: 오버레이 영역
        </div>
      </CustomerEstimateCard>
    </div>
  ),
};
