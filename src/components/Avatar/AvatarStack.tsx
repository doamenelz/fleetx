"use client";
import { Avatar, AVATAR_SIZES, AvatarStackProps } from ".";
export const AvatarStack = ({
  items,
  size = AVATAR_SIZES.md,
  count = 4,
  onClick,
}: AvatarStackProps) => {
  return (
    <div>
      <div className="flex flex-shrink-0 -space-x-1">
        {items.slice(0, count).map((item, index) => (
          <Avatar
            key={index}
            firstName={item.firstName}
            lastName={item.lastName}
            size={size}
            imageUrl={item.imageUrl}
          />
        ))}
        {count < items.length && (
          <button
            className="mx-auto text-center group -ml-4"
            onClick={onClick}
          >
            <div className="w-8 h-8 text-xs items-center p-2 text-gray-900 bg-gray-200 rounded-full group-hover:text-primary-900 group-hover:bg-primary-50">
              +{items.length - count}
            </div>
          </button>
        )}
      </div>
    </div>
  );
};
