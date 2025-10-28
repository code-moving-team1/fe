import type { Meta, StoryObj } from "@storybook/react";
import { Buttons } from "@/components/common/button/Buttons";

const Dot = () => <span>•</span>;
const Arrow = () => <span>→</span>;

const meta: Meta<typeof Buttons> = {
  title: "Common/Button/Buttons",
  component: Buttons,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "`Buttons`는 variant/size/color/state 조합으로 사용하는 공용 버튼 컴포넌트입니다. " +
          "Figma 스펙용 `size='figma'`와 단색(flat) 옵션을 지원합니다.",
      },
    },
  },
};
export default meta;

type Story = StoryObj<typeof Buttons>;

/** 기본 버튼 */
export const Primary: Story = {
  args: { children: "기본 버튼" },
};

/** 단색(flat) 버튼 */
export const SolidFlat: Story = {
  args: { children: "단색(flat) 버튼", flat: true },
};

/** Outline 상태 테스트 */
export const OutlineStates: Story = {
  render: () => (
    <div className="flex gap-3">
      <Buttons variant="outline" state="default">
        기본
      </Buttons>
      <Buttons variant="outline" state="active">
        Active
      </Buttons>
      <Buttons variant="outline" state="done">
        Done
      </Buttons>
    </div>
  ),
};

/** Ghost 타입 */
export const Ghost: Story = {
  args: { variant: "ghost", children: "Ghost 버튼" },
};

/** 사이즈별 */
export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col items-start gap-3">
      <Buttons size="sm">sm</Buttons>
      <Buttons size="md">md</Buttons>
      <Buttons size="lg">lg</Buttons>
      <Buttons size="xl">xl</Buttons>
      <Buttons size="figma" flat>
        figma
      </Buttons>
    </div>
  ),
};

/** 아이콘 포함 */
export const WithIcons: Story = {
  args: {
    leftIcon: <Dot />,
    rightIcon: <Arrow />,
    children: "아이콘 포함",
  },
};

/** 로딩 상태 */
export const Loading: Story = {
  args: { loading: true, children: "로딩 중…" },
};

/** 꽉 찬 버튼 */
export const FullWidth: Story = {
  args: { fullWidth: true, children: "꽉 찬 버튼" },
};
