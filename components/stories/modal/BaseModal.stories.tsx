import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import BaseModal from "../../common/modal/BaseModal";
import { Buttons } from "../../common/button";

// 기본 메타정보
const meta: Meta<typeof BaseModal> = {
  title: "Common/Modal/BaseModal",
  component: BaseModal,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "BaseModal은 모든 모달의 기본 틀로, 제목·설명·본문·TextArea·확인 버튼 등의 공통 레이아웃을 제공합니다.",
      },
    },
  },
};
export default meta;

type Story = StoryObj<typeof BaseModal>;

// 기본 모달
export const Default: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <BaseModal
        open={open}
        onOpenChange={setOpen}
        trigger={
          <Buttons
            onClick={() => setOpen(true)}
            className="bg-orange-500 text-white hover:bg-orange-600"
          >
            기본 모달 열기
          </Buttons>
        }
        title="기본 모달 예시"
        description="이 모달은 BaseModal의 기본 구조를 보여줍니다."
        departure="서울특별시 강남구"
        destination="부산광역시 해운대구"
        moveDate="2025-11-01"
        textAreaLabel="내용 입력"
        confirmText="확인"
        onConfirm={(value) => alert(`입력 내용: ${value}`)}
      />
    );
  },
};

// textArea 없는 버전
export const WithoutTextArea: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <BaseModal
        open={open}
        onOpenChange={setOpen}
        trigger={
          <Buttons
            onClick={() => setOpen(true)}
            className="bg-gray-500 text-white hover:bg-gray-600"
          >
            TextArea 없는 모달
          </Buttons>
        }
        title="텍스트 영역 없음"
        description="showTextArea=false 설정 예시입니다."
        showTextArea={false}
        confirmText="닫기"
      />
    );
  },
};
