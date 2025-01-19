"use client";
import { useState } from "react";
import React from "react";
import Item from "./item";
import { Codesandbox } from "lucide-react";

import { ChevronDown } from "lucide-react";
import { cn, removeLeadingSlash } from "../../../lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
  {
    id: "c996b007-fccc-47dc-8e3f-4e33ef571f80",
    title: "Dashboard",
    parentId: undefined,
    href: "/",
  },
  {
    id: "c996b007-fccc-47dc-8e3f-4e33ef571f88",
    title: "Home",
    childrenIds: [
      "5285f5ec-5130-49db-8dcb-586f7f2a442r",
      "f98f3172-1f9b-48da-9a88-748ab426410r",
    ],
    href: "/home",
  },
  {
    id: "5285f5ec-5130-49db-8dcb-586f7f2a442r",
    title: "Add Home",
    parentId: "c996b007-fccc-47dc-8e3f-4e33ef571f88",
    href: "/home/add",
  },
  {
    id: "f98f3172-1f9b-48da-9a88-748ab426410r",
    title: "View Home",
    parentId: "c996b007-fccc-47dc-8e3f-4e33ef571f88",
    href: "/home/view",
  },
  {
    id: "09efac82-ecc7-4c01-879b-93723bac3914",
    title: "Review Client",
    parentId: undefined,
    childrenIds: [
      "5285f5ec-5130-49db-8dcb-586f7f2a442c",
      "f98f3172-1f9b-48da-9a88-748ab4264105",
    ],
    href: "/review",
  },
  {
    id: "5285f5ec-5130-49db-8dcb-586f7f2a442c",
    title: "Add Review",
    parentId: "09efac82-ecc7-4c01-879b-93723bac3914",
    href: "/review/add",
  },
  {
    id: "f98f3172-1f9b-48da-9a88-748ab4264105",
    title: "View Review",
    parentId: "09efac82-ecc7-4c01-879b-93723bac3914",
    href: "/review/view",
  },
  {
    id: "e4c89627-e58d-46bc-a8a9-15cd626df474",
    title: "Services",
    parentId: undefined,
    href: "/services",
    childrenIds: [
      "      aaec41eb-5f0d-4547-a21f-d3b6f27d8018 ",
      "783e6284-158d-4d75-a739-42c5d687a523",
    ],
  },
  {
    id: "aaec41eb-5f0d-4547-a21f-d3b6f27d8018",
    title: "Add Services",
    parentId: "e4c89627-e58d-46bc-a8a9-15cd626df474",
    href: "/services/add",
  },
  {
    id: "783e6284-158d-4d75-a739-42c5d687a523",
    title: "View Services",
    parentId: "e4c89627-e58d-46bc-a8a9-15cd626df474",
    href: "/services/view",
  },

  {
    id: "0a7043c4-a802-41a0-b1eb-a716158e5da4",
    title: "Courses",
    parentId: undefined,
    childrenIds: [
      "e63a2b52-3032-47c3-84b4-5a96e959bd90",
      "4b50ef06-d36c-4524-b281-c31eb3ea04eb",
    ],
    href: "/courses",
  },
  {
    id: "e63a2b52-3032-47c3-84b4-5a96e959bd90",
    title: "Add Course",
    parentId: "0a7043c4-a802-41a0-b1eb-a716158e5da4",
    href: "/courses/add",
  },
  {
    id: "4b50ef06-d36c-4524-b281-c31eb3ea04eb",
    title: "View Courses",
    parentId: "0a7043c4-a802-41a0-b1eb-a716158e5da4",
    href: "/courses/view",
  },

  {
    id: "09007c1b-6537-4687-8bdc-c66f7c97943b",
    title: "Contacts",
    parentId: undefined,
    childrenIds: [
      "aaec41eb-5f0d-4547-a21f-d3b6f27d8018",
      "783e6284-158d-4d75-a739-42c5d687a523",
    ],
    href: "/contact",
  },
  {
    id: "aaec41eb-5f0d-4547-a21f-d3b6f27d8018",
    title: "Add contact",
    parentId: "09007c1b-6537-4687-8bdc-c66f7c97943b",
    href: "/contact/add",
  },
  {
    id: "783e6284-158d-4d75-a739-42c5d687a523",
    title: "View contact",
    parentId: "09007c1b-6537-4687-8bdc-c66f7c97943b",
    href: "/contact/view",
  },
];

interface ItemListProps {
  parentId?: string;
  level?: number;
}

const getItems = (parentId?: string) => {
  return items?.filter((item) => item.parentId === parentId);
};

const ItemList = ({ level = 0, parentId }: ItemListProps) => {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  const pathname = usePathname();
  // Function to Expand the Item and to see the nested Items
  const onExpand = (documentId: string) => {
    setExpanded((prevExpanded) => ({
      ...prevExpanded,
      [documentId]: !prevExpanded[documentId],
    }));
  };

  // Function to Get the Items
  const documents = getItems(parentId);
  return (
    <>
      <ul className={cn("space-y-4 flex-1", level !== 0 && "mt-4")}>
        {documents?.map((item) => (
          <li key={item.id}>
            <Item
              onClick={
                item.childrenIds?.length ? () => onExpand(item.id) : () => {}
              }
              className=""
              style={{
                marginLeft: level ? `${level * 12 + 12}px` : "12px",
              }}
            >
              <>
                {!item.childrenIds ? (
                  <Link
                    href={item.href}
                    className="flex items-center justify-between gap-4 px-4   "
                  >
                    <Item.Icon>
                      <Codesandbox
                        className={cn(
                          "w-4 h-4",
                          pathname === item.href && "text-[#01C4FF]"
                        )}
                      />
                    </Item.Icon>
                    <Item.Title
                      className={`${
                        pathname === item.href && "text-[#0B0A0C]"
                      }`}
                    >
                      {item.title}
                    </Item.Title>
                  </Link>
                ) : (
                  <div
                    className={cn(
                      "flex items-center justify-between gap-4 px-4 bg-transparent transition-all duration-300 w-full rounded-lg",
                      pathname.includes(item.href!) && "bg-[#F8F8F8] py-2"
                    )}
                  >
                    <div
                      className={cn("flex items-center justify-between gap-4")}
                    >
                      <Item.Icon>
                        <Codesandbox
                          className={cn(
                            "w-4 h-4",
                            pathname.includes(item.href) && "text-[#01C4FF]"
                          )}
                        />
                      </Item.Icon>
                      <Item.Title
                        className={`${
                          pathname.includes(item.href) && "text-[#0B0A0C]"
                        }`}
                      >
                        {item.title}
                      </Item.Title>
                    </div>
                    {item.childrenIds?.length && (
                      <Item.Chevron>
                        <ChevronDown
                          className={cn(
                            "	transition duration-200 rotate-0 text-[#0B0A0C]/70",
                            !expanded[item.id] && "-rotate-90"
                          )}
                        />
                      </Item.Chevron>
                    )}
                  </div>
                )}
              </>
            </Item>
            {expanded[item.id] && (
              <ItemList parentId={item.id} level={level + 1} />
            )}
          </li>
        ))}
      </ul>
    </>
  );
};

export default ItemList;
