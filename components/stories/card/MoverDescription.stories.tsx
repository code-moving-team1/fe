import type { Meta, StoryObj } from "@storybook/react";
import MoverDescription from "../../common/card/Mover/MoverDescription";
import Card from "../../common/card/Card";

const meta: Meta<typeof MoverDescription> = {
  title: "Common/Card/MoverDescription",
  component: MoverDescription,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "`MoverDescription`은 기사님의 소개 문구나 간단한 설명 텍스트를 표시하는 컴포넌트입니다. " +
          "`description`을 문자열로 전달하며, 기본적으로 회색 보조 텍스트 스타일로 표시됩니다.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof MoverDescription>;

/** 기본형 (짧은 설명) */
export const Default: Story = {
  render: () => (
    <Card className="w-[360px]">
      <MoverDescription description="이건 기사가 전달하는 간단 설명 들어가는 곳 입니다" />
    </Card>
  ),
};

/** 여러 줄 설명 (긴 텍스트) */
export const LongDescription: Story = {
  render: () => (
    <Card className="w-[400px]">
      <MoverDescription
        description={`200년 경력의 베테랑 기사입니다. 
가정이사, 포장이사 모두 전문적으로 진행하며,
정확한 시간 약속과 세심한 서비스로 고객 만족을 보장합니다.`}
      />
    </Card>
  ),
};

/** 커스텀 스타일 (주황 강조, 작은 폰트) */
export const CustomStyle: Story = {
  render: () => (
    <Card className="w-[360px] border-orange-200 bg-orange-50">
      <MoverDescription
        description="DM문의"
        className="text-orange-600 italic"
      />
    </Card>
  ),
};
