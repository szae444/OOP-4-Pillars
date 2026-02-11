import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Network, Zap, Layers, ArrowRight, Home, Terminal, Play, Cpu, BrainCircuit, Activity } from 'lucide-react';

const oopData = [
  {
    id: 1,
    title: 'Encapsulation',
    icon: <ShieldCheck size={40} />,
    color: '#00ffa3',
    concept: 'Neural Weight Privacy',
    definition: 'Encapsulation is the bundling of data and methods that operate on that data into a single unit, hiding internal complexity.',
    desc: 'In an ML model, you don\'t want external code directly modifying the "weights" during training. You encapsulate them so they only change through an "updateWeights()" method via backpropagation.',
    java: `public class NeuralLayer {\n  private double[][] weights; // Hidden internal state\n\n  public void train(double learningRate) {\n    // Complex math to update weights safely\n    this.weights = computeGradients(learningRate);\n  }\n}`,
    output: "> layer.train(0.01);\n> Weights updated successfully.\n> Status: Convergence approaching."
  },
  {
    id: 2,
    title: 'Inheritance',
    icon: <Network size={40} />,
    color: '#a855f7',
    concept: 'Model Architectures',
    definition: 'Inheritance is the mechanism where a subclass acquires the properties and behaviors of a parent class.',
    desc: 'A "CNN" inherits general training features from a base "NeuralNetwork" class. This allows the CNN to focus on image features while reusing basic "predict()" and "saveModel()" logic.',
    java: `class BaseNetwork {\n  void predict() { System.out.println(\"Running inference...\"); }\n}\n\nclass CNN extends BaseNetwork {\n  void convolution() { System.out.println(\"Processing image features...\"); }\n}`,
    output: "> CNN myModel = new CNN();\n> myModel.predict(); // Inherited\n> myModel.convolution(); // Specialized"
  },
  {
    id: 3,
    title: 'Abstraction',
    icon: <Zap size={40} />,
    color: '#f43f5e',
    concept: 'API Endpoints',
    definition: 'Abstraction involves showing only essential features while hiding the implementation details from the user.',
    desc: 'When a user calls an AI Chatbot API, they don\'t see millions of parameters or GPU clusters. They only see a "sendMessage()" interface. The complexity of the LLM is hidden.',
    java: `abstract class AIModel {\n  abstract String generateText(String prompt);\n}\n\nclass GPT extends AIModel {\n  String generateText(String prompt) {\n    /* Trillions of operations hidden here */\n    return \"Response generated.\";\n  }\n}`,
    output: "> model.generateText(\"Explain OOP\");\n> [LLM]: Object-Oriented Programming is..."
  },
  {
    id: 4,
    title: 'Polymorphism',
    icon: <Layers size={40} />,
    color: '#00d2ff',
    concept: 'Data Preprocessing',
    definition: 'Polymorphism allows objects of different classes to be treated as objects of a common superclass.',
    desc: 'You have a list of "DataLoaders." One handles Images, another Text, and another CSVs. You call "load()" on all of them; each knows exactly how to handle its specific data type.',
    java: `DataLoader loader1 = new ImageLoader();\nDataLoader loader2 = new CSVLoader();\n\nloader1.load(); // Extracts pixels\nloader2.load(); // Parses rows`,
    output: "> Running pipeline.loadAll();\n> [Image]: 1024x1024 Tensor created.\n> [CSV]: Normalized 500 rows."
  }
];

