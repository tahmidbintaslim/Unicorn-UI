import type { Meta, StoryObj } from "@storybook/nextjs";
import { sampleIntegrations } from "@/app/docs/_content-sections";
import { IntegrationsGrid } from "./integrations-grid";
import { IntegrationsGridMotion } from "./integrations-grid-motion";

const meta = {
  title: "Features/Integrations grid",
  component: IntegrationsGrid,
  args: { title: "Works with your stack", items: sampleIntegrations },
} satisfies Meta<typeof IntegrationsGrid>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Plain: Story = {};
export const Motion: Story = { render: (args) => <IntegrationsGridMotion {...args} /> };
