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
  FormDescription,
} from "@/components/ui/form";
import { createOrganisationSchema } from "@/lib/zod";
import { Organisation } from "../../../lib/types/next-auth";

type ResponseType = {
  data: Organisation;
};

type OrganisationFormValues = z.infer<typeof createOrganisationSchema>;

export default function CreateOrganisation() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const form = useForm<OrganisationFormValues>({
    resolver: zodResolver(createOrganisationSchema),
    defaultValues: {
      organisationName: "",
    },
  });

  async function onSubmit(values: OrganisationFormValues) {
    let id: string | undefined;

    try {
      setLoading(true);
      const response = (await axios.post(
        "/api/organisation",
        values
      )) as ResponseType;
      id = response.data.id;
    } catch (error) {
      console.error("Failed to create organisation", error);
    } finally {
      if (id) {
        router.push("/org/" + id);
      } else {
        setLoading(false);
        console.error("Organisation ID is undefined");
      }
    }
  }

  const freeTierFeatures = [
    { label: "Organisations", limit: 1 },
    { label: "Clients", limit: 50 },
    { label: "Candidates", limit: 50 },
    { label: "Invoices", limit: 50 },
  ];

  return (
    <>
      <h2 className="text-xl font-bold mb-2">Create Organisation</h2>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="organisationName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Organisation Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter organisation name"
                    className="bg-white"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
                <FormDescription>
                  Create your very own organisation and invite other users to
                  collaborate.
                </FormDescription>
              </FormItem>
            )}
          />

          <Button type="submit" disabled={loading}>
            {loading ? "Creating..." : "Create"}
          </Button>
        </form>
      </Form>
      <div className=" bg-gray-50 p-4 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Free Tier</h3>
        <ul className="space-y-2">
          {freeTierFeatures.map((feature, index) => (
            <li
              key={index}
              className="flex justify-between text-gray-600 border-b pb-2 last:border-b-0"
            >
              <span>{feature.label}</span>
              <span className="font-medium">{feature.limit}</span>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
