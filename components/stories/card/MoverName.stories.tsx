import type { Meta, StoryObj } from "@storybook/react";
import MoverName from "../../common/card/Mover/MoverName";
import Card from "../../common/card/Card";

const meta: Meta<typeof MoverName> = {
  title: "Common/Card/MoverName",
  component: MoverName,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "`MoverName`은 기사님의 이름과 트럭 아이콘을 함께 표시하는 컴포넌트입니다. " +
          "`MoverName`(string)으로 이름을 전달하며, `showIcon`을 false로 하면 아이콘 없이 이름만 표시됩니다.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof MoverName>;

/** 기본형 (아이콘 포함) */
export const Default: Story = {
  render: () => (
    <Card className="w-[280px]">
      <MoverName MoverName="기사 이름" />
    </Card>
  ),
};

/** 아이콘 숨김 */
export const NoIcon: Story = {
  render: () => (
    <Card className="w-[280px]">
      <MoverName MoverName="김기사" showIcon={false} />
    </Card>
  ),
};

/** 커스텀 스타일 (색상/크기 변경) */
export const CustomStyle: Story = {
  render: () => (
    <Card className="w-[280px] border-orange-200 bg-orange-50">
      <MoverName MoverName="이이사" className="text-xl text-orange-600" />
    </Card>
  ),
};
