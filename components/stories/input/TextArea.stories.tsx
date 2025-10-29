import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import TextArea from "../../common/input/TextArea";

const meta: Meta<typeof TextArea> = {
  title: "Common/Input/TextArea",
  component: TextArea,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
어디서 사용하나
- **받은 요청 페이지**: 이사 요청에 대한 추가 메모나 요청사항을 입력할 때 사용합니다.
- **작성 가능한 리뷰 페이지**: 이사업체 이용 후 리뷰 내용을 작성할 때 사용합니다.
- 여러 줄의 텍스트 입력이 필요한 모든 상황(예: 상세 설명, 의견 작성)에 적합합니다.

어떻게 사용하나
- label, placeholder, value, onChange 등의 props를 받아 제어형 컴포넌트로 동작합니다.
- react-hook-form 같은 폼 라이브러리와 함께 연결하여 사용할 수 있습니다.
- 작성 중 입력값은 부모 상태 또는 form 라이브러리에서 관리합니다.

사용 예시
- TextArea id="review" label="리뷰 작성" placeholder="이사 서비스에 대한 의견을 입력하세요" value={text} onChange={(e) => setText(e.target.value)}

특징
- TailwindCSS 기반으로 border, 색상, 높이 등 자유롭게 커스터마이징 가능
- autogrow 기능이 없는 경우 CSS 또는 resize 속성으로 높이 조정 가능
- 비활성 상태는 opacity, pointer-events-none 등 시각적 표현으로 처리 가능
- form 구성 요소로 쉽게 재사용 가능
        `,
      },
    },
  },
};
export default meta;

type Story = StoryObj<typeof TextArea>;

/* ------------------------------ 기본 상태 ------------------------------ */
export const Default: Story = {
  render: () => {
    const [value, setValue] = useState("");
    return (
      <div className="w-[400px]">
        <TextArea
          id="ta-1"
          label="추가 요청사항"
          placeholder="상세 내용을 입력하세요"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </div>
    );
  },
};

/* ------------------------------ 긴 텍스트 입력 ------------------------------ */
export const WithLongText: Story = {
  render: () => {
    const [value, setValue] = useState(
      "긴 텍스트 입력 12412423532562341241245",
    );
    return (
      <div className="w-[400px]">
        <TextArea
          id="ta-2"
          label="긴 텍스트"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </div>
    );
  },
};

/* ------------------------------ 비활성 상태(시각적) ------------------------------ */
export const Disabled: Story = {
  render: () => (
    <div className="pointer-events-none w-[400px] opacity-60 select-none">
      <TextArea
        id="ta-3"
        label="비활성 상태"
        placeholder="입력할 수 없습니다"
        value="이 텍스트 영역은 비활성화 상태입니다."
        onChange={() => {}}
        aria-disabled="true"
      />
    </div>
  ),
};
