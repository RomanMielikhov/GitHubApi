import { useCallback, memo } from "react";
import { ReactElement, FC } from "react";

type AvatarType = {
  src: String,
  name: String,
  size: String,
};

const Avatar: FC<AvatarType> = memo((props): ReactElement => {
  const { src, name, size } = props;
  const getSize = useCallback(() => {
    if (size === "sm") return 80;
    return 220;
  }, [size]);

  return <img src={src} alt={name} width={getSize()} height={getSize()} />;
});

export default Avatar;
