import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { 
  ShieldCheck, CreditCard, Zap, Layers, ArrowRight, Home, 
  Terminal, Play, Cpu, BrainCircuit, Activity, Database, 
  Binary, Microchip, School, MessageCircleQuestion, CheckCircle, Loader2, Sparkles, Copy, Check
} from 'lucide-react';

// --- DATA ---
const oopData = [
  {
    id: 1,
    title: 'Encapsulation',
    icon: <ShieldCheck size={32} />,
    color: '#00ffa3',
    concept: 'NUD Entrance Gate',
    definition: '"The Gatekeeper."',
    desc: 'Bundling data with the methods that protect it. In the NUD Entrance System, a student cannot simply declare "I have an ID." They must pass their credentials through the Gatekeeper object.',
    java: `class NudGatekeeper {
    // 1. Private Data (Hidden)
    private boolean hasId;
    private boolean hasUniform;

    // 2. Public Access (Gate)
    public void setCredentials(boolean id, boolean uni) {
        this.hasId = id;
        this.hasUniform = uni;
    }

    public void validate() {
        if (!hasId) System.out.println("No ID.");
        else if (!hasUniform) System.out.println("No Uniform.");
        else System.out.println("Access Granted.");
    }
}`
  },
  {
    id: 2,
    title: 'Inheritance',
    icon: <CreditCard size={32} />,
    color: '#a855f7',
    concept: 'Payment Integration',
    definition: '"The Family Tree."',
    desc: 'Passing down behaviors from Parent to Child. GCash, Maya, and CreditCard all inherit from "PaymentMethod" but implement their own specific payment logic.',
    java: `class PaymentMethod {
    void pay() { print("Paying..."); }
}

class GCash extends PaymentMethod {
    void pay() { print("Opening GCash..."); }
}

class Maya extends PaymentMethod {
    void pay() { print("Scanning QR..."); }
}

// Usage
PaymentMethod p = new GCash();
p.pay(); // Runs GCash version`
  },
  {
    id: 3,
    title: 'Abstraction',
    icon: <Zap size={32} />,
    color: '#f43f5e',
    concept: 'Black Box APIs',
    definition: '"The Interface."',
    desc: 'Hiding complex details. When you use an AI Chatbot API, you call "generate()" without seeing the complex matrix math or GPU allocation happening in the background.',
    java: `abstract class AIModel {
    abstract void generate();
}

class GPT extends AIModel {
    void generate() {
        // Hidden complexity
        print("Tokenizing...");
        print("Calculating weights...");
    }
}

// User only sees this:
model.generate();`
  },
  {
    id: 4,
    title: 'Polymorphism',
    icon: <Layers size={32} />,
    color: '#00d2ff',
    concept: 'Data Pipelines',
    definition: '"The Shape-Shifter."',
    desc: 'One action behaving differently based on the object. A "load()" command works differently whether it is loading a CSV file, an Image, or a Database.',
    java: `interface DataLoader {
    void load();
}

class CSV implements DataLoader {
    public void load() { print("Parsing Rows..."); }
}

class Image implements DataLoader {
    public void load() { print("Reading Pixels..."); }
}

// Same command, different result
loader.load();`
  }
];

// --- COMPONENTS ---

// 1. DECRYPTED TEXT EFFECT (Intro Only)
const DecryptedText = ({ text, className, revealDelay = 0 }) => {
  const [displayText, setDisplayText] = useState('');
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!@#$%^&*()";

  useEffect(() => {
    let iteration = 0;
    const interval = setInterval(() => {
      setDisplayText(text.split("").map((letter, index) => {
        if (index < iteration) return text[index];
        return chars[Math.floor(Math.random() * chars.length)];
      }).join(""));
      
      if (iteration >= text.length) clearInterval(interval);
      iteration += 1 / 3;
    }, 30 + revealDelay);
    return () => clearInterval(interval);
  }, [text]);

  return <span className={className}>{displayText}</span>;
};

// 2. 3D TILT CARD WRAPPER
const TiltCard = ({ children }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseX = useSpring(x, { stiffness: 150, damping: 15 });
  const mouseY = useSpring(y, { stiffness: 150, damping: 15 });

  function handleMouseMove({ currentTarget, clientX, clientY }) {
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    x.set(clientX - left - width / 2);
    y.set(clientY - top - height / 2);
  }

  const rotateX = useTransform(mouseY, [-300, 300], [2, -2]);
  const rotateY = useTransform(mouseX, [-300, 300], [-2, 2]);

  return (
    <motion.div
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      className="relative z-10 h-full"
    >
      {children}
    </motion.div>
  );
};

