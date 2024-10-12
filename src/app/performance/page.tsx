"use client";
import data from "../../modules/Expense/models/expenseData.json";
import { Button, PageContainer, SCREEN_WIDTH } from "@/components";
import { ExpenseTypeGrid } from "@/modules/Expense";
import { Expense } from "@/modules/Expense/models/Expense";

export default function Page() {
  const _data = data as Expense[];
  return (
    <PageContainer
      documentTitle="Performance"
      fullWidth={SCREEN_WIDTH.ultra}
      isLoading={false}
      hasPadding={true}
    >
      <div className="my-8 space-y-8">
        <div className="flex justify-between py-4 px-8 bg-primary-50 items-center rounded-md text-sm ">
          <p className="text-sm font-medium text-gray-800">
            Submit a new Travel Request, Cash Advance, or Vendor Payment
          </p>
          <Button label="Start a New Request" />
        </div>

        <ExpenseTypeGrid data={_data} />
      </div>
    </PageContainer>
  );
}
