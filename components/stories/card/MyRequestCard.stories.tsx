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
        component:
          "내 견적 요청 카드. 서비스 유형, 상태, 등록일, 출발/도착지를 보여줍니다.",
      },
    },
  },
};
export default meta;

type Story = StoryObj<typeof MyRequestCard>;

/** 공통 목업 생성기 (타입 충돌 방지용 as any 캐스팅) */
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

/** 기본 예시 (소형이사 / 대기중) */
export const Default: Story = {
  render: () => (
    <div className="w-[600px]">
      <MyRequestCard req={makeReq()} />
    </div>
  ),
};

/** 가정이사 / 진행중 */
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

/** 사무실이사 / 완료 */
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
