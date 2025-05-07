import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@repo/ui/accordion";
export default function FAQSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32" id="faq">
      <div className="mx-auto px-4 md:px-6">
        <h2 className="mb-12 text-center text-3xl font-bold tracking-tighter sm:text-5xl">
          Frequently Asked Questions
        </h2>
        <Accordion
          className="mx-auto w-full max-w-3xl"
          collapsible
          type="single"
        >
          <AccordionItem value="item-1">
            <AccordionTrigger>
              How secure is my data on AssetRx?
            </AccordionTrigger>
            <AccordionContent>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facere
              cumque temporibus, reiciendis autem dolor adipisci assumenda
              voluptate dolores deserunt laborum voluptatibus! Recusandae
              numquam dolore deleniti delectus! Eum ex quas animi?
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>
              Can I integrate AssetRx with my existing systems?
            </AccordionTrigger>
            <AccordionContent>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facere
              cumque temporibus, reiciendis autem dolor adipisci assumenda
              voluptate dolores deserunt laborum voluptatibus! Recusandae
              numquam dolore deleniti delectus! Eum ex quas animi?
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>
              How does the maintenance scheduling feature work?
            </AccordionTrigger>
            <AccordionContent>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facere
              cumque temporibus, reiciendis autem dolor adipisci assumenda
              voluptate dolores deserunt laborum voluptatibus! Recusandae
              numquam dolore deleniti delectus! Eum ex quas animi?
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger>
              What kind of support do you offer?
            </AccordionTrigger>
            <AccordionContent>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facere
              cumque temporibus, reiciendis autem dolor adipisci assumenda
              voluptate dolores deserunt laborum voluptatibus! Recusandae
              numquam dolore deleniti delectus! Eum ex quas animi?
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-5">
            <AccordionTrigger>
              Can I try AssetRx before purchasing?
            </AccordionTrigger>
            <AccordionContent>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facere
              cumque temporibus, reiciendis autem dolor adipisci assumenda
              voluptate dolores deserunt laborum voluptatibus! Recusandae
              numquam dolore deleniti delectus! Eum ex quas animi?
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </section>
  );
}
