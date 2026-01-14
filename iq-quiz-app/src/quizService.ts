export interface Question {
    id: string;
    text: string;
    options: string[];
    correctIndex: number;
    difficulty: 'easy' | 'medium' | 'hard' | 'genius';
    category: 'logic' | 'pattern' | 'math' | 'spatial';
}
export interface QuizResult {
    score: number;
    totalQuestions: number;
    timeTakenSeconds: number;
    calculatedIQ: number;
    percentile: number;
}
// Expanded Mock Questions Database
const MOCK_POOL: Question[] = [
    // --- EASY (Need at least 5 for variety) ---
    {
        id: 'e1', text: "Which number comes next: 2, 4, 8, 16, ...?",
        options: ["18", "32", "24", "20"], correctIndex: 1, difficulty: 'easy', category: 'math'
    },
    {
        id: 'e2', text: "Finger is to Hand as Leaf is to ...?",
        options: ["Branch", "Tree", "Flower", "Bark"], correctIndex: 0, difficulty: 'easy', category: 'logic'
    },
    {
        id: 'e3', text: "Which shape is the odd one out?",
        options: ["Circle", "Triangle", "Square", "Sphere"], correctIndex: 3, difficulty: 'easy', category: 'spatial' // Sphere is 3D
    },
    {
        id: 'e4', text: "If you rearrange the letters 'CIFAIPC', you would have the name of a(n):",
        options: ["City", "Animal", "Ocean", "Country"], correctIndex: 2, difficulty: 'easy', category: 'logic' // PACIFIC
    },
    {
        id: 'e5', text: "What is the opposite of 'Decrease'?",
        options: ["Reduce", "Increase", "Plain", "Deduced"], correctIndex: 1, difficulty: 'easy', category: 'logic'
    },
    {
        id: 'e7', text: "What comes next in the sequence: 1, 4, 9, 16, 25, ...?",
        options: ["36", "49", "30", "27"], correctIndex: 0, difficulty: 'easy', category: 'math' // Square numbers
    },
    {
        id: 'e8', text: "Book is to Library as Painting is to ...?",
        options: ["Museum", "Gallery", "Artist", "Frame"], correctIndex: 0, difficulty: 'easy', category: 'logic'
    },
    // --- MEDIUM (Need at least 10 for variety) ---
    {
        id: 'm1', text: "If a doctor gives you 3 pills and tells you to take one every half hour, how long would it take before all the pills had been taken?",
        options: ["1.5 Hours", "1 Hour", "2 Hours", "3 Hours"], correctIndex: 1, difficulty: 'medium', category: 'logic'
    },
    {
        id: 'm2', text: "Identify the odd one out: LEVEL, RADAR, KAYAK, CIVIC, RIVER",
        options: ["RADAR", "CIVIC", "RIVER", "LEVEL"], correctIndex: 2, difficulty: 'medium', category: 'pattern'
    },
    {
        id: 'm3', text: "Mary's father has five daughters: 1. Nana, 2. Nene, 3. Nini, 4. Nono. What is the name of the fifth daughter?",
        options: ["Nunu", "Nina", "Mary", "None of the above"], correctIndex: 2, difficulty: 'medium', category: 'logic'
    },
    {
        id: 'm4', text: "Which number replaces the question mark? 1, 1, 2, 3, 5, 8, ?",
        options: ["11", "12", "13", "15"], correctIndex: 2, difficulty: 'medium', category: 'math' // Fibonacci
    },
    {
        id: 'm5', text: "A bat and a ball cost $1.10 in total. The bat costs $1.00 more than the ball. How much does the ball cost?",
        options: ["$0.10", "$0.05", "$0.50", "$0.01"], correctIndex: 1, difficulty: 'medium', category: 'math' // x + (x+1) = 1.10 -> 2x = 0.10 -> x = 0.05
    },
    {
        id: 'm6', text: "Which word shares a common feature with: DEIFY, ROTATOR, REPAPER?",
        options: ["REVIVER", "REMEMBER", "RETURN", "RESTORE"], correctIndex: 0, difficulty: 'medium', category: 'pattern' // Palindromes
    },
    {
        id: 'm8', text: "What is the next number in the sequence: 2, 3, 5, 7, 11, 13, ...?",
        options: ["15", "17", "19", "23"], correctIndex: 1, difficulty: 'medium', category: 'math' // Prime numbers
    },
    {
        id: 'm9', text: "A lily pad doubles in size every day. If it covers the entire pond in 30 days, when was the pond half covered?",
        options: ["Day 15", "Day 29", "Day 28", "Day 1"], correctIndex: 1, difficulty: 'medium', category: 'logic'
    },
    {
        id: 'm10', text: "Which of these is not like the others: DOG, CAT, BIRD, FISH, SNAKE?",
        options: ["DOG", "CAT", "BIRD", "FISH"], correctIndex: 3, difficulty: 'medium', category: 'logic' // Fish doesn't have legs
    },
    // --- HARD (Need at least 10 for variety) ---
    {
        id: 'h1', text: "If 5 machines take 5 minutes to make 5 widgets, how long would it take 100 machines to make 100 widgets?",
        options: ["100 minutes", "5 minutes", "1 minute", "20 minutes"], correctIndex: 1, difficulty: 'hard', category: 'math'
    },
    {
        id: 'h2', text: "Two men play five games of chess. Each man wins the same number of games. There are no draws. How is this possible?",
        options: ["They played different people", "They are lying", "One cheated", "It's impossible"], correctIndex: 0, difficulty: 'hard', category: 'logic'
    },
    {
        id: 'h3', text: "Next in sequence: 77, 49, 36, 18, ...?",
        options: ["8", "9", "6", "10"], correctIndex: 0, difficulty: 'hard', category: 'pattern' // 7*7=49, 4*9=36, 3*6=18, 1*8=8
    },
    {
        id: 'h4', text: "A man pulls up to a hotel and loses his fortune. What happened?",
        options: ["He gambled it", "He was robbed", "He is playing Monopoly", "Stock market crash"], correctIndex: 2, difficulty: 'hard', category: 'logic'
    },
    {
        id: 'h5', text: "1=3, 2=3, 3=5, 4=4, 5=4, 6=3. Then 7=?",
        options: ["5", "3", "4", "6"], correctIndex: 0, difficulty: 'hard', category: 'pattern' // Number of letters in the word: One(3), Two(3), Three(5)... Seven(5)
    },
    {
        id: 'h7', text: "If you have three switches outside a room that control three bulbs inside, and you can flip switches and check bulbs only once each, how can you determine which switch controls which bulb?",
        options: ["Flip all switches", "Flip one, wait, flip another", "It's impossible", "Use a mirror"], correctIndex: 1, difficulty: 'hard', category: 'logic'
    },
    {
        id: 'h8', text: "What is the next number: 1, 11, 21, 1211, 111221, ...?",
        options: ["312211", "13112221", "1113213211", "13211311123113112211"], correctIndex: 0, difficulty: 'hard', category: 'pattern' // Look-and-say sequence
    },
    {
        id: 'h9', text: "A man has to transport a wolf, a goat, and a cabbage across a river. He can only take one at a time, and can't leave the wolf with the goat or the goat with the cabbage. How does he do it?",
        options: ["Take goat first, come back, take wolf, come back with goat, take cabbage, come back, take goat", "Take wolf first", "Take cabbage first", "It's impossible"], correctIndex: 0, difficulty: 'hard', category: 'logic'
    },
];
export const QuizService = {
    async generateQuiz(count: number = 5): Promise<Question[]> {
        // Simulate AI delay
        await new Promise(resolve => setTimeout(resolve, 800));

        // Get previously used questions from localStorage to avoid repetition
        const usedQuestions = JSON.parse(localStorage.getItem('usedQuestions') || '[]');

        // Desired Structure: 1 Easy, 2 Medium, 2 Hard
        const easyPool = MOCK_POOL.filter(q => q.difficulty === 'easy' && !usedQuestions.includes(q.id));
        const mediumPool = MOCK_POOL.filter(q => q.difficulty === 'medium' && !usedQuestions.includes(q.id));
        const hardPool = MOCK_POOL.filter(q => q.difficulty === 'hard' && !usedQuestions.includes(q.id));

        // If we don't have enough unused questions, reset the used questions list
        if (easyPool.length < 1 || mediumPool.length < 2 || hardPool.length < 2) {
            localStorage.setItem('usedQuestions', '[]');
            return this.generateQuiz(count); // Retry with fresh pool
        }

        // Helper to get random samples without replacement
        const getRandomUnique = (pool: Question[], n: number): Question[] => {
            const shuffled = [...pool].sort(() => 0.5 - Math.random());
            return shuffled.slice(0, n);
        };

        const selectedQuestions = [
            ...getRandomUnique(easyPool, 1),
            ...getRandomUnique(mediumPool, 2),
            ...getRandomUnique(hardPool, 2)
        ];

        // Update used questions list
        const newUsedQuestions = [...usedQuestions, ...selectedQuestions.map(q => q.id)];
        localStorage.setItem('usedQuestions', JSON.stringify(newUsedQuestions));

        return selectedQuestions;
    },

    // Function to reset used questions (useful for testing or when pool is exhausted)
    resetUsedQuestions(): void {
        localStorage.setItem('usedQuestions', '[]');
    },
    calculateIQ(score: number, total: number, timeSeconds: number): QuizResult {
        // Basic heuristic:
        // Base IQ = 100
        // Correct answer: +10-15 points depending on difficulty (simplified here)
        // Speed bonus: if < 10s per question
        let rawScore = (score / total) * 100; // 0-100%
        let estimatedIQ = 85 + (rawScore * 0.6); // Range 85 - 145 potentially
        // Time penalty/bonus
        const avgTime = timeSeconds / total;
        if (avgTime < 10 && score > total / 2) estimatedIQ += 5;
        if (avgTime > 60) estimatedIQ -= 5;
        // Cap
        estimatedIQ = Math.min(160, Math.max(70, Math.round(estimatedIQ)));
        return {
            score,
            totalQuestions: total,
            timeTakenSeconds: timeSeconds,
            calculatedIQ: estimatedIQ,
            percentile: calculatePercentile(estimatedIQ)
        };
    }
};
function calculatePercentile(iq: number): number {
    // Rough normal distribution approximation
    if (iq >= 130) return 98;
    if (iq >= 120) return 91;
    if (iq >= 110) return 75;
    if (iq >= 100) return 50;
    if (iq >= 90) return 25;
    return 10;
}
