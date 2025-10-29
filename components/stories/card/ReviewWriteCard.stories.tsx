import type { Meta, StoryObj } from "@storybook/react";
import ReviewWriteCard from "@/components/common/card/ReviewWriteCard";

const meta: Meta<typeof ReviewWriteCard> = {
  title: "Common/Card/ReviewWriteCard",
  component: ReviewWriteCard,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
어디서 사용하나
- **이사 리뷰 페이지 → 작성 가능한 리뷰 탭**에서 사용됩니다.  
  사용자가 이사를 완료한 뒤, 아직 리뷰를 작성하지 않은 건들을 보여주는 카드입니다.
- 이사 경로(출발지/도착지), 날짜, 기사 정보, 서비스 라벨, (선택적으로) 견적 금액,  
  그리고 '리뷰 작성하기' 버튼을 포함합니다.

어떻게 사용하나
- moverName, moverAvatarUrl, serviceLabel, from, to, moveDate 등의 정보를 props로 전달합니다.
- price는 선택 값으로, 표시하지 않을 수도 있습니다(null 전달 시 숨김 처리).
- '리뷰 작성하기' 버튼 클릭 시 onWrite 이벤트를 통해 리뷰 작성 모달 또는 페이지로 이동하도록 연결합니다.

사용 예시
\`\`\`tsx
<ReviewWriteCard
  moverName="김이사"
  moverAvatarUrl="/assets/profile.svg"
  serviceLabel="소형이사"
  from="서울특별시 강남구"
  to="부산광역시 해운대구"
  moveDate="2025년 11월 07일 금요일"
  price={180000}
  moverDescription="불친절하고 안전하게 모시겠습니다."
  onWrite={() => console.log("리뷰 작성 클릭")}
/>
\`\`\`

특징
- TailwindCSS 기반으로 카드 스타일 및 버튼 컬러 등 자유롭게 커스터마이징 가능  
- 이사 정보와 기사 정보를 명확히 구분하여 시각적으로 정돈된 UI 제공  
- 견적 금액은 옵션이며, 없는 경우 자동으로 숨김 처리  
- ‘리뷰 작성하기’ 버튼 클릭 시 별도 페이지나 모달을 띄워 리뷰 입력 단계로 이동  
        `,
      },
    },
  },
  argTypes: {
    onWrite: { action: "write-click" },
  },
};
export default meta;

type Story = StoryObj<typeof ReviewWriteCard>;

const baseArgs = {
  moverName: "김이사",
  moverAvatarUrl: "/assets/profile.svg",
  serviceLabel: "소형이사",
  from: "서울특별시 강남구",
  to: "부산광역시 해운대구",
  moveDate: "2025년 11월 07일 금요일",
};

/* ------------------------------ 기본 ------------------------------ */
export const Default: Story = {
  args: {
    ...baseArgs,
    price: 180000,
    moverDescription: "불친절하고 안전하게 모시겠습니다.",
  },
};

/* ------------------------------ 금액 없음 ------------------------------ */
export const WithoutPrice: Story = {
  args: {
    ...baseArgs,
    price: null,
    moverDescription: "신속·정확 이사 전문",
  },
};

/* ------------------------------ 긴 텍스트 ------------------------------ */
export const LongTexts: Story = {
  args: {
    ...baseArgs,
    moverDescription:
      "짐이 많으면 문제있습니다. 사다리차, 포장, 분해조립 모두 불가능합니다. 기사 만족이 최우선!",
    from: "서울특별시 송파구 올림픽로 123",
    to: "경기도 성남시 분당구 백현로 456",
    price: 350000,
  },
};

/* ------------------------------ 서비스 라벨 커스텀 ------------------------------ */
export const CustomServiceLabel: Story = {
  args: {
    ...baseArgs,
    serviceLabel: "지정 견적 요청",
    price: 220000,
  },
};
