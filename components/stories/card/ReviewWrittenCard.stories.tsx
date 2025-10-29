import type { Meta, StoryObj } from "@storybook/react";
import ReviewWrittenCard from "@/components/common/card/ReviewWrittenCard";

const meta: Meta<typeof ReviewWrittenCard> = {
  title: "Common/Card/ReviewWrittenCard",
  component: ReviewWrittenCard,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
어디서 사용하나
- **이사 리뷰 페이지 → 내가 작성한 리뷰 탭**에서 사용됩니다.  
  사용자가 직접 작성한 리뷰 내용을 확인할 수 있는 카드입니다.
- 작성한 리뷰의 기사 정보, 별점, 후기 내용, 이사일, 출발/도착지 등의 정보를 표시합니다.  
  (금액 정보는 표시되지 않습니다.)

어떻게 사용하나
- 작성된 리뷰 데이터를 props로 전달하여 표시 전용 카드로 렌더링합니다.
- rating, comment, moverName, moverAvatarUrl, from/to, moveDate 등의 정보가 필요합니다.

사용 예시
\`\`\`tsx
<ReviewWrittenCard
  moverName="박이사"
  moverAvatarUrl="/assets/profile.svg"
  serviceLabel="소형이사"
  from="서울 강남구"
  to="부산 해운대구"
  moveDate="2025년 11월 07일 (금)"
  rating={5}
  comment="이사 너무 깔끔하게 해주셨어요! 다음에도 꼭 이용할게요."
  moverDescription="친절한 기사님, 전국 어디든 OK!"
/>
\`\`\`

특징
- TailwindCSS 기반으로 카드 구성요소(기사 정보, 후기 텍스트 등) 커스터마이징 가능
- rating 별점, 후기 텍스트, 이동 지역 등 주요 리뷰 정보를 한눈에 확인 가능
- 긴 텍스트(comment)는 자동 줄바꿈 처리

접근성
- 별점 요소는 \`aria-label\`로 점수 안내 지원
- 기사 프로필 이미지는 대체 텍스트 제공 가능
- 키보드 포커스 시 버튼/액션에 ring 효과로 시각 피드백 제공
        `,
      },
    },
  },
};
export default meta;

type Story = StoryObj<typeof ReviewWrittenCard>;

const baseArgs = {
  moverName: "박이사",
  moverAvatarUrl: "/assets/profile.svg",
  serviceLabel: "소형이사",
  from: "서울 강남구",
  to: "부산 해운대구",
  moveDate: "2025년 11월 07일 (금)",
  rating: 1,
  comment:
    "이사 너무 깔끔하게 해주셨어요! 시간도 정확하고 친절했습니다. 하지만 기사님이 불친절하셔서 5점 같은 1점 드립니다!",
  moverDescription: "친절한 기사님, 전국 어디든 OK!",
};

/* ------------------------------ 기본 ------------------------------ */
export const Default: Story = {
  args: {
    ...baseArgs,
  },
};

/* ------------------------------ 긴 코멘트 ------------------------------ */
export const LongComment: Story = {
  args: {
    ...baseArgs,
    comment:
      "정말 최고의 이사였습니다. 포장부터 정리까지 꼼꼼하게 해주셔서 감사했어요.\n" +
      "짐이 많았는데도 빠르게 진행해주셨고, 손상 하나 없이 끝났습니다.\n" +
      "다음에 또 이용할게요 👍",
  },
};

/* ------------------------------ 낮은 평점 ------------------------------ */
export const LowerRating: Story = {
  args: {
    ...baseArgs,
    rating: 3,
    comment:
      "전반적으로 만족스러웠지만 약간의 지연이 있었습니다. 그래도 친절했어요!",
  },
};
