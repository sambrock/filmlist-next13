'use client';

import { useRef } from 'react';
import { CopyOutlined, ExportOutlined, PlusOutlined, SaveOutlined, UndoOutlined } from '@ant-design/icons';
import { clsx } from 'clsx';

import { useMenu } from '@/hooks/useMenu';
import { ListOptionsButton } from './ListOptionsButton';
import { ListOptionsMenu } from './ListOptionsMenu';
import { KeyboardShortcut } from '@/components/common/KeyboardShortcut';
import { useNavigateListWithKeyboard } from '@/hooks/useNavigateListWithKeyboard';
import { api } from '@/api';
import { BASE_URL } from '@/constants';
import { useListStore } from '@/store/list/useListStore';

const listOptions = [
  {
    label: 'New list ↗',
    icon: <PlusOutlined />,
    onClick: () => {
      if (typeof window === 'undefined') return;

      api.post('/api/v1/createList', null).then((res) => {
        window.open(`${BASE_URL}/e/${res.id}?t=${res.token}`, '_blank')?.focus();
      });
    },
  },
  {
    label: 'Duplicate list ↗',
    icon: <CopyOutlined />,
    onClick: () => {
      if (typeof window === 'undefined') return;

      const listId = useListStore.getState().data.list.id;

      api.post('/api/v1/duplicateList', { listId }).then((res) => {
        window.open(`${BASE_URL}/e/${res.id}?t=${res.token}`, '_blank')?.focus();
      });
    },
  },
  // { label: 'Delete list', icon: <DeleteOutlined />, onClick: () => {} },
  null,
  { label: 'Undo', icon: <UndoOutlined />, keyboardShortcut: ['⌘', 'Z'], onClick: () => {} },
  null,
  { label: 'Save', icon: <SaveOutlined />, keyboardShortcut: ['⌘', 'S'], onClick: () => {} },
  { label: 'Export', icon: <ExportOutlined />, keyboardShortcut: ['⌘', '⇧', 'E'], onClick: () => {} },
];

export const ListOptions = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const navigateList = useNavigateListWithKeyboard({ containerRef, listRef });
  const menu = useMenu({ containerRef, onOpen: navigateList.reset });

  return (
    <div ref={containerRef} {...menu.getContainerProps({ ...navigateList.getContainerProps() })}>
      <ListOptionsButton {...menu.getMenuButtonProps()} />
      {menu.isOpen && (
        <ListOptionsMenu ref={listRef} {...menu.getMenuProps()}>
          {listOptions.map((option, index) => {
            if (option === null) return <div key={index} className="my-1 h-px bg-neutral-500" />;
            const itemIndex = listOptions.filter((o) => o !== null).indexOf(option);
            return (
              <li
                key={index}
                role="button"
                {...navigateList.getListItemProps(itemIndex)}
                className={clsx('mx-1 flex cursor-pointer items-center gap-2 rounded-md px-2 py-1', {
                  'bg-transparent': navigateList.highlightedIndex !== itemIndex,
                  'bg-neutral-500': navigateList.highlightedIndex === itemIndex,
                })}
                onClick={option.onClick}
              >
                <div className="flex items-center text-white/60">{option.icon}</div>
                <span className="mt-[3px] text-sm text-white/60">{option.label}</span>
                {option.keyboardShortcut && <KeyboardShortcut className="ml-auto" keys={option.keyboardShortcut} />}
              </li>
            );
          })}
        </ListOptionsMenu>
      )}
    </div>
  );
};
