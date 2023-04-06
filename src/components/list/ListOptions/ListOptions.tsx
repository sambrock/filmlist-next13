'use client';

import { forwardRef, useRef } from 'react';
import {
  CopyOutlined,
  ExportOutlined,
  PlusOutlined,
  RedoOutlined,
  SaveOutlined,
  UndoOutlined,
} from '@ant-design/icons';
import { useEventListener } from 'usehooks-ts';

import { useMenu } from '@/hooks/useMenu';
import { ListOptionsButton } from './ListOptionsButton';
import { useNavigateListWithKeyboard } from '@/hooks/useNavigateListWithKeyboard';
import { handleRedo, handleUndo, useListStore } from '@/store/list/useListStore';
import { useDuplicateList } from '@/hooks/api/useDuplicateList';
import { useCreateList } from '@/hooks/api/useCreateList';
import { BASE_URL } from '@/constants';
import { KeyboardShortcut } from '@/components/common/KeyboardShortcut';
import { useTriggerSearch } from '@/components/layout/SaveIndicator';
import { SelectItem, SelectList } from '@/components/common/Select';

export const ListOptions = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const listItemRefs = useRef<HTMLLIElement[]>([]);

  const navigateList = useNavigateListWithKeyboard({ containerRef, listRef, listItemRefs });
  const menu = useMenu({ containerRef, onOpen: navigateList.reset });

  useEventListener('keydown', (e) => {
    if (!menu.isOpen) return;
    if (e.key === 'Enter') {
      e.preventDefault();
      const highlightedIndex = navigateList.highlightedIndex;
      if (highlightedIndex !== -1) {
        const item = listItemRefs.current[highlightedIndex];
        if (item) {
          item.click();
        }
      }
    }
  });

  return (
    <div ref={containerRef} {...menu.getContainerProps({ ...navigateList.getContainerProps() })}>
      <ListOptionsButton {...menu.getMenuButtonProps()} />
      {menu.isOpen && (
        <SelectList
          ref={listRef}
          {...menu.getMenuProps()}
          onKeyDown={(e) => {
            console.log(e);
            if (e.key === 'Enter') {
              e.preventDefault();
              const highlightedIndex = navigateList.highlightedIndex;
              if (highlightedIndex !== -1) {
                const item = listItemRefs.current[highlightedIndex];
                if (item) {
                  item.click();
                }
              }
            }
          }}
        >
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

const ListOptionsNewList = forwardRef<HTMLLIElement, React.ComponentProps<'li'> & { isHighlighted?: boolean }>(
  (props, ref) => {
    const { trigger, isMutating } = useCreateList({
      onSuccess: (data) => {
        const url = BASE_URL + `/e/${data.id}?t=${data.token}`;
        window.open(url, '_blank');
      },
    });

    return (
      <SelectItem
        {...props}
        ref={ref}
        isHighlighted={props.isHighlighted}
        leading={<PlusOutlined />}
        isLoading={isMutating}
        onClick={!isMutating ? trigger : () => {}}
      >
        New list ↗
      </SelectItem>
    );
  }
);

const ListOptionsDuplicateList = forwardRef<HTMLLIElement, React.ComponentProps<'li'>>(
  (props: React.ComponentProps<'li'> & { isHighlighted?: boolean }, ref) => {
    const listId = useListStore.getState().data.list.id;

    const { trigger, isMutating } = useDuplicateList(listId, {
      onSuccess: (data) => {
        const url = BASE_URL + `/e/${data.id}?t=${data.token}`;
        window.open(url, '_blank');
      },
    });

    return (
      <SelectItem
        {...props}
        ref={ref}
        leading={<CopyOutlined />}
        isLoading={isMutating}
        onClick={!isMutating ? trigger : () => {}}
      >
        Duplicate list ↗
      </SelectItem>
    );
  }
);

const ListOptionsUndo = forwardRef<HTMLLIElement, React.ComponentProps<'li'> & { isHighlighted?: boolean }>(
  (props, ref) => {
    return (
      <SelectItem
        {...props}
        ref={ref}
        leading={<UndoOutlined />}
        trailing={<KeyboardShortcut defaultKeys={['Ctrl', 'Z']} macosKeys={['⌘', 'Z']} />}
        onClick={handleUndo}
      >
        Undo
      </SelectItem>
    );
  }
);

const ListOptionsRedo = forwardRef<HTMLLIElement, React.ComponentProps<'li'> & { isHighlighted?: boolean }>(
  (props, ref) => {
    return (
      <SelectItem
        {...props}
        ref={ref}
        leading={<RedoOutlined />}
        trailing={<KeyboardShortcut defaultKeys={['Ctrl', '⇧', 'Z']} macosKeys={['⇧', '⌘', 'Z']} />}
        onClick={handleRedo}
      >
        Redo
      </SelectItem>
    );
  }
);

const ListOptionsSave = forwardRef<HTMLLIElement, React.ComponentProps<'li'> & { isHighlighted?: boolean }>(
  (props, ref) => {
    const { triggerSearch } = useTriggerSearch();

    return (
      <SelectItem
        {...props}
        ref={ref}
        leading={<SaveOutlined />}
        trailing={<KeyboardShortcut defaultKeys={['Ctrl', 'S']} macosKeys={['⌘', 'S']} />}
        onClick={triggerSearch}
      >
        Save
      </SelectItem>
    );
  }
);

const ListOptionsExport = forwardRef<HTMLLIElement, React.ComponentProps<'li'> & { isHighlighted?: boolean }>(
  (props, ref) => {
    return (
      <SelectItem
        {...props}
        ref={ref}
        leading={<ExportOutlined />}
        trailing={<KeyboardShortcut defaultKeys={['Ctrl', '⇧', 'Z']} macosKeys={['⇧', '⌘', 'Z']} />}
      >
        Export
      </SelectItem>
    );
  }
);

const listOptions = [
  [ListOptionsNewList],
  [ListOptionsDuplicateList],
  null,
  [ListOptionsUndo],
  [ListOptionsRedo],
  null,
  [ListOptionsSave],
  [ListOptionsExport],
];
