import type { Meta, StoryObj } from "@storybook/react";
import CardMover from "../../common/card/CardMover";

const meta: Meta<typeof CardMover> = {
  title: "Common/Card/CardMover",
  component: CardMover,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "`CardMover`는 기사님의 프로필, 서비스, 평점, 좋아요, 견적가 등을 한눈에 보여주는 상단 카드 컴포넌트입니다. " +
          "이름, 소개, 경력, 확정 건수, 서비스 태그 등을 props로 전달해 구성할 수 있습니다.",
      },
    },
  },
};
export default meta;

type Story = StoryObj<typeof CardMover>;

/** 기본 예시 */
export const Default: Story = {
  render: () => (
    <CardMover
      driverName="기사"
      introduction="성심성의껏 도와드리겠습니다."
      description="20년 경력의 포장이사 전문가입니다."
      avatarUrl="/assets/sample-avatar.jpg"
      rating={4.8}
      reviewCount={120}
      careerYears={20}
      confirmedCount={340}
      likeCount={52}
      services={["가정이사"]}
    />
  ),
};

/** 견적가 숨김 */
export const WithoutPrice: Story = {
  render: () => (
    <CardMover
      driverName="김기사"
      introduction="신속하고 안전한 이사 보장!"
      description="전국 어디든 빠르게 방문합니다."
      rating={4.5}
      reviewCount={80}
      careerYears={10}
      confirmedCount={210}
      showPrice={false}
      likeCount={15}
      services={["소형이사", "지정 견적 요청"]}
    />
  ),
};

/** 신규 기사 (좋아요 0) */
export const NewMover: Story = {
  render: () => (
    <CardMover
      driverName="신입 기사"
      introduction="첫 이사 함께해요 😊"
      description="새로운 마음으로 성실하게 일하겠습니다."
      rating={5.0}
      reviewCount={3}
      careerYears={1}
      confirmedCount={4}
      likeCount={0}
      services={["가정이사"]}
    />
  ),
};
