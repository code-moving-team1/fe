import type { Meta, StoryObj } from "@storybook/react";
import Card from "../../common/card/Card";

const meta: Meta<typeof Card> = {
  title: "Common/Card/Base",
  component: Card,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "기본 카드 컴포넌트입니다.",
      },
    },
  },
};
export default meta;

type Story = StoryObj<typeof Card>;

// 기본 카드
export const Default: Story = {
  render: () => (
    <Card className="w-[360px]">
      <h3 className="text-lg font-semibold">카드 제목</h3>
      <p className="mt-2 text-sm text-gray-600">
        카드 내용이 여기에 들어갑니다.
      </p>
    </Card>
  ),
};

// 긴 내용 카드
export const WithLongContent: Story = {
  render: () => (
    <Card className="w-[400px]">
      <h3 className="text-lg font-semibold">길이가 긴 카드</h3>
      <p className="mt-2 text-sm text-gray-600">
        이 컴포넌트는 레이아웃 테스트용입니다. Lorem ipsum dolor sit amet,
        consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin
        gravida dolor sit amet lacus accumsan et viverra justo commodo.
      </p>
    </Card>
  ),
};

// 커스텀 스타일 카드
export const CustomStyle: Story = {
  render: () => (
    <Card className="w-[360px] border-orange-300 bg-orange-50">
      <h3 className="text-lg font-semibold text-orange-600">
        커스텀 스타일 카드
      </h3>
      <p className="mt-2 text-sm text-orange-700">
        className prop으로 배경색, 테두리색 등을 자유롭게 변경할 수 있습니다.
      </p>
    </Card>
  ),
};
