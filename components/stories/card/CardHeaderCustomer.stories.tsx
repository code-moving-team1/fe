import type { Meta, StoryObj } from "@storybook/react";
import CardHeaderCustomer from "../../common/card/CardHeaderCustomer";
import Card from "../../common/card/Card";

const meta: Meta<typeof CardHeaderCustomer> = {
  title: "Common/Card/CardHeaderCustomer",
  component: CardHeaderCustomer,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "`CardHeaderCustomer`는 카드 상단에 고객명을 표시할 때 사용하는 헤더 컴포넌트입니다. `customerName`과 `className`을 props로 받습니다.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof CardHeaderCustomer>;

export const Default: Story = {
  render: () => (
    <Card className="w-[360px]">
      <CardHeaderCustomer customerName="Customer 이름" />
    </Card>
  ),
};

export const CustomFontSize: Story = {
  render: () => (
    <Card className="w-[360px]">
      <CardHeaderCustomer
        customerName="Customer 이름"
        className="text-2xl text-orange-500"
      />
    </Card>
  ),
};
