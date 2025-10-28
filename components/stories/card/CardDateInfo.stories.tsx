import type { Meta, StoryObj } from "@storybook/react";
import CardDateInfo from "../../common/card/CardDateInfo";
import Card from "../../common/card/Card";

const meta: Meta<typeof CardDateInfo> = {
  title: "Common/Card/CardDateInfo",
  component: CardDateInfo,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "`CardDateInfo`는 카드 내에서 이사 날짜를 표시할 때 사용하는 단순 정보 컴포넌트입니다. `movingDate`는 날짜 문자열을 전달합니다.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof CardDateInfo>;

// 기본 표시
export const Default: Story = {
  render: () => (
    <Card className="w-[280px]">
      <CardDateInfo movingDate="2025년 11월 12일" />
    </Card>
  ),
};

// 다른 날짜 포맷
export const ISODateFormat: Story = {
  render: () => (
    <Card className="w-[280px]">
      <CardDateInfo movingDate="2025-11-12" />
    </Card>
  ),
};

// 커스텀 스타일
export const CustomStyle: Story = {
  render: () => (
    <Card className="w-[280px]">
      <CardDateInfo movingDate="2025년 12월 01일" className="text-orange-600" />
    </Card>
  ),
};
