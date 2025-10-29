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
어디서 사용하나
- **회원가입 페이지**: 이메일, 비밀번호, 이름 등의 기본 사용자 정보를 입력할 때 사용합니다.
- **로그인 페이지**: 이메일, 비밀번호 입력 필드로 사용됩니다.
- **받은 요청 페이지**: 메모, 검색어 등 간단한 텍스트 입력용으로 사용됩니다.
- **프로필 수정 페이지**: 닉네임, 연락처 등 사용자 정보 수정 시 사용됩니다.

어떻게 사용하나
- label, placeholder, value, onChange 등의 props를 받아 제어형(input-controlled) 컴포넌트로 동작합니다.
- form 라이브러리(예: react-hook-form)와 연결해 검증 및 상태 관리를 함께 할 수 있습니다.
- value와 onChange를 부모 컴포넌트에서 관리합니다.

사용 예시
- TextInput id="email" label="이메일" placeholder="이메일을 입력하세요" value={email} onChange={(e) => setEmail(e.target.value)}
- TextInput id="nickname" label="닉네임" placeholder="닉네임을 입력하세요"

특징
- TailwindCSS 기반으로 border, 색상, focus ring 등을 자유롭게 커스터마이징 가능
- label, helper text, placeholder를 함께 사용할 수 있음
- 비활성 상태는 opacity, pointer-events-none 등으로 표현 가능
- form 입력 흐름 내에서도 일관된 스타일 유지
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
