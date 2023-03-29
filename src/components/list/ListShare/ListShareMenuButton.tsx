'use client';

import { forwardRef, Fragment } from 'react';
import { ShareAltOutlined } from '@ant-design/icons';
import { clsx } from 'clsx';

import { Button } from '@/components/common/Button';
import { ButtonIcon } from '@/components/common/ButtonIcon';

export const ListShareMenuButton = forwardRef<HTMLButtonElement, React.ComponentPropsWithoutRef<'button'>>(
  (props, ref) => {
    return (
      <Fragment>
        <Button
          {...props}
          ref={ref}
          className={clsx('hidden md:flex', props.className)}
          tone="neutral-blur"
          icon={<ShareAltOutlined />}
        >
          Share
        </Button>
        <ButtonIcon
          {...props}
          ref={ref}
          className={clsx('flex md:hidden', props.className)}
          tone="neutral-blur"
          icon={<ShareAltOutlined />}
        />
      </Fragment>
    );
  }
);
