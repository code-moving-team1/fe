import type { Meta, StoryObj } from "@storybook/react";
import EstimateHistoryCard from "@/components/common/card/EstimateHistoryCard";

const meta: Meta<typeof EstimateHistoryCard> = {
  title: "Common/Card/EstimateHistoryCard",
  component: EstimateHistoryCard,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "`EstimateHistoryCard`는 기사님 견적 히스토리를 보여주는 카드입니다. " +
          "기사 프로필, 후기/경력 정보, 견적 금액, 좋아요 수, 상태(`confirmed` or `waiting`)를 표시합니다.",
      },
    },
  },
};
export default meta;

type Story = StoryObj<typeof EstimateHistoryCard>;

/** 기본 예시 (확정 상태) */
export const Confirmed: Story = {
  render: () => (
    <div className="w-[520px]">
      <EstimateHistoryCard
        message="고객님의 물품을 안전하게 운송해 드립니다."
        driverName="김코드"
        avatarUrl="/assets/profile.svg"
        rating={5.0}
        reviewCount={178}
        careerYears={7}
        confirmedCount={334}
        liked={136}
        price={180000}
        status="confirmed"
        serviceType="SMALL"
        quoteType="DIRECT"
      />
    </div>
  ),
};

/** 대기중 상태 */
export const Waiting: Story = {
  render: () => (
    <div className="w-[520px]">
      <EstimateHistoryCard
        message="신속하고 정성껏 이사 도와드리겠습니다."
        driverName="기사"
        avatarUrl="/assets/profile_mover_detail.svg"
        rating={4.8}
        reviewCount={92}
        careerYears={5}
        confirmedCount={200}
        liked={48}
        price={220000}
        status="waiting"
        serviceType="FAMILY"
        quoteType="NORMAL"
      />
    </div>
  ),
};

/** 사무실 이사 */
export const OfficeMove: Story = {
  render: () => (
    <div className="w-[520px]">
      <EstimateHistoryCard
        message="사무실 이전 전문! 정리부터 운반까지 책임집니다."
        driverName="이사"
        avatarUrl="/assets/sample-avatar.jpg"
        rating={4.9}
        reviewCount={65}
        careerYears={8}
        confirmedCount={275}
        liked={89}
        price={450000}
        status="confirmed"
        serviceType="OFFICE"
        quoteType="DIRECT"
      />
    </div>
  ),
};
