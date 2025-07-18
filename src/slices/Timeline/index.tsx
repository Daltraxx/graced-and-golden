import { FC } from "react";
import { Content } from "@prismicio/client";
import { JSXMapSerializer, SliceComponentProps } from "@prismicio/react";
import Heading from "@/components/Heading";

const components: JSXMapSerializer = {
  heading2: ({children}) => (
    <Heading as="h2" size="md" className={``} >
        {children}
    </Heading>
  ),
  heading3: ({children}) => (
    <Heading as="h3" size="md" className={``} >
        {children}
    </Heading>
  ),
  heading4: ({children}) => (
    <Heading as="h4" size="xs" className={``} >
        {children}
    </Heading>
  ),
  paragraph: ({children}) => (
    <p className="">{children}</p>
  ),
}

/**
 * Props for `Timeline`.
 */
export type TimelineProps = SliceComponentProps<Content.TimelineSlice>;

/**
 * Component for "Timeline" Slices.
 */
const Timeline: FC<TimelineProps> = ({ slice }) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      Placeholder component for timeline (variation: {slice.variation}) slices.
      <br />
      <strong>You can edit this slice directly in your code editor.</strong>
      {/**
       * 💡 Use Prismic MCP with your code editor
       *
       * Get AI-powered help to build your slice components — based on your actual model.
       *
       * ▶️ Setup:
       * 1. Add a new MCP Server in your code editor:
       *
       * {
       *   "mcpServers": {
       *     "Prismic MCP": {
       *       "command": "npx",
       *       "args": ["-y", "@prismicio/mcp-server"]
       *     }
       *   }
       * }
       *
       * 2. Select Claude 3.7 Sonnet (recommended for optimal output)
       *
       * ✅ Then open your slice file and ask your code editor:
       *    "Code this slice"
       *
       * Your code editor reads your slice model and helps you code faster ⚡
       * 📚 Give your feedback: https://community.prismic.io/t/help-us-shape-the-future-of-slice-creation/19505
       */}
    </section>
  );
};

export default Timeline;
