import type { Meta, StoryObj } from "@storybook/react";
import MyRequestCard from "@/components/common/card/MyRequestCard";

const meta: Meta<typeof MyRequestCard> = {
  title: "Common/Card/MyRequestCard",
  component: MyRequestCard,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
어디서 사용하나
- **일반 사용자용 내 견적 관리 페이지**에서 사용됩니다.  
  사용자가 직접 등록한 견적 요청을 카드 형태로 보여줍니다.  
- 각 카드에는 서비스 유형(소형/가정/사무실 이사), 요청 상태(대기 중 / 진행 중 / 완료),  
  등록일, 출발지/도착지, 이사 날짜 등의 정보가 표시됩니다.

어떻게 사용하나
- \`req\` prop으로 견적 요청 데이터를 전달하면 자동으로 카드가 렌더링됩니다.
- 데이터에는 serviceType, status, moveDate, createdAt, departure, destination 등의 필드가 포함됩니다.
- 상태(status)에 따라 색상 또는 라벨 스타일이 달라지며,  
  사용자는 한눈에 요청 진행 상태를 확인할 수 있습니다.

사용 예시
\`\`\`tsx
<MyRequestCard
  req={{
    id: 1,
    serviceType: "SMALL",
    status: "PENDING",
    moveDate: "2025-11-05T00:00:00Z",
    createdAt: "2025-10-20T09:00:00Z",
    departure: "서울 강남구",
    departureRegion: "서울특별시",
    destination: "부산 해운대구",
    destinationRegion: "부산광역시",
  }}
/>
\`\`\`

특징
- TailwindCSS 기반으로 카드 내부 구성요소(텍스트, 배경, 상태 라벨 등) 커스터마이징 가능  
- 서비스 유형별로 다른 아이콘 또는 라벨 표시 가능  
- 리스트 형태로 나열되어도 균일한 높이와 간격을 유지  
        `,
      },
    },
  },
};
export default meta;

type Story = StoryObj<typeof MyRequestCard>;

/* ------------------------------ 공통 목업 ------------------------------ */
function makeReq(
  partial: Partial<Parameters<typeof MyRequestCard>[0]["req"]> = {},
) {
  return {
    id: 1,
    serviceType: "SMALL",
    status: "PENDING" as any,
    moveDate: "2025-11-05T00:00:00Z",
    createdAt: "2025-10-20T09:00:00Z",
    departure: "서울 강남구",
    departureRegion: "서울특별시",
    destination: "부산 해운대구",
    destinationRegion: "부산광역시",
    ...partial,
  } as any;
}

/* ------------------------------ 기본 예시 (소형이사 / 대기중) ------------------------------ */
export const Default: Story = {
  render: () => (
    <div className="w-[600px]">
      <MyRequestCard req={makeReq()} />
    </div>
  ),
};

/* ------------------------------ 가정이사 / 진행중 ------------------------------ */
export const FamilyMove: Story = {
  render: () => (
    <div className="w-[600px]">
      <MyRequestCard
        req={makeReq({
          serviceType: "FAMILY" as any,
          status: "IN_PROGRESS" as any,
          departure: "서울 송파구",
          destination: "경기 성남시",
        })}
      />
    </div>
  ),
};

/* ------------------------------ 사무실이사 / 완료 ------------------------------ */
export const OfficeMove: Story = {
  render: () => (
    <div className="w-[600px]">
      <MyRequestCard
        req={makeReq({
          serviceType: "OFFICE" as any,
          status: "COMPLETED" as any,
          departure: "서울 종로구",
          destination: "서울 구로구",
        })}
      />
    </div>
  ),
};
