"use client"

import { Loader2, Minus, Plus } from "lucide-react";
import { useState } from 'react';
//import { useDebouncedCallback } from 'use-debounce';

import { Button } from "./button";
import { Input } from "./input";

interface CounterProps {
  min?: number
  max?: number
  step?: number
  value: number
  onValueChangeAction: (value: number) => void
  isLoading?: boolean
}

export function Counter({
  min = 0,
  max = 100,
  step = 1,
  value,
  onValueChangeAction,
  isLoading = false,
}: Readonly<CounterProps>) {
  const [inputValue, setInputValue] = useState<string>(value.toString());

  const increment = (e: React.MouseEvent) => {
    e.preventDefault()
    const newValue = Math.min(value + step, max)
    setInputValue(newValue.toString())
    onValueChangeAction(newValue)
  }

  const decrement = (e: React.MouseEvent) => {
    e.preventDefault()
    const newValue = Math.max(value - step, min)
    setInputValue(newValue.toString())
    onValueChangeAction(newValue)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newInputValue = e.target.value;
    setInputValue(newInputValue);

    const newValue = parseInt(newInputValue, 10);
    if (!isNaN(newValue) && newValue >= min && newValue <= max) {
      onValueChangeAction(newValue);
    }
  }

  // const debouncedUpdate = useDebouncedCallback((newValue: number) => {
  //   onValueChangeAction(newValue);
  // }, 500);

  return (
    <div className="flex w-[104px] items-center rounded-md border">
      <Button
        variant="ghost"
        size="icon"
        className="h-9 w-8 rounded-r-none px-0"
        onClick={decrement}
        disabled={value <= min || isLoading}
      >
        {isLoading ? (
          <Loader2 className="size-4 animate-spin" />
        ) : (
          <Minus className="size-4" />
        )}
      </Button>
      <Input
        type="number"
        value={inputValue}
        onChange={handleChange}
        className="h-9 w-10 rounded-none border-x p-0 text-center [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
        min={min}
        max={max}
        step={step}
        disabled={isLoading}
      />
      <Button
        variant="ghost"
        size="icon"
        className="h-9 w-8 rounded-l-none px-0"
        onClick={increment}
        disabled={value >= max || isLoading}
      >
        {isLoading ? (
          <Loader2 className="size-4 animate-spin" />
        ) : (
          <Plus className="size-4" />
        )}
      </Button>
    </div>
  )
}
