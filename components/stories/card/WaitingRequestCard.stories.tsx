import type { Meta, StoryObj } from "@storybook/react";
import WaitingRequestCard from "@/components/common/card/WaitingRequestCard";

const meta: Meta<typeof WaitingRequestCard> = {
  title: "Common/Card/WaitingRequestCard",
  component: WaitingRequestCard,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
어디서 사용하나
- **내 견적 관리 페이지 - 대기 중인 견적 탭**에서 사용됩니다.   
- 견적 대기/확정 상태 표시, 기사 정보, 견적 금액, 간단한 코멘트 등을 보여줍니다.

어떻게 사용하나
- 기사 이름, 프로필, 평점, 경력, 확정 건수, 코멘트, 금액 등의 데이터를 props로 전달합니다.
- \`onViewDetail\` 콜백으로 상세보기 이동을 처리하고,  
  \`onConfirm\` 콜백으로 견적 확정(선택) 액션을 수행합니다.
- \`confirmLoading\`, \`confirmDisabled\` 등 상태 props로 버튼 비활성화/로딩 표시를 제어할 수 있습니다.
- chips 배열을 통해 이사 유형(소형이사, 가정이사 등)과 요청 타입(일반, 지정 요청)을 표시합니다.

사용 예시
\`\`\`tsx
<WaitingRequestCard
  driverName="김기사"
  description="7년 경력의 포장이사 전문가입니다."
  avatarUrl="/assets/profile.svg"
  rating={4.0}
  reviewCount={178}
  careerYears={7}
  confirmedCount={334}
  price={180000}
  comment="안전하게 모시겠습니다!"
  likeCount={136}
  moveType="소형이사"
  requestType="지정 견적 요청"
  chips={[
    { label: "소형이사", iconSrc: "/icons/ic_box.svg" },
    { label: "지정 견적 요청", iconSrc: "/icons/ic_document.svg" },
  ]}
  onConfirm={() => console.log("확정 클릭")}
  onViewDetail={() => console.log("상세보기 클릭")}
/>
\`\`\`

특징
- TailwindCSS 기반으로 카드 전체와 내부 요소(버튼, 아이콘 등) 커스터마이징 가능  
- 기사님 프로필, 이사 타입, 요청 타입, 견적가, 코멘트 등 UI 구성 완비  
- 버튼 상태(기본 / 로딩 / 비활성) 관리 props 지원  
- chips를 이용해 요청 구분, 서비스 타입 등을 시각적으로 표시  
        `,
      },
    },
  },
  argTypes: {
    onConfirm: { action: "confirm-click" },
    onViewDetail: { action: "view-detail-click" },
  },
};
export default meta;

type Story = StoryObj<typeof WaitingRequestCard>;

const baseArgs = {
  driverName: "김기사",
  description: "7년 경력의 포장이사 전문가입니다.",
  avatarUrl: "/assets/profile.svg",
  rating: 4.9,
  reviewCount: 178,
  careerYears: 7,
  confirmedCount: 334,
  price: 180000,
  comment: "안전하게 모시겠습니다. 엘리베이터 유무만 확인 부탁드려요!",
  likeCount: 136,
  moveType: "소형이사",
  requestType: "지정 견적 요청",
  chips: [
    { label: "소형이사", iconSrc: "/icons/ic_box.svg" },
    { label: "지정 견적 요청", iconSrc: "/icons/ic_document.svg" },
  ],
};

/* ------------------------------ 기본 ------------------------------ */
export const Default: Story = {
  args: {
    ...baseArgs,
  },
};

/* ------------------------------ 로딩 상태 ------------------------------ */
export const LoadingConfirm: Story = {
  args: {
    ...baseArgs,
    confirmLoading: true,
  },
};

/* ------------------------------ 비활성 상태 ------------------------------ */
export const DisabledConfirm: Story = {
  args: {
    ...baseArgs,
    confirmDisabled: true,
  },
};

/* ------------------------------ 칩 미포함 ------------------------------ */
export const WithoutChips: Story = {
  args: {
    ...baseArgs,
    chips: [],
  },
};

/* ------------------------------ 긴 코멘트 ------------------------------ */
export const LongComment: Story = {
  args: {
    ...baseArgs,
    comment:
      "짐이 조금 많아도 문제 없습니다. 사다리차 필요 여부도 현장서 빠르게 판단해 드려요.\n" +
      "포장 박스 제공 가능하고, 시간 맞춰 정확히 방문 드리겠습니다.",
  },
};
