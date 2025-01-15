const survey = {
  "surveyBlob": `PURCHASING CONTEXT:
I'm looking for a car that matches my personality and current stage in life. I'm considering SUVs and sedans. My must-have features include fuel efficiency, lane centering, modern tech, and Apple CarPlay/Android Auto. I'm worried about affording what I want and the car holding its value. I feel like I've outgrown my current car and deserve an upgrade. My main focus is finding a car that reflects who I am and makes me feel good when driving it. I'm struggling to figure out which car best fits my image and personality while meeting my practical needs.

CONFIRMATION STATEMENT:
I've helped many people like you find cars that match their personality and lifestyle. Clients often worry about affordability and value retention, but we've successfully navigated those concerns. Whether it's an SUV, sedan, EV, or convertible, I can guide you to a fuel-efficient option with modern tech that makes you feel good driving it.

SURVEY RESPONSES:
Q: What type of vehicle would you consider?
A: SUVs - Sedans

Q: What specific features MUST your car have for you to consider it?
A: Fuel efficiency - Lane centering - Modern tech - Apple carplay/ Android auto

Q: What are you most worried about in getting a new car?
A: Will I be able to afford what I want? - Will the car hold it's value?

Q: Why do you need a new car?
A: My car is just not "me" - I've moved forward in my life but my car hasn't - I deserve it.

Q: As you consider this car, what are you most focused on?
A: Figuring out a car that really matches who I am and my image.

Q: How do you want to feel when you drive this car?
A: I feel good driving it and it reflects my personality.

Q: Are you looking for a new or used car?
A: Either

Q: Are you looking to buy or lease?
A: Buy

Q: What best describes your personality or individuality?
A: Minimalist - Eco-friendly - Masculine - Modern - Tech-savvy - Innovative - Rugged

Q: What's MOST important to you when choosing a car?
A: It fits me and my personality - It reflects a lifestyle I'm proud of - It's versatile enough for a lot of activities

Q: What's LEAST important to you when choosing a car?
A: It's represents my uniqueness - My friends think its a cool car - I like it in 5-10 years as much as I like it today - I hit a budget`
};

const FITS_PROMPT = "you are sales person trying to help someone make a decision about a specfic vehicle. You need to compose a thoughtful and very specific paragraph about why this particular vehicle is a good match for them based on a survey they completed. I'll pass in the survey and the vehicle.";

const GAPS_PROMPT = "you are sales person trying to help someone make a decision about a specfic vehicle. You need to compose a thoughtful and very specific paragraph about why this particular vehicle is not a good match for them based on a survey they completed. I'll pass in the survey and the vehicle. Make sure not to repeat things you mention in reponse to the fits prompt.";

const TRADEOFFS_PROMPT = "You are a sales person trying to help someone make a decision about a specific vehicle and you want to frame the decision in terms of tradeoffs. You are pulling this concept of tradeoffs from the jobs-to-be-done methodology. You need to generate 3-4 very specific tradeoff statements that you hope will help them make progress on a decision by clarifying the situation. The tradeoffs will be in a section called 'tradeoffs you're willing to make' and should start with an 'ing' verb. Some examples: 'Learning a new interface and control system to get cutting-edge technology', 'Planning your trips more carefully in exchange for zero emissions and lower operating costs','Paying more upfront for lower maintenance costs and better resale value'.'Forgoing traditional luxury car features for a minimalist, tech-focused experience";

const REC_HEADLINE_PROMPT = "You are an expert car salesman and you want to introduce a specific vehicle to a potential customer with a quick quip that highlights specifically why this vehicle is a good fit and why it may be different than than other recommendations. This should be so concise you can't do complete a complete sentence, just ideas. Here's are some examples:'Premium sedan with loads of tech and modern vibes but a higher price tag and limited utility', 'Reliable, safe and fuel-efficient. A modern ride that's still practical', 'High end of our recommendations on price and premium feel/luxury, but still a good value'";


