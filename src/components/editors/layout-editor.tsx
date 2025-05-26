import { LayoutInfo } from '@/types/field';
import { FC } from 'react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { WIDTH_OPTIONS } from '@/constants/fields';
import { Label } from '../ui/label';

type LayoutProps = {
  layoutInfo: LayoutInfo;
  onChange: (newLayoutInfo: LayoutInfo) => void;
};

const LayoutEditor: FC<LayoutProps> = ({
  layoutInfo,
  onChange,
}: LayoutProps) => {
  const updateLayoutInfo = <K extends keyof LayoutInfo>(
    key: K,
    value: LayoutInfo[K]
  ) => {
    onChange({ ...layoutInfo, [key]: value });
  };

  return (
    <div className='space-y-4'>
      <h3 className='font-semibold text-lg'>Layout Info</h3>

      <div className='space-y-2'>
        <Label className='block text-sm font-medium'>Width</Label>
        <Select
          onValueChange={(value) =>
            updateLayoutInfo('width', value as LayoutInfo['width'])
          }
          value={layoutInfo?.width}
        >
          <SelectTrigger className='w-full'>
            <SelectValue placeholder='Select a width' />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {WIDTH_OPTIONS.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default LayoutEditor;
