import type { Meta, StoryObj } from "@storybook/react";
import MoverStats from "../../common/card/Mover/MoverStats";
import Card from "../../common/card/Card";

const meta: Meta<typeof MoverStats> = {
  title: "Common/Card/MoverStats",
  component: MoverStats,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "`MoverStats`는 이사업체의 별점, 리뷰 수, 경력, 확정 건수를 한 줄로 표시하는 컴포넌트입니다. " +
          "`rating`, `reviewCount`, `careerYears`, `confirmedCount`를 전달하면 자동으로 포맷팅되어 표시됩니다.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof MoverStats>;

/** 기본형 (일반 예시 데이터) */
export const Default: Story = {
  render: () => (
    <Card className="w-[360px]">
      <MoverStats
        rating={4.8}
        reviewCount={124}
        careerYears={5}
        confirmedCount={310}
      />
    </Card>
  ),
};

/** 값 변형 (리뷰 적고, 경력 많은 경우) */
export const Variation: Story = {
  render: () => (
    <Card className="w-[360px]">
      <MoverStats
        rating={4.2}
        reviewCount={12}
        careerYears={15}
        confirmedCount={82}
      />
    </Card>
  ),
};

/** 커스텀 스타일 (배경 강조, 주황색 포인트) */
export const CustomStyle: Story = {
  render: () => (
    <Card className="w-[360px] border-orange-200 bg-orange-50">
      <MoverStats
        rating={5.0}
        reviewCount={532}
        careerYears={8}
        confirmedCount={480}
        className="text-orange-600"
      />
    </Card>
  ),
};