// 3. SYNTAX HIGHLIGHTER (FIXED)
const CodeBlock = ({ code }) => {
  // Use a simpler approach to avoid HTML injection errors
  const [copied, setCopied] = useState(false);
  
  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Safe formatting function
  const formatCode = (str) => {
    return str.split(/(\s+)/).map((word, i) => {
      if (['public', 'private', 'class', 'void', 'boolean', 'int', 'if', 'else', 'new', 'extends', 'implements', 'abstract', 'interface', 'return'].includes(word)) {
        return <span key={i} style={{ color: '#ff00ff', fontWeight: 'bold' }}>{word}</span>;
      }
      if (['System.out.println', 'print'].includes(word)) {
        return <span key={i} style={{ color: '#00d2ff' }}>{word}</span>;
      }
      if (word.startsWith('"') || word.endsWith('"')) {
        return <span key={i} style={{ color: '#00ffa3' }}>{word}</span>;
      }
      if (word.startsWith('//')) {
        return <span key={i} style={{ color: '#666', fontStyle: 'italic' }}>{word}</span>;
      }
      return word;
    });
  };

  return (
    <div className="relative group rounded-xl overflow-hidden border border-white/10 bg-black/80 backdrop-blur-md h-full flex flex-col">
      <div className="flex justify-between items-center px-4 py-2 bg-white/5 border-b border-white/5 shrink-0">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500/50" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
          <div className="w-3 h-3 rounded-full bg-green-500/50" />
        </div>
        <button onClick={handleCopy} className="text-xs text-gray-500 hover:text-white transition-colors flex items-center gap-1">
          {copied ? <Check size={12} /> : <Copy size={12} />} {copied ? 'COPIED' : 'COPY'}
        </button>
      </div>
      <pre className="p-6 text-sm md:text-xs lg:text-sm font-mono leading-relaxed overflow-auto text-gray-300 flex-1">
        <code>{formatCode(code)}</code>
      </pre>
    </div>
  );
};

