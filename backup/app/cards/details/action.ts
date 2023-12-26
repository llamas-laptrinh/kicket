"use server";
// import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const createTransaction = (cardId: FormDataEntryValue | null) => {
  return new Promise((res, rej) => {
    if (cardId) {
      res(1);
    }
    rej("cardId must be not null");
  });
};

export async function create(prevState: any, formData: FormData) {
  try {
    const data = await createTransaction(formData.get("job"));
    console.log(data);
    return redirect(`"/payment/${data}"`);
  } catch (e) {
    return { message: "Failed to create" };
  }
}
