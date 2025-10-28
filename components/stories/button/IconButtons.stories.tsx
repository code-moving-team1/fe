// components/stories/button/IconButtons.stories.tsx
import type { Meta, StoryObj } from "@storybook/react";
import Image from "next/image";
import { IconButtons } from "@/components/common/button/IconButtons";

const meta: Meta<typeof IconButtons> = {
  title: "Common/Button/IconButtons",
  component: IconButtons,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "`IconButtons`는 아이콘만 담는 라운드 버튼입니다. 아이콘은 children으로 전달하세요.",
      },
    },
  },
  argTypes: {
    variant: { control: "select", options: ["solid", "outline", "ghost"] },
    size: { control: "select", options: ["sm", "md", "lg"] },
    color: {
      control: "select",
      options: ["primary", "white", "kakao", "facebook", "neutral"],
    },
    rounded: { control: "select", options: ["lg", "xl", "full"] },
    selected: { control: "boolean" },
    disabled: { control: "boolean" },
    className: { control: false },
    children: { control: false },
  },
  args: {
    variant: "solid",
    size: "md",
    color: "primary",
    rounded: "xl",
    selected: false,
    disabled: false,
    "aria-label": "icon-button",
    type: "button",
  },
};
export default meta;

type Story = StoryObj<typeof IconButtons>;

/** 공통으로 쓸 돋보기 아이콘 */
const SearchIcon = (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    role="img"
    aria-label="search"
  >
    <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
    <path
      d="M20 20 L16.5 16.5"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

/** 기본: 프라이머리 + 돋보기 */
export const SolidPrimary: Story = {
  args: { children: SearchIcon },
};

/** 카카오: 카카오 아이콘 사용 */
export const Kakao: Story = {
  args: {
    variant: "solid",
    color: "kakao",
    "aria-label": "share-kakao",
  },
  render: (args) => (
    <IconButtons {...args}>
      <Image src="/icons/share-kakao.svg" alt="" width={40} height={40} />
    </IconButtons>
  ),
};

/** 페이스북: 페북 아이콘 사용 */
export const Facebook: Story = {
  args: {
    variant: "solid",
    color: "facebook",
    "aria-label": "share-facebook",
  },
  render: (args) => (
    <IconButtons {...args}>
      <Image src="/icons/share-facebook.svg" alt="" width={40} height={40} />
    </IconButtons>
  ),
};

/** 아웃라인 + 선택 상태 (아이콘은 동일하게 돋보기) */
export const OutlineSelected: Story = {
  args: {
    variant: "outline",
    color: "primary",
    selected: true,
    children: SearchIcon,
  },
};

/** 고스트/네추럴 (돋보기) */
export const GhostNeutral: Story = {
  args: { variant: "ghost", color: "neutral", children: SearchIcon },
};

/** 사이즈/라운드 비교 */
export const SizesAndRounded: Story = {
  render: (args) => (
    <div className="flex items-center gap-4">
      <IconButtons {...args} size="sm" rounded="lg">
        {SearchIcon}
      </IconButtons>
      <IconButtons {...args} size="md" rounded="xl">
        {SearchIcon}
      </IconButtons>
      <IconButtons {...args} size="lg" rounded="full">
        {SearchIcon}
      </IconButtons>
    </div>
  ),
};
