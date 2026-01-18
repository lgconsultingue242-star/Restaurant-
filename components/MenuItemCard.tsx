
import React from 'react';
import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import { MenuItem } from '../types';

interface MenuItemCardProps {
  item: MenuItem;
  theme: 'dark' | 'light';
  onAdd: () => void;
}

const MenuItemCard: React.FC<MenuItemCardProps> = ({ item, theme, onAdd }) => {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="group flex flex-col gap-6 items-start w-full relative"
    >
      {/* Container de l'image agrandi */}
      <div className={`relative w-full aspect-[16/9] md:aspect-[21/9] overflow-hidden rounded-[2rem] border transition-all duration-700 ease-out ${
        theme === 'dark' ? 'border-white/5 shadow-2xl shadow-black' : 'border-black/5 shadow-xl shadow-amber-900/5'
      }`}>
        <motion.img 
          src={item.image} 
          alt={item.name}
          initial={{ scale: 1.1 }}
          whileHover={{ scale: 1.05 }}
          className={`w-full h-full object-cover transition-all duration-1000 ease-out ${
            theme === 'dark' ? 'grayscale-[40%] group-hover:grayscale-0 opacity-80 group-hover:opacity-100' : 'grayscale-0 opacity-100'
          }`}
        />
        
        {/* Bouton d'ajout rapide "Calculateur" */}
        <motion.button
          onClick={onAdd}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className={`absolute bottom-6 right-6 p-4 rounded-full backdrop-blur-md shadow-2xl z-20 transition-all duration-500 ${
            theme === 'dark' 
              ? 'bg-amber-500 text-black hover:bg-amber-400' 
              : 'bg-amber-800 text-white hover:bg-amber-900'
          }`}
        >
          <Plus className="w-6 h-6" />
        </motion.button>
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
        
        {item.isPopular && (
          <div className="absolute top-6 left-6 bg-amber-500 text-black text-[9px] font-bold uppercase tracking-widest px-4 py-1.5 rounded-full shadow-lg">
            Signature
          </div>
        )}
      </div>

      {/* Informations du plat */}
      <div className="w-full space-y-3 px-2">
        <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-2">
          <div className="flex items-center gap-4">
            <h3 className={`text-2xl md:text-4xl font-bold serif tracking-tight transition-colors duration-500 ${
              theme === 'dark' ? 'text-white group-hover:text-amber-500' : 'text-slate-900 group-hover:text-amber-800'
            }`}>
              {item.name}
            </h3>
            
            <div className="flex gap-2">
              {item.isVegetarian && (
                <div className={`w-1.5 h-1.5 rounded-full ${theme === 'dark' ? 'bg-green-500/50' : 'bg-green-600/60'}`} title="Végétarien" />
              )}
              {item.isGlutenFree && (
                <div className={`w-1.5 h-1.5 rounded-full ${theme === 'dark' ? 'bg-blue-500/50' : 'bg-blue-600/60'}`} title="Sans Gluten" />
              )}
            </div>
          </div>
          
          <span className={`font-bold text-xl md:text-2xl transition-colors duration-500 ${
            theme === 'dark' ? 'text-amber-500/90' : 'text-amber-900/90'
          }`}>
            {item.price.toLocaleString('fr-FR')} <span className="text-xs font-light ml-1 opacity-60">CFA</span>
          </span>
        </div>

        <p className={`text-sm md:text-base leading-relaxed max-w-3xl font-light italic transition-colors duration-1000 ${
          theme === 'dark' ? 'text-white/40' : 'text-black/60'
        }`}>
          {item.description}
        </p>

        <div className={`h-[1px] w-12 transition-all duration-700 ${
          theme === 'dark' ? 'bg-white/10 group-hover:w-24 group-hover:bg-amber-500/50' : 'bg-black/10 group-hover:w-24 group-hover:bg-amber-800/40'
        }`} />
      </div>
    </motion.div>
  );
};

export default MenuItemCard;
