declare module "lucide-react" {
  import { FC, SVGProps } from "react";

  export interface IconProps extends SVGProps<SVGSVGElement> {
    size?: string | number;
    strokeWidth?: string | number;
    absoluteStrokeWidth?: boolean;
  }

  export const Heart: FC<IconProps>;
  export const Copy: FC<IconProps>;
  export const X: FC<IconProps>;
  export const Eye: FC<IconProps>;
  export const Code: FC<IconProps>;
  export const Smartphone: FC<IconProps>;
  export const Monitor: FC<IconProps>;
  export const Check: FC<IconProps>;
  export const Trash2: FC<IconProps>;
}
