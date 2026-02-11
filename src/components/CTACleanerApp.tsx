import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Zap, ArrowRight, Lightbulb } from 'lucide-react';
import ScoreRing from './ScoreRing';

interface AnalysisResult {
  score: number;
  grade: string;
  suggestions: { text: string; good: boolean }[];
}

const examples = [
  { text: 'Sign up for our newsletter', label: 'Newsletter' },
  { text: 'Get your free trial', label: 'Free Trial' },
  { text: 'Book a demo today', label: 'Demo' },
  { text: 'Start your 7-day free trial now!', label: 'Urgent' },
  { text: 'Try our product', label: 'Weak CTA' },
];

const suggestions = [
  { text: 'Add more context - CTAs with 5-7 words convert best', good: false },
  { text: 'Use strong action verbs like "Get", "Start", "Book"', good: false },
  { text: 'Consider mentioning "Free" or a benefit', good: false },
  { text: 'Replace "Try" with "Start" or "Get" for urgency', good: false },
  { text: 'Add urgency: "Now" or "Today"', good: false },
  { text: 'Your CTA is well-optimized!', good: true },
];

export default function CTACleanerApp() {
  const [cta, setCta] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);

  const analyzeCTA = (text: string) => {
    setIsAnalyzing(true);
    setCta(text);

    // Simulate analysis with animation
    setTimeout(() => {
      let score = 50;
      const lower = text.toLowerCase();
      const words = text.split(/\s+/).length;

      if (words < 3) score -= 20;
      if (words > 10) score -= 10;

      const weak = ['try', 'maybe', 'consider'];
      if (weak.some(w => lower.includes(w))) score -= 15;

      const action = ['get', 'try', 'start', 'book', 'download', 'sign', 'buy', 'learn'];
      if (!action.some(a => lower.includes(a))) score -= 10;
      else score += 10;

      if (lower.includes('now') || lower.includes('today')) score += 10;

      score = Math.max(0, Math.min(100, score));

      const grade = score >= 90 ? 'A+' : score >= 80 ? 'A' : score >= 70 ? 'B' : score >= 60 ? 'C' : score >= 50 ? 'D' : 'F';

      // Generate relevant suggestions
      const relevantSuggestions = suggestions.filter(s => {
        if (s.text.includes('words') && (words < 3 || words > 10)) return true;
        if (s.text.includes('action verbs') && !action.some(a => lower.includes(a))) return true;
        if (s.text.includes('Free') && !lower.includes('free') && !lower.includes('$')) return true;
        if (s.text.includes('"Try"') && lower.includes('try')) return true;
        if (s.text.includes('urgency') && !lower.includes('now') && !lower.includes('today')) return true;
        return false;
      });

      if (relevantSuggestions.length === 0) {
        relevantSuggestions.push({ text: 'Your CTA is well-optimized!', good: true });
      }

      setResult({ score, grade, suggestions: relevantSuggestions });
      setIsAnalyzing(false);
    }, 1500);
  };

  const loadExample = (text: string) => {
    analyzeCTA(text);
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-black/20 backdrop-blur-xl"
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <motion.div
            className="flex items-center gap-3"
            whileHover={{ scale: 1.05 }}
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-pink-500 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold gradient-text">CTA Cleaner</span>
          </motion.div>
          <nav className="hidden md:flex items-center gap-8">
            {['Features', 'Pricing', 'Examples'].map((item, i) => (
              <motion.a
                key={item}
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ scale: 1.1 }}
              >
                {item}
              </motion.a>
            ))}
          </nav>
          <motion.button
            className="px-6 py-2 rounded-full bg-gradient-to-r from-primary-500 to-pink-500 font-medium text-sm"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Get Started
          </motion.button>
        </div>
      </motion.header>

      {/* Hero Section */}
      <main className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <motion.span
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-500/10 border border-primary-500/30 text-primary-400 text-sm mb-8"
              whileHover={{ scale: 1.05 }}
            >
              <Zap className="w-4 h-4" />
              AI-Powered CTA Analysis
            </motion.span>

            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Better CTAs
              <br />
              <span className="gradient-text">More Conversions</span>
            </h1>

            <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-12">
              Analyze and optimize your call-to-action buttons with AI.
              Get instant feedback and suggestions to boost your conversion rates.
            </p>
          </motion.div>

          {/* Input Section */}
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="glass-card rounded-3xl p-8 max-w-2xl mx-auto"
          >
            <div className="relative">
              <input
                type="text"
                value={cta}
                onChange={(e) => setCta(e.target.value)}
                placeholder="Enter your CTA (e.g., Sign up for our newsletter)"
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder-gray-500 focus:outline-none focus:border-primary-500 transition-all text-lg"
                onKeyDown={(e) => e.key === 'Enter' && analyzeCTA(cta)}
              />
              <motion.button
                onClick={() => analyzeCTA(cta)}
                disabled={!cta || isAnalyzing}
                className="absolute right-2 top-2 bottom-2 px-6 rounded-xl bg-gradient-to-r from-primary-500 to-pink-500 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isAnalyzing ? (
                  <div className="spinner" />
                ) : (
                  <span className="flex items-center gap-2">
                    Analyze
                    <ArrowRight className="w-4 h-4" />
                  </span>
                )}
              </motion.button>
            </div>

            {/* Quick Examples */}
            <div className="mt-4 flex flex-wrap justify-center gap-2">
              <span className="text-sm text-gray-500">Try:</span>
              {examples.map((example, i) => (
                <motion.button
                  key={example.text}
                  onClick={() => loadExample(example.text)}
                  className="px-3 py-1 rounded-full bg-white/5 hover:bg-white/10 text-xs text-gray-400 hover:text-white transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + i * 0.1 }}
                >
                  {example.label}
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Analysis Result */}
          <AnimatePresence>
            {result && (
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                className="mt-12 grid md:grid-cols-2 gap-8 max-w-3xl mx-auto"
              >
                {/* Score Ring */}
                <motion.div
                  className="glass-card rounded-3xl p-8 flex flex-col items-center justify-center"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <ScoreRing score={result.score} grade={result.grade} />
                </motion.div>

                {/* Suggestions */}
                <motion.div
                  className="glass-card rounded-3xl p-8"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                    <Lightbulb className="w-5 h-5 text-yellow-400" />
                    Suggestions
                  </h3>
                  <div className="space-y-3">
                    {result.suggestions.map((suggestion, i) => (
                      <motion.div
                        key={i}
                        className={`flex items-center gap-3 p-3 rounded-xl ${
                          suggestion.good
                            ? 'bg-green-500/10 border border-green-500/20'
                            : 'bg-white/5 border border-white/10'
                        }`}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.6 + i * 0.1 }}
                      >
                        <span className={suggestion.good ? 'text-green-400' : 'text-gray-400'}>
                          {suggestion.good ? '✓' : '→'}
                        </span>
                        <span className={`text-sm ${suggestion.good ? 'text-green-400' : 'text-gray-300'}`}>
                          {suggestion.text}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Features Grid */}
          <motion.div
            className="mt-32 grid md:grid-cols-3 gap-6 max-w-5xl mx-auto"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            {[
              { icon: Zap, title: 'Instant', desc: 'Results in milliseconds', color: 'from-yellow-400 to-orange-500' },
              { icon: Brain, title: 'Smart', desc: 'AI-powered analysis', color: 'from-primary-400 to-purple-500' },
              { icon: TrendingUp, title: 'Convert', desc: 'Better results', color: 'from-green-400 to-emerald-500' },
            ].map((feature, i) => (
              <motion.div
                key={feature.title}
                className="glass-card rounded-2xl p-8 text-center"
                whileHover={{ y: -10, scale: 1.02 }}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 + i * 0.1 }}
              >
                <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center`}>
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary-400" />
            <span className="font-semibold">CTA Cleaner</span>
          </div>
          <p className="text-gray-500 text-sm">© 2024 Built by Catalyst ⚡️</p>
        </div>
      </footer>
    </div>
  );
}

// Brain icon component
function Brain({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
        d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
      />
    </svg>
  );
}

// TrendingUp icon
function TrendingUp({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
        d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
      />
    </svg>
  );
}
