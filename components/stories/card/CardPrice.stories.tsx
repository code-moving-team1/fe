import type { Meta, StoryObj } from "@storybook/react";
import CardPrice from "../../common/card/CardPrice";
import Card from "../../common/card/Card";

const meta: Meta<typeof CardPrice> = {
  title: "Common/Card/CardPrice",
  component: CardPrice,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "`CardPrice`는 견적 금액을 표시하는 컴포넌트입니다. " +
          "`amount`로 숫자를 전달하고, `showLabel`로 '견적 금액' 라벨 표시 여부를 제어할 수 있습니다.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof CardPrice>;

/** 기본형 (라벨 + 금액 표시) */
export const Default: Story = {
  render: () => (
    <Card className="w-[280px]">
      <CardPrice amount={350000} />
    </Card>
  ),
};

/** 라벨 숨김 */
export const NoLabel: Story = {
  render: () => (
    <Card className="w-[280px]">
      <CardPrice amount={120000} showLabel={false} />
    </Card>
  ),
};

/** 커스텀 스타일 */
export const CustomStyle: Story = {
  render: () => (
    <Card className="w-[280px] border-orange-200 bg-orange-50">
      <CardPrice amount={450000} className="text-orange-600" />
    </Card>
  ),
};
