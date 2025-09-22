import Image from "next/image";

interface MoverAvatarProps {
  avatarUrl?: string;
  size?: number;
  className?: string;
}

export default function MoverAvatar({
  avatarUrl,
  size = 60,
  className,
}: MoverAvatarProps) {
  return (
    <Image
      src={avatarUrl || "/assets/profile.svg"}
      alt="기사님 프로필"
      width={size}
      height={size}
      className="rounded-lg object-cover"
    />
  );
}
