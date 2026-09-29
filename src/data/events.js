
export const eventData = [
{
    id: 1,
    slug: 'tech-exhibition',
    title: 'Tech Exhibition Showcase',
    category: 'Exhibition',
    description: 'A dynamic tech exhibition designed to showcase cutting-edge technology across various disciplines. Expect interactive gadgets, real-time working models, and live demonstrations that offer a hands-on experience.',
  image: '/tech-exhibition.jpeg',

    keyFeatures: [
      { 
        title: 'Hands-On Learning', 
        text: 'Engage with real-time working models and demonstrations.' 
      },
      { 
        title: 'Cross-Disciplinary', 
        text: 'Discover cutting-edge tech across various fields.' 
      },
      { 
        title: 'Cash Prizes  ', 
        text: 'Showcase your tech models and win awards ' 
      }
    ],
    
    disciplines: [
      { 
        name: 'Computer Science & AI', 
        items: ['Al-Powered Robots & Chatbots', 'Augmented & Virtual Reality (AR/VR)', 'Blockchain in Action', 'IoT Smart Home'] 
      },
      { 
        name: 'Mechanical Engineering', 
        items: ['3D Printing Live', 'Drones & UAVs', 'Self-Balancing Bicycle', 'Exoskeleton Suit Prototype', 'Mini Wind Turbine & Hydraulic Energy System'] 
      },
      { 
        name: 'Electrical & Electronics', 
        items: ['Tesla Coil Demonstration', 'Smart Traffic Control System', 'Wireless Charging System', 'Automated Electric Vehicle Charging Station', 'Gesture-Controlled Robotics'] 
      },
      { 
        name: 'Biotechnology', 
        items: ['DNA Extraction Lab', 'Biofuel Production Setup', 'Smart Hydroponic Farming', 'Bacteria-Based Water Purification', 'Biodegradable Plastic Formation'] 
      },
      { 
        name: 'Management & Business', 
        items: ['Al-Powered Stock Trading Simulation', 'Interactive Smart Retail Store', 'Supply Chain Automation', 'Blockchain for Digital Transactions', 'Marketing Technology Hub'] 
      },
      { 
        name: 'Pharmacy & Healthcare', 
        items: ['3D-Printed Human Organs', 'Smart Pill Dispenser', 'Al in Disease Diagnosis', 'Automated Blood Testing Kit', 'Wearable Health Monitors'] 
      }
    ],


    coordinators: {
      faculty: ['Dr. Jyoti Srivastava', 'Mr. Praveen Gupta'],
      student: ['Ashutosh Chatterjee', 'Sushil Kumar Kushwaha', 'Sandeep Yadav', 'Ritik Dubey']
    },
    

    prizes: {
      first: '₹7,000 cash prize',
      second: ' ₹4,000 cash prize'
    }
  },
 {
    id: 2,
    slug: '24-hour-hackathon',
    title: '24-Hour Hackathon',
    category: 'Hackathon',
    description: 'A 24-hour continuous coding and project development event. This document outlines the key components, from pre-event registration to the final presentations and judging.',
  image: '/hackathon.jpeg',
    keyFeatures: [
      { title: 'Duration', text: '24 hours of continuous coding.' },
      { title: 'Presentations', text: '5-10 minutes per team for live demos.' },
      { title: 'Venue', text: 'EV-4 Management Building.' },
      { title: 'Teams', text: '1-4 members per team, can be from different universities.' }
    ],
    judgingCriteria: [
      { title: 'Innovation & Creativity', percent: '30%' },
      { title: 'Technical Execution', percent: '30%' },
      { title: 'Impact', percent: '20%' },
      { title: 'Presentation', percent: '20%' },
      { title: 'Rounds', text: 'Three judging rounds: initial pitch, progress evaluation, and final review.' }
    ],
    coordinators: {
      faculty: ['Mr. Vivekanand Pandey', 'Mr. Satish Vishwakarma'],
      student: ['Ujwal Singh', 'Saket Pandey', 'Saurabh Sahani', 'Praveen Pandey']
    },
    prizes: {
      first: ' ₹7,000 cash prize',
      second: ' ₹4,000 cash prize'
    }
  },
  
{
    id: 3,
    slug: 'startup-expo',
    title: 'Startup Expo',
    category: 'Entrepreneurship',
    description: 'A flagship event designed to encourage innovation and startup culture. Present your business ideas, prototypes, or startup models to judges, investors, and audience.',
  image: '/startup-expo.png',
    eventStructure: [
      { title: 'Stage 1: Registration & Idea Submission', text: 'Submit team details, problem statement, solution, and business model via Google Form.' },
      { title: 'Stage 2: Screening Round', text: 'A committee will review submissions and shortlist Top 20-30 teams for the final.' },
      { title: 'Stage 3: Final Round – Live Pitching', text: '7 minutes for presentation + 3 minutes for Q&A. Showcase your prototype or demo.' }
    ],
    judgingCriteria: [
      { title: 'Innovation & Creativity', percent: '20 marks' },
      { title: 'Problem Identification & Solution Clarity', percent: '15 marks' },
      { title: 'Feasibility & Sustainability', percent: '15 marks' },
      { title: 'Business Model & Revenue Plan', percent: '15 marks' },
      { title: 'Market Potential & Scalability', percent: '10 marks' },
      { title: 'Presentation & Communication', percent: '10 marks' },
      { title: 'Prototype / Implementation', percent: '10 marks' },
      { title: 'Teamwork & Overall Impression', percent: '5 marks' }
    ],
    rules: [
      "Team size: 1-4 members.",
      "Idea must be original; plagiarism leads to disqualification.",
      "Pitch Duration: 7 min presentation + 3 min Q&A (strictly enforced).",
      "Pitch Deck (6-10 slides) must be submitted before event day."
    ],
    coordinators: {
      faculty: ['Mr. Awanish Upadhyay', 'Ms. Archana'],
      student: ['Sushil Kumar Kushwaha', 'Sandeep Yadav', 'Ujwal Singh']
    },
    prizes: {
      first: ' ₹7,000 cash prize; Top winners also receive certificates, mentorship, and potential collaboration opportunities.',
      second: ' ₹4,000 cash prize; Certificates for all participants who complete all rounds.'
    }
  },

  {
    id: 4,
    slug: 'code-crackers',
    title: 'Code Crackers',
    category: 'Competitive Coding',
    description: 'A contest to test problem-solving and algorithmic thinking. Crack the Code, conquer the logic!',
  image: '/codecrackers .png',
    keyFeatures: [
      { title: 'Platform', text: 'Private HackerRank contest.' },
      { title: 'Format', text: '12 Questions (5 Easy, 5 Medium, 2 Hard).' },
      { title: 'Duration', text: '1 hour 30 minutes.' },
      { title: 'Languages', text: 'C, C++, Java, Python, Js.' },
      { title: 'Proctoring', text: 'Browser tab switch detection.' }
    ],
    rules: [
      "Individual Participation Only.",
      "Use of AI Tools (ChatGPT, Copilot, etc) is strictly prohibited.",
      "Any form of plagiarism will result in immediate disqualification.",
      "Internet allowed only for the contest platform.",
      "Leaderboard ties are resolved by total completion time."
    ],
    coordinators: {
      faculty: ['Mr. Awanish Upadhyay', 'Mr. Ashish Dubey'],
      student: ['Akash Verma', 'Saket Singh', 'Ujwal Singh']
    },
    
  },

  {
    id: 5,
    slug: 'debugging-contest',
    title: 'Debugging Contest',
    category: 'Debugging',
    description: 'A competitive event designed to test participants\' programming knowledge, logic, and error-handling ability under pressure.',
  image: '/Debugging.jpeg',
    keyFeatures: [
      { title: 'Participation', text: 'Individual Participation Only.' },
      { title: 'Location', text: 'Conducted in the College Lab.' },
      { title: 'Hardware', text: 'Participants can bring their own laptops.' }
    ],
    eventStructure: [
      { title: 'Round 1: Basic Error Detection', text: 'Simple code snippets with syntax/logical errors (C/Python).' },
      { title: 'Round 2: Logic & Output Prediction', text: 'Participants predict correct output for tricky code segments.' },
      { title: 'Round 3: Code Correction Challenge', text: 'Fix and run medium-level programs with multiple bugs.' }
    ],
    rules: [
      "Internet usage or external help is strictly prohibited.",
      "Any form of malpractice will lead to immediate disqualification.",
      "Judges' decision will be final and binding.",
      "All code must be written/debugged individually."
    ],
    coordinators: {
      faculty: ['Mr. Jitendra Kumar', 'Mr. Himanshu'],
      student: ['Sushil Kumar Kushwaha', 'Praveen Pandey', 'Naman Tiwari']
    },
   
  },
  {
    id: 6,
    slug: 'mobile-gaming-arena',
    title: 'Mobile Gaming Arena',
    category: 'Gaming',
    description: 'A mobile gaming tournament featuring BGMI and Free Fire. Read the rules carefully to ensure a smooth and enjoyable experience for all participants.',
  image: '/mobile-gaming.jpeg',
    rules: [
      "Players must use their own mobile devices (smartphones or tablets).",
      "Emulators or PCs are not allowed.",
      "A stable internet connection is the responsibility of each participant.",
      "No rematches for disconnections.",
      "Check-in 30 minutes before the match.",
      "Toxic behaviour or hate speech will result in immediate disqualification.",
      "Use of hacks, aimbots, or any third-party software is prohibited.",
      "Offensive usernames or team names are not allowed.",

    ],
    coordinators: {
      faculty: ['Mr. Jitendra Kumar','Mr. Deepak Vishwakarma'],
      student: ['Sankalp Kumar', 'Ritik Dubey', 'Vishesh Kumar Modanwal']
    },
    prizes: {
      first: ' ₹1,500 cash prize',
      second: ' Trophy , medal and certificates'
    },
    registrationLink: 'https://forms.gle/6bGCFaMuKcQf9EgU7', 
 
  },

  {
    id: 7,
    slug: 'project-showcase',
    title: 'Project Panorama Showcase',
    category: 'Showcase',
    description: 'A competitive event to present your ideas, demonstrate practical applications of technology, and gain valuable feedback from experts.',
  image: '/project-showcase.png',
    keyFeatures: [
      { title: 'Teams', text: 'Register individually or as a team (max 4 members).' },
      { title: 'Presentation', text: '6-7 minutes for presentation + 3 minutes for Q&A.' },
      { title: 'Demo', text: 'A live working demo is required.' },
      { title: 'Required', text: 'All participants must bring their own laptops.' }
    ],
    eventStructure: [
      { title: 'Project Domains (Choose from)', text: 'AI & Machine Learning, Cyber Security, Web/App Development, or Open Innovation.' },
      { title: 'Presentation Must Highlight', text: 'Live demo, unique features, and real-world market use.' }
    ],
    judgingCriteria: [
      { title: 'Innovation & Creativity', percent: '10 Marks' },
      { title: 'Technical Depth', percent: '10 Marks' },
      { title: 'Presentation & Communication', percent: '10 Marks' },
      { title: 'Social/Market Impact', percent: '10 Marks' }
    ],
    rules: [
      "Projects must be original and developed by the team.",
      "Do not misbehave with judges; tone should be formal.",
      "Teams must submit source files or documentation if requested.",
      "Judges' decision will be final."
    ],
    coordinators: {
      faculty: ['Mr. Shivam Gupta', 'Ms. Priya Srivastava'],
      student: ['Anjali', 'Akanksha Srivastava', ]
    },
    prizes: {
      first: 'Winner Award',
      second: 'Runner Up Award'
    }
  },

  {
    id: 8,
    slug: 'quiz-contest',
    title: 'Quiz Contest',
    category: 'Quiz',
    description: 'A thrilling quiz contest that will put your technical knowledge to the test. Compete with the best and win prizes!',
  image: '/quiz.jpeg',
    eventStructure: [
      { title: 'Round 1: Rapid Fire', text: '3 questions in 30 sec. +5 points for correct. +10 bonus for all correct.' },
      { title: 'Round 2: Scattegories', text: 'Choose 1 of 10 subjects. 1 question, 3 attempts (15, 10, 5 points).' },
      { title: 'Round 3: Starcade', text: '5 questions, 3 options. Hand-raise to answer. +10 for correct, -5 for wrong call. Top 10 qualify.' },
      { title: 'Round 4: Audio Visual', text: '5 questions. Buzzer round. +20 for principal, -10 for wrong. +10 for challenger, -5 for wrong. Top 5 qualify.' },
      { title: 'Round 5: The Ringing Bell', text: '3 questions. Buzzer round. +10 for correct, -2 for wrong.' }
    ],
    judgingCriteria: [
      { title: 'Correctness of answers' },
      { title: 'Speed and accuracy' },
      { title: 'Quick thinking & responsiveness' }
    ],
    rules: [
      "Bring college ID and registration confirmation.",
      "No mobile phones or electronic devices allowed.",
      "There will be time limits for each question/round."
    ],
    coordinators: {
      faculty: ['Ms. Neha Tiwari', 'Ms. Maneesha'],
      student: ['Riya Maurya', 'Saumya Singh']
    },
    prizes: {
      first: 'Winning award',
      second: 'Runner up award'
    }
  },

  {
    id: 9,
    slug: 'pseudo-code-war',
    title: 'Pseudo Code War',
    category: 'Coding',
    description: 'Think in Logic, Not in Language! Test your logical thinking and algorithmic understanding without focusing on syntax.',
  image: '/pseudocode.png',
    keyFeatures: [
      { title: 'Participation', text: 'Individual participation only.' }
    ],
    eventStructure: [
      { title: 'Round 1: Logic Basics (Easy)', text: '15 mins. 10 short questions. +20 points each. Top 50% advance.' },
      { title: 'Round 2: Algorithmic Thinking (Medium)', text: '20 mins. 3 moderate questions. +40 points each. Partial marks allowed. Top 10 advance.' },
      { title: 'Round 3: The War of Logic (Hard)', text: '45 mins. 3 challenging questions. +60 points each. Judged on clarity, optimization, and correctness.' }
    ],
    judgingCriteria: [
      { title: 'Correctness', percent: '60%' },
      { title: 'Logic Flow', percent: '20%' },
      { title: 'Efficiency', percent: '20%' },
      { title: 'Readability', text: 'Judged on proper indentation, naming, and flow.'}
    ],
    rules: [
      "No actual programming syntax allowed—pseudo code only.",
      "Internet access, compilers, or mobile phones strictly prohibited.",
      "Answers on given sheets or digital form.",
      "In case of a tie, time taken in the last round will be considered.",
      "Plagiarism leads to immediate disqualification."
    ],
    coordinators: {
      faculty: ['Mr. Ashish Dubey ', 'Mr. Amit'],
      student: ['Riya Maurya', 'Akash Verma', 'Gaurav Yadav']
    },
    prizes: {
      first: 'Winner Award',
      second: 'Runner Up Award'
    }
  },

  {
    id: 10,
    slug: 'fastest-typing',
    title: 'Fastest Fingers First',
    category: 'Typing',
    description: 'A competitive typing event designed to test speed, accuracy, and keyboard mastery in a structured, fair, and engaging competition.',
  image: '/fastest-typing.jpeg',
    eventStructure: [
      { title: 'Round 1: Speed Sprint', text: '1 minute. All participants. Focus on raw typing speed.' },
      { title: 'Round 2: Precision Round', text: '3 minutes. All participants. Focus on complex words and punctuation.' },
      { title: 'Round 3: Final Showdown', text: '5 minutes. All participants. Focus on a real-world typing passage.' }
    ],
    judgingCriteria: [
      { title: 'Scoring will be handled automatically through the typing platform.' }
    ],
    rules: [
      "Eligibility: Open to all college students.",
      "Registration must be completed via official Google Form.",
      "Autocorrect must be disabled.",
      "Standard QWERTY keyboard layout for all.",
      "Decision of the platform is final and binding.",
      "Certificates only for participants who complete all rounds."
    ],
    coordinators: {
      faculty: ['Mr. Anil Kumar Yadav', 'Mr. Gorakh Kumar Yadav'],
      student: ['Saurabh Sahani', 'Naman Tiwari', 'Neelakshi Sinha']
    },
    
  },

  {
    id: 11,
    slug: 'battle-of-minds',
    title: 'Battle of Minds Debate',
    category: 'Debate',
    description: 'A flagship event to promote logical thinking, confidence, and public speaking. Debate on contemporary and thought-provoking topics.',
  image: '/debate.jpeg',
    keyFeatures: [
      { title: 'Groups', text: 'Participants divided into "For the Motion" and "Against the Motion".' },
      { title: 'Topics', text: 'A list of topics will be shared in advance.' },
      { title: 'Language', text: 'Participants can speak in English or Hindi.' },
      { title: 'Format', text: 'Offline, live session. Each participant judged individually.' }
    ],
    eventStructure: [
      { title: 'Presentation Round', text: '2-3 minutes per member for opening arguments.' },
      { title: 'Rebuttal Round', text: '1 minute per member.' },
      { title: 'Judges Q&A Round', text: '3-5 minutes.' }
    ],
    judgingCriteria: [
      { title: 'Content Quality', percent: '10 Marks' },
      { title: 'Presentation & Delivery', percent: '10 Marks' },
      { title: 'Rebuttal Skills', percent: '10 Marks' },
      { title: 'Team Coordination', percent: '5 Marks' },
      { title: 'Overall Impact', percent: '5 Marks' }
    ],
    rules: [
      "Use of offensive, political, or personal remarks is strictly prohibited.",
      "Exceeding the time limit may lead to a penalty.",
      "Participants must maintain discipline and decorum.",
      "Judges' decision will be final and binding."
    ],
    coordinators: {
      faculty: ['Ms. Alolika Banarjee', 'Ms. Maneesha'],
      student: ['Ashutosh Chattarjee', 'Praveen Pandey', 'Unnati Singh']
    },
  
    suggestedTopics: {
      technical: [
        "Artificial Intelligence will replace human creativity in the future.",
        "The use of AI in education does more harm than good.",
        "Should human cloning be allowed for medical purposes?",
        "Social media algorithms are destroying individual privacy.",
        "India should prioritize renewable energy over space exploration."
      ],
      nonTechnical: [
        "Reservation in education should be based on economic status, not caste.",
        "Online learning can never replace traditional classroom education.",
        "Are online degrees as valuable as traditional degrees?",
        "Freedom of speech should have legal limits.",
        "Should plastic be completely banned?"
      ]
    },
    
  },

  {
    id: 12,
    slug: 'memory-master',
    title: 'Memory Master Contest',
    category: 'Fun',
    description: 'Challenge your brain, creativity, and focus in this two-segment contest!',
  image: '/memory-master.jpeg',
    keyFeatures: [
      { title: 'Participation', text: 'Individual competition (no eliminations).' },
      { title: 'Format', text: 'Scores are accumulated across all rounds.' }
    ],
    segments: [
      {
        title: 'Segment 1: Classic Recall Challenge',
        description: 'Test how accurately participants can recall and list visual information after brief exposure.',
        rounds: [
          { title: 'Round 1 (Easy): "Quick Glance"', text: 'Show image for 15s. Participants list items. +1 point per item.' },
          { title: 'Round 2 (Medium): "Spot the Details"', text: 'Show scene for 20s. Participants answer 5-7 specific questions. +2 points per correct answer.' },
          { title: 'Round 3 (Hard): "Pattern Recall"', text: 'Show grid/pattern for 10-15s. Participants recreate the pattern. +3 points per correct element.' }
        ]
      },
      {
        title: 'Segment 2: Tongue Twister Thunder',
        description: 'Test speed, clarity, and pronunciation accuracy with tricky Hindi and English tongue twisters.',
        rounds: [
          { title: 'Round 1 (Medium): "Twist Starter"', text: '30s limit. Repeat 3 times. Judged on clarity & rhythm.' },
          { title: 'Round 2 (Hard): "Tongue Gymnastics"', text: '40s limit. Focus on fluency - stumbles cost points!' },
          { title: 'Round 3 (Very Hard): "Twist Till You Trip!"', text: '45s limit. Very complex lines. +1 bonus point if flawless.' }
        ]
      }
    ],
    coordinators: {
      faculty: ['Ms. Priya Srivastava', 'Ms. Pragati Bhattacharya'],
      student: ['Sushil Kumar Kushwaha', 'Sandeep Yadav', 'Ujwal Singh']
    },
  
  },

  {
    id: 13,
    slug: 'virtual-escape-room',
    title: 'Virtual Escape Room',
    category: 'Fun',
    description: 'Enter a virtual room and solve logic-based problems, coding challenges, cryptography riddles, and math puzzles to unlock new levels and escape.',
  image: '/ver.jpeg',
    keyFeatures: [
      { title: 'Teams', text: 'Teams of 2-4 members.' },
      { title: 'Duration', text: 'Main challenge lasts for 60-80 minutes.' },
      { title: 'Format', text: 'Solve locked levels in sequence. Puzzles include logic, coding, and crypto.' }
    ],
    judgingCriteria: [
      { title: 'Scoring is based on:' },
      { text: '1. Fastest escape' },
      { text: '2. Challenges solved' },
      { text: '3. Hints used (time penalty for each hint)' },
      { text: '4. Teamwork and communication' }
    ],
    rules: [
      "Work together without external help.",
      "Each puzzle has one correct answer leading to the next clue.",
      "Code of conduct prohibits cheating, requires respect, and discourages disruptions.",
      "Teams must submit final escape confirmation for judges to verify."
    ],
    coordinators: {
      faculty: ['Ms. Vaishnavi ', 'Mr. Deepak Vishwakarma'],
      student: ['Gaurav Yadav','Vishesh Kumar Modanwal']
    },
   
  }
];

