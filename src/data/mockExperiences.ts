export interface ExperienceTag {
    text: string;
    className: string;
}

export interface Experience {
    id: number;
    name: string;
    school: string;
    initials: string;
    avatarColor: string;
    roleCompany: string;
    timeAgo: string;
    outcomeText: string;
    outcomeClass: string;
    body: string;
    tags: ExperienceTag[];
    likes: number;
    comments: number;
}

export const mockExperiences: Experience[] = [
    {
        id: 1,
        name: "Alex Johnson",
        school: "UC Berkeley '26",
        initials: "AJ",
        avatarColor: "linear-gradient(135deg, #60a5fa, #3b82f6)",
        roleCompany: "Software Engineer Intern @ Google",
        timeAgo: "2h ago",
        outcomeText: "OFFER",
        outcomeClass: "outcome-offer",
        body: "Just finished my HC review and got the host matching call! The process was: 2 technical rounds (1 DSA, 1 System Design lite). Focus heavily on LeetCode medium/hard for graph problems.",
        tags: [
            { text: "Python", className: "tag-blue" },
            { text: "Graphs", className: "tag-purple" },
            { text: "Summer 2026", className: "tag-gray" }
        ],
        likes: 124,
        comments: 18
    },
    {
        id: 2,
        name: "Sarah Chen",
        school: "Stanford '25",
        initials: "SC",
        avatarColor: "linear-gradient(135deg, #f87171, #ef4444)",
        roleCompany: "Product Manager Intern @ Meta",
        timeAgo: "5h ago",
        outcomeText: "INTERVIEW",
        outcomeClass: "outcome-interview",
        body: "Received the final round invite for the RPM internship! The first round was heavily focused on product sense and metrics. Check out the 'Cracking the PM Interview' book if you're prepping.",
        tags: [
            { text: "Product", className: "tag-orange" },
            { text: "Strategy", className: "tag-yellow" },
            { text: "Meta", className: "tag-blue" }
        ],
        likes: 85,
        comments: 12
    },
    {
        id: 3,
        name: "Michael Smith",
        school: "MIT '26",
        initials: "MS",
        avatarColor: "linear-gradient(135deg, #34d399, #10b981)",
        roleCompany: "Quant Intern @ Jane Street",
        timeAgo: "1d ago",
        outcomeText: "REJECT",
        outcomeClass: "outcome-reject",
        body: "Made it to the final on-site but didn't get the offer. The probability questions were next level. If you're applying, make sure you can calculate expected values in your sleep.",
        tags: [
            { text: "Math", className: "tag-red" },
            { text: "Probability", className: "tag-red" },
            { text: "Jane Street", className: "tag-gray" }
        ],
        likes: 210,
        comments: 45
    },
    {
        id: 4,
        name: "Emily Davis",
        school: "Georgia Tech '25",
        initials: "ED",
        avatarColor: "linear-gradient(135deg, #fbbf24, #f59e0b)",
        roleCompany: "Backend Intern @ Stripe",
        timeAgo: "1d ago",
        outcomeText: "OFFER",
        outcomeClass: "outcome-offer",
        body: "Stripe's integration coding round was actually fun! They give you a real API to work with. Pro-tip: READ THE DOCS they provide carefully.",
        tags: [
            { text: "Ruby", className: "tag-red" },
            { text: "APIs", className: "tag-blue" },
            { text: "Systems", className: "tag-purple" }
        ],
        likes: 156,
        comments: 24
    },
    {
        id: 5,
        name: "Daniel Lee",
        school: "Waterloo '27",
        initials: "DL",
        avatarColor: "linear-gradient(135deg, #a78bfa, #8b5cf6)",
        roleCompany: "Frontend Intern @ Vercel",
        timeAgo: "2d ago",
        outcomeText: "INTERVIEW",
        outcomeClass: "outcome-interview",
        body: "Vercel reached out for a technical screening! It's a 60-min Next.js focused challenge. Wish me luck!",
        tags: [
            { text: "React", className: "tag-blue" },
            { text: "Next.js", className: "tag-gray" },
            { text: "Frontend", className: "tag-green" }
        ],
        likes: 92,
        comments: 8
    },
    {
        id: 6,
        name: "Chloe Wilson",
        school: "UPenn '26",
        initials: "CW",
        avatarColor: "linear-gradient(135deg, #ec4899, #db2777)",
        roleCompany: "Data Science Intern @ Amazon",
        timeAgo: "2d ago",
        outcomeText: "OFFER",
        outcomeClass: "outcome-offer",
        body: "Accepted my offer at Amazon! The OA was manageable, and the behavioral interview was all about the Leadership Principles. STAR method is key.",
        tags: [
            { text: "SQL", className: "tag-blue" },
            { text: "Leadership", className: "tag-orange" },
            { text: "Amazon", className: "tag-gray" }
        ],
        likes: 178,
        comments: 31
    },
    {
        id: 7,
        name: "James Bond",
        school: "Oxford '25",
        initials: "JB",
        avatarColor: "linear-gradient(135deg, #0ea5e9, #0284c7)",
        roleCompany: "Security Intern @ CrowdStrike",
        timeAgo: "3d ago",
        outcomeText: "INTERVIEW",
        outcomeClass: "outcome-interview",
        body: "Got an interview for the Falcon team! Deep dive into OS internals and C++ expected. Time to brush up on my memory management.",
        tags: [
            { text: "C++", className: "tag-blue" },
            { text: "Security", className: "tag-red" },
            { text: "OS", className: "tag-gray" }
        ],
        likes: 67,
        comments: 5
    },
    {
        id: 8,
        name: "Anna Taylor",
        school: "CMU '26",
        initials: "AT",
        avatarColor: "linear-gradient(135deg, #f43f5e, #e11d48)",
        roleCompany: "AI Research Intern @ OpenAI",
        timeAgo: "3d ago",
        outcomeText: "OFFER",
        outcomeClass: "outcome-offer",
        body: "Incredible experience interviewing at OpenAI. The team is brilliant. We talked about LLM optimization and transformer architectures. Feeling very lucky!",
        tags: [
            { text: "PyTorch", className: "tag-orange" },
            { text: "NLP", className: "tag-blue" },
            { text: "AI", className: "tag-purple" }
        ],
        likes: 432,
        comments: 89
    },
    {
        id: 9,
        name: "Kevin Wang",
        school: "Cornell '25",
        initials: "KW",
        avatarColor: "linear-gradient(135deg, #10b981, #059669)",
        roleCompany: "SDE Intern @ Microsoft",
        timeAgo: "4d ago",
        outcomeText: "OFFER",
        outcomeClass: "outcome-offer",
        body: "Got the 'Offer Letter' email this morning! Microsoft's process was super smooth, very focused on communication and problem-solving approach rather than just the final answer.",
        tags: [
            { text: "Java", className: "tag-orange" },
            { text: "Cloud", className: "tag-blue" },
            { text: "Redmond", className: "tag-gray" }
        ],
        likes: 145,
        comments: 20
    },
    {
        id: 10,
        name: "Lauren Smith",
        school: "UCLA '27",
        initials: "LS",
        avatarColor: "linear-gradient(135deg, #f59e0b, #d97706)",
        roleCompany: "UX Design Intern @ Airbnb",
        timeAgo: "4d ago",
        outcomeText: "REJECT",
        outcomeClass: "outcome-reject",
        body: "Final portfolio review didn't go as planned. They felt my case studies lacked deep user research. Taking the feedback and working on my next project!",
        tags: [
            { text: "Figma", className: "tag-purple" },
            { text: "Design", className: "tag-pink" },
            { text: "Research", className: "tag-blue" }
        ],
        likes: 98,
        comments: 15
    },
    {
        id: 11,
        name: "Tom Brown",
        school: "Harvard '26",
        initials: "TB",
        avatarColor: "linear-gradient(135deg, #6366f1, #4f46e5)",
        roleCompany: "Fullstack Intern @ Robinhood",
        timeAgo: "5d ago",
        outcomeText: "INTERVIEW",
        outcomeClass: "outcome-interview",
        body: "First round with Robinhood scheduled. It's a React + Django focused challenge. Time to refresh my knowledge of state management and REST APIs.",
        tags: [
            { text: "React", className: "tag-blue" },
            { text: "Django", className: "tag-green" },
            { text: "Finance", className: "tag-yellow" }
        ],
        likes: 54,
        comments: 3
    },
    {
        id: 12,
        name: "Grace Kim",
        school: "UChicago '25",
        initials: "GK",
        avatarColor: "linear-gradient(135deg, #8b5cf6, #7c3aed)",
        roleCompany: "Operations Intern @ Palantir",
        timeAgo: "5d ago",
        outcomeText: "OFFER",
        outcomeClass: "outcome-offer",
        body: "Palantir's 'Forward Deployed Engineer' interview was intense but stimulating. They care a lot about how you think about complex data problems.",
        tags: [
            { text: "Big Data", className: "tag-blue" },
            { text: "Ops", className: "tag-gray" },
            { text: "Mission", className: "tag-purple" }
        ],
        likes: 189,
        comments: 24
    },
    {
        id: 13,
        name: "Ryan Park",
        school: "UT Austin '26",
        initials: "RP",
        avatarColor: "linear-gradient(135deg, #14b8a6, #0d9488)",
        roleCompany: "Systems Intern @ NVIDIA",
        timeAgo: "6d ago",
        outcomeText: "OFFER",
        outcomeClass: "outcome-offer",
        body: "Final round for NVIDIA was pure OS and Architecture. Know your caches, virtual memory, and concurrency primitives.",
        tags: [
            { text: "C", className: "tag-blue" },
            { text: "Hardware", className: "tag-gray" },
            { text: "Compute", className: "tag-green" }
        ],
        likes: 212,
        comments: 38
    },
    {
        id: 14,
        name: "Olivia White",
        school: "UIUC '25",
        initials: "OW",
        avatarColor: "linear-gradient(135deg, #f43f5e, #e11d48)",
        roleCompany: "ML Intern @ Anthropic",
        timeAgo: "1w ago",
        outcomeText: "INTERVIEW",
        outcomeClass: "outcome-interview",
        body: "Anthropic coding challenge was really unique. Less LeetCode, more real-world software engineering with a focus on safety and alignment.",
        tags: [
            { text: "AI Safety", className: "tag-purple" },
            { text: "Python", className: "tag-blue" },
            { text: "ML", className: "tag-orange" }
        ],
        likes: 134,
        comments: 22
    },
    {
        id: 15,
        name: "Brandon Lee",
        school: "Michigan '26",
        initials: "BL",
        avatarColor: "linear-gradient(135deg, #3b82f6, #2563eb)",
        roleCompany: "Intern @ Databricks",
        timeAgo: "1w ago",
        outcomeText: "OFFER",
        outcomeClass: "outcome-offer",
        body: "Databricks! The interviews were very technical, specifically on distributed systems and high-performance computing. Preparation paid off.",
        tags: [
            { text: "Scala", className: "tag-red" },
            { text: "Spark", className: "tag-orange" },
            { text: "Data", className: "tag-blue" }
        ],
        likes: 245,
        comments: 41
    },
    {
        id: 16,
        name: "Sophia Martinez",
        school: "Stanford '27",
        initials: "SM",
        avatarColor: "linear-gradient(135deg, #10b981, #059669)",
        roleCompany: "Intern @ Duolingo",
        timeAgo: "1w ago",
        outcomeText: "OFFER",
        outcomeClass: "outcome-offer",
        body: "The Duolingo interview was so friendly! They focus on cross-functional collaboration. Plus, the office in Pittsburgh looks amazing.",
        tags: [
            { text: "Education", className: "tag-green" },
            { text: "Tech", className: "tag-blue" },
            { text: "Growth", className: "tag-yellow" }
        ],
        likes: 112,
        comments: 14
    },
    {
        id: 17,
        name: "Lucas Garcia",
        school: "Brown '25",
        initials: "LG",
        avatarColor: "linear-gradient(135deg, #f59e0b, #d97706)",
        roleCompany: "SWE Intern @ Netflix",
        timeAgo: "1w ago",
        outcomeText: "INTERVIEW",
        outcomeClass: "outcome-interview",
        body: "Netflix's 'Freedom and Responsibility' culture is real. The interview was a lot about self-direction and taking ownership.",
        tags: [
            { text: "Java", className: "tag-orange" },
            { text: "Streaming", className: "tag-red" },
            { text: "Culture", className: "tag-gray" }
        ],
        likes: 76,
        comments: 9
    },
    {
        id: 18,
        name: "Isabella Rodriguez",
        school: "Duke '26",
        initials: "IR",
        avatarColor: "linear-gradient(135deg, #8b5cf6, #7c3aed)",
        roleCompany: "Intern @ Slack",
        timeAgo: "1w ago",
        outcomeText: "OFFER",
        outcomeClass: "outcome-offer",
        body: "Got the call from Slack! I'll be working on the core platform team. Can't wait to improve the app I use every day.",
        tags: [
            { text: "PHP", className: "tag-purple" },
            { text: "Product", className: "tag-blue" },
            { text: "Collab", className: "tag-green" }
        ],
        likes: 123,
        comments: 16
    },
    {
        id: 19,
        name: "Ethan Wright",
        school: "Yale '25",
        initials: "EW",
        avatarColor: "linear-gradient(135deg, #14b8a6, #0d9488)",
        roleCompany: "Intern @ Ramp",
        timeAgo: "1w ago",
        outcomeText: "OFFER",
        outcomeClass: "outcome-offer",
        body: "Ramp is moving so fast! The technical round was a real-world coding task in a live environment. Very different from LeetCode.",
        tags: [
            { text: "Fintech", className: "tag-green" },
            { text: "TypeScript", className: "tag-blue" },
            { text: "Startup", className: "tag-gray" }
        ],
        likes: 198,
        comments: 29
    },
    {
        id: 20,
        name: "Mia Thompson",
        school: "Columbia '26",
        initials: "MT",
        avatarColor: "linear-gradient(135deg, #ec4899, #db2777)",
        roleCompany: "Intern @ Spotify",
        timeAgo: "1w ago",
        outcomeText: "OFFER",
        outcomeClass: "outcome-offer",
        body: "Spotify Summer 2026! Process was: OA -> 1 Tech -> 1 Combined Tech/Behavioral. They really care about your passion for music.",
        tags: [
            { text: "Music", className: "tag-green" },
            { text: "Mobile", className: "tag-blue" },
            { text: "Backend", className: "tag-purple" }
        ],
        likes: 312,
        comments: 54
    },
    {
        id: 21,
        name: "Noah Wilson",
        school: "Northwestern '27",
        initials: "NW",
        avatarColor: "linear-gradient(135deg, #6366f1, #4f46e5)",
        roleCompany: "Intern @ Figma",
        timeAgo: "2w ago",
        outcomeText: "INTERVIEW",
        outcomeClass: "outcome-interview",
        body: "Figma coding challenge. It's focused on canvas and rendering performance. Very cool and challenging.",
        tags: [
            { text: "Graphics", className: "tag-blue" },
            { text: "C++", className: "tag-blue" },
            { text: "Wasm", className: "tag-purple" }
        ],
        likes: 89,
        comments: 11
    },
    {
        id: 22,
        name: "Ava Moore",
        school: "Rice '25",
        initials: "AM",
        avatarColor: "linear-gradient(135deg, #34d399, #10b981)",
        roleCompany: "Intern @ Scale AI",
        timeAgo: "2w ago",
        outcomeText: "OFFER",
        outcomeClass: "outcome-offer",
        body: "Scale is buildling the foundation for AI. The interview was all about scaling data pipelines and ML infrastructure.",
        tags: [
            { text: "ML Ops", className: "tag-orange" },
            { text: "Scale", className: "tag-gray" },
            { text: "Infra", className: "tag-blue" }
        ],
        likes: 167,
        comments: 23
    },
    {
        id: 23,
        name: "Mason Taylor",
        school: "USC '26",
        initials: "MT",
        avatarColor: "linear-gradient(135deg, #ef4444, #dc2626)",
        roleCompany: "Intern @ Plaid",
        timeAgo: "2w ago",
        outcomeText: "OFFER",
        outcomeClass: "outcome-offer",
        body: "Plaid's API design interview was the most realistic I've had. They focus on developer experience and clean abstractions.",
        tags: [
            { text: "API Design", className: "tag-blue" },
            { text: "Go", className: "tag-cyan" },
            { text: "Fintech", className: "tag-green" }
        ],
        likes: 143,
        comments: 19
    },
    {
        id: 24,
        name: "Harper Hall",
        school: "Vanderbilt '25",
        initials: "HH",
        avatarColor: "linear-gradient(135deg, #10b981, #059669)",
        roleCompany: "Intern @ Notion",
        timeAgo: "2w ago",
        outcomeText: "OFFER",
        outcomeClass: "outcome-offer",
        body: "Joining Notion for the summer! The process was very centered on product thinking even for engineering roles.",
        tags: [
            { text: "Product Eng", className: "tag-blue" },
            { text: "Notion", className: "tag-gray" },
            { text: "UI", className: "tag-pink" }
        ],
        likes: 278,
        comments: 42
    },
    {
        id: 25,
        name: "William Young",
        school: "WashU '26",
        initials: "WY",
        avatarColor: "linear-gradient(135deg, #f59e0b, #d97706)",
        roleCompany: "Intern @ Retool",
        timeAgo: "2w ago",
        outcomeText: "OFFER",
        outcomeClass: "outcome-offer",
        body: "Retool is a developer's playground. The interview was building a small feature within their environment. Super fun.",
        tags: [
            { text: "Low-code", className: "tag-orange" },
            { text: "DevTools", className: "tag-blue" },
            { text: "React", className: "tag-blue" }
        ],
        likes: 112,
        comments: 15
    },
    {
        id: 26,
        name: "Emily Clark",
        school: "Toronto '27",
        initials: "EC",
        avatarColor: "linear-gradient(135deg, #8b5cf6, #7c3aed)",
        roleCompany: "Intern @ Shopify",
        timeAgo: "2w ago",
        outcomeText: "OFFER",
        outcomeClass: "outcome-offer",
        body: "Shopify's 'Life Story' interview is such a great way to get to know candidates beyond their resume. Loved it.",
        tags: [
            { text: "E-commerce", className: "tag-green" },
            { text: "Ruby", className: "tag-red" },
            { text: "Remote", className: "tag-gray" }
        ],
        likes: 154,
        comments: 21
    },
    {
        id: 27,
        name: "Julian King",
        school: "McGill '26",
        initials: "JK",
        avatarColor: "linear-gradient(135deg, #14b8a6, #0d9488)",
        roleCompany: "Intern @ Toast",
        timeAgo: "2w ago",
        outcomeText: "OFFER",
        outcomeClass: "outcome-offer",
        body: "Accepted my offer at Toast! Working on the payments team. The office in Boston is really cool.",
        tags: [
            { text: "Java", className: "tag-orange" },
            { text: "Payments", className: "tag-green" },
            { text: "Boston", className: "tag-blue" }
        ],
        likes: 98,
        comments: 12
    },
    {
        id: 28,
        name: "Penelope Scott",
        school: "WashU '25",
        initials: "PS",
        avatarColor: "linear-gradient(135deg, #ec4899, #db2777)",
        roleCompany: "Intern @ Pinterest",
        timeAgo: "3w ago",
        outcomeText: "OFFER",
        outcomeClass: "outcome-offer",
        body: "Pinterest was my top choice! The process was: OA -> 1 Technical -> Final On-site (3 rounds). Very strong engineering culture.",
        tags: [
            { text: "Visual", className: "tag-pink" },
            { text: "Scale", className: "tag-blue" },
            { text: "ML", className: "tag-orange" }
        ],
        likes: 187,
        comments: 28
    },
    {
        id: 29,
        name: "Oliver Green",
        school: "Northeastern '26",
        initials: "OG",
        avatarColor: "linear-gradient(135deg, #6366f1, #4f46e5)",
        roleCompany: "Co-op @ Wayfair",
        timeAgo: "3w ago",
        outcomeText: "OFFER",
        outcomeClass: "outcome-offer",
        body: "Starting my first co-op at Wayfair! The interview was focused on frontend fundamentals and accessibility.",
        tags: [
            { text: "Co-op", className: "tag-gray" },
            { text: "Frontend", className: "tag-blue" },
            { text: "React", className: "tag-blue" }
        ],
        likes: 76,
        comments: 8
    },
    {
        id: 30,
        name: "Victoria Adams",
        school: "Brown '27",
        initials: "VA",
        avatarColor: "linear-gradient(135deg, #34d399, #10b981)",
        roleCompany: "Intern @ Squarespace",
        timeAgo: "3w ago",
        outcomeText: "OFFER",
        outcomeClass: "outcome-offer",
        body: "Squarespace! The design-led engineering approach here is exactly what I was looking for. Can't wait for the NYC summer.",
        tags: [
            { text: "NYC", className: "tag-blue" },
            { text: "Design", className: "tag-pink" },
            { text: "Front-end", className: "tag-green" }
        ],
        likes: 132,
        comments: 18
    },
    {
        id: 31,
        name: "Henry Baker",
        school: "Duke '25",
        initials: "HB",
        avatarColor: "linear-gradient(135deg, #fb923c, #f59e0b)",
        roleCompany: "Intern @ Rippling",
        timeAgo: "3w ago",
        outcomeText: "OFFER",
        outcomeClass: "outcome-offer",
        body: "Rippling's interviews were very business-logic heavy. They want to see how you model complex real-world systems in code.",
        tags: [
            { text: "Product", className: "tag-blue" },
            { text: "Growth", className: "tag-green" },
            { text: "ERP", className: "tag-gray" }
        ],
        likes: 145,
        comments: 24
    },
    {
        id: 32,
        name: "Scarlett Nelson",
        school: "Yale '26",
        initials: "SN",
        avatarColor: "linear-gradient(135deg, #0ea5e9, #0284c7)",
        roleCompany: "Intern @ Brex",
        timeAgo: "3w ago",
        outcomeText: "OFFER",
        outcomeClass: "outcome-offer",
        body: "Joining Brex! The technical bar here is high, especially for Elixir/Functional programming concepts for the backend.",
        tags: [
            { text: "Elixir", className: "tag-purple" },
            { text: "Fintech", className: "tag-blue" },
            { text: "Remote", className: "tag-gray" }
        ],
        likes: 98,
        comments: 14
    },
    {
        id: 33,
        name: "Jackson Hill",
        school: "Harvard '27",
        initials: "JH",
        avatarColor: "linear-gradient(135deg, #10b981, #059669)",
        roleCompany: "Intern @ Grammarly",
        timeAgo: "3w ago",
        outcomeText: "OFFER",
        outcomeClass: "outcome-offer",
        body: "Grammarly's NLP interview was fascinating. We talked about grammar correction models and user feedback loops.",
        tags: [
            { text: "NLP", className: "tag-blue" },
            { text: "AI", className: "tag-purple" },
            { text: "Product", className: "tag-green" }
        ],
        likes: 121,
        comments: 17
    },
    {
        id: 34,
        name: "Lillian Carter",
        school: "Columbia '25",
        initials: "LC",
        avatarColor: "linear-gradient(135deg, #f59e0b, #d97706)",
        roleCompany: "Intern @ Asana",
        timeAgo: "4w ago",
        outcomeText: "OFFER",
        outcomeClass: "outcome-offer",
        body: "Asana is so organized! The recruitment process was a reflection of their product. Clear communication and timeline.",
        tags: [
            { text: "Luna", className: "tag-pink" },
            { text: "Collaboration", className: "tag-blue" },
            { text: "SaaS", className: "tag-gray" }
        ],
        likes: 134,
        comments: 19
    },
    {
        id: 35,
        name: "Grayson Mitchell",
        school: "Northwestern '26",
        initials: "GM",
        avatarColor: "linear-gradient(135deg, #8b5cf6, #7c3aed)",
        roleCompany: "Intern @ HubSpot",
        timeAgo: "4w ago",
        outcomeText: "OFFER",
        outcomeClass: "outcome-offer",
        body: "Accepted my offer at HubSpot! They have a very strong culture around mentorship and learning.",
        tags: [
            { text: "Culture-Code", className: "tag-orange" },
            { text: "Java", className: "tag-orange" },
            { text: "Boston", className: "tag-blue" }
        ],
        likes: 156,
        comments: 26
    },
    {
        id: 36,
        name: "Ellie Roberts",
        school: "Michigan '27",
        initials: "ER",
        avatarColor: "linear-gradient(135deg, #14b8a6, #0d9488)",
        roleCompany: "Intern @ Box",
        timeAgo: "4w ago",
        outcomeText: "OFFER",
        outcomeClass: "outcome-offer",
        body: "Joining Box! The technical round was dynamic, covering everything from SQL to JavaScript performance.",
        tags: [
            { text: "Cloud", className: "tag-blue" },
            { text: "Storage", className: "tag-gray" },
            { text: "Web", className: "tag-green" }
        ],
        likes: 87,
        comments: 11
    },
    {
        id: 37,
        name: "Christopher Lee",
        school: "UBC '26",
        initials: "CL",
        avatarColor: "linear-gradient(135deg, #ec4899, #db2777)",
        roleCompany: "Intern @ Unity",
        timeAgo: "4w ago",
        outcomeText: "OFFER",
        outcomeClass: "outcome-offer",
        body: "Unity! Working on the game engine team. The interview was very math-heavy, covering linear algebra and calculus.",
        tags: [
            { text: "GameDev", className: "tag-green" },
            { text: "C#", className: "tag-blue" },
            { text: "Graphics", className: "tag-purple" }
        ],
        likes: 212,
        comments: 35
    },
    {
        id: 38,
        name: "Abigail Philips",
        school: "Waterloo '25",
        initials: "AP",
        avatarColor: "linear-gradient(135deg, #6366f1, #4f46e5)",
        roleCompany: "Intern @ Tesla",
        timeAgo: "1m ago",
        outcomeText: "OFFER",
        outcomeClass: "outcome-offer",
        body: "Tesla's interview was fast-paced and technical. They want to see that you're a builder at heart.",
        tags: [
            { text: "Autopilot", className: "tag-red" },
            { text: "C++", className: "tag-blue" },
            { text: "Embedded", className: "tag-gray" }
        ],
        likes: 342,
        comments: 67
    },
    {
        id: 39,
        name: "Andrew Foster",
        school: "UofT '26",
        initials: "AF",
        avatarColor: "linear-gradient(135deg, #34d399, #10b981)",
        roleCompany: "Intern @ Robinhood",
        timeAgo: "1m ago",
        outcomeText: "OFFER",
        outcomeClass: "outcome-offer",
        body: "Joining Robinhood for my next co-op! The focus on making finance accessible to everyone resonates with me.",
        tags: [
            { text: "Fintech", className: "tag-green" },
            { text: "Frontend", className: "tag-blue" },
            { text: "React", className: "tag-blue" }
        ],
        likes: 134,
        comments: 21
    },
    {
        id: 40,
        name: "Sofia Evans",
        school: "UNSW '27",
        initials: "SE",
        avatarColor: "linear-gradient(135deg, #fb923c, #f59e0b)",
        roleCompany: "Intern @ Atlassian",
        timeAgo: "1m ago",
        outcomeText: "OFFER",
        outcomeClass: "outcome-offer",
        body: "Atlassian's Sydney office is going to be my home for the summer! The process was centered around values and technical depth.",
        tags: [
            { text: "Jira", className: "tag-blue" },
            { text: "Confluence", className: "tag-blue" },
            { text: "Sydney", className: "tag-gray" }
        ],
        likes: 167,
        comments: 28
    },
    {
        id: 41,
        name: "Ryan Gonzalez",
        school: "ASU '26",
        initials: "RG",
        avatarColor: "linear-gradient(135deg, #0ea5e9, #0284c7)",
        roleCompany: "Intern @ Adobe",
        timeAgo: "1m ago",
        outcomeText: "OFFER",
        outcomeClass: "outcome-offer",
        body: "Accepted my offer at Adobe! Working on Creative Cloud. Very cool technologies and huge scale.",
        tags: [
            { text: "Adobe", className: "tag-red" },
            { text: "Creative", className: "tag-pink" },
            { text: "Web", className: "tag-green" }
        ],
        likes: 121,
        comments: 18
    },
    {
        id: 42,
        name: "Madeline Moore",
        school: "OSU '25",
        initials: "MM",
        avatarColor: "linear-gradient(135deg, #10b981, #059669)",
        roleCompany: "Intern @ VMware",
        timeAgo: "1m ago",
        outcomeText: "OFFER",
        outcomeClass: "outcome-offer",
        body: "Got the role at VMware! Deep dive into virtualization and kernel development. Preparation pays off.",
        tags: [
            { text: "Virtualization", className: "tag-blue" },
            { text: "Cloud", className: "tag-blue" },
            { text: "Systems", className: "tag-gray" }
        ],
        likes: 102,
        comments: 14
    },
    {
        id: 43,
        name: "Owen Jenkins",
        school: "Purdue '26",
        initials: "OJ",
        avatarColor: "linear-gradient(135deg, #f59e0b, #d97706)",
        roleCompany: "Intern @ Intel",
        timeAgo: "1m ago",
        outcomeText: "OFFER",
        outcomeClass: "outcome-offer",
        body: "Accepted my offer at Intel! Working on hardware acceleration for AI. Extremely exciting stuff.",
        tags: [
            { text: "Intel", className: "tag-blue" },
            { text: "AI Hardware", className: "tag-orange" },
            { text: "Verilog", className: "tag-gray" }
        ],
        likes: 134,
        comments: 20
    },
    {
        id: 44,
        name: "Elena Perez",
        school: "IIT '27",
        initials: "EP",
        avatarColor: "linear-gradient(135deg, #8b5cf6, #7c3aed)",
        roleCompany: "Intern @ Salesforce",
        timeAgo: "1m ago",
        outcomeText: "OFFER",
        outcomeClass: "outcome-offer",
        body: "joining Salesforce for the summer! The Trailhead learning platform is so cool for onboarding.",
        tags: [
            { text: "CRM", className: "tag-blue" },
            { text: "Enterprise", className: "tag-gray" },
            { text: "Cloud", className: "tag-blue" }
        ],
        likes: 112,
        comments: 13
    },
    {
        id: 45,
        name: "Ethan Ramirez",
        school: "UTD '26",
        initials: "ER",
        avatarColor: "linear-gradient(135deg, #14b8a6, #0d9488)",
        roleCompany: "Intern @ Oracle",
        timeAgo: "1m ago",
        outcomeText: "OFFER",
        outcomeClass: "outcome-offer",
        body: "Accepted my offer at Oracle Cloud Infrastructure (OCI). The scale they are building at is massive.",
        tags: [
            { text: "Cloud", className: "tag-blue" },
            { text: "Infrastructure", className: "tag-blue" },
            { text: "OCI", className: "tag-red" }
        ],
        likes: 145,
        comments: 22
    },
    {
        id: 46,
        name: "Hazel Morgan",
        school: "SMU '25",
        initials: "HM",
        avatarColor: "linear-gradient(135deg, #ec4899, #db2777)",
        roleCompany: "Intern @ Twitch",
        timeAgo: "2m ago",
        outcomeText: "OFFER",
        outcomeClass: "outcome-offer",
        body: "Twitch! I'll be working on the live-streaming core. It's a dream come true for a long-time viewer.",
        tags: [
            { text: "Streaming", className: "tag-purple" },
            { text: "Video", className: "tag-blue" },
            { text: "Go", className: "tag-cyan" }
        ],
        likes: 278,
        comments: 48
    },
    {
        id: 47,
        name: "Jameson Lee",
        school: "UofT '26",
        initials: "JL",
        avatarColor: "linear-gradient(135deg, #6366f1, #4f46e5)",
        roleCompany: "Intern @ Yelp",
        timeAgo: "2m ago",
        outcomeText: "OFFER",
        outcomeClass: "outcome-offer",
        body: "Accepted my offer at Yelp! Working on the personalization engine. The focus on local communities is awesome.",
        tags: [
            { text: "Python", className: "tag-blue" },
            { text: "Recommendation", className: "tag-orange" },
            { text: "Product", className: "tag-green" }
        ],
        likes: 121,
        comments: 19
    },
    {
        id: 48,
        name: "Aria Stewart",
        school: "ANU '27",
        initials: "AS",
        avatarColor: "linear-gradient(135deg, #34d399, #10b981)",
        roleCompany: "Intern @ Canva",
        timeAgo: "2m ago",
        outcomeText: "OFFER",
        outcomeClass: "outcome-offer",
        body: "Canva's culture of 'being a force for good' is so inspiring. Can't wait for the Sydney summer!",
        tags: [
            { text: "Design", className: "tag-pink" },
            { text: "Impact", className: "tag-blue" },
            { text: "Sydney", className: "tag-gray" }
        ],
        likes: 189,
        comments: 27
    },
    {
        id: 49,
        name: "Gavin Reed",
        school: "UMich '25",
        initials: "GR",
        avatarColor: "linear-gradient(135deg, #fb923c, #f59e0b)",
        roleCompany: "Intern @ Affirm",
        timeAgo: "2m ago",
        outcomeText: "OFFER",
        outcomeClass: "outcome-offer",
        body: "Joining Affirm! The focus on honest finance and developer-centric engineering culture is great.",
        tags: [
            { text: "Fintech", className: "tag-green" },
            { text: "Honest", className: "tag-blue" },
            { text: "Payments", className: "tag-purple" }
        ],
        likes: 134,
        comments: 21
    },
    {
        id: 50,
        name: "Mila Howard",
        school: "UIUC '26",
        initials: "MH",
        avatarColor: "linear-gradient(135deg, #0ea5e9, #0284c7)",
        roleCompany: "Intern @ Zillow",
        timeAgo: "2m ago",
        outcomeText: "OFFER",
        outcomeClass: "outcome-offer",
        body: "Accepted my offer at Zillow! Working on the search and mapping features. Can't wait to improve how people find homes.",
        tags: [
            { text: "Mapping", className: "tag-green" },
            { text: "Search", className: "tag-blue" },
            { text: "Seattle", className: "tag-gray" }
        ],
        likes: 156,
        comments: 25
    }
];