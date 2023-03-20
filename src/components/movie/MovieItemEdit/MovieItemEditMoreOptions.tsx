import { MoreOutlined } from '@ant-design/icons';

export const MovieItemEditMoreOptions = () => {
  return (
    <button className="flex h-5 w-5 items-center justify-center rounded-sm bg-black/50 p-2 leading-none hover:bg-black-700">
      <MoreOutlined className="text-sm leading-none" />
    </button>
  );
};

// Change movie poster image
// Add as list backdrop
// Move to back
// Move to front
// Rate
// Like
