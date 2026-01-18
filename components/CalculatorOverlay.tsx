
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useSpring, useTransform } from 'framer-motion';
import { Calculator, X, Minus, Plus, Trash2 } from 'lucide-react';
import { CartItem } from '../types';

// Composant interne pour animer les chiffres
const AnimatedNumber = ({ value }: { value: number }) => {
  const spring = useSpring(value, {
    mass: 0.8,
    stiffness: 75,
    damping: 15,
  });

  const displayValue = useTransform(spring, (current) => 
    Math.round(current).toLocaleString('fr-FR')
  );

  useEffect(() => {
    spring.set(value);
  }, [value, spring]);

  return <motion.span>{displayValue}</motion.span>;
};

interface CalculatorOverlayProps {
  items: CartItem[];
  theme: 'dark' | 'light';
  onRemove: (id: string) => void;
  onUpdateQty: (id: string, delta: number) => void;
  onClear: () => void;
}

const CalculatorOverlay: React.FC<CalculatorOverlayProps> = ({ items, theme, onRemove, onUpdateQty, onClear }) => {
  const [isOpen, setIsOpen] = useState(false);
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <>
      {/* Floating Toggle Button */}
      <AnimatePresence>
        {items.length > 0 && (
          <motion.button
            initial={{ scale: 0, y: 100 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0, y: 100 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(true)}
            className={`fixed bottom-28 right-8 md:right-12 z-[55] p-5 rounded-full shadow-2xl transition-all duration-500 ${
              theme === 'dark' 
                ? 'bg-amber-500 text-black shadow-amber-500/20' 
                : 'bg-amber-800 text-white shadow-amber-900/20'
            }`}
          >
            <div className="relative">
              <Calculator className="w-8 h-8" />
              <motion.span 
                key={items.length}
                initial={{ scale: 1.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white shadow-lg"
              >
                {items.length}
              </motion.span>
            </div>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Calculator Modal */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-md z-[100]"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className={`fixed top-0 right-0 h-full w-full max-w-md z-[101] p-8 flex flex-col transition-colors duration-1000 shadow-2xl ${
                theme === 'dark' ? 'bg-[#0a0a0a] border-l border-white/5 text-white' : 'bg-[#fff] border-l border-black/5 text-slate-900'
              }`}
            >
              <div className="flex items-center justify-between mb-12">
                <div className="flex items-center gap-4">
                  <Calculator className={theme === 'dark' ? 'text-amber-500' : 'text-amber-800'} />
                  <h2 className="text-2xl font-bold serif uppercase tracking-widest">Votre Sélection</h2>
                </div>
                <button onClick={() => setIsOpen(false)} className="p-2 hover:opacity-50 transition-opacity">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto no-scrollbar space-y-8 pr-2">
                <AnimatePresence mode="popLayout">
                  {items.map((item) => (
                    <motion.div 
                      layout
                      key={item.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="flex gap-6 items-center group"
                    >
                      <div className="w-16 h-16 rounded-2xl overflow-hidden flex-shrink-0 border border-white/5 shadow-lg">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold serif text-lg truncate group-hover:text-amber-500 transition-colors">{item.name}</h4>
                        <p className="text-xs opacity-40 font-mono">{item.price.toLocaleString('fr-FR')} CFA</p>
                      </div>

                      <div className="flex flex-col items-end gap-2">
                        <div className={`flex items-center gap-3 rounded-full border p-1 ${theme === 'dark' ? 'border-white/10' : 'border-black/10'}`}>
                          <button onClick={() => onUpdateQty(item.id, -1)} className="p-1 hover:scale-125 transition-transform"><Minus className="w-3 h-3" /></button>
                          <span className="text-xs font-bold w-4 text-center">{item.quantity}</span>
                          <button onClick={() => onUpdateQty(item.id, 1)} className="p-1 hover:scale-125 transition-transform"><Plus className="w-3 h-3" /></button>
                        </div>
                        <span className="text-sm font-bold text-amber-500 font-mono">
                          <AnimatedNumber value={item.price * item.quantity} /> CFA
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
                
                {items.length === 0 && (
                  <div className="h-full flex flex-col items-center justify-center text-center opacity-30 space-y-4">
                    <Calculator className="w-12 h-12" />
                    <p className="italic text-sm">Votre sélection est vide</p>
                  </div>
                )}
              </div>

              <div className={`mt-12 pt-8 border-t space-y-6 ${theme === 'dark' ? 'border-white/5' : 'border-black/5'}`}>
                <div className="flex justify-between items-end">
                  <div className="space-y-1">
                    <p className="text-[10px] uppercase tracking-[0.3em] opacity-40">Total Estimé</p>
                    <p className="text-5xl font-bold font-mono tracking-tighter text-amber-500">
                      <AnimatedNumber value={total} /> <span className="text-sm opacity-60">CFA</span>
                    </p>
                  </div>
                  <button 
                    onClick={onClear}
                    className="flex items-center gap-2 text-[9px] uppercase tracking-widest text-red-500/60 hover:text-red-500 transition-colors mb-2"
                  >
                    <Trash2 className="w-3 h-3" /> Vider
                  </button>
                </div>
                
                <div className={`p-6 rounded-3xl text-center text-[11px] font-medium leading-relaxed italic ${
                  theme === 'dark' ? 'bg-white/5 text-white/30' : 'bg-black/5 text-black/40'
                }`}>
                  "Une symphonie de saveurs vous attend."
                </div>

                <button 
                  onClick={() => setIsOpen(false)}
                  className={`w-full py-5 rounded-full font-bold uppercase tracking-[0.3em] text-xs transition-all duration-500 ${
                    theme === 'dark' ? 'bg-amber-500 text-black hover:bg-amber-400' : 'bg-amber-800 text-white hover:bg-amber-900'
                  }`}
                >
                  Fermer
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default CalculatorOverlay;
