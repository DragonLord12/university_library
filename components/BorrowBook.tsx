"use client";

import { useState } from 'react'
import { Button } from './ui/button'
import Image from 'next/image'
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { borrowBook } from '@/lib/actions/book';

interface Props {
  bookId: string;
  userId: string;
  borrowingEligibility: {
    isEligible: boolean;
    message: string;
  }
}

const BorrowBook = ({ bookId, userId, borrowingEligibility: { isEligible, message} }: Props) => {
  const router = useRouter();
  const [borrowing, setBorrowing] = useState(false);

  const handleBorrow = async () => {
    if (!isEligible) {
      toast("Error", {
        description: message,
        className: "toaster",
        classNames: {
          title: "toaster-title toaster-title-error",
          description: "toaster-description",
        }
      })
      return;
    }

    setBorrowing(true);

    try {
      const result = await borrowBook({ bookId, userId})

      if (result.success) {
        toast("Success", {
          description: "Book borrowed successfully.",
          className: "toaster",
          classNames: {
            title: "toaster-title toaster-title-success",
            description: "toaster-description",
          }
        })
        
        router.push("/my-profile")
      } else {
        toast("Error", {
          description: result.message,
          className: "toaster",
          classNames: {
            title: "toaster-title toaster-title-error",
            description: "toaster-description",
          }
        })
      }
    } catch (error: any) {
      toast("Error", {
        description: "An error occurred while borrowing the book.",
        className: "toaster",
        classNames: {
          title: "toaster-title toaster-title-error",
          description: "toaster-description",
        }
      })
    } finally {
      setBorrowing(false);
    }
  }

  return (
    <Button className='book-overview_btn' onClick={handleBorrow} disabled={borrowing}>
      <Image src="/icons/book.svg" alt="book" width={20} height={20} />
      <p className='font-bebas-neue text-lg'>{borrowing ? "Borrowing..." : "Borrow Book"}</p>
    </Button>
  )
}

export default BorrowBook