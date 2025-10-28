import type { Meta, StoryObj } from "@storybook/react";
import RatingStars from "@/components/common/rating/RatingStars";
import { useState } from "react";

const meta: Meta<typeof RatingStars> = {
  title: "Common/RatingStars",
  component: RatingStars,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
별점 선택 컴포넌트.  
마우스 hover, 클릭, 키보드(←/→/↑/↓)로 제어할 수 있으며 \`readOnly\` 모드도 지원합니다.
        `,
      },
    },
  },
  argTypes: {
    value: { control: { type: "number", min: 0, max: 5, step: 1 } },
    readOnly: { control: "boolean" },
    size: { control: { type: "number", min: 16, max: 48, step: 2 } },
  },
};
export default meta;

type Story = StoryObj<typeof RatingStars>;

/* ------------------------------ 기본 스토리 ------------------------------ */
export const Default: Story = {
  args: {
    value: 3,
  },
};

/* ------------------------------ 읽기 전용 ------------------------------ */
export const ReadOnly: Story = {
  args: {
    value: 4,
    readOnly: true,
  },
};

/* ------------------------------ 제어형 예시 ------------------------------ */
export const Controlled: Story = {
  render: () => {
    const [value, setValue] = useState(2);
    return (
      <div className="flex flex-col items-center gap-4">
        <RatingStars value={value} onChange={setValue} />
        <p className="text-sm text-gray-600">현재 별점: {value}</p>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "상태를 useState로 제어하는 컨트롤드 예시입니다.",
      },
    },
  },
};
