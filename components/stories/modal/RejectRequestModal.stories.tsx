import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import RejectRequestModal from "../../common/modal/RejectRequestModal";
import { Buttons } from "../../common/button";

const meta: Meta<typeof RejectRequestModal> = {
  title: "Common/Modal/RejectRequestModal",
  component: RejectRequestModal,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "견적 반려 모달. 고객 이름, 출발지/도착지/날짜 정보를 표시하고, 반려 사유를 입력받습니다. `BaseModal` 기반입니다.",
      },
    },
  },
};
export default meta;

type Story = StoryObj<typeof RejectRequestModal>;

export const Default: Story = {
  render: () => {
    const [pending, setPending] = useState(false);

    return (
      <RejectRequestModal
        trigger={
          <Buttons
            className="bg-orange-500 text-white hover:bg-orange-600"
            onClick={() => {}}
          >
            반려 요청 모달 열기
          </Buttons>
        }
        customerName="사람이름"
        departure="서울특별시 강남구"
        destination="부산광역시 해운대구"
        moveDate="2025-11-01"
        chips={[{ label: "소형이사", iconSrc: "/icons/ic_box.svg" }]}
        pending={pending}
        onConfirm={async (comment) => {
          setPending(true);
          await new Promise((r) => setTimeout(r, 1000));
          alert(`반려 사유: ${comment}`);
          setPending(false);
        }}
      />
    );
  },
};