// 4. INTERACTIVE TERMINAL (BIGGER)
const InteractiveTerminal = ({ activeTab }) => {
  const [lines, setLines] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [step, setStep] = useState(0); 
  const [tempData, setTempData] = useState({}); 
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    setLines([]);
    setStep(0);
    setTempData({});
    setInputValue('');

    const welcomeMsg = [];
    
    if (activeTab === 1) { 
      welcomeMsg.push({ text: "=== NUD ENTRANCE GATE KIOSK ===", color: "text-white font-bold" });
      welcomeMsg.push({ text: "Do you have your ID? (yes/no):", color: "text-[#00ffa3]" });
    } else if (activeTab === 2) { 
      welcomeMsg.push({ text: "=== PAYMENT SYSTEM ===", color: "text-white font-bold" });
      welcomeMsg.push({ text: "[1] GCash  [2] Maya  [3] Card", color: "text-gray-400" });
      welcomeMsg.push({ text: "Enter choice (1-3):", color: "text-[#00ffa3]" });
    } else if (activeTab === 3) { 
      welcomeMsg.push({ text: "AI MODEL LOADED.", color: "text-white font-bold" });
      welcomeMsg.push({ text: "Enter prompt to generate response:", color: "text-[#00ffa3]" });
    } else if (activeTab === 4) { 
      welcomeMsg.push({ text: "DATA PIPELINE INITIALIZED.", color: "text-white font-bold" });
      welcomeMsg.push({ text: "Select source (csv / image / db):", color: "text-[#00ffa3]" });
    }
    
    setLines(welcomeMsg);
  }, [activeTab]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    inputRef.current?.focus();
  }, [lines, activeTab]);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      const input = inputValue.trim();
      const newLines = [...lines, { text: `> ${input}`, color: "text-gray-500" }];
      let nextStep = step;
      let nextTempData = { ...tempData };

      if (activeTab === 1) { 
        if (step === 0) {
          nextTempData.hasId = input.toLowerCase() === 'yes';
          newLines.push({ text: "Are you in proper uniform? (yes/no):", color: "text-[#00ffa3]" });
          nextStep = 1;
        } else if (step === 1) {
          const hasUniform = input.toLowerCase() === 'yes';
          newLines.push({ text: "--- VALIDATING ---", color: "text-gray-500 italic" });
          
          if (!nextTempData.hasId) {
            newLines.push({ text: "[VIOLATION]: No ID Found.", color: "text-red-500 font-bold" });
          } else if (!hasUniform) {
            newLines.push({ text: "[VIOLATION]: Improper Uniform.", color: "text-red-500 font-bold" });
            newLines.push({ text: "ID Confiscated.", color: "text-red-400" });
          } else {
            newLines.push({ text: "ACCESS GRANTED. Welcome to NUD.", color: "text-green-400 font-bold" });
          }
          newLines.push({ text: " ", color: "" });
          newLines.push({ text: "Do you have your ID? (yes/no):", color: "text-[#00ffa3]" });
          nextStep = 0; 
        }
      } 
      else if (activeTab === 2) { 
        if (input === '1') {
          newLines.push({ text: "Opening GCash... Processing 500.", color: "text-blue-400" });
        } else if (input === '2') {
          newLines.push({ text: "Opening Maya... Scanning QR...", color: "text-green-400" });
        } else if (input === '3') {
          newLines.push({ text: "Connecting to Bank... Success.", color: "text-yellow-400" });
        } else {
          newLines.push({ text: "Invalid Choice.", color: "text-red-500" });
        }
        newLines.push({ text: " ", color: "" });
        newLines.push({ text: "Enter choice (1-3):", color: "text-[#00ffa3]" });
      }
      else if (activeTab === 3) { 
        newLines.push({ text: "Tokenizing input...", color: "text-gray-500" });
        newLines.push({ text: "Calculating attention weights...", color: "text-gray-500" });
        newLines.push({ text: `[OUTPUT]: "Information about '${input}'..."`, color: "text-green-400" });
        newLines.push({ text: " ", color: "" });
        newLines.push({ text: "Enter prompt:", color: "text-[#00ffa3]" });
      }
      else if (activeTab === 4) { 
        if (input === 'csv') {
           newLines.push({ text: "CSVLoader: Parsing 1500 rows...", color: "text-blue-400" });
        } else if (input === 'image') {
           newLines.push({ text: "ImageLoader: Reading pixels...", color: "text-purple-400" });
        } else if (input === 'db') {
           newLines.push({ text: "DatabaseLoader: Querying SQL...", color: "text-yellow-400" });
        } else {
           newLines.push({ text: "Unknown source.", color: "text-red-500" });
        }
        newLines.push({ text: " ", color: "" });
        newLines.push({ text: "Select source (csv / image / db):", color: "text-[#00ffa3]" });
      }

      setLines(newLines);
      setStep(nextStep);
      setTempData(nextTempData);
      setInputValue('');
    }
  };

  return (
    // UPDATED HEIGHT HERE: h-[400px]
    <div 
      className="bg-[#050505] rounded-xl border border-white/10 p-4 font-mono text-xs md:text-sm shadow-2xl flex-1 flex flex-col h-[400px] min-h-[400px] overflow-hidden cursor-text"
      onClick={() => inputRef.current?.focus()}
    >
      <div className="flex items-center gap-2 text-gray-500 border-b border-white/5 pb-2 mb-2 select-none shrink-0">
        <Terminal size={14} /> <span>INTERACTIVE_CONSOLE</span>
      </div>
      
      <div className="flex-1 overflow-y-auto scrollbar-hide">
        {lines.map((line, i) => (
          <div key={i} className={`${line.color} mb-1 whitespace-pre-wrap`}>
            {line.text}
          </div>
        ))}
        <div className="flex items-center text-[#00ffa3]">
          <span className="mr-2">{'>'}</span>
          <input 
            ref={inputRef}
            type="text" 
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            className="bg-transparent border-none outline-none flex-1 text-white placeholder-gray-700 font-mono"
            autoFocus
          />
        </div>
        <div ref={bottomRef} />
      </div>
    </div>
  );
};

