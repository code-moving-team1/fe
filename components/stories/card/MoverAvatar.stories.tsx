import type { Meta, StoryObj } from "@storybook/react";
import MoverAvatar from "../../common/card/Mover/MoverAvatar";
import Card from "../../common/card/Card";

const meta: Meta<typeof MoverAvatar> = {
  title: "Common/Card/MoverAvatar",
  component: MoverAvatar,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "`MoverAvatar`는 기사님의 프로필 이미지를 표시합니다. " +
          "`avatarUrl`이 없거나 잘못된 경우 자동으로 기본 이미지(`/assets/profile.svg`)로 대체됩니다. " +
          "`size`로 이미지 크기를 조절할 수 있습니다.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof MoverAvatar>;

/** 기본형 (프로필 이미지 있음) */
export const Default: Story = {
  render: () => (
    <Card className="flex w-[120px] justify-center">
      <MoverAvatar avatarUrl="/assets/sample-avatar.jpg" size={60} />
    </Card>
  ),
};

/** 이미지 없음 (fallback 이미지로 대체됨) */
export const Fallback: Story = {
  render: () => (
    <Card className="flex w-[120px] justify-center">
      <MoverAvatar avatarUrl="" size={60} />
    </Card>
  ),
};

/** 커스텀 크기 및 스타일 */
export const CustomStyle: Story = {
  render: () => (
    <Card className="flex w-[160px] justify-center border-orange-200 bg-orange-50">
      <MoverAvatar
        avatarUrl="/assets/sample-avatar.jpg"
        size={80}
        className="rounded-full border-2 border-orange-400"
      />
    </Card>
  ),
};
