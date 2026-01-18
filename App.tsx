
import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UtensilsCrossed } from 'lucide-react';
import MenuItemCard from './components/MenuItemCard';
import FlowerOverlay from './components/FlowerOverlay';
import ThemeToggle from './components/ThemeToggle';
import CalculatorOverlay from './components/CalculatorOverlay';
import { MENU_ITEMS, CATEGORIES } from './constants';
import { Category, MenuItem, CartItem } from './types';

const App: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<Category>('Entrées');
  // Initialisation du thème en 'light' (jour) au lieu de 'dark'
  const [theme, setTheme] = useState<'dark' | 'light'>('light');
  const [calcItems, setCalcItems] = useState<CartItem[]>([]);

  const filteredItems = useMemo(() => 
    MENU_ITEMS.filter(item => item.category === activeCategory),
    [activeCategory]
  );

  const addToCalc = (item: MenuItem) => {
    setCalcItems(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const removeFromCalc = (id: string) => {
    setCalcItems(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id: string, delta: number) => {
    setCalcItems(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const clearCalc = () => setCalcItems([]);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40, filter: 'blur(10px)' },
    show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } }
  };

  const toggleTheme = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark');

  return (
    <div className={`min-h-screen p-4 md:p-8 flex flex-col items-center relative transition-colors duration-1000 ease-in-out ${
      theme === 'dark' ? 'bg-[#050505] text-white' : 'bg-[#FDFBF7] text-slate-900'
    }`}>
      <FlowerOverlay theme={theme} />
      <ThemeToggle theme={theme} toggle={toggleTheme} />
      
      <CalculatorOverlay 
        items={calcItems} 
        theme={theme} 
        onRemove={removeFromCalc} 
        onUpdateQty={updateQuantity}
        onClear={clearCalc}
      />
      
      {/* Menu Header */}
      <header className="w-full max-w-4xl text-center mb-16 mt-16 z-10">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5 }}
          className="flex flex-col items-center gap-8"
        >
          <motion.div
            animate={{ 
              rotate: [0, 8, -8, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className={theme === 'dark' ? 'text-amber-500' : 'text-amber-700'}
          >
            <UtensilsCrossed className="w-16 h-16" />
          </motion.div>
          
          <div className="space-y-4">
            <h1 className="text-5xl md:text-8xl font-bold tracking-tighter serif uppercase overflow-hidden">
              <motion.span
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                className="block"
              >
                LG Consulting
              </motion.span>
            </h1>
            <div className={`h-[1px] w-32 mx-auto bg-gradient-to-r from-transparent ${theme === 'dark' ? 'via-amber-500/50' : 'via-amber-800/30'} to-transparent`} />
            <p className={`${theme === 'dark' ? 'text-amber-500/60' : 'text-amber-800/60'} tracking-[0.8em] uppercase text-[10px] md:text-[12px] font-bold`}>
              Expérience Sensorielle
            </p>
          </div>
        </motion.div>
      </header>

      {/* Categories Tabs */}
      <nav className="w-full max-w-4xl mb-24 z-10">
        <div className="flex justify-center gap-10 md:gap-20 overflow-x-auto no-scrollbar py-6 px-8">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`
                relative text-[12px] font-bold tracking-[0.3em] uppercase transition-all duration-500
                ${activeCategory === cat.id 
                  ? 'text-amber-600' 
                  : theme === 'dark' ? 'text-white/20 hover:text-white/60' : 'text-black/30 hover:text-black/70'}
              `}
            >
              {cat.name}
              {activeCategory === cat.id && (
                <motion.div 
                  layoutId="activeTabUnderline"
                  className="absolute -bottom-3 left-0 right-0 h-[2px] bg-amber-600 rounded-full"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.8 }}
                />
              )}
            </button>
          ))}
        </div>
      </nav>

      {/* Main Board */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className={`w-full max-w-5xl border rounded-[3rem] p-6 md:p-24 mb-48 shadow-2xl z-10 transition-all duration-1000 ${
          theme === 'dark' 
            ? 'bg-black/30 border-white/5 shadow-black' 
            : 'bg-white/40 border-black/5 shadow-amber-900/5'
        } backdrop-blur-2xl`}
      >
        <div className="text-center mb-32">
          <AnimatePresence mode="wait">
            <motion.h2 
              key={activeCategory}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`text-4xl md:text-5xl font-bold serif uppercase tracking-[0.4em] ${
                theme === 'dark' ? 'text-amber-500/90' : 'text-amber-900/80'
              }`}
            >
              {activeCategory}
            </motion.h2>
          </AnimatePresence>
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: 60 }}
            className={`h-[1px] mx-auto mt-12 ${theme === 'dark' ? 'bg-white/10' : 'bg-black/10'}`} 
          />
        </div>

        <div className="space-y-32">
          <AnimatePresence mode="wait">
            <motion.div 
              key={activeCategory}
              variants={containerVariants}
              initial="hidden"
              animate="show"
              exit="hidden"
              className="grid grid-cols-1 gap-32"
            >
              {filteredItems.map((item) => (
                <motion.div key={item.id} variants={itemVariants}>
                  <MenuItemCard 
                    item={item} 
                    theme={theme} 
                    onAdd={() => addToCalc(item)}
                  />
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        <div className={`mt-40 pt-20 border-t text-center italic text-[11px] tracking-[0.4em] uppercase transition-colors duration-1000 ${
          theme === 'dark' ? 'border-white/5 text-white/10' : 'border-black/5 text-black/20'
        }`}>
          Cuisine d'Auteur • Sélection de Terroir • Passion
        </div>
      </motion.div>
      
      <footer className={`w-full max-w-4xl text-center text-[10px] uppercase tracking-[0.6em] mb-20 z-10 transition-opacity duration-1000 ${
        theme === 'dark' ? 'opacity-20' : 'opacity-40'
      }`}>
        LG Consulting • Menu Digital Gastronomique
      </footer>
    </div>
  );
};

export default App;
