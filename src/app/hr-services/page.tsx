"use client";
import {
  ImageHero,
  PageContainer,
  SCREEN_WIDTH,
  SectionHeader,
  GridLayout,
  GRID_TYPE,
  ExternalQL,
  IconStyleQL,
  Accordion,
} from "@/components";
import { UpcomingHolidayCard } from "@/modules/Calendar";
import data from "../../modules/HRServices/components/hrFAQs.json";

const hrQuickLinks = [
  { label: "Tax Portal", url: "https://www.google.com" },
  { label: "Pensions Portal", url: "https://www.google.com" },
  { label: "NHS Remittances Portal", url: "https://www.google.com" },
];

const hrRequestTypes = [
  {
    label: "Raise a Request",
    url: "/hr-services/requests",
    copy: "Introductory letters, Embassy Letters, and more",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
        />
      </svg>
    ),
  },
  {
    label: "Documents",
    url: "/hr-services/documents",
    copy: "View and Download HR Forms, Guides and Documents",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
        />
      </svg>
    ),
  },
  {
    label: "Frequently Asked Questions",
    url: "/hr-services/FAQs",
    copy: "View answers and articles to our commonly discussed topics",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 0 1-2.25 2.25M16.5 7.5V18a2.25 2.25 0 0 0 2.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 0 0 2.25 2.25h13.5M6 7.5h3v3H6v-3Z"
        />
      </svg>
    ),
  },
];

export default function Page() {
  return (
    <PageContainer
      documentTitle="HR Services"
      fullWidth={SCREEN_WIDTH.full}
      isLoading={false}
      hasPadding={false}
    >
      <div className="pb-8">
        <ImageHero size="lg" url="https://source.unsplash.com/5U_28ojjgms" />

        <div className="max-w-7xl mx-auto p-4 space-y-4">
          <SectionHeader title="Ask HR" />
          <GridLayout
            type={GRID_TYPE.twoOne}
            lhs={
              <div className="space-y-10">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    What we do
                  </h3>
                  <p className="mt-3 text-sm font-normal leading-loose text-gray-600">
                    Human resources (HR) is the division of a business
                    responsible for finding, recruiting, screening, and training
                    job applicants. HR departments also handle employee
                    compensation, benefits, and terminations. HR departments
                    must keep up to date with laws that can affect the company
                    and its employees.
                  </p>
                </div>
                <div className="space-y-2">
                  <p className="font-medium text-gray-700">
                    Frequently Asked Questions (FAQs)
                  </p>
                  <ul className="mt-6 space-y-4">
                    {data.map((question, index) => (
                      <li key={question.id}>
                        <Accordion
                          id={question.id}
                          title={question.title}
                          copy={question.copy}
                        />
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            }
            rhs={
              <div className="space-y-8 md:pl-4">
                <UpcomingHolidayCard name="Remembrance Day" date={new Date()} />

                {/* <div className="text-lg font-medium">
                  <p>How can we help today?</p>
                  {hrRequestTypes.map((ql, index) => (
                    <IconStyleQL
                      key={index}
                      icon={ql.icon}
                      copy={ql.copy}
                      label={ql.label}
                      url={ql.url}
                    />
                  ))}
                </div> */}

                <div>
                  <p className="mb-3 text-sm font-medium text-gray-600">
                    External Links
                  </p>
                  <div className="space-y-2">
                    {hrQuickLinks.map((link, index) => (
                      <ExternalQL
                        id={index.toString()}
                        label={link.label}
                        url={link.url}
                        key={index}
                      />
                    ))}
                  </div>
                </div>

                {/* <div className="">
                  <p className="text-lg font-medium">HR Announcements</p>
                  <div className="mt-6 space-y-8">
                    {sampleBlogList.map((post) => (
                      <BlogPostCard post={post} showImage={true} />
                    ))}
                  </div>
                </div> */}
              </div>
            }
          />
        </div>
      </div>
    </PageContainer>
  );
}
