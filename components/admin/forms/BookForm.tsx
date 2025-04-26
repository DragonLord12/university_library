"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { FormControl, FormField, FormItem, FormLabel, FormMessage, Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ImageUpload from "@/components/FileUpload";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { bookSchema } from "@/lib/validation";
import { Textarea } from "@/components/ui/textarea";
import FileUpload from "@/components/FileUpload";
import ColorPicker from "../ColorPicker";
import { createBook } from "@/lib/admin/actions/book";

interface Props extends Partial<Book> {
  type?: "create" | "update";
}

const BookForm = ({ type, ...book }: Props) => {
  const router = useRouter();

  const form = useForm<z.infer<typeof bookSchema>>({
    resolver: zodResolver(bookSchema),
    defaultValues: {
      title: '',
      author: '',
      genre: '',
      rating: 0,
      totalCopies: 0,
      coverUrl: '',
      coverColor: '',
      videoUrl: '',
      description: '',
    }
  })

  const handleSubmit = async (values: z.infer<typeof bookSchema>) => {
    const result = await createBook(values);

    if (result.success) {
      toast("Success", {
        description: "Book created successfully",
        className: "toaster",
        classNames: {
          title: "toaster-title toaster-title-success",
          description: "toaster-description",
        }
      });

      router.push(`/admin/books/${result.data.id}`)
    } else {
      toast("Error", {
        description: result.message,
        className: "toaster",
        classNames: {
          title: "toaster-title toaster-title-error",
          description: "toaster-description",
        }
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
        <FormField        
          control={form.control}
          name={"title"}
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="text-base font-normal text-dark-500">Book Title</FormLabel>
              <FormControl>
                <Input required placeholder="Book Title"  {...field} className="book-form_input" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField        
          control={form.control}
          name={"author"}
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="text-base font-normal text-dark-500">Author</FormLabel>
              <FormControl>
                <Input required placeholder="Book Author"  {...field} className="book-form_input" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField        
          control={form.control}
          name={"genre"}
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="text-base font-normal text-dark-500">Genre</FormLabel>
              <FormControl>
                <Input required placeholder="Book Genre"  {...field} className="book-form_input" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField        
          control={form.control}
          name={"rating"}
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="text-base font-normal text-dark-500">Rating</FormLabel>
              <FormControl>
                <Input type="number" min={1} max={5} step={0.1} placeholder="Book Rating"  {...field} className="book-form_input" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField        
          control={form.control}
          name={"totalCopies"}
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="text-base font-normal text-dark-500">Total Copies</FormLabel>
              <FormControl>
                <Input type="number" min={1} max={10000} placeholder="Book Rating"  {...field} className="book-form_input" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField        
          control={form.control}
          name={"coverUrl"}
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="text-base font-normal text-dark-500">Book Image</FormLabel>
              <FormControl>
                <FileUpload type="image" accept="image/*" placeholder="Upload a book cover" folder="books/covers" variant="light" onFileChange={field.onChange} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField        
          control={form.control}
          name={"coverColor"}
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="text-base font-normal text-dark-500">Primary Color</FormLabel>
              <FormControl>
                <ColorPicker onPickerChange={field.onChange} value={field.value} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField        
          control={form.control}
          name={"description"}
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="text-base font-normal text-dark-500">Book Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Book Description" {...field} rows={10} className="book-form_input" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField        
          control={form.control}
          name={"videoUrl"}
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="text-base font-normal text-dark-500">Book Trailer</FormLabel>
              <FormControl>
              <FileUpload type="video" accept="video/*" placeholder="Upload a book trailer" folder="books/videos" variant="light" onFileChange={field.onChange} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField        
          control={form.control}
          name={"summary"}
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="text-base font-normal text-dark-500">Book Summary</FormLabel>
              <FormControl>
                <Textarea placeholder="Book Summary" {...field} rows={10} className="book-form_input" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="book-form_btn text-white">Add Book to Library</Button>
      </form>
    </Form>
  )
}

export default BookForm;