const vehicleData = {
  "cars": [
    {
      "title": "Tesla Model 3",
      "present": {
        "list": [
          "Tech forward",
          "Minimalist interior",
          "Zero emissions",
          "Strong resale value",
          "Autopilot",
          "OTA updates"
        ],
        "summary": "The Tesla Model 3 perfectly aligns with your tech-savvy, minimalist, and eco-friendly personality. As someone who values modern technology and innovation, you'll appreciate the cutting-edge Autopilot system and over-the-air updates. The minimalist interior design reflects your aesthetic preferences, while the strong resale value addresses your concerns about long-term value retention."
      },
      "not_present": {
        "list": [
          "No Android Auto/Carplay",
          "Car height and ride",
          "Learning curve"
        ],
        "summary": "While the Tesla Model 3 excels in many areas, it notably lacks Apple CarPlay/Android Auto integration, which you specifically listed as a must-have feature. The sedan's lower ride height and handling characteristics might not fully satisfy your desire for a more commanding driving position."
      },
      "headline": "Tech-forward minimalist sedan with cutting-edge features. No CarPlay but strong resale value",
      "tradeoffs": {
        "list": [
          "Learning a new interface and control system to get cutting-edge technology",
          "Planning your trips more carefully in exchange for zero emissions and lower operating costs",
          "Paying more upfront for lower maintenance costs and better resale value",
          "Forgoing traditional luxury car features for a minimalist, tech-focused experience"
        ]
      },
      "key_specs": [
        "Price: $38,990-$45,990",
        "Range: 272-333 miles",
        "0-60: 5.8 seconds"
      ],
      "dealer": {
        "name": "Ricart Automotive Mega Mall",
        "website": "https://www.ricart.com/",
        "email": "info@swizzl.ai",
        "phone": "(614) 836-5321",
        "address": "4255 S Hamilton Rd, Groveport, OH 43125"
      }
    },
    {
      "title": "Toyota RAV4 Hybrid",
      "present": {
        "list": [
          "Reliable",
          "Rugged design",
          "Fuel efficient",
          "Versatile",
          "Safety tech",
          "Android Auto/Carplay"
        ],
        "summary": "The RAV4 Hybrid brilliantly combines your desire for rugged masculinity with modern eco-consciousness. Its excellent fuel efficiency directly addresses your must-have feature list, while the standard Safety Sense 2.0 provides the lane centering you're looking for. The SUV's versatile nature supports your active lifestyle, and Toyota's proven reliability means strong resale value."
      },
      "not_present": {
        "list": [
          "Premium interior",
          "Basic tech",
          "Not fully electric"
        ],
        "summary": "Despite its practicality, the RAV4 Hybrid's more basic tech features might not fully satisfy your desire for cutting-edge technology. While functional, the interior design and materials don't quite match the premium, minimalist aesthetic you're drawn to."
      },
      "headline": "Rugged and reliable hybrid SUV. Basic tech but proven value and efficiency",
      "tradeoffs": {
        "list": [
          "Choosing proven reliability over cutting-edge features",
          "Accepting a more basic interior for better value and durability",
          "Compromising on premium feel for excellent fuel efficiency",
          "Having a common vehicle for the peace of mind of Toyota ownership"
        ]
      },
      "key_specs": [
        "Price: $30,725-$35,025",
        "MPG: 41 city/38 highway",
        "Cargo space: 37.6 cu ft"
      ],
      "dealer": {
        "name": "Ricart Automotive Mega Mall",
        "website": "https://www.ricart.com/",
        "email": "info@swizzl.ai",
        "phone": "(614) 836-5321",
        "address": "4255 S Hamilton Rd, Groveport, OH 43125"
      }
    },
    {
      "title": "BMW i4 eDrive40",
      "present": {
        "list": [
          "Premium brand",
          "Modern tech",
          "Strong performance",
          "Minimalist design",
          "Android Auto/Carplay",
          "Driver assistance"
        ],
        "summary": "The BMW i4 eDrive40 represents the perfect evolution in your car journey, matching your desire for a vehicle that reflects your current life stage. Its cutting-edge iDrive 8 system and modern tech features align perfectly with your tech-savvy personality, while the sophisticated design speaks to your minimalist aesthetic."
      },
      "not_present": {
        "list": [
          "Higher price",
          "Limited utility",
          "Complex features"
        ],
        "summary": "The BMW i4's premium pricing might challenge your concerns about affordability. As someone who values versatility for various activities, the sedan body style could feel limiting compared to SUV options."
      },
      "headline": "Premium electric sedan with luxury tech features. Higher price tag but makes a statement",
      "tradeoffs": {
        "list": [
          "Paying more for a prestigious German luxury brand",
          "Sacrificing some utility for a more dynamic driving experience",
          "Learning a complex infotainment system for advanced features",
          "Having higher maintenance costs for premium engineering"
        ]
      },
      "key_specs": [
        "Price: $52,000-$55,000",
        "Range: up to 301 miles"
      ],
      "dealer": {
        "name": "Ricart Automotive Mega Mall",
        "website": "https://www.ricart.com/",
        "email": "info@swizzl.ai",
        "phone": "(614) 836-5321",
        "address": "4255 S Hamilton Rd, Groveport, OH 43125"
      }
    },
    {
      "title": "Hyundai Tucson Hybrid",
      "present": {
        "list": [
          "Modern design",
          "Good value",
          "Fuel efficient",
          "Feature rich",
          "Android Auto/Carplay",
          "Safety tech"
        ],
        "summary": "The Hyundai Tucson Hybrid represents a smart choice that aligns perfectly with your practical needs and modern preferences. Its excellent fuel economy and comprehensive SmartSense safety suite, including lane centering, check off your must-have features."
      },
      "not_present": {
        "list": [
          "Premium brand",
          "Not fully electric",
          "Average performance"
        ],
        "summary": "While practical, the Hyundai brand might not fully satisfy your desire for a car that reflects your achieved status. The hybrid technology, though efficient, might feel less cutting-edge compared to fully electric alternatives."
      },
      "headline": "Modern SUV with great features and value. Not fully electric but practical and efficient",
      "tradeoffs": {
        "list": [
          "Choosing value and features over brand prestige",
          "Having a hybrid instead of full electric for better practicality",
          "Accepting average performance for excellent efficiency",
          "Having a less recognized brand for more features at the price point"
        ]
      },
      "key_specs": [
        "Price: $32,725-$39,845",
        "MPG: 38 city/38 highway",
        "Cargo space: 38.7 cu ft"
      ],
      "dealer": {
        "name": "Ricart Automotive Mega Mall",
        "website": "https://www.ricart.com/",
        "email": "info@swizzl.ai",
        "phone": "(614) 836-5321",
        "address": "4255 S Hamilton Rd, Groveport, OH 43125"
      }
    },
    {
      "title": "Honda Accord Hybrid",
      "present": {
        "list": [
          "Reliable reputation",
          "Excellent fuel economy",
          "Spacious interior",
          "Modern safety tech",
          "Android Auto/Carplay",
          "Quality interior"
        ],
        "summary": "The Honda Accord Hybrid offers a reliable and fuel-efficient driving experience with a spacious interior and modern safety features. This car provides a comfortable and practical ride that meets your needs."
      },
      "not_present": {
        "list": [
          "Not luxury brand",
          "Conservative styling",
          "Basic tech features"
        ],
        "summary": "The Accord Hybrid, while practical, might not fully satisfy your desire for a car that makes a strong statement about your personality. Its conservative styling and mainstream brand identity might feel less aspirational than you're looking for."
      },
      "headline": "Reliable and efficient sedan. Practical features but conservative styling",
      "tradeoffs": {
        "list": [
          "Having a mainstream brand for proven reliability",
          "Accepting conservative styling for timeless design",
          "Having fewer luxury features for better long-term value",
          "Prioritizing practical efficiency over emotional appeal"
        ]
      },
      "key_specs": [
        "Price: $32,990-$38,985",
        "MPG: 51 city/44 highway",
        "Trunk space: 16.7 cu ft"
      ],
      "dealer": {
        "name": "Ricart Automotive Mega Mall",
        "website": "https://www.ricart.com/",
        "email": "info@swizzl.ai",
        "phone": "(614) 836-5321",
        "address": "4255 S Hamilton Rd, Groveport, OH 43125"
      }
    },
    {
      "title": "Lexus NX",
      "present": {
        "list": [
          "Reliable luxury brand",
          "Available hybrid powertrain",
          "Premium feel",
          "Modern tech interface",
          "Android Auto/Carplay",
          "Safety features"
        ],
        "summary": "The Lexus NX represents a luxurious driving experience with a strong focus on reliability, premium feel, and modern technology. This car provides a comfortable and feature-rich ride that meets your expectations for a high-end vehicle."
      },
      "not_present": {
        "list": [
          "Higher price",
          "Complex tech",
          "Not fully electric"
        ],
        "summary": "The Lexus NX's premium pricing might stretch your budget concerns. Its complex technology interface might require a learning curve, and the hybrid powertrain, while efficient, isn't as forward-looking as full electric options."
      },
      "headline": "Premium SUV with Japanese reliability. Complex tech but proven luxury brand",
      "tradeoffs": {
        "list": [
          "Paying more for Japanese luxury reliability",
          "Learning a unique interface for premium features",
          "Having a hybrid instead of full electric for proven technology",
          "Sacrificing some modern tech for build quality"
        ]
      },
      "key_specs": [
        "Price: $35,000-$45,000",
        "MPG: 22 city/28 highway",
        "Cargo space: 17.7 cu ft"
      ],
      "dealer": {
        "name": "Ricart Automotive Mega Mall",
        "website": "https://www.ricart.com/",
        "email": "info@swizzl.ai",
        "phone": "(614) 836-5321",
        "address": "4255 S Hamilton Rd, Groveport, OH 43125"
      }
    },
    {
      "title": "Genesis GV70",
      "present": {
        "list": [
          "Distinctive luxury design",
          "Advanced technology features",
          "Strong performance",
          "Premium materials",
          "Android Auto/Carplay",
          "Safety features"
        ],
        "summary": "The Genesis GV70 represents a luxurious driving experience with a strong focus on design, technology, and performance. This car provides a premium feel and advanced safety features that cater to your desire for a high-end vehicle."
      },
      "not_present": {
        "list": [
          "Higher fuel consumption",
          "Premium price",
          "New luxury brand"
        ],
        "summary": "You should consider that the GV70 comes with a higher price tag and may not be as fuel-efficient as some other options. Additionally, it's a new luxury brand, and its reputation is still being established."
      },
      "headline": "Distinctive luxury SUV with modern tech. New brand but loaded with features",
      "tradeoffs": {
        "list": [
          "Choosing a less established luxury brand for better value and features",
          "Accepting higher fuel costs for a more powerful and engaging driving experience",
          "Risking slightly lower resale value for more luxury features at the initial price point",
          "Explaining your car choice more often for the satisfaction of having something unique"
        ]
      },
      "key_specs": [
        "Price: $52,000-$55,000",
        "Range: up to 301 miles"
      ],
      "dealer": {
        "name": "Ricart Automotive Mega Mall",
        "website": "https://www.ricart.com/",
        "email": "info@swizzl.ai",
        "phone": "(614) 836-5321",
        "address": "4255 S Hamilton Rd, Groveport, OH 43125"
      }
    },
    {
      "title": "Volkswagen ID.4",
      "present": {
        "list": [
          "Clean German design",
          "All-electric SUV",
          "Spacious interior",
          "Good range",
          "Android Auto/Carplay",
          "Safety features"
        ],
        "summary": "The Volkswagen ID.4 represents a unique blend of clean design, eco-friendly values, and modern technology. Its spacious interior and good range cater to your practical needs, while the Android Auto/Carplay integration and safety features align with your tech-savvy personality."
      },
      "not_present": {
        "list": [
          "Software quirks",
          "Limited charging network",
          "Touch controls"
        ],
        "summary": "You should consider that the ID.4's touch controls may require some time to get used to, and its software may have some quirks. Additionally, its charging network is not as extensive as Tesla's."
      },
      "headline": "Clean German EV with spacious interior. Software quirks but solid build quality",
      "tradeoffs": {
        "list": [
          "Being an early adopter of VW's electric technology for environmental benefits",
          "Adapting to a new interface for a more future-focused driving experience",
          "Planning charging stops on longer trips for zero-emission transportation",
          "Choosing practical comfort over sporty handling"
        ]
      },
      "key_specs": [
        "Price: $38,995-$44,995",
        "Range: up to 275 miles",
        "Cargo space: 30.3 cu ft"
      ],
      "dealer": {
        "name": "Ricart Automotive Mega Mall",
        "website": "https://www.ricart.com/",
        "email": "info@swizzl.ai",
        "phone": "(614) 836-5321",
        "address": "4255 S Hamilton Rd, Groveport, OH 43125"
      }
    },
    {
      "title": "Kia EV6 Light",
      "present": {
        "list": [
          "Striking modern design",
          "Advanced technology features",
          "Fast charging capability",
          "Spacious interior",
          "Android Auto/Carplay",
          "Safety features"
        ],
        "summary": "The Kia EV6 Light represents a unique blend of modern design, advanced technology, and eco-friendly values. Its fast charging capability and spacious interior cater to your practical needs, while the Android Auto/Carplay integration and safety features align with your tech-savvy personality."
      },
      "not_present": {
        "list": [
          "Limited rear headroom",
          "Firm ride",
          "Touch controls can be finicky"
        ],
        "summary": "You should consider that the EV6 Light has limited rear headroom and a firm ride, which may not be comfortable for all passengers. Additionally, its touch controls can be finicky and require some time to get used to."
      },
      "headline": "Bold electric crossover with striking design. New to market but packed with tech",
      "tradeoffs": {
        "list": [
          "Having a less established luxury brand for more features and value",
          "Accepting limited rear headroom for a more compact design",
          "Getting used to a firm ride for better handling",
          "Adapting to touch controls for a more modern interface"
        ]
      },
      "key_specs": [
        "Price: $41,450-$45,000",
        "Range: up to 303 miles"
      ],
      "dealer": {
        "name": "Ricart Automotive Mega Mall",
        "website": "https://www.ricart.com/",
        "email": "info@swizzl.ai",
        "phone": "(614) 836-5321",
        "address": "4255 S Hamilton Rd, Groveport, OH 43125"
      }
    },
    {
      "title": "Mazda CX-5",
      "present": {
        "list": [
          "Upscale feel",
          "Modern design",
          "Good handling",
          "Quality interior",
          "Android Auto/Carplay",
          "Safety tech"
        ],
        "summary": "The CX-5 offers a premium driving experience with a strong focus on design and handling. This car provides an engaging drive while offering a high-quality interior that matches your minimalist preferences."
      },
      "not_present": {
        "list": [
          "Not fully electric",
          "Limited tech",
          "Average efficiency"
        ],
        "summary": "While the CX-5 excels in driving dynamics, it lacks the cutting-edge electric technology you might be seeking. The tech features, while competent, may not satisfy your desire for innovation."
      },
      "headline": "Premium handling SUV with upscale feel. No electric option but engaging drive",
      "tradeoffs": {
        "list": [
          "Having a non-electric vehicle for better performance and handling",
          "Accepting limited tech features for a more engaging drive",
          "Compromising on efficiency for a more premium feel",
          "Prioritizing driving dynamics over modern tech"
        ]
      },
      "key_specs": [
        "Price: $26,700-$39,650",
        "MPG: 24 city/30 highway",
        "Cargo space: 30.8 cu ft"
      ],
      "dealer": {
        "name": "Ricart Automotive Mega Mall",
        "website": "https://www.ricart.com/",
        "email": "info@swizzl.ai",
        "phone": "(614) 836-5321",
        "address": "4255 S Hamilton Rd, Groveport, OH 43125"
      }
    },
    {
      "title": "Volvo XC40 Recharge",
      "present": {
        "list": [
          "Minimalist design",
          "Safety focused",
          "Premium feel",
          "Zero emissions",
          "Android Auto/Carplay",
          "Driver assistance"
        ],
        "summary": "The Volvo XC40 Recharge perfectly embodies your minimalist and eco-friendly values while delivering the modern technology you crave. Its Scandinavian design philosophy aligns beautifully with your aesthetic preferences, while the all-electric powertrain demonstrates your commitment to innovation."
      },
      "not_present": {
        "list": [
          "Higher price",
          "Limited range",
          "Small cargo space"
        ],
        "summary": "The XC40 Recharge's premium price point directly challenges your concerns about affordability. The limited electric range might restrict your activities, and the cargo space might feel constraining for someone seeking a versatile vehicle."
      },
      "headline": "Minimalist electric SUV with Scandinavian design. Premium price but strong safety",
      "tradeoffs": {
        "list": [
          "Paying a premium for a luxury electric SUV with Scandinavian design",
          "Accepting shorter range than gas alternatives for zero-emission driving",
          "Sacrificing some cargo space for a more compact, city-friendly SUV",
          "Embracing a new charging routine for the benefits of electric driving"
        ]
      },
      "key_specs": [
        "Price: $53,550-$56,550",
        "Range: up to 223 miles",
        "0-60: 4.7 seconds"
      ],
      "dealer": {
        "name": "Ricart Automotive Mega Mall",
        "website": "https://www.ricart.com/",
        "email": "info@swizzl.ai",
        "phone": "(614) 836-5321",
        "address": "4255 S Hamilton Rd, Groveport, OH 43125"
      }
    }
  ]
};

