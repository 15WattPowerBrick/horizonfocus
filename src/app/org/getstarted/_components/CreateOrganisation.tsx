"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { createOrganisationSchema } from "@/lib/zod";

type OrganisationFormValues = z.infer<typeof createOrganisationSchema>;

export default function CreateOrganisation() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const form = useForm<OrganisationFormValues>({
    resolver: zodResolver(createOrganisationSchema),
    defaultValues: {
      organisationName: "",
      country: "",
      street1: "",
      street2: "",
      floor: "",
      unit: "",
      postalCode: "",
    },
  });

  async function onSubmit(values: OrganisationFormValues) {
    try {
      setLoading(true);
      await axios.post("/api/organisation", values);
      router.push("/org"); // Redirect after success
    } catch (error) {
      console.error("Failed to create organisation", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <h2 className="text-xl font-bold mb-2">Create an Organisation</h2>
      <p className="text-gray-600 mb-4">
        Create a new organisation and invite others
      </p>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="organisationName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Organisation Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter organisation name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Country</FormLabel>
                <FormControl>
                  <Input placeholder="Enter country" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="street1"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Street 1</FormLabel>
                <FormControl>
                  <Input placeholder="Enter street address" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="street2"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Street 2 (Optional)</FormLabel>
                <FormControl>
                  <Input placeholder="Enter second address line" {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          <div className="grid grid-cols-3 gap-4">
            <FormField
              control={form.control}
              name="floor"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Floor</FormLabel>
                  <FormControl>
                    <Input placeholder="Floor" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="unit"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Unit</FormLabel>
                  <FormControl>
                    <Input placeholder="Unit" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="postalCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Postal Code</FormLabel>
                  <FormControl>
                    <Input placeholder="Postal Code" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Creating..." : "Create Organisation"}
          </Button>
        </form>
      </Form>
    </>
  );
}
