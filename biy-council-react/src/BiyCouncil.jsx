import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Search, Heart, Scale, Terminal, CheckCircle2, AlertTriangle, FileCode } from 'lucide-react';

const AGENTS = [
  {
    id: 'auditor',
    name: 'Auditor',
    role: 'Fact-checker',
    icon: Shield,
    color: 'text-blue-400',
    borderColor: 'border-blue-500/30',
    glowColor: 'shadow-blue-500/20',
    thoughts: [
      'Scanning GPS coordinates: 48.8584° N, 2.2945° E',
      'Verifying timestamp: 2026-05-06T10:30:00Z',
      'Checking mission logic: Humanitarian Aid Branch',
      'GPS data verified. Timestamp matches upload metadata.'
    ]
  },
  {
    id: 'skeptic',
    name: 'Skeptic',
    role: 'Fraud Detector',
    icon: Search,
    color: 'text-amber-400',
    borderColor: 'border-amber-500/30',
    glowColor: 'shadow-amber-500/20',
    thoughts: [
      'Performing pixel forensics on primary image...',
      'Analyzing shadow geometry...',
      'Deepfake detection confidence: 0.02%',
      'Metadata consistency check passed.'
    ],
    alertThoughts: [
      'Wait, the shadow geometry in this photo looks AI-generated.',
      'Potential pixel manipulation detected at (120, 240).',
      'Flagging for manual review: ARAM detected.',
    ]
  },
  {
    id: 'social',
    name: 'Social Biy',
    role: 'Impact Evaluator',
    icon: Heart,
    color: 'text-pink-400',
    borderColor: 'border-pink-500/30',
    glowColor: 'shadow-pink-500/20',
    thoughts: [
      'Evaluating community impact (Asar level)...',
      'Analyzing sincerity in contributor notes...',
      'Social Lift potential: +4.2 Aura points.',
      'Positive impact confirmed.'
    ]
  },
  {
    id: 'master',
    name: 'Master Biy',
    role: 'Consensus Judge',
    icon: Scale,
    color: 'text-cyan-400',
    borderColor: 'border-cyan-500/30',
    glowColor: 'shadow-cyan-500/20',
    thoughts: [
      'Synthesizing agent reports...',
      'Auditor weight: 0.4 | Skeptic weight: 0.4 | Social weight: 0.2',
      'Final decision pending...',
      'Integrity Manifest generation initiated.'
    ]
  }
];

