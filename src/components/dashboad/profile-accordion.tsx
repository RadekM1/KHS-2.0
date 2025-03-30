"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/src/components/ui/accordion";
import { profileText } from "@/src/static-objects/objects/dashboard-profile";
import { useEffect, useState } from "react";
import { useSessionContext } from "@/src/context/session-provider";
export const ProfileAccordion = () => {
  const [clearance, setClearance] = useState<string>("");

  const session = useSessionContext();
  useEffect(() => {
    if (session) {
      setClearance(session.user.clearance ?? "");
    }
  }, [session]);

  const filteredText = profileText.filter((item) =>
    item.clearance.includes(clearance),
  );

  return (
    <Accordion type="single" collapsible className="w-full">
      {filteredText.map((accordion, i) => {
        return (
          <AccordionItem key={i} value={`item-${i + 1}`}>
            <AccordionTrigger>{accordion.title}</AccordionTrigger>
            <AccordionContent>{accordion.text}</AccordionContent>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
};
