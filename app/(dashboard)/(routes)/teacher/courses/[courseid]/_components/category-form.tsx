"use client";
import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { Pencil } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Course } from "@prisma/client";
import { Combobox } from "@/components/ui/combobox";

/**
 * Props for the CategoryForm component.
 */
interface CategoryFormProps {
  initialData: Course;
  courseId: string;
  options: { label: string,  value: string, }[]
}

const formSchema = z.object({
  categoryId: z.string().min(1),
});

/**
 * Represents a form component for managing the category of a course.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {Object} props.initialData - The initial data for the form.
 * @param {string} props.courseId - The ID of the course.
 * @param {Array} props.options - The available options for the category.
 * @returns {JSX.Element} The rendered component.
 */
/**
 * Renders a form for managing the category of a course.
 *
 * @param initialData - The initial data for the form.
 * @param courseId - The ID of the course.
 * @param options - The available options for the category.
 */
const CategoryForm = ({ initialData, courseId, options }: CategoryFormProps) => {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);

  const toggleEdit = () => setIsEditing((edit) => !edit);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      categoryId: initialData?.categoryId ?? "",
    },
  });

  const { isSubmitting, isValid } = form.formState;

  /**
   * Handles the form submission.
   *
   * @param values - The form values.
   */
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(`/api/courses/${courseId}`, values);
      toast.success("Course was updated successfully.");
      toggleEdit();
      router.refresh(); //refresh view
    } catch (e: any) {
      toast.error(e.message ?? "failed to update description form");
    }
  };

  const selectedOption = options.find(option=>option.value===initialData.categoryId)

  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Course category
        <Button onClick={toggleEdit} variant="ghost">
          {isEditing ? (
            <>Cancel</>
          ) : (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Edit category
            </>
          )}
        </Button>
      </div>
      {!isEditing ? (
        <p
          className={cn(
            "text-sm mt-2",
            !initialData.categoryId && "text-slate-500 italic"
          )}
        >
          {selectedOption?.label ?? "No category"}
        </p>
      ) : (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 mt-4"
          >
            <FormField
              control={form.control}
              name="categoryId"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Combobox
                      options={options}
                      value={field.value} // don't spill field into combobox {..field}
                      onChange={field.onChange} // don't spill field into combobox {..field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center gap-x-2">
              <Button disabled={!isValid || isSubmitting} type="submit">
                Save
              </Button>
            </div>
          </form>
        </Form>
      )}
    </div>
  );
};

export default CategoryForm;
// OLEGARIO PROGRESS TIMESTAMP REF: 2:52:42 https://youtu.be/Big_aFLmekI?t=10362
// OLEGARIO PROGRESS TIMESTAMP REF: 3:28:24 https://youtu.be/Big_aFLmekI?t=12504 category form