const BiyCouncil = () => {
  const [activeStep, setActiveStep] = useState(-1);
  const [status, setStatus] = useState('idle'); // idle, running, adal, aram
  const [logs, setLogs] = useState([]);
  const [manifest, setManifest] = useState(null);

  const startDeliberation = (isAdal = true) => {
    setActiveStep(0);
    setStatus('running');
    setLogs([]);
    setManifest(null);
  };

  useEffect(() => {
    if (status === 'running' && activeStep >= 0 && activeStep < 4) {
      const currentAgent = AGENTS[activeStep];
      const thoughtBatch = (status === 'running' && activeStep === 1 && !manifest && logs.length > 5) // fake logic for fail
        ? currentAgent.alertThoughts 
        : currentAgent.thoughts;

      const timer = setTimeout(() => {
        if (activeStep < 3) {
          setActiveStep(prev => prev + 1);
        } else {
          setStatus(manifest === 'aram' ? 'aram' : 'adal');
          generateManifest();
        }
      }, 2500);

      const addLogs = setInterval(() => {
        setLogs(prev => [...prev, `${currentAgent.name.toUpperCase()}: ${thoughtBatch[Math.floor(Math.random() * thoughtBatch.length)]}`].slice(-8));
      }, 600);

      return () => {
        clearTimeout(timer);
        clearInterval(addLogs);
      };
    }
  }, [activeStep, status]);

  const generateManifest = () => {
    setManifest({
      protocol: "ProtoQol-v1",
      timestamp: new Date().toISOString(),
      verdict: status === 'aram' ? "ARAM" : "ADAL",
      signatures: {
        auditor: "0x7a...4e",
        skeptic: "0x3f...12",
        social: "0x12...98",
        master: "0xbc...5a"
      },
      hash: "SHA256:e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855"
    });
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 p-8 font-mono overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <header className="mb-12 flex justify-between items-end">
          <div>
            <h1 className="text-4xl font-black tracking-tighter text-cyan-400 mb-2">COUNCIL OF BIYS</h1>
            <p className="text-slate-500 uppercase text-xs tracking-widest">Multi-Agent Deliberation UI // System ID: PQ-029</p>
          </div>
          <div className="flex gap-4">
            <button 
              onClick={() => { setStatus('running'); setActiveStep(0); setLogs([]); }}
              className="px-6 py-2 border border-cyan-400/50 text-cyan-400 hover:bg-cyan-400 hover:text-slate-900 transition-all text-sm font-bold"
            >
              SIMULATE ADAL (TRUTH)
            </button>
            <button 
                onClick={() => { setStatus('running-aram'); setActiveStep(0); setLogs([]); }}
                className="px-6 py-2 border border-red-400/50 text-red-400 hover:bg-red-400 hover:text-slate-900 transition-all text-sm font-bold"
            >
              SIMULATE ARAM (FRAUD)
            </button>
          </div>
        </header>

        {/* Agent Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          {AGENTS.map((agent, idx) => (
            <AgentCard 
              key={agent.id} 
              agent={agent} 
              isActive={activeStep === idx}
              isCompleted={activeStep > idx || (status === 'adal' || status === 'aram')}
              isFailed={status === 'aram' && agent.id === 'skeptic'}
            />
          ))}
        </div>

        {/* Terminal and Manifest */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-slate-950/50 border border-slate-800 p-6 rounded-lg backdrop-blur-xl relative overflow-hidden h-[300px]">
            <div className="flex items-center gap-2 mb-4 text-xs text-slate-500 uppercase tracking-widest">
              <Terminal size={14} className="text-cyan-400" />
              Live Thought Stream
            </div>
            <div className="space-y-1">
              {logs.map((log, i) => (
                <motion.div 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  key={i} 
                  className="text-xs text-slate-400 font-mono"
                >
                  <span className="text-cyan-900 mr-2">[{new Date().toLocaleTimeString()}]</span>
                  {log}
                </motion.div>
              ))}
            </div>
            {/* Ambient data flow animation */}
            <div className="absolute inset-0 pointer-events-none opacity-5">
                <div className="h-full w-full bg-[radial-gradient(#22d3ee_1px,transparent_1px)] [background-size:16px_16px]"></div>
            </div>
          </div>

          <AnimatePresence>
            {(status === 'adal' || status === 'aram') && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`p-6 rounded-lg backdrop-blur-xl border ${status === 'aram' ? 'bg-red-950/20 border-red-900/50' : 'bg-cyan-950/20 border-cyan-900/50'}`}
              >
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2 text-xs uppercase tracking-widest">
                        <FileCode size={14} className={status === 'aram' ? 'text-red-400' : 'text-cyan-400'} />
                        Signed Integrity Manifest
                    </div>
                    <div className={`px-3 py-1 rounded text-[10px] font-black ${status === 'aram' ? 'bg-red-400 text-red-950' : 'bg-cyan-400 text-cyan-900'}`}>
                        {status === 'aram' ? 'TRANSACTION BLOCKED' : 'VERIFIED ADAL'}
                    </div>
                </div>
                <pre className="text-[10px] text-slate-300 overflow-auto max-h-[180px]">
                  {JSON.stringify(manifest, null, 2)}
                </pre>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

const AgentCard = ({ agent, isActive, isCompleted, isFailed }) => {
  const Icon = agent.icon;
  
  return (
    <motion.div 
      animate={{ 
        scale: isActive ? 1.05 : 1,
        borderColor: isFailed ? 'rgba(248, 113, 113, 0.5)' : isActive ? 'rgba(34, 211, 238, 0.5)' : 'rgba(30, 41, 59, 0.5)'
      }}
      className={`relative p-6 rounded-2xl border bg-slate-900/40 backdrop-blur-xl overflow-hidden group transition-all duration-500 ${isFailed ? 'shadow-[0_0_30px_rgba(248,113,113,0.1)]' : isActive ? 'shadow-[0_0_30px_rgba(34,211,238,0.1)]' : ''}`}
    >
      <div className={`mb-4 ${isFailed ? 'text-red-400' : isCompleted ? 'text-green-400' : isActive ? 'text-cyan-400' : 'text-slate-600'}`}>
        <Icon size={32} />
      </div>
      
      <h3 className={`text-lg font-black tracking-tighter mb-1 ${isFailed ? 'text-red-100' : 'text-slate-100'}`}>
        {agent.name.toUpperCase()}
      </h3>
      <p className="text-[10px] text-slate-500 uppercase tracking-widest mb-4">{agent.role}</p>

      <div className="space-y-1.5 opacity-40 group-hover:opacity-100 transition-opacity">
        <div className="h-1 w-full bg-slate-800 rounded-full overflow-hidden">
             {isActive && <motion.div 
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ duration: 2.5, ease: "linear" }}
                className={`h-full ${isFailed ? 'bg-red-400' : 'bg-cyan-400'}`}
             />}
             {isCompleted && !isFailed && <div className="h-full w-full bg-green-400"></div>}
        </div>
      </div>

      {isCompleted && !isFailed && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute top-4 right-4 text-green-400">
          <CheckCircle2 size={16} />
        </motion.div>
      )}

      {isFailed && (
        <motion.div 
            animate={{ scale: [1, 1.2, 1] }} 
            transition={{ repeat: Infinity, duration: 1 }} 
            className="absolute top-4 right-4 text-red-500"
        >
          <AlertTriangle size={16} />
        </motion.div>
      )}
      
      {/* Background visual flair */}
      <div className={`absolute -bottom-4 -right-4 opacity-5 group-hover:opacity-10 transition-opacity ${agent.color}`}>
        <Icon size={80} />
      </div>
    </motion.div>
  );
};

export default BiyCouncil;
