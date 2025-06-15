import React from 'react';
import { useTodoContext } from '../context/TodoContext';

const FilterBar: React.FC = () => {
  const { filter, setFilter } = useTodoContext();
  return (
    <div className="flex gap-4 mb-4">
      <button
        className={`px-4 py-1 border rounded ${filter === 'all' ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-blue-600 border-blue-600 hover:bg-blue-50'}`}
        onClick={() => setFilter('all')}
      >
        All
      </button>
      <button
        className={`px-4 py-1 border rounded ${filter === 'done' ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-blue-600 border-blue-600 hover:bg-blue-50'}`}
        onClick={() => setFilter('done')}
      >
        Done
      </button>
      <button
        className={`px-4 py-1 border rounded ${filter === 'upcoming' ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-blue-600 border-blue-600 hover:bg-blue-50'}`}
        onClick={() => setFilter('upcoming')}
      >
        Upcoming
      </button>
    </div>
  );
};

export default FilterBar; 