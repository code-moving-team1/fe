import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import TextInput from "../../common/input/TextInput";

const meta: Meta<typeof TextInput> = {
  title: "Common/Input/TextInput",
  component: TextInput,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
🧩 **어디서 사용하나**
회원가입, 로그인, 견적 요청, 리뷰 작성 등 **사용자 입력이 필요한 모든 페이지**에서 사용합니다.  
단일 입력 필드로도 쓰이고, 폼(Form) 컴포넌트 내에서 다른 입력들과 함께 구성됩니다.

⚙️ **어떻게 사용하나**
\`label\`, \`placeholder\`, \`value\`, \`onChange\` 등의 props를 받아 **제어형(input-controlled)** 컴포넌트로 동작합니다.  
form 라이브러리(예: react-hook-form)와 함께 연결해서도 사용할 수 있습니다.

💡 **사용 예시**
\`\`\`tsx
<TextInput
  id="username"
  label="이름"
  placeholder="이름을 입력하세요"
  value={name}
  onChange={(e) => setName(e.target.value)}
/>
\`\`\`

🎨 **특징**
- TailwindCSS 기반 스타일로, focus 시 테두리 강조  
- className으로 border, 색상 등 자유롭게 커스터마이징 가능  
- label과 helper text를 함께 표시할 수 있음  
- 비활성화 상태 표현 가능 (스타일로 제어)

♿ **접근성**
- label과 input의 id 연결로 스크린리더 지원  
- placeholder와 label이 함께 존재할 때, label 우선 읽힘
        `,
      },
    },
  },
};
export default meta;

type Story = StoryObj<typeof TextInput>;

/* ------------------------------ 기본 상태 ------------------------------ */
export const Default: Story = {
  render: () => {
    const [value, setValue] = useState("");
    return (
      <div className="w-80">
        <TextInput
          id="input1"
          label="이름"
          placeholder="이름을 입력하세요"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </div>
    );
  },
};

/* ------------------------------ 비활성 상태 ------------------------------ */
export const Disabled: Story = {
  render: () => (
    <div className="w-80">
      <TextInput
        id="input2"
        label="비활성 입력"
        value="입력 불가"
        onChange={() => {}}
        placeholder="입력 불가"
        className="pointer-events-none opacity-60 select-none"
        aria-disabled="true"
      />
    </div>
  ),
};

/* ------------------------------ 커스텀 스타일 ------------------------------ */
export const CustomStyle: Story = {
  render: () => (
    <div className="w-80">
      <TextInput
        id="input3"
        label="커스텀 스타일"
        placeholder="테두리 색 변경"
        className="border-orange-400 focus:ring-orange-400"
      />
    </div>
  ),
};
