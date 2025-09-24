import { useTheme } from "../../hooks/useTheme";
import type { IconKey } from "../../models/IconKey";

interface IconProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: IconKey;
  size?: number | string;
}

export const Icon = ({ src, size, ...props }: IconProps) => {
  const { theme } = useTheme();
  return (
    <img
      src={theme.icons[src]}
      alt={props.alt ?? src}
      width={size}
      height={size}
      {...props}
    />
  );
};
