import { Spinner } from "@/components/common/spinner/Spinner";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Spinner> = {
  title: "Common/Spinner",
  component: Spinner,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
로딩 상태를 표시하기 위한 기본 **Spinner 컴포넌트**입니다.  
TailwindCSS 기반이며, 기본 크기는 \`h-6 w-6\`, 회전 애니메이션은 \`animate-spin\`을 사용합니다.

\`\`\`tsx
<Spinner />
<Spinner className="h-8 w-8 border-4" />
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    className: {
      control: "text",
      description: "추가 Tailwind 클래스명 (크기, 색상, 두께 등 조정용)",
    },
  },
};
export default meta;

type Story = StoryObj<typeof Spinner>;

/* ------------------------------ 기본 스피너 ------------------------------ */
export const Default: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story: "기본 24px 회전 스피너입니다.",
      },
    },
  },
};

/* ------------------------------ 사이즈 변형 ------------------------------ */
export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-6">
      <Spinner className="h-4 w-4" />
      <Spinner className="h-6 w-6" />
      <Spinner className="h-8 w-8" />
      <Spinner className="h-10 w-10" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Tailwind 클래스명으로 크기를 쉽게 조정할 수 있습니다.",
      },
    },
  },
};

/* ------------------------------ 색상/두께 예시 ------------------------------ */
export const ColorsAndBorders: Story = {
  render: () => (
    <div className="flex items-center gap-6">
      <Spinner className="border-blue-500 border-t-transparent" />
      <Spinner className="border-[#F9502E] border-t-transparent" />
      <Spinner className="border-4 border-gray-400 border-t-transparent" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "border 색상/두께를 통해 시각적 변형을 줄 수 있습니다.",
      },
    },
  },
};
