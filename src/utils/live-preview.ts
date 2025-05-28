import { LayoutInfo } from "@/types/field";
import { cn } from "./cn";

const getWidthClass = (width?: LayoutInfo['width']) => {
  switch (width) {
    case 'full':
      return 'w-full';
    case 'half':
      return 'w-1/2';
    case 'third':
      return 'w-1/3';
    default:
      return 'w-full';
  }
};

const getAlignClass = (align?: LayoutInfo['align']) => {
  switch (align) {
    case 'center':
      return 'text-center';
    case 'right':
      return 'text-right';
    default:
      return 'text-left';
  }
};

const getHiddenClass = (hidden?: LayoutInfo['hidden']) => {
  return hidden ? 'hidden' : '';
}

export const getWrapperClass = ({ align, hidden, width }: LayoutInfo, initialClass = '') => {
  return cn(
    initialClass,
    getWidthClass(width),
    getAlignClass(align),
    getHiddenClass(hidden)
  );
}
