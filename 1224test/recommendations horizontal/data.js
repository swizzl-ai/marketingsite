const vehicleData = {
  "cars": [
    {
      "title": "Tesla Model 3",
      "fits_your_needs": [
        "Ultimate tech-savvy choice",
        "Minimalist interior design",
        "Zero emissions aligns with eco-friendly values",
        "Strong resale value"
      ],
      "potential_gaps": [
        "No Apple CarPlay/Android Auto",
        "Less rugged than SUV options",
        "Learning curve for tech interface"
      ],
      "key_specs": [
        "Price: $38,990-$45,990",
        "Range: 272-333 miles",
        "0-60: 5.8 seconds",
        "Autopilot standard",
        "Minimalist 15-inch touchscreen",
        "Over-the-air updates"
      ]
    },
    {
      "title": "Toyota RAV4 Hybrid",
      "fits_your_needs": [
        "Proven reliability",
        "Rugged styling",
        "Excellent fuel efficiency",
        "Versatile for activities"
      ],
      "potential_gaps": [
        "Less premium feel",
        "Basic tech features",
        "Not as innovative as EVs"
      ],
      "key_specs": [
        "Price: $30,725-$35,025",
        "MPG: 41 city/38 highway",
        "Standard Toyota Safety Sense 2.0",
        "Apple CarPlay/Android Auto",
        "AWD standard",
        "Cargo space: 37.6 cu ft"
      ]
    },
    {
      "title": "BMW i4 eDrive40",
      "fits_your_needs": [
        "Premium brand appeal",
        "Cutting-edge technology",
        "Strong performance credentials",
        "Modern design"
      ],
      "potential_gaps": [
        "Higher price point",
        "Less utility than SUVs",
        "More complex features"
      ],
      "key_specs": [
        "Price: $52,000-$55,000",
        "Range: up to 301 miles",
        "iDrive 8 system",
        "Curved display panel",
        "Apple CarPlay/Android Auto",
        "Driver assistance features"
      ]
    },
    {
      "title": "Hyundai Tucson Hybrid",
      "fits_your_needs": [
        "Modern distinctive design",
        "Excellent value proposition",
        "Good fuel economy",
        "Feature-rich"
      ],
      "potential_gaps": [
        "Less prestigious brand",
        "Not as tech-forward as EVs",
        "Moderate performance"
      ],
      "key_specs": [
        "Price: $30,900-$33,750",
        "MPG: 38 city/38 highway",
        "10.25-inch touchscreen",
        "Apple CarPlay/Android Auto",
        "SmartSense safety suite",
        "Cargo space: 38.7 cu ft"
      ]
    },
    {
      "title": "Volvo XC40 Recharge",
      "fits_your_needs": [
        "Scandinavian minimalist design",
        "Strong safety credentials",
        "Premium feel",
        "All-electric powertrain"
      ],
      "potential_gaps": [
        "Premium price point",
        "Limited range compared to Tesla",
        "Smaller cargo space"
      ],
      "key_specs": [
        "Price: $53,550-$55,000",
        "Range: 223 miles",
        "Google-based infotainment",
        "Apple CarPlay/Android Auto",
        "Pilot Assist",
        "Cargo space: 30.7 cu ft"
      ]
    },
    {
      "title": "Mazda CX-5",
      "fits_your_needs": [
        "Upscale feel",
        "Masculine design",
        "Strong handling",
        "Quality interior"
      ],
      "potential_gaps": [
        "Average fuel economy",
        "Less tech-forward",
        "Smaller cargo area"
      ],
      "key_specs": [
        "Price: $26,700-$32,000",
        "MPG: 24 city/30 highway",
        "10.25-inch display",
        "Apple CarPlay/Android Auto",
        "i-Activsense safety features",
        "Cargo space: 30.8 cu ft"
      ]
    },
    {
      "title": "Hyundai Ioniq 5",
      "fits_your_needs": [
        "Innovative retro-future design",
        "Advanced tech features",
        "Fast charging capability",
        "Spacious interior"
      ],
      "potential_gaps": [
        "Polarizing styling",
        "Limited dealer network",
        "New model reliability unknown"
      ],
      "key_specs": [
        "Price: $41,450-$45,000",
        "Range: up to 303 miles",
        "800V architecture",
        "Dual 12.3-inch displays",
        "Apple CarPlay/Android Auto",
        "Vehicle-to-load capability"
      ]
    },
    {
      "title": "Honda Accord Hybrid",
      "fits_your_needs": [
        "Reliable reputation",
        "Excellent fuel economy",
        "Spacious interior",
        "Modern safety tech"
      ],
      "potential_gaps": [
        "Conservative styling",
        "Not an SUV",
        "Less adventurous choice"
      ],
      "key_specs": [
        "Price: $27,555-$32,000",
        "MPG: 51 city/44 highway",
        "12.3-inch touchscreen",
        "Apple CarPlay/Android Auto",
        "Honda Sensing suite",
        "Trunk space: 16.7 cu ft"
      ]
    },
    {
      "title": "Genesis GV70",
      "fits_your_needs": [
        "Distinctive luxury design",
        "Advanced technology",
        "Strong performance",
        "Premium materials"
      ],
      "potential_gaps": [
        "Higher fuel consumption",
        "Premium price",
        "New luxury brand"
      ],
      "key_specs": [
        "Price: $49,000-$55,000",
        "14.5-inch touchscreen",
        "Apple CarPlay/Android Auto",
        "Highway Driving Assist",
        "3D digital cluster",
        "Cargo space: 28.9 cu ft"
      ]
    },
    {
      "title": "Volkswagen ID.4",
      "fits_your_needs": [
        "Clean German design",
        "All-electric SUV",
        "Spacious interior",
        "Good range"
      ],
      "potential_gaps": [
        "Touch controls learning curve",
        "Software quirks",
        "Charging network not Tesla-level"
      ],
      "key_specs": [
        "Price: $38,995-$44,000",
        "Range: up to 275 miles",
        "12-inch touchscreen",
        "Apple CarPlay/Android Auto",
        "IQ.Drive assistance",
        "Cargo space: 30.3 cu ft"
      ]
    },
    {
      "title": "Lexus NX",
      "fits_your_needs": [
        "Reliable luxury brand",
        "Available hybrid powertrain",
        "Premium feel",
        "Modern tech interface"
      ],
      "potential_gaps": [
        "Less sporty handling",
        "Smaller cargo space",
        "Premium fuel recommended"
      ],
      "key_specs": [
        "Price: $39,755-$45,000",
        "MPG: up to 41 city/37 highway (hybrid)",
        "14-inch touchscreen",
        "Apple CarPlay/Android Auto",
        "Lexus Safety System+ 3.0",
        "Cargo space: 22.7 cu ft"
      ]
    },
    {
      "title": "Kia EV6 Light",
      "fits_your_needs": [
        "Striking modern design",
        "Advanced tech features",
        "Fast charging",
        "Good range"
      ],
      "potential_gaps": [
        "Limited rear headroom",
        "Firm ride",
        "Touch controls can be finicky"
      ],
      "key_specs": [
        "Price: $33,900-$35,000",
        "Range: 232 miles",
        "Dual 12.3-inch displays",
        "Apple CarPlay/Android Auto",
        "800V architecture",
        "Cargo space: 24.4 cu ft"
      ]
    }
  ]
};
