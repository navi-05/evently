"use client";

import { startTransition, useEffect, useState } from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTrigger,
} from "@/components//ui/alert-dialog";
import { Input } from "@/components/ui/input";

import { ICategory } from "@/lib/db/models/category.model";
import { createCategory, getAllCategories } from "@/lib/actions/category.actions";

interface DropDownProps {
  onChangeHandler?: () => void;
  value?: string;
}

const DropDown = ({ onChangeHandler, value }: DropDownProps) => {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [newCategory, setNewCategory] = useState("category")

  const handleAddCategory = () => {
    createCategory({
      categoryName: newCategory.trim()
    })
      .then((category) => {
        setCategories((prev) => [...prev, category])
      })
  }

  useEffect(() => {
    const getCategories = async() => {
      const categoryList = await getAllCategories()
      categoryList && setCategories(categoryList as ICategory[])
    }

    getCategories()
  }, [])

  return (
    <Select onValueChange={onChangeHandler} defaultValue={value}>
      <SelectTrigger className="select-field">
        <SelectValue placeholder="Category" />
      </SelectTrigger>
      <SelectContent>
        {categories.length > 0 &&
          categories.map((category) => (
            <SelectItem
              key={category._id}
              value={category._id}
              className="select-item p-regular-14"
            >
              {category.name}
            </SelectItem>
          ))}
        <AlertDialog>
          <AlertDialogTrigger className="p-medium-14 flex w-full rounded-sm py-3 pl-8 text-primary-500 hover:bg-primary-50 focus:text-primary-500">
            Add new category
          </AlertDialogTrigger>
          <AlertDialogContent className="bg-white">
            <AlertDialogHeader>New Category</AlertDialogHeader>
            <AlertDialogDescription>
              <Input
                type="text"
                placeholder="Category name"
                className="input-field mt-3"
                onChange={(e) => setNewCategory(e.target.value)}
              />
            </AlertDialogDescription>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={() => startTransition(handleAddCategory)}>
                Add
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </SelectContent>
    </Select>
  );
};

export default DropDown;
