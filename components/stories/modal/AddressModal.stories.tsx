import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import AddressModal from "../../common/modal/AddressModal";
import { Buttons } from "../../common/button";

const meta: Meta<typeof AddressModal> = {
  title: "Common/Modal/AddressModal",
  component: AddressModal,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "주소 선택 모달. 출발지(`departure`) 또는 도착지(`destination`)를 선택할 수 있습니다. 실제 서비스에서는 Kakao API로 검색 결과를 가져옵니다.",
      },
    },
  },
};
export default meta;

type Story = StoryObj<typeof AddressModal>;

// 출발지 선택 모달
export const Departure: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <div className="space-y-4">
        <Buttons
          className="bg-orange-500 text-white hover:bg-orange-600"
          onClick={() => setOpen(true)}
        >
          출발지 선택 모달 열기
        </Buttons>

        <AddressModal
          type="departure"
          open={open}
          onOpenChange={setOpen}
          onClose={() => setOpen(false)}
        />
      </div>
    );
  },
};

// 도착지 선택 모달
export const Destination: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <div className="space-y-4">
        <Buttons
          className="bg-gray-600 text-white hover:bg-gray-700"
          onClick={() => setOpen(true)}
        >
          도착지 선택 모달 열기
        </Buttons>

        <AddressModal
          type="destination"
          open={open}
          onOpenChange={setOpen}
          onClose={() => setOpen(false)}
        />
      </div>
    );
  },
};
