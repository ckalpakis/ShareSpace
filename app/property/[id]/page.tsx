import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import PropertyDetails from "@/components/property-details";
import { notFound } from "next/navigation";
import { PageContainer } from "@/components/page-container";

export default async function PropertyPage({
  params,
}: {
  params: { id: string };
}) {
  try {
    const supabase = createServerComponentClient({ cookies });

    console.log("Fetching property with ID:", params.id);

    // Simple query first to debug
    const { data: property, error } = await supabase
      .from("properties")
      .select("*")
      .eq("id", params.id)
      .single();

    if (error) {
      console.error("Property fetch error:", error);
      return notFound();
    }

    if (!property) {
      console.log("Property not found");
      return notFound();
    }

    // If we get the property, then try to fetch the owner details
    const { data: ownerData, error: ownerError } = await supabase
      .from("profiles")
      .select("full_name, email, phone")
      .eq("id", property.owner_id)
      .single();

    if (ownerError) {
      console.error("Owner fetch error:", ownerError);
    }

    const formattedProperty = {
      ...property,
      owner_details: ownerData || {
        full_name: "Owner",
        email: "Not available",
        phone: null,
      },
    };

    console.log("Found and formatted property:", formattedProperty);

    return (
      <PageContainer variant="property">
        <div className="max-w-4xl mx-auto">
          <PropertyDetails initialData={formattedProperty} />
        </div>
      </PageContainer>
    );
  } catch (error) {
    console.error("Unexpected error:", error);
    return notFound();
  }
}
