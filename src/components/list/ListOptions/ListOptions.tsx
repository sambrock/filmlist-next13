'use client';

import { useRef } from 'react';
import {
  CopyOutlined,
  DeleteOutlined,
  ExportOutlined,
  PlusOutlined,
  SaveOutlined,
  UndoOutlined,
} from '@ant-design/icons';
import { clsx } from 'clsx';

import { useMenu } from '@/hooks/useMenu';
import { ListOptionsButton } from './ListOptionsButton';
import { ListOptionsMenu } from './ListOptionsMenu';
import { KeyboardShortcut } from '@/components/common/KeyboardShortcut';
import { useNavigateListWithKeyboard } from '@/hooks/useNavigateListWithKeyboard';

const listOptions = [
  { label: 'New list', icon: <PlusOutlined />, onClick: () => {} },
  { label: 'Duplicate list', icon: <CopyOutlined />, onClick: () => {} },
  { label: 'Delete list', icon: <DeleteOutlined />, onClick: () => {} },
  null,
  { label: 'Undo', icon: <UndoOutlined />, keyboardShortcut: ['⌘', 'Z'], onClick: () => {} },
  null,
  { label: 'Save', icon: <SaveOutlined />, keyboardShortcut: ['⌘', 'S'], onClick: () => {} },
  { label: 'Export', icon: <ExportOutlined />, keyboardShortcut: ['⌘', '⇧', 'E'], onClick: () => {} },
];

export const ListOptions = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const menu = useMenu({ containerRef });
  const navigateList = useNavigateListWithKeyboard({ containerRef, listRef });

  return (
    <div ref={containerRef} {...menu.getContainerProps({ ...navigateList.getContainerProps() })}>
      <ListOptionsButton {...menu.getMenuButtonProps()} />
      <ListOptionsMenu ref={listRef} {...menu.getMenuProps()}>
        {listOptions.map((option, index) => {
          if (option === null) return <div key={index} className="my-1 h-px bg-neutral-500" />;
          const itemIndex = listOptions.filter((o) => o !== null).indexOf(option);
          return (
            <li
              key={index}
              {...navigateList.getListItemProps(itemIndex)}
              className={clsx('mx-1 flex cursor-pointer items-center gap-2 rounded-md px-2 py-1', {
                'bg-transparent': navigateList.highlightedIndex !== itemIndex,
                'bg-neutral-500': navigateList.highlightedIndex === itemIndex,
              })}
            >
              <div className="flex items-center text-white/60">{option.icon}</div>
              <span className="mt-[3px] text-sm text-white/60">{option.label}</span>
              {option.keyboardShortcut && <KeyboardShortcut className="ml-auto" keys={option.keyboardShortcut} />}
            </li>
          );
        })}
      </ListOptionsMenu>
    </div>
  );
};
