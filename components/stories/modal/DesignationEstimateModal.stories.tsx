import type { Meta, StoryObj } from "@storybook/react";
import DesignationEstimateModal from "../../common/modal/DesignationEstimateModal";

const meta: Meta<typeof DesignationEstimateModal> = {
  title: "Common/Modal/DesignationEstimateModal",
  component: DesignationEstimateModal,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
어디서 사용하나
- **기사 상세 페이지**에서 사용됩니다.  
  일반 사용자가 특정 기사님에게 직접 **지정 견적 요청**을 보낼 때 열리는 모달입니다.
- 기사님의 프로필(이름, 평점, 경력 등)을 확인한 후, 요청 내용을 입력하고 견적을 전송할 수 있습니다.

어떻게 사용하나
- BaseModal을 기반으로 만들어진 컴포넌트로, 열림/닫힘 상태는 외부에서 제어합니다.
- 내부에는 요청 상세 입력 필드, 날짜 선택, 제출 버튼 등이 포함될 수 있습니다.
- 실제 서비스에서는 onSubmit 이벤트를 통해 지정 견적 요청 API와 연동됩니다.

사용 예시
\`\`\`tsx
const [open, setOpen] = useState(false);

<Buttons onClick={() => setOpen(true)}>지정 견적 요청</Buttons>
<DesignationEstimateModal
  open={open}
  onClose={() => setOpen(false)}
/>
\`\`\`

특징
- BaseModal 레이아웃을 그대로 사용하여 일관된 모달 스타일 유지  
- 지정 견적 요청 전용 UI로, 기사에게 직접 견적을 보낼 수 있음  
- TailwindCSS 기반으로 배경, 폰트, 버튼 컬러 등 커스터마이징 가능  
- 추후 API 연동을 통해 요청 전송 로직을 쉽게 연결 가능
        `,
      },
    },
  },
};
export default meta;

type Story = StoryObj<typeof DesignationEstimateModal>;

/* ------------------------------ 기본 예시 ------------------------------ */
export const Default: Story = {
  render: () => <DesignationEstimateModal />,
};
