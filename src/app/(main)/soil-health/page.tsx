import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";

const recommendations = [
    {
        title: "Balanced Fertilizer Use",
        content: [
            "Conduct a soil test at least once every two years to understand nutrient deficiencies or excesses.",
            "Use a mix of Nitrogen (N), Phosphorus (P), and Potassium (K) based on soil test results and crop needs.",
            "Apply fertilizers in split doses rather than all at once to prevent nutrient runoff and ensure steady supply to the crop.",
            "Incorporate micronutrients like Zinc, Boron, and Iron as recommended by your soil health card.",
            "Avoid excessive use of nitrogenous fertilizers, which can harm soil microbes and pollute groundwater."
        ]
    },
    {
        title: "Crop Rotation Techniques",
        content: [
            "Alternate between deep-rooted and shallow-rooted crops to utilize nutrients from different soil layers.",
            "Plant legumes (like grams, peas, or beans) in rotation with cereal crops (like wheat or maize) to naturally fix nitrogen in the soil.",
            "Rotate crops from different families to break pest and disease cycles.",
            "Include cover crops like mustard or clover during fallow periods to prevent soil erosion and add organic matter.",
            "Avoid monoculture (planting the same crop year after year) as it depletes specific nutrients and encourages pest buildup."
        ]
    },
    {
        title: "Organic Farming Methods",
        content: [
            "Use compost, farmyard manure (FYM), and vermicompost to improve soil structure, water retention, and nutrient content.",
            "Practice green manuring by growing fast-growing plants (like sunnhemp) and ploughing them into the soil.",
            "Use bio-fertilizers and bio-pesticides (like Neem oil) to reduce chemical load on the soil.",
            "Mulch the soil surface with straw, leaves, or plastic sheets to conserve moisture, suppress weeds, and regulate soil temperature.",
            "Create habitats for beneficial insects like ladybugs and spiders that prey on common pests."
        ]
    }
]

export default function SoilHealthPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Soil Health Recommendations
        </h1>
        <p className="text-muted-foreground">
          A guide to sustainable and productive farming practices.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Improving Your Farm's Foundation</CardTitle>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            {recommendations.map((rec, index) => (
              <AccordionItem value={`item-${index}`} key={index}>
                <AccordionTrigger className="text-lg font-semibold">{rec.title}</AccordionTrigger>
                <AccordionContent>
                    <ul className="space-y-4 pl-4">
                        {rec.content.map((point, i) => (
                             <li key={i} className="flex items-start gap-3">
                                <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-primary mt-1" />
                                <span>{point}</span>
                            </li>
                        ))}
                    </ul>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
}
