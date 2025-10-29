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
        component: `
어디서 사용하나
- **일반 사용자용 ‘이사 요청(견적 생성)’ 페이지**에서 사용됩니다.  
  사용자가 **출발지** 또는 **도착지** 주소를 검색하고 선택할 수 있는 모달입니다.
- 견적 요청 시 필수 입력 항목으로, 지도/검색 API(Kakao 등)와 연동되어 실제 주소를 선택하게 됩니다.

어떻게 사용하나
- type="departure" 또는 type="destination" 으로 모달 역할(출발/도착)을 구분합니다.
- open / onOpenChange / onClose 등의 props를 통해 모달 열림/닫힘 상태를 제어합니다.
- 실제 서비스에서는 Kakao API를 통해 주소 검색 결과를 받아 표시하고, 선택 시 상위 컴포넌트로 주소 데이터를 전달합니다.

사용 예시
\`\`\`tsx
const [open, setOpen] = useState(false);

<Buttons onClick={() => setOpen(true)}>출발지 선택</Buttons>
<AddressModal
  type="departure"
  open={open}
  onOpenChange={setOpen}
  onClose={() => setOpen(false)}
/>
\`\`\`

특징
- TailwindCSS 기반의 모달 UI로 반응형 지원  
- 주소 검색 및 선택 기능 통합 (API 연동 전에도 UI 미리보기 가능)  
- 출발지/도착지 모드별로 헤더 텍스트 및 안내 문구 자동 변경  
- 외부 클릭 또는 닫기 버튼으로 안전하게 닫힘  
        `,
      },
    },
  },
};
export default meta;

type Story = StoryObj<typeof AddressModal>;

/* ------------------------------ 출발지 선택 모달 ------------------------------ */
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

/* ------------------------------ 도착지 선택 모달 ------------------------------ */
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
