"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Calendar } from "primereact/calendar";
import { Nullable } from "primereact/ts-helpers";
import { useState } from "react";
export default function Component() {
  const showToastMessage = () => {
    toast.success("Success Notification !");
  };
  const [date, setDate] = useState<Nullable<Date>>(null);
  return (
    <div className="my-10 flex h-screen items-center justify-center">
      <Card className="w-full max-w-4xl">
        <CardHeader>
          <CardTitle>Checkout</CardTitle>
          <CardDescription>Enter your shipping information.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="first-name">Full name</Label>
              <Input id="full-name" placeholder="Enter your full name" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="address">Address</Label>
            <Input id="address" placeholder="Enter your address" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="city">City</Label>
              <Input id="city" placeholder="Enter your city" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="zip">ZIP</Label>
              <Input id="zip" placeholder="Enter your ZIP" />
            </div>
          </div>
          {/* Payment Method Inputs */}
          <div className="space-y-2 ">
            <Label htmlFor="payment-method">Payment Method</Label>
            <select
              id="payment-method"
              className="mt-1 block w-full rounded-md border border-gray-300 p-2"
            >
              <option value="paypal">PayPal</option>
              <option value="visa">Visa</option>
              <option value="mastercard">MasterCard</option>
              {/* Add more payment methods as needed */}
            </select>
          </div>
          {/* Card Details */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="card-number">Card Number</Label>
              <Input id="card-number" placeholder="Enter your card number" />
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="expiry-date"
                className="font-medium text-gray-700"
              >
                Expiry Date
              </Label>
              <div className="flex items-center">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  className="w-full rounded-md border border-gray-300 p-2"
                  placeholder="MM/yy"
                />
              </div>
            </div>
          </div>
          <Button onClick={showToastMessage} className="w-full">
            Chekout
          </Button>
          <ToastContainer />
        </CardContent>
      </Card>
    </div>
  );
}
