import { Chip } from "@/components/common/chip";
import type { Meta, StoryObj } from "@storybook/react";
import { Search } from "lucide-react";

const meta: Meta<typeof Chip> = {
  title: "Common/Chip",
  component: Chip,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
💡 **공용 Chip 컴포넌트**

| Prop | Type | Default | Description |
|------|------|----------|-------------|
| \`variant\` | "solid" \| "outline" | "outline" | 칩의 스타일 타입 |
| \`color\` | "primary" \| "neutral" | "neutral" | 칩의 색상 테마 |
| \`size\` | "xs" \| "sm" \| "md" \| "lg" | "md" | 칩 크기 |
| \`selected\` | boolean | false | outline 모드에서 선택 상태를 표시 |
| \`leftIcon\` | ReactNode | - | 왼쪽에 표시할 아이콘 |

접근성:
- outline + selected일 때 \`aria-pressed\`로 토글형 버튼처럼 읽힘
        `,
      },
    },
  },
  argTypes: {
    variant: {
      control: "radio",
      options: ["solid", "outline"],
      description: "칩의 스타일 타입",
    },
    color: {
      control: "radio",
      options: ["primary", "neutral"],
      description: "칩의 색상 테마",
    },
    size: {
      control: "radio",
      options: ["xs", "sm", "md", "lg"],
      description: "칩의 크기",
    },
    selected: {
      control: "boolean",
      description: "선택 상태 (outline에서만 유효)",
    },
    leftIcon: {
      control: false,
      description: "왼쪽에 표시할 아이콘 (ReactNode)",
    },
  },
};
export default meta;

type Story = StoryObj<typeof Chip>;

/* ------------------------------ 기본 ------------------------------ */
export const Default: Story = {
  args: {
    children: "기본 칩",
  },
  parameters: {
    docs: {
      description: {
        story: "가장 기본적인 칩입니다.",
      },
    },
  },
};

/* ------------------------------ Variants ------------------------------ */
export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Chip variant="solid" color="primary">
        Solid Primary
      </Chip>
      <Chip variant="solid" color="neutral">
        Solid Neutral
      </Chip>
      <Chip variant="outline" color="primary">
        Outline Primary
      </Chip>
      <Chip variant="outline" color="neutral">
        Outline Neutral
      </Chip>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "solid / outline 변형을 비교합니다.",
      },
    },
  },
};

/* ------------------------------ Sizes ------------------------------ */
export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Chip size="xs">XS</Chip>
      <Chip size="sm">SM</Chip>
      <Chip size="md">MD</Chip>
      <Chip size="lg">LG</Chip>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "칩의 크기별 스타일을 보여줍니다.",
      },
    },
  },
};

/* ------------------------------ Selected ------------------------------ */
export const SelectedState: Story = {
  render: () => (
    <div className="flex gap-4">
      <Chip variant="outline" color="primary" selected>
        선택됨
      </Chip>
      <Chip variant="outline" color="neutral" selected>
        선택됨
      </Chip>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "`selected`가 true일 때 outline 칩의 선택 상태를 표시합니다.",
      },
    },
  },
};

/* ------------------------------ Icon ------------------------------ */
export const WithIcon: Story = {
  render: () => (
    <div className="flex gap-4">
      <Chip leftIcon={<Search size={14} />}>검색</Chip>
      <Chip variant="outline" color="primary" leftIcon={<Search size={14} />}>
        Primary + Icon
      </Chip>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "왼쪽 아이콘(`leftIcon`)이 포함된 칩 예시입니다.",
      },
    },
  },
};
