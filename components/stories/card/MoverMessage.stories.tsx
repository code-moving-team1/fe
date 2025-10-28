import type { Meta, StoryObj } from "@storybook/react";
import MoverMessage from "../../common/card/Mover/MoverMessage";
import Card from "../../common/card/Card";

const meta: Meta<typeof MoverMessage> = {
  title: "Common/Card/MoverMessage",
  component: MoverMessage,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "`MoverMessage`는 기사님의 코멘트나 메시지를 표시하는 단순 텍스트용 컴포넌트입니다. " +
          "`message` 문자열을 전달하면 자동으로 스타일링된 문단으로 출력됩니다.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof MoverMessage>;

/** 기본형 (짧은 메시지) */
export const Default: Story = {
  render: () => (
    <Card className="w-[320px]">
      <MoverMessage message="안녕하세요! 이건 기사가 전달하는 메시지가 들어가는 곳 입니다 제목같은 느낌" />
    </Card>
  ),
};

/** 긴 문장 메시지 */
export const LongMessage: Story = {
  render: () => (
    <Card className="w-[360px]">
      <MoverMessage message="고객님 일정에 맞춰 안전하고 신속하게 이사 도와드리겠습니다. 포장이사 옵션도 선택 가능합니다." />
    </Card>
  ),
};

/** 커스텀 스타일 (색상/크기 변경) */
export const CustomStyle: Story = {
  render: () => (
    <Card className="w-[320px] border-orange-200 bg-orange-50">
      <MoverMessage
        message="DM으로 문의 부탁드립니다🙏"
        className="text-lg text-orange-600"
      />
    </Card>
  ),
};
