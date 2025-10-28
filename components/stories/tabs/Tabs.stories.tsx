import type { Meta, StoryObj } from "@storybook/react";
import { Tabs } from "@/components/common/tab/Tabs";
import { useState } from "react";

const meta: Meta<typeof Tabs> = {
  title: "Common/Tabs",
  component: Tabs,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
3개의 상태 탭("대기 중", "확정됨", "기한 만료")을 표시하는 컴포넌트입니다.  
- \`value\`: 현재 선택된 탭 키 ("active" | "confirmed" | "expired")  
- \`onChange(next)\`: 탭 클릭 시 호출  
- \`labels\`: 각 탭 라벨 텍스트  
- \`counts\`: 각 탭 옆 뱃지 숫자  
        `,
      },
    },
  },
  argTypes: {
    value: {
      control: "radio",
      options: ["active", "confirmed", "expired"],
      description: "현재 선택된 탭 키",
    },
    counts: {
      control: "object",
      description: "각 탭별 개수 표시용 객체",
    },
  },
};
export default meta;

type Story = StoryObj<typeof Tabs>;

/* ------------------------------ 기본 스토리 ------------------------------ */
export const Default: Story = {
  args: {
    value: "active",
    counts: { active: 3, confirmed: 2, expired: 1 },
  },
};

/* ------------------------------ 제어형 (state) ------------------------------ */
export const Controlled: Story = {
  render: () => {
    const [tab, setTab] = useState<"active" | "confirmed" | "expired">(
      "active",
    );
    return (
      <div className="flex flex-col items-center gap-4">
        <Tabs
          value={tab}
          onChange={setTab}
          counts={{ active: 4, confirmed: 1, expired: 0 }}
        />
        <div className="text-sm text-gray-600">
          현재 탭: <span className="font-semibold">{tab}</span>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "useState로 탭 상태를 제어하는 컨트롤드 예시입니다.",
      },
    },
  },
};

/* ------------------------------ 커스텀 라벨 ------------------------------ */
export const CustomLabels: Story = {
  args: {
    value: "confirmed",
    counts: { active: 8, confirmed: 5 },
    labels: { active: "대기", confirmed: "확정", expired: "만료" },
  },
  parameters: {
    docs: {
      description: {
        story:
          "`labels` prop을 통해 각 탭의 표시 텍스트를 커스터마이즈할 수 있습니다.",
      },
    },
  },
};
