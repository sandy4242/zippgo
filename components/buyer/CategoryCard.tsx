import { LucideIcon } from 'lucide-react';

interface Category {
  id: string;
  name: string;
  icon: LucideIcon;
  color: string;
  count: number;
}

interface CategoryCardProps {
  category: Category;
  isSelected: boolean;
  onClick: () => void;
}

export default function CategoryCard({ category, isSelected, onClick }: CategoryCardProps) {
  const Icon = category.icon;

  return (
    <button
      onClick={onClick}
      className={`
        p-4 rounded-xl transition-all duration-200 text-center
        ${isSelected 
          ? 'bg-blue-600 text-white shadow-lg scale-105' 
          : 'bg-white hover:shadow-md border border-gray-200'
        }
      `}
    >
      <div className={`
        w-12 h-12 rounded-full mx-auto mb-3 flex items-center justify-center
        ${isSelected ? 'bg-white/20' : category.color}
      `}>
        <Icon className={`w-6 h-6 ${isSelected ? 'text-white' : ''}`} />
      </div>
      <h3 className={`font-semibold mb-1 ${isSelected ? 'text-white' : 'text-gray-900'}`}>
        {category.name}
      </h3>
      <p className={`text-xs ${isSelected ? 'text-blue-100' : 'text-gray-500'}`}>
        {category.count} items
      </p>
    </button>
  );
}
