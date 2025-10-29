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
        component: `
어디서 사용하나
- **기사용 이사 요청 페이지 → 일반 요청 탭**에서 사용됩니다.  
  고객이 등록한 일반 이사 요청을 기사님이 확인할 수 있는 카드입니다.
- 고객 이름, 요청 내용, 출발지/도착지, 이사일, 서비스 유형(칩) 등의 정보가 표시되며,  
  기사님은 해당 요청에 대해 ‘견적 보내기’ 등의 액션을 수행할 수 있습니다.

어떻게 사용하나
- customerName, description, from, to, movingDate 등의 props로 요청 정보를 전달합니다.
- chips 배열을 통해 이사 유형(예: 소형이사, 가정이사)과 요청 유형(예: 일반 요청, 지정 요청)을 표시합니다.
- isQuoted가 true이면 이미 견적을 보낸 상태(대기 중)로 표시됩니다.
- action prop을 전달하면, 커스텀 버튼(예: 견적 보내기)을 카드 하단에 렌더링할 수 있습니다.

사용 예시
\`\`\`tsx
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
\`\`\`

특징
- TailwindCSS 기반으로 카드, 버튼, 텍스트 스타일을 유연하게 커스터마이징 가능  
- 일반 요청/지정 요청 모두 대응 가능하며, 칩(Chip) 형태로 시각적 구분 제공  
- 견적 전송 상태(isQuoted)에 따라 카드 내 상태 문구 또는 스타일 변경  
- Buttons 컴포넌트와 조합하여 액션 버튼을 자유롭게 구성 가능  
        `,
      },
    },
  },
};
export default meta;

type Story = StoryObj<typeof MoverRequestCard>;

/* ------------------------------ 기본 예시 ------------------------------ */
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

/* ------------------------------ 견적 보낸 상태 (고객 확인 대기) ------------------------------ */
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

/* ------------------------------ 견적 보내기 버튼 포함 ------------------------------ */
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
          { label: "일반 요청", iconSrc: "/icons/ic_document.svg" },
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
