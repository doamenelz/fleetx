"use client";
import { FC, useEffect, useState } from "react";
import {
  AVATAR_SIZES,
  AvatarCell,
  BUTTON_SKIN,
  Button,
  CardWithSectionHeader,
  CardWithTitle,
  CenterCardModal,
  CopyLoader,
  EmptyStateText,
  ModalBackdrop,
  SlideOutWrapper,
} from "@/components";
import Link from "next/link";
import { Announcement, sampleAnnouncements } from "../models/Announcement";
import { faker } from "@faker-js/faker";
import { DATE_OPTIONS, formatDate } from "@/lib/utilities/dateHelpers";
import { simulateLoader } from "@/lib/utilities/helperFunctions";

export const AnnouncementCard: FC<{ posts: Announcement[] }> = ({ posts }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    simulateLoader(setIsLoading, 2000);
  }, []);

  return (
    <CardWithTitle
      title="Company Announcements"
      // button={
      //   <Button
      //     label="View Announcements"
      //     link="/message-center"
      //     componentType="link"
      //     skin={BUTTON_SKIN.linkColor}
      //   />
      // }
    >
      {isLoading ? (
        <>
          <CopyLoader />
          <CopyLoader />
        </>
      ) : (
        <>
          {posts.length > 0 ? (
            <div className="my-6 space-y-10">
              {posts
                .sort((a, b) => (a.postDate < b.postDate ? 1 : -1))
                .slice(0, 2)
                .map((post) => (
                  <AnnouncementCell
                    key={post.id}
                    post={post}
                    fullCard={false}
                  />
                ))}
            </div>
          ) : (
            <EmptyStateText title="No Announcements" />
          )}
        </>
      )}
    </CardWithTitle>
  );
};

export const AnnouncementCell: FC<{
  post: Announcement;
  fullCard: boolean;
}> = ({ post, fullCard }) => {
  const [showModal, setShowModal] = useState(false);
  const showModalHandler = () => {
    setShowModal(false);
  };
  return (
    <>
      <article
        key={post.id}
        className={`relative flex flex-col gap-6 ${
          fullCard && "border-b"
        } lg:flex-row isolate`}
      >
        <div className="flex gap-4">
          <img
            src={post.hero}
            alt={post.title}
            className="w-24 h-24 rounded-md bg-gray-50 object-cover"
          />
          <div>
            <div className="flex items-center text-xs gap-x-4">
              <time
                dateTime={formatDate(
                  new Date(post.postDate),
                  DATE_OPTIONS.full
                )}
                className="text-gray-700 "
              >
                {formatDate(
                  new Date(post.postDate),
                  DATE_OPTIONS.short
                ).toUpperCase()}
              </time>
            </div>
            <button
              onClick={() => setShowModal(true)}
              className="relative text-left group"
            >
              <h3 className="mt-2 text-sm font-medium leading-6 text-gray-900 group-hover:text-primary-900">
                {post.title}
              </h3>
              <p
                className={`mt-1 font-light text-sm leading-6 tracking-tight text-gray-600 ${
                  fullCard ? "line-clamp-4" : "line-clamp-2"
                }`}
              >
                {post.description}
              </p>
            </button>
          </div>
        </div>
      </article>
      <ModalBackdrop selector="modal">
        <CenterCardModal
          closeControl={showModalHandler}
          openControl={showModal}
        >
          <div className="h-full max-w-4xl px-4 py-4 mx-auto overflow-auto bg-white rounded-lg sm:px-8 overscroll-contain w-full">
            <div className="relative aspect-[16/9] mt-2">
              <img
                src={post.hero}
                alt={post.title}
                className="absolute inset-0 object-cover w-full h-full bg-gray-50"
              />
            </div>
            <div className="items-center py-4 text-xs">
              <time
                dateTime={post.postDate}
                className="text-gray-700 "
              >
                {post.postDate.toUpperCase()}
              </time>
              <h3 className="mt-1 text-lg font-semibold leading-6 text-gray-900 font-2xl group-hover:text-primary-900">
                {post.title}
              </h3>
            </div>

            <p className={`mt-2 text-sm leading-6 text-gray-700`}>
              {faker.lorem.paragraphs(6)}
            </p>
          </div>
        </CenterCardModal>
      </ModalBackdrop>
    </>
  );
};