const salesSheet = {
  "salesSheet": {
    "customer": {
      "name": "Petra Williams",
      "headline": "Parent struggling to balance finding an electric vehicle that fits their personality with one that is functional for their family is looking to buy a new or used EV for $30,000 - $50,000"
    },
    "mustHaveFeatures": [
      "Child seat compatibility",
      "High ground clearance",
      "Fuel efficiency",
      "Spacious interior",
      "Easy city maneuverability",
      "Modern tech",
      "Apple CarPlay/Android Auto",
      "High safety rating",
      "All-wheel drive"
    ],
    "customerJourney": {
      "whereYouAre": "I need a new car because I can't count on my current car's reliability anymore. I am considering electric vehicles (EVs). The car must have child seat compatibility, high ground clearance, fuel efficiency, a spacious interior, easy city maneuverability, modern tech, Apple CarPlay/Android Auto, a high safety rating, and all-wheel drive.",
      "whereYouHopeToGo": "I am focused on understanding the compromises I'll need to make to meet my new functional needs and finding a car that matches my personality and image. I want to feel confident that I got a good price, that the car is solid for me, and that I don't have to worry about it. I want to be happy with how it meets my new needs, feel good driving it, and ensure it reflects my personality. It's important to me that people see me the way I intend, so I feel great about how I come across. I need the car to accommodate family changes, offer better fuel efficiency, and allow for home charging. Low maintenance costs, fitting my budget, enjoying daily driving, feeling accomplished, conveying social status, and looking great are most important to me. It's least important that others can drive it easily or that I don't have to be careful with it."
    },
    "concerns": {
      "aboutTheCar": [
        "Will this car be reliable?",
        "Will the car hold its value?"
      ],
      "aboutTheBuyingProcess": [
        "Will I get ripped off or 'sold?'"
      ]
    },
    "tradeoffs": [
      {
        "title": "Performance Over Range",
        "details": [
          "Selected vehicles with faster acceleration times over maximum range",
          "Chose options emphasizing driving dynamics and sporty characteristics",
          "Willing to accept slightly lower range for better performance metrics"
        ]
      },
      {
        "title": "Brand Recognition Over Value",
        "details": [
          "Consistently selected vehicles from well-established manufacturers",
          "Chose options from brands with strong market presence",
          "Preferred traditional luxury marques over newer value-oriented brands"
        ]
      },
      {
        "title": "Safety Over Cargo Space",
        "details": [
          "Selected vehicles with strong safety reputations despite smaller cargo capacity",
          "Prioritized advanced safety features over maximum utility",
          "Chose options from manufacturers known for safety innovation"
        ]
      },
      {
        "title": "Traditional Design Over Modern Styling",
        "details": [
          "Favored conventional automotive designs",
          "Selected vehicles with familiar styling cues",
          "Chose options with traditional luxury appointments"
        ]
      },
      {
        "title": "Domestic Market Preference",
        "details": [
          "Strong preference for vehicles with established US presence",
          "Selected options with robust dealer networks",
          "Chose models from brands with strong American market understanding"
        ]
      }
    ],
    "recommendedVehicles": [
      {
        "name": "Tesla Model Y",
        "image": "https://placehold.co/600x400",
        "keySpecs": {
          "Price": "$43,990-$53,990",
          "Range": "330 miles",
          "0-60": "3.5-6.0s",
          "Cargo": "76.2 cubic feet",
          "Ground clearance": "6.6 inches"
        },
        "pros": [
          "Strong resale value",
          "Leading tech features",
          "Spacious interior",
          "Low maintenance costs",
          "All-wheel drive"
        ],
        "cons": [
          "Build quality concerns",
          "No Apple CarPlay/Android Auto",
          "Higher initial cost"
        ]
      },
      {
        "name": "Hyundai IONIQ 5",
        "image": "https://placehold.co/600x400",
        "keySpecs": {
          "Price": "$41,450-$52,600",
          "Range": "303 miles",
          "0-60": "5.2s",
          "Cargo": "59.3 cubic feet",
          "Ground clearance": "6.1 inches"
        },
        "pros": [
          "Unique design",
          "Fast charging capability",
          "Spacious interior",
          "Good value proposition",
          "Apple CarPlay/Android Auto"
        ],
        "cons": [
          "Less established luxury brand",
          "Limited dealer network",
          "Some cheap interior materials"
        ]
      },
      {
        "name": "Ford Mustang Mach-E",
        "image": "https://placehold.co/600x400",
        "keySpecs": {
          "Price": "$45,995-$53,995",
          "Range": "312 miles",
          "0-60": "3.5s",
          "Cargo": "59.7 cubic feet",
          "Ground clearance": "5.7 inches"
        },
        "pros": [
          "Strong performance",
          "American brand recognition",
          "Good range",
          "Sporty handling",
          "All-wheel drive"
        ],
        "cons": [
          "Controversial styling",
          "Software issues reported",
          "Limited cargo space"
        ]
      }
    ],
    "keyDecisionPoints": [
      {
        "mainQuestion": "Advanced technology features or traditional luxury elements?",
        "explanation": "The Tesla Model Y offers cutting-edge technology and a strong resale value, but it lacks Apple CarPlay/Android Auto, which you value. On the other hand, the Hyundai IONIQ 5 provides a unique design and fast charging but may not convey the luxury status you desire. Consider whether the latest tech innovations or a more traditional luxury feel align better with your personality and lifestyle."
      },
      {
        "mainQuestion": "Brand prestige versus value for money?",
        "explanation": "The Hyundai IONIQ 5 offers a good value proposition and unique design, but it comes from a less prestigious brand, which might not align with your social status goals. The Ford Mustang Mach-E, with its American brand recognition, might better fit your image preferences but could come with a higher price and potential software issues. Weigh the importance of brand prestige against the value and features offered by each vehicle."
      },
      {
        "mainQuestion": "Performance and sporty driving dynamics or practicality and family needs?",
        "explanation": "The Ford Mustang Mach-E provides strong performance and sporty handling, which might appeal to your desire for a car that reflects your personality. However, it has limited cargo space, which might not fully meet your family needs. The Tesla Model Y, with its spacious interior and child seat compatibility, offers more practicality but may not deliver the same sporty experience. Consider whether performance or practicality is more crucial for your daily driving experience."
      }
    ]
  }
};

const prompts = {
  FITS_PROMPT,
  GAPS_PROMPT,
  TRADEOFFS_PROMPT,
  REC_HEADLINE_PROMPT
};

// Export all constants
export { prompts, survey, vehicleData, salesSheet };