// --- MAIN APP ---
export default function App() {
  const [page, setPage] = useState('intro');
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (page === 'loading') {
      const timer = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(timer);
            setTimeout(() => setPage('oop-def'), 500);
            return 100;
          }
          return prev + Math.floor(Math.random() * 5) + 1;
        });
      }, 50);
      return () => clearInterval(timer);
    }
  }, [page]);

  return (
    <div className="min-h-screen flex items-center justify-center relative bg-[#03040b] text-white overflow-hidden">
      <div className="cyber-grid" />
      <div className="scanline" />
      
      {/* PARTICLES */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ y: "110vh", x: Math.random() * 100 + "vw", opacity: 0 }}
            animate={{ y: "-10vh", opacity: [0, 0.5, 0] }}
            transition={{ duration: Math.random() * 10 + 10, repeat: Infinity, ease: "linear" }}
            className="absolute"
          >
            <Binary size={Math.random() * 20 + 10} className="text-[#00ffa3]/20" />
          </motion.div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        
        {/* === INTRO PAGE === */}
        {page === 'intro' && (
          <motion.div 
            key="intro" 
            exit={{ opacity: 0, scale: 2, filter: "blur(20px)" }}
            className="text-center z-10 relative"
          >
            <TiltCard>
              <div className="mb-4 flex justify-center gap-4">
                <Cpu size={40} className="text-[#00ffa3]" />
                <BrainCircuit size={40} className="text-[#a855f7]" />
              </div>
              <h1 className="hero-glitch mb-2">
                <DecryptedText text="MS TEAM" />
              </h1>
              <p className="text-gray-400 tracking-[0.3em] font-bold text-sm md:text-lg mb-12">
                <span className="text-[#00ffa3]">SEBASTIAN LAZARTE</span> <span className="mx-2">×</span> MONTAZAR MATLIH
              </p>
              
              <motion.button
                onClick={() => setPage('loading')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group relative px-10 py-4 bg-transparent border border-[#00ffa3]/30 rounded-full overflow-hidden"
              >
                <div className="absolute inset-0 bg-[#00ffa3]/10 group-hover:bg-[#00ffa3]/20 transition-all" />
                <span className="relative font-bold tracking-widest text-[#00ffa3] flex items-center gap-3">
                  INITIALIZE <Play size={16} fill="currentColor" />
                </span>
              </motion.button>
            </TiltCard>
          </motion.div>
        )}

        {/* === LOADING PAGE === */}
        {page === 'loading' && (
          <motion.div 
            key="loading"
            exit={{ opacity: 0 }}
            className="z-10 w-80 text-center font-mono"
          >
            <Loader2 className="animate-spin mx-auto mb-8 text-[#00ffa3]" size={48} />
            <div className="h-1 w-full bg-gray-800 rounded-full overflow-hidden mb-4">
              <motion.div 
                className="h-full bg-[#00ffa3] shadow-[0_0_20px_#00ffa3]"
                style={{ width: `${progress}%` }} 
              />
            </div>
            <div className="flex justify-between text-xs text-[#00ffa3]">
              <span>LOADING KERNEL...</span>
              <span>{progress}%</span>
            </div>
          </motion.div>
        )}

        {/* === OOP DEF PAGE === */}
        {page === 'oop-def' && (
          <motion.div 
            key="def" 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="z-10 max-w-4xl w-full px-6 text-center"
          >
            <TiltCard>
              <div className="bg-black/40 backdrop-blur-xl border border-white/10 p-12 rounded-3xl shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#00ffa3] to-transparent opacity-50" />
                <Sparkles className="mx-auto mb-6 text-[#a855f7]" size={48} />
                <h2 className="text-5xl md:text-7xl font-bold mb-6">
                  4 PILLARS OF <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00ffa3] to-[#00d2ff]">OOP</span>
                </h2>
                <p className="text-xl text-gray-400 leading-relaxed max-w-2xl mx-auto mb-10">
                  For <span className="text-white font-bold">BSCS-ML</span> students, Object-Oriented Programming is the architecture of Intelligence. It structures the chaos of data into the order of logic.
                </p>
                <motion.button
                  onClick={() => setPage(1)}
                  whileHover={{ scale: 1.05 }}
                  className="px-8 py-3 bg-white text-black font-bold rounded-full flex items-center gap-2 mx-auto"
                >
                  ENTER LAB <ArrowRight size={18} />
                </motion.button>
              </div>
            </TiltCard>
          </motion.div>
        )}

        {/* === CONTENT PAGES (1-4) === */}
        {typeof page === 'number' && (
          <motion.div 
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="z-10 w-full max-w-6xl px-4 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center h-[90vh]"
          >
            {/* LEFT: INFO */}
            <div className="lg:col-span-5 order-2 lg:order-1 h-full">
              {oopData.filter(d => d.id === page).map(item => (
                <TiltCard key={item.id}>
                  <div className="bg-black/40 backdrop-blur-xl border border-white/10 p-8 rounded-3xl h-full flex flex-col justify-between">
                    <div>
                      <motion.div 
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        className="flex items-center gap-4 mb-6"
                      >
                        <div className="p-3 rounded-xl bg-white/5" style={{ color: item.color }}>
                          {item.icon}
                        </div>
                        <div>
                          <h4 className="text-[#00ffa3] font-mono text-sm tracking-widest">MODULE 0{item.id}</h4>
                          <h2 className="text-4xl font-bold">{item.title}</h2>
                        </div>
                      </motion.div>

                      <div className="mb-6 pl-4 border-l-2" style={{ borderColor: item.color }}>
                        <h3 className="text-xl font-bold mb-2 italic text-gray-200">{item.definition}</h3>
                        <p className="text-gray-400">{item.concept}</p>
                      </div>
                      <p className="text-gray-300 leading-relaxed mb-8">{item.desc}</p>
                    </div>

                    <div className="flex gap-4">
                      <button 
                        onClick={() => setPage(p => p === 1 ? 'oop-def' : p - 1)}
                        className="px-6 py-3 rounded-xl border border-white/10 hover:bg-white/5 transition-colors text-sm font-bold"
                      >
                        BACK
                      </button>
                      <button 
                        onClick={() => setPage(p => p === 4 ? 'qa' : p + 1)}
                        className="px-6 py-3 rounded-xl text-black font-bold flex-1 flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(0,0,0,0.3)] hover:shadow-[0_0_30px_rgba(0,0,0,0.5)] transition-all"
                        style={{ background: item.color }}
                      >
                        {page === 4 ? 'START Q&A' : 'NEXT MODULE'} <ArrowRight size={16} />
                      </button>
                    </div>
                  </div>
                </TiltCard>
              ))}
            </div>

            {/* RIGHT: CODE + TERMINAL */}
            <div className="lg:col-span-7 order-1 lg:order-2 h-full flex flex-col gap-4">
              {oopData.filter(d => d.id === page).map(item => (
                <React.Fragment key={item.id}>
                  {/* Fixed CodeBlock height */}
                  <div className="flex-1 min-h-[300px]">
                    <CodeBlock code={item.java} />
                  </div>
                  {/* Interactive Terminal with FIXED height */}
                  <InteractiveTerminal activeTab={page} />
                </React.Fragment>
              ))}
            </div>
          </motion.div>
        )}

        {/* === Q&A PAGE === */}
        {page === 'qa' && (
          <motion.div 
            key="qa"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ opacity: 0, y: -50 }}
            className="z-10 text-center max-w-2xl px-6"
          >
            <TiltCard>
              <div className="bg-black/40 backdrop-blur-xl border border-white/10 p-12 rounded-[3rem] relative">
                <div className="absolute inset-0 bg-gradient-to-b from-[#00ffa3]/5 to-transparent rounded-[3rem] pointer-events-none" />
                <MessageCircleQuestion size={80} className="mx-auto mb-6 text-[#00ffa3]" />
                <h1 className="text-6xl font-bold mb-4">Q & A</h1>
                <p className="text-xl text-gray-400 mb-10">
                  The system is now open for queries regarding the implementation.
                </p>
                <button 
                  onClick={() => setPage('thank-you')}
                  className="px-10 py-4 border border-[#00ffa3] text-[#00ffa3] rounded-full font-bold tracking-widest hover:bg-[#00ffa3] hover:text-black transition-all"
                >
                  END SESSION
                </button>
              </div>
            </TiltCard>
          </motion.div>
        )}

        {/* === THANK YOU PAGE === */}
        {page === 'thank-you' && (
          <motion.div 
            key="thanks"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="z-10 text-center"
          >
            <CheckCircle size={80} className="mx-auto mb-6 text-[#00ffa3]" />
            <h1 className="hero-glitch mb-4 text-7xl">THANK YOU</h1>
            <p className="text-gray-500 tracking-widest font-mono text-sm">
              SEBASTIAN LAZARTE × MONTAZAR MATLIH
            </p>
            <button 
              onClick={() => setPage('intro')}
              className="mt-12 text-sm text-gray-600 hover:text-white transition-colors underline decoration-dotted"
            >
              REBOOT SYSTEM
            </button>
          </motion.div>
        )}

      </AnimatePresence>

      <div className="fixed bottom-6 right-8 text-[10px] font-bold tracking-[0.3em] text-gray-600 pointer-events-none">
        BSCS-ML / SYS.V.2.0
      </div>
    </div>
  );
}