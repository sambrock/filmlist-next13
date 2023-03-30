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

import { useMenu } from '@/hooks/useMenu';
import { ListOptionsButton } from './ListOptionsButton';
import { useNavigateListWithKeyboard } from '@/hooks/useNavigateListWithKeyboard';
import { useListStore } from '@/store/list/useListStore';
import { useDuplicateList } from '@/hooks/api/useDuplicateList';
import { SelectList } from '@/components/layout/Select/SelectList';
import { SelectItem } from '@/components/layout/Select/SelectItem';
import { useCreateList } from '@/hooks/api/useCreateList';
import { BASE_URL } from '@/constants';
import { KeyboardShortcut } from '@/components/common/KeyboardShortcut';
import { useTriggerSearch } from '@/components/layout/SaveIndicator';

export const ListOptions = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const navigateList = useNavigateListWithKeyboard({ containerRef, listRef });
  const menu = useMenu({ containerRef, onOpen: navigateList.reset });

  return (
    <div ref={containerRef} {...menu.getContainerProps({ ...navigateList.getContainerProps() })}>
      <ListOptionsButton {...menu.getMenuButtonProps()} />
      {menu.isOpen && (
        <SelectList ref={listRef} {...menu.getMenuProps()}>
          {listOptions.map((option, index) => {
            if (option === null) return <div key={index} className="my-1 h-px bg-neutral-500" />;
            const itemIndex = listOptions.filter((o) => o !== null).indexOf(option);
            const ListItem = option[0];
            if (!ListItem) return null;
            return (
              <ListItem
                key={index}
                {...navigateList.getListItemProps(itemIndex)}
                isHighlighted={
                  navigateList.highlightedIndex !== -1 ? navigateList.highlightedIndex === itemIndex : false
                }
              />
            );
          })}
        </SelectList>
      )}
    </div>
  );
};

const ListOptionsNewList = (props: React.ComponentProps<'li'> & { isHighlighted?: boolean }) => {
  const { trigger, isMutating } = useCreateList({
    onSuccess: (data) => {
      const url = BASE_URL + `/e/${data.id}?t=${data.token}`;
      window.open(url, '_blank');
    },
  });

  return (
    <SelectItem
      {...props}
      isHighlighted={props.isHighlighted}
      leading={<PlusOutlined />}
      isLoading={isMutating}
      onClick={!isMutating ? trigger : () => {}}
    >
      New list ↗
    </SelectItem>
  );
};

const ListOptionsDuplicateList = (props: React.ComponentProps<'li'> & { isHighlighted?: boolean }) => {
  const listId = useListStore.getState().data.list.id;

  const { trigger, isMutating } = useDuplicateList(listId, {
    onSuccess: (data) => {
      const url = BASE_URL + `/e/${data.id}?t=${data.token}`;
      window.open(url, '_blank');
    },
  });

  return (
    <SelectItem {...props} leading={<CopyOutlined />} isLoading={isMutating} onClick={!isMutating ? trigger : () => {}}>
      Duplicate list ↗
    </SelectItem>
  );
};

const ListOptionsDeleteList = (props: React.ComponentProps<'li'> & { isHighlighted?: boolean }) => {
  return (
    <SelectItem {...props} leading={<DeleteOutlined />}>
      Delete list
    </SelectItem>
  );
};

const ListOptionsUndo = (props: React.ComponentProps<'li'> & { isHighlighted?: boolean }) => {
  return (
    <SelectItem {...props} leading={<UndoOutlined />} trailing={<KeyboardShortcut keys={['⌘', 'Z']} />}>
      Undo
    </SelectItem>
  );
};

const ListOptionsSave = (props: React.ComponentProps<'li'> & { isHighlighted?: boolean }) => {
  const { triggerSearch } = useTriggerSearch();

  return (
    <SelectItem
      {...props}
      leading={<SaveOutlined />}
      trailing={<KeyboardShortcut keys={['⌘', 'S']} />}
      onClick={triggerSearch}
    >
      Save
    </SelectItem>
  );
};

const ListOptionsExport = (props: React.ComponentProps<'li'> & { isHighlighted?: boolean }) => {
  return (
    <SelectItem {...props} leading={<ExportOutlined />} trailing={<KeyboardShortcut keys={['⇧', '⌘', 'E']} />}>
      Export
    </SelectItem>
  );
};

const listOptions = [
  [ListOptionsNewList],
  [ListOptionsDuplicateList],
  [ListOptionsDeleteList],
  null,
  [ListOptionsUndo],
  null,
  [ListOptionsSave],
  [ListOptionsExport],
];
