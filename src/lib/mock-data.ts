import { ExhibitorData } from "@/types";

export const mockExhibitorData: ExhibitorData[] = [
  {
    ID: 1,
    name: "TechNova Solutions",
    banner: "/avatar.png", // Using local image as fallback
    logo: "/opexn_logo.png",
    websiteURL: "https://technova.com",
    pitchDeck: "https://example.com/pitch.pdf",
    dpiitCertNumber: "DPIIT12345",
    address: {
      ID: 1,
      city: "Bangalore",
      pincode: "560001",
      state: "Karnataka",
      street: "MG Road"
    },
    director: {
      ID: 1,
      directorName: "John Smith",
      directorEmail: "john@technova.com"
    },
    products: [
      {
        ID: 1,
        title: "AI-Powered Analytics",
        description: "Advanced analytics platform using machine learning"
      }
    ],
    spoc: {
      ID: 1,
      Name: "Jane Doe",
      Email: "jane@technova.com",
      Phone: "+91-9876543210",
      Position: "Business Development Manager"
    },
    revenueInfo: {
      ID: 1,
      revenueBracket: "1-5 Crores",
      userImpact: 1000
    },
    fundingInfo: {
      ID: 1,
      fundingType: "Seed Funding"
    }
  },
  {
    ID: 2,
    name: "GreenEnergy Innovations",
    banner: "/table.png",
    logo: "/opexn_logo.png",
    websiteURL: "https://greenenergy.com",
    pitchDeck: "https://example.com/pitch2.pdf",
    dpiitCertNumber: "DPIIT12346",
    address: {
      ID: 2,
      city: "Mumbai",
      pincode: "400001",
      state: "Maharashtra",
      street: "Nariman Point"
    },
    director: {
      ID: 2,
      directorName: "Sarah Johnson",
      directorEmail: "sarah@greenenergy.com"
    },
    products: [
      {
        ID: 2,
        title: "Solar Panel Management",
        description: "Smart solar panel monitoring and management system"
      }
    ],
    spoc: {
      ID: 2,
      Name: "Mike Wilson",
      Email: "mike@greenenergy.com",
      Phone: "+91-9876543211",
      Position: "Sales Manager"
    },
    revenueInfo: {
      ID: 2,
      revenueBracket: "5-10 Crores",
      userImpact: 2000
    },
    fundingInfo: {
      ID: 2,
      fundingType: "Series A"
    }
  },
  {
    ID: 3,
    name: "HealthTech Platforms",
    banner: "/avatar.png",
    logo: "/opexn_logo.png",
    websiteURL: "https://healthtech.com",
    pitchDeck: "https://example.com/pitch3.pdf",
    dpiitCertNumber: "DPIIT12347",
    address: {
      ID: 3,
      city: "Delhi",
      pincode: "110001",
      state: "Delhi",
      street: "Connaught Place"
    },
    director: {
      ID: 3,
      directorName: "Dr. Rajesh Kumar",
      directorEmail: "rajesh@healthtech.com"
    },
    products: [
      {
        ID: 3,
        title: "Telemedicine Platform",
        description: "Comprehensive telemedicine and health monitoring platform"
      }
    ],
    spoc: {
      ID: 3,
      Name: "Priya Sharma",
      Email: "priya@healthtech.com",
      Phone: "+91-9876543212",
      Position: "Product Manager"
    },
    revenueInfo: {
      ID: 3,
      revenueBracket: "10+ Crores",
      userImpact: 5000
    },
    fundingInfo: {
      ID: 3,
      fundingType: "Series B"
    }
  }
];

export const getMockData = (): ExhibitorData[] => {
  console.log("Using mock data as fallback");
  return mockExhibitorData;
};
