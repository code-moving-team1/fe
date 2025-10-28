import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { MoverTabs } from "@/components/common/tab/MoverTabs";

const meta: Meta<typeof MoverTabs> = {
  title: "Common/MoverTabs",
  component: MoverTabs,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
일반/지정 2가지 유형 탭 컴포넌트입니다.
- \`value\`: "normal" | "direct"
- \`onChange(next)\`: 탭 변경 콜백
- \`counts\`: 각 탭의 배지 숫자(선택)
        `,
      },
    },
  },
  argTypes: {
    value: {
      control: "radio",
      options: ["normal", "direct"],
      description: "현재 선택된 탭",
    },
    counts: {
      control: "object",
      description: "각 탭의 배지 숫자",
    },
  },
};
export default meta;

type Story = StoryObj<typeof MoverTabs>;

/* ------------------------------ 기본 ------------------------------ */
export const Default: Story = {
  args: {
    value: "normal",
    counts: { normal: 7, direct: 3 },
  },
};

/* ------------------------------ 제어형 ------------------------------ */
export const Controlled: Story = {
  render: () => {
    const [tab, setTab] = useState<"normal" | "direct">("normal");
    return (
      <div className="flex flex-col items-center gap-4">
        <MoverTabs
          value={tab}
          onChange={setTab}
          counts={{ normal: 5, direct: 1 }}
        />
        <div className="text-sm text-gray-600">
          현재 탭: <span className="font-semibold">{tab}</span>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: { story: "useState로 탭 상태를 제어하는 컨트롤드 예시" },
    },
  },
};

/* ------------------------------ 커스텀 배지 없이 ------------------------------ */
export const WithoutCounts: Story = {
  args: { value: "direct" },
  parameters: {
    docs: { description: { story: "counts 미지정 시 배지 미표시" } },
  },
};
