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
- 견적 요청 폼, 리뷰 작성, 프로필 소개 등 여러 줄의 텍스트 입력이 필요한 페이지에서 사용합니다.
- "추가 요청사항"이나 "상세 설명" 같은 필드에 적합합니다.

어떻게 사용하나
- label, placeholder, value, onChange 등의 props를 받아 제어형 컴포넌트로 동작합니다.
- react-hook-form 같은 폼 라이브러리와 함께 사용할 수 있습니다.

사용 예시
- TextArea id="review" label="리뷰 작성" placeholder="의견을 입력하세요" value={text} onChange={(e) => setText(e.target.value)}

특징
- TailwindCSS 기반으로 크기, padding, border 색상 등을 커스터마이징할 수 있습니다.
- 자동 높이 조절(autogrow) 기능이 없다면 CSS로 수동 조절 가능합니다.
- 시각적 비활성화 상태 표현: opacity, pointer-events-none 등으로 처리 가능합니다.

접근성
- label 과 textarea 의 id 연결로 스크린리더를 지원합니다.
- aria-disabled 또는 readOnly 상태에서 읽기 전용으로 표시할 수 있습니다.
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
