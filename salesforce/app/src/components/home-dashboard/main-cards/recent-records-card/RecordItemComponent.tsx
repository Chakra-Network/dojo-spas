import {
  RecordTooltip,
  RecordTooltipContent,
  RecordTooltipFieldRow,
  RecordTooltipField,
} from "@/components/ui/record-tooltip";
import { useAppContext } from "@/context/AppProvider";
import type { RecordItem, Lead, Contact, Opportunity, Case } from "@/lib/types";

export default function RecordItemComponent({
  record,
}: {
  record: RecordItem;
}) {
  const { addTab } = useAppContext();

  const Icon = record.icon;

  const handleRecordClick = (record: RecordItem) => {
    let tabId: string;
    let tabType:
      | "home-lead"
      | "home-contact"
      | "home-opportunity"
      | "home-case";

    switch (record.type) {
      case "Lead":
        tabId = `lead-${record.id}`;
        tabType = "home-lead";
        break;
      case "Contact":
        tabId = `contact-${record.id}`;
        tabType = "home-contact";
        break;
      case "Opportunity":
        tabId = `opportunity-${record.id}`;
        tabType = "home-opportunity";
        break;
      case "Case":
        tabId = `case-${record.id}`;
        tabType = "home-case";
        break;
    }

    addTab({
      id: tabId,
      type: tabType,
      dataId: record.id,
    });
  };

  return (
    <RecordTooltip content={<RecordItemTooltip record={record} />}>
      <button
        onClick={() => handleRecordClick(record)}
        className="flex items-center gap-3 rounded-lg transition-colors cursor-pointer text-left w-fit"
      >
        <div
          className={`w-8 h-8 rounded-full ${record.iconBgColor} flex items-center justify-center flex-shrink-0`}
        >
          <Icon className="w-5 h-5 text-white" />
        </div>
        <div className="w-fit h-[20.5px] border-b border-[rgba(2,55,200,1)] border-dashed flex items-end">
          <div className="text-[13px] leading-[19.5px] font-normal text-[rgba(2,55,200,1)] truncate">
            {record.name}
          </div>
        </div>
      </button>
    </RecordTooltip>
  );
}

function RecordItemTooltip({ record }: { record: RecordItem }) {
  const Icon = record.icon;

  switch (record.type) {
    case "Lead": {
      const lead = record.originalData as Lead;
      return (
        <RecordTooltipContent
          icon={Icon}
          iconBgColor={record.iconBgColor}
          title={record.name}
        >
          <RecordTooltipFieldRow>
            <RecordTooltipField label="Title" value={lead.title} />
            <RecordTooltipField label="Company" value={lead.company} />
          </RecordTooltipFieldRow>
          <RecordTooltipFieldRow>
            <RecordTooltipField label="Phone" value={lead.phone} />
            <RecordTooltipField label="Email" value={lead.email} />
          </RecordTooltipFieldRow>
        </RecordTooltipContent>
      );
    }
    case "Contact": {
      const contact = record.originalData as Contact;
      return (
        <RecordTooltipContent
          icon={Icon}
          iconBgColor={record.iconBgColor}
          title={record.name}
        >
          <RecordTooltipFieldRow>
            <RecordTooltipField
              label="Account Name"
              value={contact.accountName}
              isLink
            />
            <RecordTooltipField label="Title" value={contact.title} />
          </RecordTooltipFieldRow>
          <RecordTooltipFieldRow>
            <RecordTooltipField label="Phone" value={contact.phone} />
            <RecordTooltipField label="Email" value={contact.email} />
          </RecordTooltipFieldRow>
        </RecordTooltipContent>
      );
    }
    case "Case": {
      const caseItem = record.originalData as Case;
      return (
        <RecordTooltipContent
          icon={Icon}
          iconBgColor={record.iconBgColor}
          title={record.name}
        >
          <RecordTooltipFieldRow>
            <RecordTooltipField
              label="Case Owner"
              value={caseItem.caseOwner}
              isLink
            />
            <RecordTooltipField label="Status" value={caseItem.status} />
          </RecordTooltipFieldRow>
          <RecordTooltipFieldRow>
            <RecordTooltipField label="Priority" value={caseItem.priority} />
            <RecordTooltipField label="Subject" value={caseItem.subject} />
          </RecordTooltipFieldRow>
          <div>
            <RecordTooltipField
              label="Description"
              value={caseItem.description}
            />
          </div>
        </RecordTooltipContent>
      );
    }
    case "Opportunity": {
      const opportunity = record.originalData as Opportunity;
      return (
        <RecordTooltipContent
          icon={Icon}
          iconBgColor={record.iconBgColor}
          title={record.name}
        >
          <RecordTooltipFieldRow>
            <RecordTooltipField
              label="Account Name"
              value={opportunity.accountName}
              isLink
            />
            <RecordTooltipField
              label="Close Date"
              value={opportunity.closeDate}
            />
          </RecordTooltipFieldRow>
          <RecordTooltipFieldRow>
            <RecordTooltipField label="Amount" value={opportunity.amount} />
            <RecordTooltipField
              label="Opportunity Owner"
              value={opportunity.opportunityOwner}
              isLink
            />
          </RecordTooltipFieldRow>
        </RecordTooltipContent>
      );
    }
  }
}
