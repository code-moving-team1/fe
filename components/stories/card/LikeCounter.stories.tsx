import type { Meta, StoryObj } from "@storybook/react";
import LikeCounter from "../../common/card/Mover/LikeCounter";
import Card from "../../common/card/Card";

const meta: Meta<typeof LikeCounter> = {
  title: "Common/Card/LikeCounter",
  component: LikeCounter,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "`LikeCounter`는 좋아요(‘하트’) 개수를 표시하는 간단한 UI 컴포넌트입니다. " +
          "아이콘(`/icons/ic_like.svg`)과 숫자가 나란히 표시됩니다.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof LikeCounter>;

/** 기본형 (일반적인 좋아요 수) */
export const Default: Story = {
  render: () => (
    <Card className="flex w-[120px] justify-center">
      <LikeCounter count={23} />
    </Card>
  ),
};

/** 0개일 때 (비활성 상태처럼 보임) */
export const Empty: Story = {
  render: () => (
    <Card className="flex w-[120px] justify-center">
      <LikeCounter count={0} className="opacity-50" />
    </Card>
  ),
};

/** 커스텀 스타일 (주황 강조 / 큰 아이콘) */
export const CustomStyle: Story = {
  render: () => (
    <Card className="flex w-[140px] justify-center border-orange-200 bg-orange-50">
      <LikeCounter
        count={128}
        className="text-orange-600 [&>div>img]:scale-125"
      />
    </Card>
  ),
};
