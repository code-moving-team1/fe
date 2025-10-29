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
어디서 사용하나
- **견적 요청 페이지**: '소형이사', '가정이사' 등 이사 유형을 선택하거나, '일반 요청', '지정 요청'과 같은 요청 방식을 선택할 때 사용합니다.
- **기사님 찾기 페이지**: 지역, 서비스 종류 등의 필터를 선택할 때 사용합니다.
- **내 견적 관리 / 받은 요청 페이지**: 요청 상태(대기 중, 확정됨 등) 필터로 사용됩니다.
- **기사님 상세 / 리뷰 / 프로필 페이지**: 서비스 지역, 이사 타입 등 태그형 정보 표시용으로 사용됩니다.
- 전반적으로 **선택형 카테고리·요청유형·필터** UI로 프로젝트 전반에 재사용됩니다.

어떻게 사용하나
- variant, color, size, selected 등의 props를 조합하여 칩의 형태와 상태를 제어합니다.
- outline 모드에서는 selected 속성을 통해 토글(선택/해제) 상태를 표현할 수 있습니다.
- leftIcon을 통해 칩 왼쪽에 아이콘을 표시할 수 있습니다.

사용 예시
- Chip variant="outline" color="primary" selected={true} children="가정이사"
- Chip variant="solid" color="neutral" children="일반 요청"
- Chip leftIcon={<Search size={14} />} children="검색"

특징
- TailwindCSS 기반으로 border, 색상, 배경 등을 손쉽게 커스터마이징 가능
- solid / outline 모드 및 선택 상태 지원
- 크기(xs, sm, md, lg) 옵션으로 다양한 컨텍스트 대응
- 아이콘(leftIcon) 표시 가능
- hover, focus, disabled 등 상태별 시각 피드백 포함
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
        소형이사
      </Chip>
      <Chip variant="outline" color="neutral" selected>
        지정견적요청
      </Chip>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "selected가 true일 때 outline 칩의 선택 상태를 표시합니다.",
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
        story: "왼쪽 아이콘(leftIcon)이 포함된 칩 예시입니다.",
      },
    },
  },
};
