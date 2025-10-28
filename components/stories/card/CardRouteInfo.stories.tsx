import type { Meta, StoryObj } from "@storybook/react";
import CardRouteInfo from "../../common/card/CardRouteInfo";
import Card from "../../common/card/Card";

const meta: Meta<typeof CardRouteInfo> = {
  title: "Common/Card/CardRouteInfo",
  component: CardRouteInfo,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "`CardRouteInfo`는 출발지(`from`)와 도착지(`to`)를 표시하는 컴포넌트입니다. " +
          "`showArrow`를 통해 화살표 표시 여부를 제어할 수 있으며, `className`으로 커스텀 스타일을 지정할 수 있습니다.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof CardRouteInfo>;

/** 기본형 (출발지 → 도착지 + 화살표) */
export const Default: Story = {
  render: () => (
    <Card className="w-[360px]">
      <CardRouteInfo from="서울특별시 강남구" to="부산광역시 해운대구" />
    </Card>
  ),
};

/** 화살표 제거 */
export const NoArrow: Story = {
  render: () => (
    <Card className="w-[360px]">
      <CardRouteInfo from="서울 송파구" to="경기도 수원시" showArrow={false} />
    </Card>
  ),
};

/** 커스텀 스타일 */
export const CustomStyle: Story = {
  render: () => (
    <Card className="w-[360px] border-orange-200 bg-orange-50">
      <CardRouteInfo
        from="인천 연수구"
        to="대전 서구"
        className="text-orange-600"
      />
    </Card>
  ),
};
