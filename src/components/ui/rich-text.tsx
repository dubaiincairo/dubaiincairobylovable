import { ElementType, HTMLAttributes } from "react";
import { richText } from "@/lib/richText";
import { cn } from "@/lib/utils";

interface RichTextProps extends Omit<HTMLAttributes<HTMLElement>, "children" | "dangerouslySetInnerHTML"> {
  html: string | null | undefined;
  as?: ElementType;
}

/**
 * Render TipTap-authored rich-text content. Uses dangerouslySetInnerHTML so
 * stored tags (`<p>`, `<em>`, `<ul>`, etc.) parse correctly. The neutralizing
 * classes prevent double margins from TipTap's wrapping `<p>` elements.
 */
const RichText = ({ html, as: Tag = "div", className, ...rest }: RichTextProps) => {
  const Component = Tag as ElementType;
  return (
    <Component
      {...rest}
      className={cn(
        "[&>p]:m-0 [&>p+p]:mt-3 [&>ul]:list-disc [&>ul]:pl-5 [&>ol]:list-decimal [&>ol]:pl-5 [&_a]:underline [&_a]:text-primary",
        className,
      )}
      dangerouslySetInnerHTML={{ __html: richText(html) }}
    />
  );
};

export { RichText };