export default function App() {
  const [page, setPage] = useState('intro');
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMove = (e) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', '--x': `${mousePos.x}px`, '--y': `${mousePos.y}px` }}>
      <div className="spotlight" />
      
      <AnimatePresence mode="wait">
        {page === 'intro' ? (
          <motion.div key="intro" exit={{ opacity: 0, scale: 1.1 }} style={{ textAlign: 'center', zIndex: 10 }}>
            <motion.h1 initial={{ filter: 'blur(20px)', opacity: 0 }} animate={{ filter: 'blur(0px)', opacity: 1 }} className="ms-team-hero">MS TEAM</motion.h1>
            <p style={{ letterSpacing: '8px', color: '#475569', marginTop: '20px', fontWeight: 'bold' }}>SEBASTIAN LAZARTE <span style={{color: '#1e293b'}}>×</span> MONTAZAR MATLIH</p>
            <motion.button whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(0, 255, 163, 0.2)' }} onClick={() => setPage('oop-def')} style={{ marginTop: '60px', background: 'white', color: 'black', border: 'none', padding: '18px 45px', borderRadius: '100px', cursor: 'pointer', fontWeight: 'bold' }}>BOOT KERNEL</motion.button>
          </motion.div>
        ) : page === 'oop-def' ? (
            <motion.div key="oop-def" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} style={{ maxWidth: '900px', textAlign: 'center', zIndex: 10 }}>
              <BrainCircuit size={60} style={{ color: '#00ffa3', marginBottom: '2rem' }} />
              <h2 style={{ fontSize: '3.5rem', fontWeight: '800', marginBottom: '1.5rem' }}>ML Software <span style={{ color: '#00ffa3' }}>Architecture</span></h2>
              <p style={{ fontSize: '1.3rem', color: '#94a3b8', lineHeight: '1.8', marginBottom: '3rem' }}>
                Object-Oriented Programming (OOP) is crucial for BSCS-ML students. It enables the creation of modular Neural Network layers, reusable training pipelines, and abstract model interfaces for high-performance AI deployment.
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
                {['Encapsulation', 'Inheritance', 'Abstraction', 'Polymorphism'].map((p, i) => (
                  <div key={p} style={{ background: 'rgba(255,255,255,0.03)', padding: '20px', borderRadius: '15px', border: '1px solid rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <Activity size={16} color="#475569" /> {p}
                  </div>
                ))}
              </div>
              <motion.button onClick={() => setPage(1)} style={{ marginTop: '4rem', background: 'transparent', border: '1px solid #1e293b', color: 'white', padding: '15px 40px', borderRadius: '50px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px', marginInline: 'auto' }}>
                Enter AI Lab <ArrowRight size={18} />
              </motion.button>
            </motion.div>
        ) : (
          <motion.div key="content" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} style={{ width: '100%', maxWidth: '1200px', zIndex: 10, padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '40px' }}>
              <button onClick={() => setPage('intro')} style={{ background: 'none', border: 'none', color: '#475569', cursor: 'pointer' }}><Home /></button>
              <div style={{ display: 'flex', gap: '12px' }}>
                {oopData.map(d => (
                  <div key={d.id} onClick={() => setPage(d.id)} style={{ width: page === d.id ? '40px' : '10px', height: '10px', borderRadius: '10px', background: page === d.id ? d.color : '#1e293b', cursor: 'pointer', transition: '0.4s' }} />
                ))}
              </div>
            </div>

            {oopData.filter(p => p.id === page).map(p => (
              <div key={p.id} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '60px' }}>
                <div>
                  <div style={{ color: p.color, marginBottom: '20px' }}>{p.icon}</div>
                  <span style={{ color: p.color, letterSpacing: '4px', textTransform: 'uppercase', fontSize: '0.75rem', fontWeight: 'bold' }}>{p.concept}</span>
                  <h2 style={{ fontSize: '4.5rem', fontWeight: '800', margin: '10px 0', letterSpacing: '-3px' }}>{p.title}</h2>
                  <div style={{ padding: '15px', background: `${p.color}08`, borderLeft: `3px solid ${p.color}`, marginBottom: '2rem' }}>
                    <p style={{ margin: 0, fontWeight: 'bold', color: p.color, fontSize: '0.9rem' }}>{p.definition}</p>
                  </div>
                  <p style={{ color: '#94a3b8', fontSize: '1.2rem', lineHeight: '1.7', marginBottom: '40px' }}>{p.desc}</p>
                  
                  <div style={{ display: 'flex', gap: '20px' }}>
                    <button onClick={() => setPage(p => p > 1 ? p-1 : 4)} style={{ background: 'transparent', border: '1px solid #1e293b', color: 'white', padding: '15px 30px', borderRadius: '12px', cursor: 'pointer' }}>PREV</button>
                    <button onClick={() => setPage(p => p < 4 ? p+1 : 'intro')} style={{ background: p.color, border: 'none', color: 'black', padding: '15px 30px', borderRadius: '12px', fontWeight: 'bold', cursor: 'pointer' }}>NEXT MODULE</button>
                  </div>
                </div>

                <div className="terminal-window">
                  <div style={{ padding: '12px 20px', background: 'rgba(22, 27, 34, 0.5)', borderBottom: '1px solid #161b22', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center', color: '#484f58', fontSize: '0.7rem' }}><Terminal size={14} /> {p.title.toLowerCase()}.java</div>
                  </div>
                  <pre style={{ margin: 0, padding: '30px', color: p.color, fontSize: '0.9rem', overflowX: 'auto', fontFamily: 'Fira Code' }}>
                    <code>{p.java}</code>
                  </pre>
                  <div style={{ background: '#0a0b10', borderTop: '1px solid #161b22', padding: '15px 25px', fontFamily: 'Fira Code', fontSize: '0.85rem', color: p.color }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', color: '#475569', fontSize: '0.7rem' }}><Play size={10} /> LIVE INFERENCE OUTPUT</div>
                    {p.output}
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
      <footer style={{ position: 'fixed', bottom: '20px', right: '20px', color: '#111', fontSize: '0.7rem', letterSpacing: '4px', fontWeight: 'bold' }}>BSCS - MACHINE LEARNING</footer>
    </div>
  );
}